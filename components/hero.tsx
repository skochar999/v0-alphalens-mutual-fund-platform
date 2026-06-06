import type { Stats } from '@/lib/types'
import { Spinner } from '@/components/spinner'

function StatPill({
  value,
  label,
  accent,
}: {
  value: string
  label: string
  accent: string
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card px-5 py-4 shadow-sm">
      <span className={`text-2xl font-bold tabular-nums sm:text-3xl ${accent}`}>
        {value}
      </span>
      <span className="mt-1 text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

export function Hero({
  stats,
  loading,
}: {
  stats: Stats | null
  loading: boolean
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
          India&apos;s most data-driven fund rankings
        </p>
        <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          See what&apos;s really driving your mutual fund returns
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          We decompose every fund&apos;s track record into market beta, style,
          stock selection and timing — so you can tell genuine skill apart from
          a rising tide.{' '}
          <span className="font-medium text-foreground">
            Per SPIVA, 73% of large cap funds lost to the index over 5 years.
          </span>
        </p>

        <div className="mt-8">
          {loading || !stats ? (
            <Spinner label="Loading summary stats…" />
          ) : (
            <div className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              <StatPill
                value={stats.n_funds.toLocaleString('en-IN')}
                label="Funds covered"
                accent="text-foreground"
              />
              <StatPill
                value={`${stats.pct_pos_alpha}%`}
                label="With positive alpha"
                accent="text-positive"
              />
              <StatPill
                value={`${stats.avg_total_ann.toFixed(1)}%`}
                label="Avg annual return"
                accent="text-primary"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
