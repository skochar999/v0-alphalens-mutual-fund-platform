import { IS_DISTRIBUTOR } from '@/lib/compliance-config'

/**
 * The evidence block: "7 of 10 top-scored funds beat their benchmark", 69% vs 27%.
 *
 * ⚠️ HIDDEN ONCE WE ARE A DISTRIBUTOR, deliberately — decision 2026-09-18.
 *
 * The 69%/27% figures are hardcoded and appear nowhere in the served
 * methodology (stats.methodology), so they could not be substantiated on
 * request. On a free analytics site that is a weak marketing claim; on an
 * AMFI-registered distributor's homepage it is an unsubstantiated performance
 * claim (AMFI items 3 and 4). The scoring model is being rebuilt from scratch
 * once MFAPI data lands, so these numbers are due to be restated anyway —
 * auditing them now would be work thrown away.
 *
 * TO BRING THIS BACK: replace the hardcoded numbers with validated v3 output,
 * publish the definition in stats.methodology so the claim is citable, then
 * delete this guard. Do not re-enable it with unsourced numbers.
 */
export function DoesItWork() {
  if (IS_DISTRIBUTOR) return null

  const dots = Array.from({ length: 10 }, (_, i) => i < 7)

  return (
    <section id="evidence" className="border-b border-border bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="max-w-3xl text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          7 out of 10 top-scored funds beat their benchmark.
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A high AlphaPicker Score isn&apos;t a guess — it&apos;s a measurable edge. Here&apos;s how
          the highest-scored funds have actually performed.
        </p>

        {/* Dot grid */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {dots.map((on, i) => (
            <span
              key={i}
              className={`size-9 rounded-full sm:size-12 ${
                on ? 'bg-positive' : 'bg-muted'
              }`}
              aria-hidden="true"
            />
          ))}
          <span className="sr-only">7 of 10 top-scored funds beat their benchmark</span>
        </div>

        {/* Stat boxes */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-positive/30 bg-positive/8 p-6">
            <div className="text-4xl font-bold tabular-nums text-positive sm:text-5xl">69%</div>
            <p className="mt-2 text-sm font-medium text-foreground">
              of top-scored funds beat their benchmark
            </p>
          </div>
          <div className="rounded-xl border border-negative/30 bg-negative/8 p-6">
            <div className="text-4xl font-bold tabular-nums text-negative sm:text-5xl">27%</div>
            <p className="mt-2 text-sm font-medium text-foreground">
              of low-scored funds beat their benchmark
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
