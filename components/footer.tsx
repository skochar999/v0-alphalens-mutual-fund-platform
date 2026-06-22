export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold">
            <span className="text-foreground">Alpha</span>
            <span className="text-primary">Picker</span>
          </span>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            AlphaPicker is an independent research and analytics tool. It provides
            non-personalised, educational information and does not constitute investment
            advice or a recommendation to buy, sell, or hold any security. We are not a
            distributor and earn no commissions. Mutual fund investments are subject to
            market risks; past performance is not indicative of future results. Please
            consult a SEBI-registered investment adviser for advice specific to your situation.
          </p>
        </div>
      </div>
    </footer>
  )
}
