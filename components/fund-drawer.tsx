'use client'

import { useEffect } from 'react'
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import type { Fund } from '@/lib/types'
import { ScoreBadge } from '@/components/score-badge'
import { fmtPct, fmtRate, fmtTer, fmtNum } from '@/lib/format'

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold tabular-nums text-foreground">
        {value}
      </span>
    </div>
  )
}

const POSITIVE = '#059669'
const NEGATIVE = '#dc2626'

function DecompChart({ fund }: { fund: Fund }) {
  const data = [
    { name: 'Market', value: fund.dStyle ?? 0 },
    { name: 'Style + Sector', value: fund.dSector ?? 0 },
    { name: 'Stock Selection', value: fund.dPick ?? 0 },
    { name: 'Timing', value: fund.dTiming ?? 0 },
  ]
  const colorFor = (v: number) => (v >= 0 ? POSITIVE : NEGATIVE)

  // Symmetric domain with padding so bars and end labels always fit.
  const maxAbs = Math.max(1, ...data.map((d) => Math.abs(d.value)))
  const bound = maxAbs * 1.35

  return (
    <div style={{ height: 200 }} className="w-full">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 44, bottom: 4, left: 8 }}
        >
          <XAxis type="number" domain={[-bound, bound]} hide />
          <YAxis
            type="category"
            dataKey="name"
            width={104}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Bar dataKey="value" radius={4} barSize={22} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.name} fill={colorFor(d.value)} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`}
              style={{ fontSize: 11, fontWeight: 600, fill: '#1a1f36' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function FundDrawer({
  fund,
  onClose,
}: {
  fund: Fund | null
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (fund) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [fund, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 ${fund ? '' : 'pointer-events-none'}`}
      aria-hidden={!fund}
    >
      {/* overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-foreground/30 transition-opacity duration-300 ${
          fund ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Fund details"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-xl transition-transform duration-300 ease-out sm:max-w-lg ${
          fund ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {fund ? (
          <>
            <div className="flex items-start justify-between gap-3 border-b border-border p-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                    {fund.cat}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {fund.amc}
                  </span>
                </div>
                <h2 className="mt-2 text-pretty text-lg font-bold leading-snug text-foreground">
                  {fund.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                <ScoreBadge score={fund.score} size="lg" />
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    AlphaPicker Score
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {fund.skill ?? 'Composite skill & consistency rating'}
                  </div>
                </div>
              </div>

              <h3 className="mt-6 text-sm font-semibold text-foreground">
                Key metrics
              </h3>
              <div className="mt-2">
                <MetricRow
                  label="Total return / yr"
                  value={fmtPct(fund.ret)}
                />
                <MetricRow label="Vs benchmark / yr" value={fmtPct(fund.aret)} />
                <MetricRow label="Consistency (hit rate)" value={fmtRate(fund.hrate)} />
                <MetricRow label="Stock pick / yr" value={fmtPct(fund.pickAnn)} />
                <MetricRow label="Expense ratio (TER)" value={fmtTer(fund.ter)} />
                {fund.catRank && fund.catSize ? (
                  <MetricRow
                    label="Category rank"
                    value={`#${fund.catRank} of ${fund.catSize}`}
                  />
                ) : null}
                {fund.ir !== null && fund.ir !== undefined ? (
                  <MetricRow label="Information ratio" value={fmtNum(fund.ir, 2)} />
                ) : null}
              </div>

              <h3 className="mt-6 text-sm font-semibold text-foreground">
                Return decomposition
              </h3>
              {fund.decomp ? (
                <>
                  <p className="mt-1 text-xs text-muted-foreground">
                    How each driver contributed to annualised return.
                  </p>
                  <div className="mt-3">
                    <DecompChart fund={fund} />
                  </div>
                </>
              ) : (
                <p className="mt-2 rounded-lg border border-dashed border-border bg-background p-4 text-sm text-muted-foreground">
                  Decomposition is unavailable for this fund — its history is
                  too short or only NAV-level data is published.
                </p>
              )}
            </div>
          </>
        ) : null}
      </aside>
    </div>
  )
}
