function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-positive"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-foreground">
      <Check />
      <span>{children}</span>
    </li>
  )
}

/**
 * Pricing / Premium section. Free = analytics for everyone; Premium (₹2,000/yr)
 * = personalisation (Portfolio X-ray, alerts, screener, exports). CTAs reuse the
 * existing email-capture (#newsletter) for early access — no execution, no MFD.
 */
export function Pricing() {
  return (
    <section id="premium" className="scroll-mt-16 border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            Pricing
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Free tells you about any fund. Premium works for your portfolio.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Every score, ranking and fund breakdown is free. Premium adds the personal
            layer — X-ray the funds you actually own. We&apos;re an analytics tool, not a
            distributor: no commissions, ever.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          {/* Free */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
            <h3 className="text-lg font-bold text-foreground">Free</h3>
            <p className="mt-1 text-sm text-muted-foreground">See the truth about any fund.</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tabular-nums text-foreground">₹0</span>
              <span className="text-sm text-muted-foreground">/ forever</span>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              <Feature>Every fund&apos;s AlphaPicker score &amp; full rankings</Feature>
              <Feature>Per-fund skill-vs-luck breakdown &amp; factor attribution</Feature>
              <Feature>Search, sort &amp; category filters</Feature>
              <Feature>Methodology, guides &amp; reports</Feature>
              <Feature>Basic 2-fund overlap &amp; comparison tools</Feature>
            </ul>
            <a
              href="#rankings"
              className="mt-7 w-full rounded-xl border border-border bg-background px-4 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Browse fund scores
            </a>
          </div>

          {/* Premium */}
          <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-card p-7 shadow-md">
            <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
              Coming soon
            </span>
            <h3 className="text-lg font-bold text-foreground">Premium</h3>
            <p className="mt-1 text-sm text-muted-foreground">Make it work for your portfolio.</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tabular-nums text-foreground">₹2,000</span>
              <span className="text-sm text-muted-foreground">/ year</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Everything in Free, plus:</p>
            <ul className="mt-5 flex flex-1 flex-col gap-3">
              <Feature>
                <span className="font-semibold">Portfolio X-ray</span> — blended skill score,
                holdings overlap, cost drag &amp; factor exposure of funds you own
              </Feature>
              <Feature>Watchlist &amp; score-change alerts</Feature>
              <Feature>Advanced multi-factor screener &amp; saved screens</Feature>
              <Feature>Compare up to 6 funds side by side</Feature>
              <Feature>Full score history &amp; CSV / PDF export</Feature>
            </ul>
            <a
              href="#newsletter"
              className="mt-7 w-full rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get early access
            </a>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-muted-foreground">
          AlphaPicker provides non-personalised, educational analytics — not investment
          advice. We are not a distributor and earn no commissions.
        </p>
      </div>
    </section>
  )
}
