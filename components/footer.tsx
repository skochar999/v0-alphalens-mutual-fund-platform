export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold text-primary">AlphaPicker</span>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Mutual Fund investments are subject to market risks. Past
            performance is not indicative of future results. AlphaPicker is a
            research tool and does not constitute investment advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
