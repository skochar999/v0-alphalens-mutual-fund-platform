const pillars = [
  {
    weight: '45%',
    name: 'Skill',
    question: 'Is the outperformance real, or lucky?',
    body: 'We measure the statistical consistency of pure stock-picking — after stripping out market, style and sector effects with our multi-factor risk model — plus how much of the fund’s behaviour can’t be explained by factors at all. Consistent skill persists; raw returns don’t.',
  },
  {
    weight: '45%',
    name: 'Conviction',
    question: 'Does the manager act like they believe it?',
    body: 'Patient (low churn, measured from actual month-to-month holdings), concentrated in researched ideas, with real weight behind the top-10 positions. Research shows patient, high-conviction managers outperform; closet indexers can’t.',
  },
  {
    weight: '10%',
    name: 'Cost',
    question: 'What do you pay for it?',
    body: 'The most robust single predictor in 50 years of fund research: every rupee of fees is a rupee off your return. Low-cost funds start every year ahead.',
  },
]

export function ScorePillars() {
  return (
    <section id="score" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            The AlphaPicker Score
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Three things predict future outperformance. We score all three.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Each pillar is grounded in published academic research and
            validated walk-forward on Indian fund data before it earns a place
            in the score.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="text-3xl font-bold tabular-nums text-primary">
                {p.weight}
              </div>
              <div className="mt-1 text-lg font-semibold text-foreground">
                {p.name}
              </div>
              <div className="mt-1 text-sm font-medium text-muted-foreground">
                {p.question}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-negative/30 bg-negative/5 px-5 py-4 text-center text-sm text-muted-foreground">
          What we deliberately{' '}
          <span className="font-semibold text-negative">don&apos;t</span>{' '}
          score: past returns · star ratings · brand · fund size. The research
          is unambiguous — they predict nothing.
        </div>
      </div>
    </section>
  )
}
