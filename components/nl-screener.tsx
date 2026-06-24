'use client'

import { useState } from 'react'

export type AiFilters = {
  cat?: string
  minScore?: number
  maxTer?: number
  minPickAnn?: number
  sortKey?: string
  sortDir?: 'asc' | 'desc'
}

export function NlScreener({
  categories,
  onApply,
}: {
  categories: string[]
  onApply: (filters: AiFilters, explanation: string) => void
}) {
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function run() {
    const query = q.trim()
    if (!query || loading) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/ai/screen', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query, categories }),
      })
      const data = await res.json()
      if (data?.error) {
        setError(data.error)
        return
      }
      onApply((data.filters ?? {}) as AiFilters, data.explanation ?? '')
    } catch {
      setError('Something went wrong — try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-3 sm:p-4">
      <label
        htmlFor="nl-screen"
        className="text-xs font-semibold uppercase tracking-wide text-primary"
      >
        Screen in plain English
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id="nl-screen"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') run()
          }}
          placeholder="e.g. small-cap funds with high stock-picking skill and low fees"
          className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2"
        />
        <button
          onClick={run}
          disabled={loading || !q.trim()}
          className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Screening…' : 'Screen'}
        </button>
      </div>
      {error ? <p className="mt-2 text-xs text-negative">{error}</p> : null}
    </div>
  )
}
