export function HowItWorks() {
  const steps = [
    {
      title: 'Strip out the market',
      body: 'Most of a fund\u2019s return is just the market rising. We remove market beta to isolate what the manager actually added.',
    },
    {
      title: 'Separate skill from style',
      body: 'Returns are split into style/sector tilts, stock selection and timing — revealing whether picks or just factor bets drove performance.',
    },
    {
      title: 'Score on what repeats',
      body: 'The AlphaLens Score rewards consistency and genuine stock-picking skill, not one lucky year. Higher is more reliable.',
    },
  ]
  return (
    <section
      id="how-it-works"
      className="border-b border-border bg-card"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          How it works
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Three steps turn raw NAV history into an honest read on manager skill.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-xl border border-border bg-background p-5"
            >
              <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
                {i + 1}
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
