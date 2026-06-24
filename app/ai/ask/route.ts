import {
  aiConfigured,
  streamAnthropic,
  fetchFundsServer,
  fetchStatsServer,
  MODEL_CHAT,
  type ChatMessage,
} from '@/lib/ai'

export const runtime = 'nodejs'
export const maxDuration = 60

function textResponse(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  })
}

function compactFund(f: Record<string, unknown>): string {
  const num = (k: string) => (typeof f[k] === 'number' ? (f[k] as number) : null)
  const parts = [
    f.name,
    f.amc,
    f.cat,
    `score ${f.score}`,
    num('pickAnn') != null ? `pick ${num('pickAnn')}%/yr` : 'pick n/a',
    num('ter') != null ? `ter ${num('ter')}%` : '',
    num('aret') != null ? `vsBmk ${num('aret')}%/yr` : '',
  ].filter(Boolean)
  return parts.join(' · ')
}

const STOP = new Set([
  'the', 'and', 'for', 'with', 'fund', 'funds', 'mutual', 'what', 'which', 'how',
  'are', 'is', 'of', 'in', 'to', 'best', 'top', 'show', 'me', 'that', 'this',
  'does', 'do', 'about', 'vs', 'versus', 'compare', 'between', 'good', 'bad',
  'should', 'can', 'you', 'tell', 'give', 'list', 'score', 'scores',
])

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t))
}

const CAT_SYNONYMS: Record<string, string[]> = {
  'Flexi Cap': ['flexi'],
  'Small Cap': ['small cap', 'smallcap', 'small-cap'],
  'Mid Cap': ['mid cap', 'midcap', 'mid-cap'],
  'Large Cap': ['large cap', 'largecap', 'large-cap'],
  'Tax Saver (ELSS)': ['elss', 'tax saver', 'tax-saver'],
  'Multi Cap': ['multi cap', 'multicap', 'multi-cap'],
  'Value / Contrarian': ['value', 'contrarian'],
  Focused: ['focused'],
  'Thematic / Sectoral': ['thematic', 'sectoral', 'sector'],
  Hybrid: ['hybrid', 'balanced'],
}

function topBy(
  pool: Record<string, unknown>[],
  key: 'pickAnn' | 'score' | 'ter',
  n: number,
): Record<string, unknown>[] {
  const arr = pool.filter((f) => typeof f[key] === 'number')
  arr.sort((a, b) => {
    const av = a[key] as number
    const bv = b[key] as number
    return key === 'ter' ? av - bv : bv - av
  })
  return arr.slice(0, n)
}

// Lightweight retrieval: pick only the funds relevant to the question instead of
// shipping the entire universe as context.
function selectRelevantFunds(
  question: string,
  funds: Record<string, unknown>[],
  categories: string[],
): Record<string, unknown>[] {
  const ql = question.toLowerCase()
  const qTokens = tokenize(question)

  const scored = funds.map((f) => {
    const name = String(f.name ?? '').toLowerCase()
    const amc = String(f.amc ?? '').toLowerCase()
    let s = 0
    for (const t of qTokens) {
      if (name.includes(t)) s += 3
      else if (amc.includes(t)) s += 2
    }
    return { f, s }
  })
  const nameMatches = scored
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 25)
    .map((x) => x.f)

  const catSet = new Set<string>()
  for (const c of categories) {
    if (ql.includes(c.toLowerCase())) catSet.add(c)
    const syns = CAT_SYNONYMS[c]
    if (syns && syns.some((syn) => ql.includes(syn))) catSet.add(c)
  }

  const wantsSkill = /skill|stock.?pick|alpha|\bpick/.test(ql)
  const wantsCheap = /cheap|low.?cost|low.?fee|expense|\bter\b/.test(ql)
  const sortKey: 'pickAnn' | 'score' | 'ter' = wantsSkill ? 'pickAnn' : wantsCheap ? 'ter' : 'score'

  const catTop = catSet.size
    ? topBy(funds.filter((f) => catSet.has(String(f.cat))), sortKey, 20)
    : []
  const baseline = topBy(funds, 'score', 12)

  const seen = new Set<unknown>()
  const out: Record<string, unknown>[] = []
  for (const f of [...nameMatches, ...catTop, ...baseline]) {
    if (seen.has(f.code)) continue
    seen.add(f.code)
    out.push(f)
    if (out.length >= 60) break
  }
  return out
}

export async function POST(req: Request) {
  if (!aiConfigured()) {
    return textResponse("AlphaPicker's AI assistant isn't switched on yet — check back soon.")
  }

  let body: { messages?: ChatMessage[] }
  try {
    body = await req.json()
  } catch {
    return textResponse('Bad request', 400)
  }

  const raw = Array.isArray(body?.messages) ? body.messages : []
  const messages: ChatMessage[] = raw
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string',
    )
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
  if (!messages.length) {
    return textResponse('No message', 400)
  }

  let funds: Record<string, unknown>[] = []
  let stats: Record<string, unknown> = {}
  try {
    ;[funds, stats] = await Promise.all([fetchFundsServer(), fetchStatsServer()])
  } catch {
    // proceed with whatever we have
  }

  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content ?? ''
  const categoryNames = Array.from(new Set(funds.map((f) => String(f.cat ?? '')))).filter(Boolean)
  const relevant = selectRelevantFunds(lastUser, funds, categoryNames)

  const method = (stats?.methodology ?? {}) as Record<string, string>
  const fundLines = relevant.map(compactFund).join('\n')
  const context = `METHODOLOGY:
${method.score_formula ?? ''}
${method.universe ?? ''}
What we ignore: ${method.what_we_ignore ?? ''}
Validation: ${method.validation ?? ''}

FUND DATA (${relevant.length} of ${funds.length} funds, selected as most relevant to the question. "pick" = stock-selection alpha %/yr; "score" = AlphaPicker 0-100; "ter" = annual fee %; "vsBmk" = return vs benchmark %/yr). If a fund the user asks about is not listed here, say you don't have it to hand rather than guessing:
${fundLines}`

  const system = `You are AlphaPicker's assistant. AlphaPicker is an independent Indian mutual-fund analytics tool that scores funds on genuine stock-picking skill — separating skill from market, style and sector.

Ground EVERY answer in the DATA below. Never invent funds, scores, or numbers. If the data doesn't contain the answer, say so plainly.

HARD RULES (compliance — do not break):
- You provide NON-PERSONALISED, EDUCATIONAL information only. You are NOT an investment adviser.
- NEVER tell the user what to buy, sell, hold, or how to allocate. Describe and explain; do not recommend or prescribe.
- If asked "what should I invest in / buy", politely decline, explain that you provide analytics not advice, offer to show or explain the relevant scores/data, and suggest they consult a SEBI-registered investment adviser for personal advice.
- No performance promises or predictions of future returns.

STYLE (important — this is a chat, not an article):
- Answer in 2-4 short sentences. Be brief and direct; lead with the answer. If the user wants more, they will ask.
- Plain conversational text ONLY. Do NOT use markdown: no headings, no tables, no bullet or numbered lists, no bold, no asterisks. Just sentences.
- Use the skill-vs-luck framing in plain words where it helps.

DATA:
${context}`

  try {
    const stream = await streamAnthropic({
      model: MODEL_CHAT,
      system,
      messages,
      maxTokens: 350,
      temperature: 0.3,
    })
    return new Response(stream, {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
      },
    })
  } catch {
    return textResponse('Sorry — I had trouble answering just now. Please try again.')
  }
}
