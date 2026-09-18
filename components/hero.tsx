import type { Stats } from '@/lib/types'
import { Spinner } from '@/components/spinner'
import { QuantEngine } from '@/components/quant-engine'
import { IS_DISTRIBUTOR, arnTagline } from '@/lib/compliance-config'

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
          {IS_DISTRIBUTOR ? (
            /* AMFI item 2: the registration tagline must render at ≥12pt (16px).
               text-base is 16px — do not shrink this to text-sm. */
            <p className="mb-3 text-base font-medium text-primary">{arnTagline()}</p>
          ) : (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Indian fund analytics · data over hype
            </p>
          )}
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Skill or luck? Now you can tell.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Most fund returns are market, style, or sector — not the manager.
            AlphaPicker scores every Indian fund on genuine stock-picking skill,
            so you stop paying for last year&apos;s luck.{' '}
            {IS_DISTRIBUTOR ? (
              <>
                You can invest here too — and we show you exactly what we earn
                when you do.{' '}
                <a
                  href="/disclosures"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  See what we&apos;re paid
                </a>
                .{' '}
              </>
            ) : null}
            <span className="font-medium text-foreground">
              Per SPIVA (S&amp;P Indices Versus Active Funds), 73% of large cap
              funds lost to the index over 10 years.
            </span>
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#rankings"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              See fund scores — free
            </a>
            <a
              href="#how-it-works"
              className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              How the score works
            </a>
          </div>

          <div className="mt-8">
            {loading || !stats ? (
              <Spinner label="Loading summary stats…" />
            ) : (
              <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                <StatPill
                  value={stats.n_funds.toLocaleString('en-IN')}
                  label="Funds analyzed, every month"
                  accent="text-foreground"
                />
                {/* ⚠️ Was: 69% "Of our top picks beat their benchmark" — removed 2026-09-18.
                    Two problems: "our picks" is on the retired-words list (08 §5) and reads
                    as a recommendation, and the 69% figure appears nowhere in the served
                    methodology, so it could not be substantiated on request. Replaced with
                    the out-of-sample validation statistic that IS published in
                    stats.methodology.validation. Do not reintroduce an unsourced number. */}
                <StatPill
                  value="76%"
                  label="Of out-of-sample test windows ranked correctly"
                  accent="text-positive"
                />
                <StatPill
                  value="Daily"
                  label="Scores recomputed"
                  accent="text-primary"
                />
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <QuantEngine nFunds={stats?.n_funds ?? null} />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {stats?.n_funds
              ? `Our engine re-fits factor models across all ${stats.n_funds.toLocaleString('en-IN')} funds in real time.`
              : 'Our engine re-fits factor models across every fund in real time.'}
          </p>
        </div>
      </div>
    </section>
  )
}
