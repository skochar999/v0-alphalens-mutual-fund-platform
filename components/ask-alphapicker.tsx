'use client'

import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'Is this fund skill or luck?',
  'Which flexi-cap funds score highest on skill?',
  'What does the AlphaPicker score mean?',
]

function replaceLastAssistant(msgs: Msg[], content: string): Msg[] {
  const copy = msgs.slice()
  for (let i = copy.length - 1; i >= 0; i--) {
    if (copy[i].role === 'assistant') {
      copy[i] = { ...copy[i], content }
      break
    }
  }
  return copy
}

export function AskAlphaPicker() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, loading])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return
    const next: Msg[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/ai/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      if (!res.body) {
        const fallback = await res.text().catch(() => '')
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: fallback || 'Sorry, something went wrong.' },
        ])
        return
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      let started = false
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        if (!started) {
          started = true
          setMessages((m) => [...m, { role: 'assistant', content: acc }])
        } else {
          setMessages((m) => replaceLastAssistant(m, acc))
        }
      }
      if (!started) {
        setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, something went wrong.' }])
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Sorry — I had trouble answering. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask AlphaPicker"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {open ? (
        <div className="fixed bottom-24 right-5 z-50 flex h-[32rem] max-h-[70vh] w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-bold text-foreground">
              Ask <span className="text-primary">AlphaPicker</span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              Educational analytics, not investment advice.
            </p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.length === 0 ? (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Ask about any fund&apos;s score, what&apos;s driving its returns, or how two funds compare.</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground hover:bg-secondary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role === 'user' ? (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-secondary px-3 py-2 text-sm text-muted-foreground">
                  Thinking…
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send()
                }}
                placeholder="Ask about a fund…"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
