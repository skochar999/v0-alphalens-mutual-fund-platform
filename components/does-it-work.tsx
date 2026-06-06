export function DoesItWork() {
  const dots = Array.from({ length: 10 }, (_, i) => i < 7)

  return (
    <section id="evidence" className="border-b border-border bg-background scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="max-w-3xl text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          7 out of 10 funds we pick beat their benchmark.
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A high AlphaPicker Score isn&apos;t a guess — it&apos;s a strong, measurable edge. Here&apos;s
          how our top-scored funds have actually performed.
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
