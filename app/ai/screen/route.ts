import { NextResponse } from 'next/server'
import { aiConfigured, callAnthropic, MODEL_FAST } from '@/lib/ai'

export const runtime = 'nodejs'
export const maxDuration = 30

const SORT_KEYS = ['score', 'aret', 'hrate', 'pickAnn', 'ter', 'ret', 'name', 'amc']

export async function POST(req: Request) {
  if (!aiConfigured()) {
    return NextResponse.json({ error: 'AI is not enabled yet.' })
  }

  let body: { query?: string; categories?: string[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  const query = (body?.query ?? '').toString().slice(0, 500)
  const categories = Array.isArray(body?.categories)
    ? body.categories.filter((c) => typeof c === 'string').slice(0, 60)
    : []
  if (!query.trim()) {
    return NextResponse.json({ error: 'Empty query' }, { status: 400 })
  }

  const system = `You translate a plain-English mutual-fund screening request into a JSON filter for AlphaPicker's rankings table.
Include ONLY the fields the request implies; omit the rest.
Fields:
- "cat": exact category — must be one of: ${categories.join(' | ') || '(none)'}
- "minScore": number 0-100 (AlphaPicker overall score floor)
- "maxTer": number — maximum expense ratio in percent (e.g. 1.0)
- "minPickAnn": number — minimum stock-pick alpha in percent/year (a skill measure)
- "sortKey": one of ${SORT_KEYS.join(', ')}
- "sortDir": "asc" or "desc"
Mappings: "skill"/"stock picking" -> minPickAnn and/or sortKey "pickAnn"; "cheap"/"low cost"/"low fee" -> maxTer; "best"/"top"/"highest scoring" -> sortKey "score", sortDir "desc".
Return ONLY a JSON object (no prose) of shape:
{"filters": { ... }, "explanation": "<one short sentence describing the screen>"}
Be conservative — never invent filters that were not asked for.`

  let text = ''
  try {
    text = await callAnthropic({
      model: MODEL_FAST,
      system,
      messages: [{ role: 'user', content: query }],
      maxTokens: 300,
      temperature: 0,
    })
  } catch {
    return NextResponse.json({ error: 'AI request failed — try again.' })
  }

  const match = text.match(/\{[\s\S]*\}/)
  let parsed: { filters?: Record<string, unknown>; explanation?: string } | null = null
  if (match) {
    try {
      parsed = JSON.parse(match[0])
    } catch {
      parsed = null
    }
  }
  if (!parsed || typeof parsed !== 'object') {
    return NextResponse.json({ error: "Couldn't read that — try rephrasing." })
  }

  const f = (parsed.filters ?? {}) as Record<string, unknown>
  const filters: Record<string, unknown> = {}
  if (typeof f.cat === 'string' && categories.includes(f.cat)) filters.cat = f.cat
  if (typeof f.minScore === 'number')
    filters.minScore = Math.max(0, Math.min(100, Math.round(f.minScore)))
  if (typeof f.maxTer === 'number') filters.maxTer = f.maxTer
  if (typeof f.minPickAnn === 'number') filters.minPickAnn = f.minPickAnn
  if (typeof f.sortKey === 'string' && SORT_KEYS.includes(f.sortKey)) filters.sortKey = f.sortKey
  if (f.sortDir === 'asc' || f.sortDir === 'desc') filters.sortDir = f.sortDir

  const explanation =
    typeof parsed.explanation === 'string' ? parsed.explanation.slice(0, 200) : ''

  return NextResponse.json({ filters, explanation })
}
