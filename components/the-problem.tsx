/**
 * The argument, in as few words as it can be made.
 *
 * ⚠️ This section replaced a version roughly 4× longer. The claims are the
 * same; the sentences are not. If you add a clause here, take one out.
 *
 * Every line below is descriptive, never prescriptive (01 §6) — it says what
 * the evidence shows, never what the reader should do about it.
 */

/** How funds get sold. Claim on the left, what it actually rests on. */
const SOLD = [
  { claim: '“It’s 5-star rated”', truth: 'Past returns, relabelled' },
  { claim: '“Look at last year”', truth: 'Indistinguishable from luck' },
  { claim: '“It’s a trusted house”', truth: 'Brand, not evidence' },
]

/** What we do instead. One line each — no sentence runs past a phone width. */
const INSTEAD = [
  { step: 'Read', text: 'Every holding, every fund, every month. 60,000+ positions.' },
  { step: 'Strip', text: 'Remove what the market, the style and the sector gave.' },
  { step: 'Test', text: 'What’s left is the manager. Is it skill, or noise?' },
]

export function TheProblem() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        {/* The single most persuasive fact on the site, given the room it
            deserves. Sourced, and attributed on the line beneath. */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="num text-6xl font-semibold leading-none text-negative sm:text-8xl">
            73%
          </p>
          <p className="mt-4 text-balance text-xl font-medium text-foreground sm:text-2xl">
            of Indian large cap funds lost to their index over ten years.
          </p>
          <p className="label-micro mt-3">
            Source: SPIVA — S&amp;P Indices Versus Active Funds
          </p>
        </div>

        <div className="rule-fade my-14" />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label-micro text-negative">How funds are sold</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Three reasons, none of them evidence
            </h2>
            <div className="mt-6 flex flex-col">
              {SOLD.map((s) => (
                <div
                  key={s.claim}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-3.5 last:border-0"
                >
                  <span className="text-sm text-muted-foreground">{s.claim}</span>
                  <span className="text-right text-sm font-medium text-foreground">
                    {s.truth}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="label-micro text-positive">How we judge them</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              The way institutions do it
            </h2>
            <div className="mt-6 flex flex-col">
              {INSTEAD.map((s, i) => (
                <div
                  key={s.step}
                  className="flex items-baseline gap-4 border-b border-border py-3.5 last:border-0"
                >
                  <span className="num w-5 shrink-0 text-sm text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="w-16 shrink-0 text-sm font-semibold text-foreground">
                    {s.step}
                  </span>
                  <span className="text-sm text-muted-foreground">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
