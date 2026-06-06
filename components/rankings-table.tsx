'use client'

import { useMemo, useState } from 'react'
import type { Amc, Category, Fund } from '@/lib/types'
import { ScoreBadge } from '@/components/score-badge'
import { Spinner } from '@/components/spinner'
import { fmtPct, fmtRate, fmtTer } from '@/lib/format'

type SortKey = 'score' | 'aret' | 'hrate' | 'pickAnn' | 'ter' | 'ret' | 'name'

const columns: {
  key: SortKey
  label: string
  numeric: boolean
  hideMobile?: boolean
}[] = [
  { key: 'name', label: 'Fund Name', numeric: false },
  { key: 'score', label: 'Score', numeric: true },
  { key: 'aret', label: 'Vs Bmk/yr', numeric: true, hideMobile: true },
  { key: 'hrate', label: 'Consistency', numeric: true, hideMobile: true },
  { key: 'pickAnn', label: 'Stock Pick/yr', numeric: true, hideMobile: true },
  { key: 'ter', label: 'Fee', numeric: true, hideMobile: true },
  { key: 'ret', label: 'Total Return', numeric: true },
]

function nullLast(v: number | null): number {
  return v === null || v === undefined || Number.isNaN(v)
    ? -Infinity
    : v
}

export function RankingsTable({
  funds,
  categories,
  amcs,
  loading,
  onSelect,
}: {
  funds: Fund[]
  categories: Category[]
  amcs: Amc[]
  loading: boolean
  onSelect: (fund: Fund) => void
}) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')
  const [amc, setAmc] = useState('all')
  const [minScore, setMinScore] = useState(0)
  const [sortKey, setSortKey] = useState<SortKey>('score')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'name' || key === 'ter' ? 'asc' : 'desc')
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const rows = funds.filter((f) => {
      if (cat !== 'all' && f.cat !== cat) return false
      if (amc !== 'all' && f.amc !== amc) return false
      if (f.score < minScore) return false
      if (q && !`${f.name} ${f.amc}`.toLowerCase().includes(q)) return false
      return true
    })
    rows.sort((a, b) => {
      let cmp: number
      if (sortKey === 'name') {
        cmp = a.name.localeCompare(b.name)
      } else {
        cmp = nullLast(a[sortKey] as number | null) - nullLast(b[sortKey] as number | null)
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return rows
  }, [funds, search, cat, amc, minScore, sortKey, sortDir])

  return (
    <section id="rankings" className="scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Fund Rankings
          </h2>
          <p className="text-muted-foreground">
            {loading
              ? 'Loading funds…'
              : `${filtered.length} of ${funds.length} funds — click any row for the full breakdown.`}
          </p>
        </div>

        {/* Filters */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <label className="sr-only" htmlFor="search">
              Search funds
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by fund or AMC…"
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2"
            />
          </div>
          <select
            aria-label="Filter by category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none ring-primary/30 focus:ring-2"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.cat} value={c.cat}>
                {c.cat} ({c.count})
              </option>
            ))}
          </select>
          <select
            aria-label="Filter by AMC"
            value={amc}
            onChange={(e) => setAmc(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none ring-primary/30 focus:ring-2"
          >
            <option value="all">All AMCs</option>
            {amcs.map((a) => (
              <option key={a.amc} value={a.amc}>
                {a.amc} ({a.count})
              </option>
            ))}
          </select>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2">
            <label
              htmlFor="minScore"
              className="whitespace-nowrap text-xs font-medium text-muted-foreground"
            >
              Min score
            </label>
            <input
              id="minScore"
              type="range"
              min={0}
              max={100}
              step={5}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer accent-primary"
            />
            <span className="w-7 text-right text-sm font-semibold tabular-nums text-foreground">
              {minScore}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {loading ? (
            <Spinner label="Fetching fund rankings…" />
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No funds match your filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50 text-left">
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        scope="col"
                        className={`px-3 py-3 font-semibold text-muted-foreground ${
                          col.numeric ? 'text-right' : 'text-left'
                        } ${col.hideMobile ? 'hidden md:table-cell' : ''}`}
                      >
                        <button
                          onClick={() => toggleSort(col.key)}
                          className={`inline-flex items-center gap-1 transition-colors hover:text-foreground ${
                            sortKey === col.key ? 'text-foreground' : ''
                          } ${col.numeric ? 'flex-row-reverse' : ''}`}
                        >
                          {col.label}
                          <span className="text-[10px]">
                            {sortKey === col.key
                              ? sortDir === 'desc'
                                ? '▼'
                                : '▲'
                              : ''}
                          </span>
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((f) => (
                    <tr
                      key={f.code}
                      onClick={() => onSelect(f)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') onSelect(f)
                      }}
                      className="cursor-pointer border-b border-border last:border-0 transition-colors hover:bg-accent/50 focus:bg-accent/50 focus:outline-none"
                    >
                      <td className="px-3 py-3">
                        <div className="font-medium leading-snug text-foreground">
                          {f.name}
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {f.amc} · {f.cat}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <ScoreBadge score={f.score} />
                      </td>
                      <td
                        className={`hidden px-3 py-3 text-right tabular-nums md:table-cell ${
                          (f.aret ?? 0) >= 0 ? 'text-positive' : 'text-negative'
                        }`}
                      >
                        {fmtPct(f.aret)}
                      </td>
                      <td className="hidden px-3 py-3 text-right tabular-nums text-foreground md:table-cell">
                        {fmtRate(f.hrate)}
                      </td>
                      <td
                        className={`hidden px-3 py-3 text-right tabular-nums md:table-cell ${
                          (f.pickAnn ?? 0) >= 0
                            ? 'text-positive'
                            : 'text-negative'
                        }`}
                      >
                        {fmtPct(f.pickAnn)}
                      </td>
                      <td className="hidden px-3 py-3 text-right tabular-nums text-muted-foreground md:table-cell">
                        {fmtTer(f.ter)}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold tabular-nums text-foreground">
                        {fmtPct(f.ret)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
