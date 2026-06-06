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
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            India&apos;s most data-driven fund rankings
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            See what&apos;s really driving your mutual fund returns
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
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
              <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
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

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <img
              src="/images/decomposition-visual.png"
              alt="Illustration of a mutual fund return being decomposed into market, style, stock selection and timing components"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
