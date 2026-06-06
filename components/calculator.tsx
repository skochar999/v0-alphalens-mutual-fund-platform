'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { fmtRupees } from '@/lib/format'
import { trackEvent } from '@/lib/analytics'

type Mode = 'lump' | 'sip'

function lumpSum(principal: number, rate: number, years: number): number {
  return principal * Math.pow(1 + rate, years)
}

function sipFuture(monthly: number, rate: number, years: number): number {
  const r = rate / 12
  const n = years * 12
  if (r === 0) return monthly * n
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
}

const ALPHA_RATE = 0.18
const AVG_RATE = 0.13

export function Calculator() {
  const [mode, setMode] = useState<Mode>('lump')
  const [amount, setAmount] = useState(500000)
  const [sipAmount, setSipAmount] = useState(10000)
  const [years, setYears] = useState(15)

  const { alpha, avg } = useMemo(() => {
    if (mode === 'lump') {
      return {
        alpha: lumpSum(amount, ALPHA_RATE, years),
        avg: lumpSum(amount, AVG_RATE, years),
      }
    }
    return {
      alpha: sipFuture(sipAmount, ALPHA_RATE, years),
      avg: sipFuture(sipAmount, AVG_RATE, years),
    }
  }, [mode, amount, sipAmount, years])

  const diff = alpha - avg
  const current = mode === 'lump' ? amount : sipAmount
  const setCurrent = mode === 'lump' ? setAmount : setSipAmount

  // Debounced calculator-usage tracking (avoids spamming on slider drag)
  const calcTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const calcStarted = useRef(false)
  useEffect(() => {
    // Skip the initial mount so we only track real interactions
    if (!calcStarted.current) {
      calcStarted.current = true
      return
    }
    if (calcTimer.current) clearTimeout(calcTimer.current)
    calcTimer.current = setTimeout(() => {
      trackEvent('calculator_use', {
        mode: mode === 'lump' ? 'lumpsum' : 'sip',
        years,
      })
    }, 600)
    return () => {
      if (calcTimer.current) clearTimeout(calcTimer.current)
    }
  }, [mode, amount, sipAmount, years])

  return (
    <section id="calculator" className="border-b border-border bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="max-w-3xl text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          The right fund grows your money dramatically faster over time
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A few percentage points of extra annual return compounds into a life-changing gap.
          See it for yourself.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            {/* Mode toggle */}
            <div className="inline-flex rounded-lg border border-border bg-secondary p-1">
              <button
                onClick={() => setMode('lump')}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                  mode === 'lump'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Lump Sum
              </button>
              <button
                onClick={() => setMode('sip')}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                  mode === 'sip'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly SIP
              </button>
            </div>

            <div className="mt-6">
              <label
                htmlFor="amount"
                className="flex items-center justify-between text-sm font-medium text-foreground"
              >
                <span>{mode === 'lump' ? 'Investment amount' : 'Monthly SIP amount'}</span>
                <span className="font-semibold tabular-nums text-primary">
                  {fmtRupees(current)}
                </span>
              </label>
              <input
                id="amount"
                type="range"
                min={mode === 'lump' ? 50000 : 1000}
                max={mode === 'lump' ? 5000000 : 100000}
                step={mode === 'lump' ? 50000 : 1000}
                value={current}
                onChange={(e) => setCurrent(Number(e.target.value))}
                className="mt-3 h-1.5 w-full cursor-pointer accent-primary"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="years"
                className="flex items-center justify-between text-sm font-medium text-foreground"
              >
                <span>Time horizon</span>
                <span className="font-semibold tabular-nums text-primary">{years} years</span>
              </label>
              <input
                id="years"
                type="range"
                min={5}
                max={25}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="mt-3 h-1.5 w-full cursor-pointer accent-primary"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>5 yrs</span>
                <span>25 yrs</span>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-positive/30 bg-positive/8 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-positive">
                  AlphaPicker picks
                </div>
                <div className="mt-1 text-xs text-muted-foreground">18% annual return</div>
                <div className="mt-3 text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
                  {fmtRupees(alpha)}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Average fund
                </div>
                <div className="mt-1 text-xs text-muted-foreground">13% annual return</div>
                <div className="mt-3 text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
                  {fmtRupees(avg)}
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-positive/30 bg-positive/12 p-6">
              <div className="text-sm font-medium text-foreground">
                Choosing a top-scored fund could leave you with
              </div>
              <div className="mt-1 text-3xl font-bold tabular-nums text-positive sm:text-4xl">
                {fmtRupees(diff)} more
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                That&apos;s the difference skill makes over {years} years — money that stays in
                your pocket instead of being lost to mediocre management.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Illustrative projections based on assumed annual returns. Actual returns vary and are
          not guaranteed.
        </p>
      </div>
    </section>
  )
}
