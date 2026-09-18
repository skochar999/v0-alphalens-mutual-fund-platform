import type { Stats } from '@/lib/types'
import { Spinner } from '@/components/spinner'
import { QuantEngine } from '@/components/quant-engine'
import { IS_DISTRIBUTOR, arnTagline } from '@/lib/compliance-config'
import { HEADLINE, SUBHEAD, TAGLINE } from '@/lib/brand'

/**
 * Stat readout. Hairline-separated columns rather than cards — a research
 * terminal presents figures in a register, not in floating tiles.
 */
function Stat({
  value,
  label,
  accent = 'text-foreground',
}: {
  value: string
  label: string
  accent?: string
}) {
  return (
    <div className="flex flex-col border-l border-border pl-4 first:border-l-0 first:pl-0 sm:border-l sm:pl-4 sm:first:border-l-0 sm:first:pl-0">
      <span className={`num text-2xl font-semibold sm:text-[1.75rem] ${accent}`}>
        {value}
      </span>
      <span className="label-micro mt-1.5 leading-snug">{label}</span>
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
    <section className="grid-backdrop relative border-b border-border">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          {IS_DISTRIBUTOR ? (
            /* AMFI item 2: the registration tagline must render at ≥12pt (16px).
               text-base is 16px — do not shrink this to text-sm or label-micro,
               both of which fall below the floor. */
            <p className="mb-4 text-base font-medium text-primary">{arnTagline()}</p>
          ) : (
            <p className="label-micro mb-4 text-primary">
              Indian fund analytics
            </p>
          )}

          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            {HEADLINE}
            <span className="mt-2 block text-muted-foreground">
              Now you can tell.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {SUBHEAD}
          </p>

          {IS_DISTRIBUTOR ? (
            <p className="mt-4 max-w-xl border-l-2 border-primary/50 pl-3 text-sm leading-relaxed text-muted-foreground">
              You can invest here too — and we publish exactly what we earn when
              you do, on every fund, including the ones that pay us nothing.{' '}
              <a
                href="/disclosures"
                className="font-medium text-primary underline underline-offset-4"
              >
                See what we’re paid
              </a>
              .
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href="#rankings"
              className="rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              See fund scores — free
            </a>
            <a
              href="#how-it-works"
              className="rounded-sm border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
            >
              How the score works
            </a>
          </div>

          <div className="mt-10">
            {loading || !stats ? (
              <Spinner label="Loading summary stats…" />
            ) : (
              <>
                <div className="rule-fade mb-6" />
                <div className="grid max-w-xl grid-cols-3 gap-4">
                  <Stat
                    value={stats.n_funds.toLocaleString('en-IN')}
                    label="Funds analysed, monthly"
                  />
                  {/* ⚠️ Was: 69% "Of our top picks beat their benchmark" — removed 2026-09-18.
                      Two problems: "our picks" is on the retired-words list (08 §5) and reads
                      as a recommendation, and the 69% figure appears nowhere in the served
                      methodology, so it could not be substantiated on request. Replaced with
                      the out-of-sample validation statistic that IS published in
                      stats.methodology.validation. Do not reintroduce an unsourced number. */}
                  <Stat
                    value="76%"
                    label="Out-of-sample windows ranked correctly"
                    accent="text-positive"
                  />
                  <Stat value="Daily" label="Scores recomputed" />
                </div>
              </>
            )}
          </div>

          <p className="mt-8 max-w-xl text-xs leading-relaxed text-muted-foreground">
            Per SPIVA (S&amp;P Indices Versus Active Funds), 73% of Indian large
            cap funds lost to their benchmark over ten years.
          </p>
        </div>

        <div className="relative">
          <QuantEngine nFunds={stats?.n_funds ?? null} />
          <p className="label-micro mt-4 text-center">
            {stats?.n_funds
              ? `Factor models re-fit across ${stats.n_funds.toLocaleString('en-IN')} funds`
              : 'Factor models re-fit across every fund'}
          </p>
          <p className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
            {TAGLINE}
          </p>
        </div>
      </div>
    </section>
  )
}
