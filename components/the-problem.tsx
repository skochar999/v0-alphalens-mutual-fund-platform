const soldOn = [
  {
    icon: '★',
    claim: '"It’s a 5-star rated fund"',
    truth: 'ratings built on past returns',
  },
  {
    icon: '📈',
    claim: '"Look at last year’s performance"',
    truth: 'statistically indistinguishable from luck',
  },
  {
    icon: '🏛',
    claim: '"It’s a trusted house"',
    truth: 'brand familiarity, not evidence',
  },
]

const weDo = [
  'Read every fund’s full monthly portfolio disclosure — 600+ funds, 60,000+ positions, every month. Almost nobody else does.',
  'Run them through a multi-factor risk model — the same class of machinery quant hedge funds use — to strip out what the market gave, what style tilts gave, what sector bets gave.',
  'Apply the statistician’s test to what remains: is it skill, or is it noise?',
]

export function TheProblem() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-negative">
            The problem
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            How funds are sold today
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Walk into any distributor or wealth manager&apos;s office and ask
            why they recommend a fund. The answers are always the same:
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {soldOn.map((s) => (
              <div
                key={s.claim}
                className="rounded-xl border border-negative/20 bg-negative/5 px-4 py-3 text-sm"
              >
                <span className="font-medium text-foreground">
                  {s.icon} {s.claim}
                </span>{' '}
                <span className="text-muted-foreground">— {s.truth}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Qualitative judgement, dressed up as advice. The SPIVA numbers show
            where it leads:{' '}
            <span className="font-medium text-foreground">
              most recommended funds lose to a simple index fund.
            </span>
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-positive">
            What we do instead
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            The machinery, not the marketing
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every month, every fund must disclose every holding it owns. That
            disclosure is where the truth lives — and where we start.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {weDo.map((w, i) => (
              <div
                key={i}
                className="rounded-xl border border-positive/20 bg-positive/5 px-4 py-3 text-sm leading-relaxed text-foreground"
              >
                {w}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every signal in our score passed out-of-sample testing on Indian
            fund data.{' '}
            <span className="font-medium text-foreground">
              Famous published signals that failed our test were rejected.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
