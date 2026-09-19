import type { Stats } from '@/lib/types'
import { Spinner } from '@/components/spinner'
import { QuantEngine } from '@/components/quant-engine'
import { IS_DISTRIBUTOR, arnTagline } from '@/lib/compliance-config'
import { CREDIBILITY, HEADLINE, SUBHEAD } from '@/lib/brand'

/**
 * Stat readout. Hairline-separated columns, not cards — a research terminal
 * presents figures in a register.
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
    <div className="flex flex-col border-l border-border pl-4 first:border-l-0 first:pl-0">
      <span className={`num text-2xl font-semibold sm:text-[1.75rem] ${accent}`}>
        {value}
      </span>
      <span className="label-micro mt-1.5 leading-snug">{label}</span>
    </div>
  )
}

/**
 * The hero carries five things and nothing else: what this answers, one plain
 * sentence, why we are credible, the numbers, the way in.
 *
 * ⚠️ Resist adding to it. The previous version carried a four-line subhead, a
 * SPIVA statistic and a commission explainer, and the SPIVA line — the single
 * most persuasive fact on the page — was the fifth thing a visitor read. It now
 * opens `TheProblem`, where it is the only claim on screen.
 */
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
               text-base is 16px — never text-sm, never label-micro (11px). */
            <p className="mb-4 text-base font-medium text-primary">{arnTagline()}</p>
          ) : (
            <p className="label-micro mb-4 text-primary">Indian mutual funds</p>
          )}

          <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-[4.25rem]">
            {HEADLINE}
            <span className="mt-1 block text-muted-foreground">Now you can tell.</span>
          </h1>

          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-foreground">
            {SUBHEAD}
          </p>

          <p className="mt-5 max-w-lg border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted-foreground">
            {CREDIBILITY}
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href="#rankings"
              className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              See every fund — free
            </a>
            <a
              href="#how-it-works"
              className="rounded-sm border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
            >
              How it works
            </a>
          </div>

          <div className="mt-10">
            {loading || !stats ? (
              <Spinner label="Loading…" />
            ) : (
              <>
                <div className="rule-fade mb-6" />
                <div className="grid max-w-lg grid-cols-3 gap-4">
                  <Stat
                    value={stats.n_funds.toLocaleString('en-IN')}
                    label="Funds scored"
                  />
                  {/* ⚠️ Was: 69% "Of our top picks beat their benchmark" — removed 2026-09-18.
                      "our picks" is on the retired-words list (08 §5) and reads as a
                      recommendation, and the 69% appears nowhere in the served methodology,
                      so it could not be substantiated on request. This figure IS published,
                      in stats.methodology.validation. Do not reintroduce an unsourced number. */}
                  <Stat value="76%" label="Ranked right, out of sample" accent="text-positive" />
                  <Stat value="Daily" label="Rescored" />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="relative">
          <QuantEngine nFunds={stats?.n_funds ?? null} />
        </div>
      </div>
    </section>
  )
}
