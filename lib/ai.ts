// Server-only helpers for AlphaPicker's AI features (Ask + NL screener).
// Calls the Anthropic Messages API directly via fetch (no SDK dependency).

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

export function aiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY)
}

export const MODEL_CHAT = process.env.ANTHROPIC_MODEL_CHAT || 'claude-sonnet-4-6'
export const MODEL_FAST = process.env.ANTHROPIC_MODEL_FAST || 'claude-haiku-4-5-20251001'

const DATA_BASE =
  process.env.AI_DATA_BASE || 'https://alphalens-production-21b7.up.railway.app'

export async function callAnthropic(opts: {
  model: string
  system: string
  messages: ChatMessage[]
  maxTokens?: number
  temperature?: number
}): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) throw new Error('AI_NOT_CONFIGURED')

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: opts.model,
      max_tokens: opts.maxTokens ?? 1024,
      temperature: opts.temperature ?? 0.2,
      system: opts.system,
      messages: opts.messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Anthropic ${res.status}: ${text.slice(0, 300)}`)
  }

  const data = await res.json()
  const parts = Array.isArray(data?.content) ? data.content : []
  return parts
    .map((p: { text?: string }) => (typeof p?.text === 'string' ? p.text : ''))
    .join('')
    .trim()
}

export async function fetchFundsServer(): Promise<Record<string, unknown>[]> {
  const res = await fetch(`${DATA_BASE}/api/funds`, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error('funds fetch failed')
  const data = await res.json()
  return Array.isArray(data) ? data : (data.funds ?? [])
}

export async function fetchStatsServer(): Promise<Record<string, unknown>> {
  const res = await fetch(`${DATA_BASE}/api/stats`, { next: { revalidate: 3600 } })
  if (!res.ok) return {}
  return res.json()
}
