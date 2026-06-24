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

  const method = (stats?.methodology ?? {}) as Record<string, string>
  const fundLines = funds.slice(0, 700).map(compactFund).join('\n')
  const context = `METHODOLOGY:
${method.score_formula ?? ''}
${method.universe ?? ''}
What we ignore: ${method.what_we_ignore ?? ''}
Validation: ${method.validation ?? ''}

FUND DATA (${funds.length} funds. "pick" = stock-selection alpha %/yr; "score" = AlphaPicker 0-100; "ter" = annual fee %; "vsBmk" = return vs benchmark %/yr):
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
