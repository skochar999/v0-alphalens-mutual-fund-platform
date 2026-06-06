import { TrendingUp, Layers, Target, Clock } from 'lucide-react'

const ingredients = [
  {
    icon: TrendingUp,
    title: 'Market Beta',
    tag: 'Not skill',
    body: 'The tide that lifts all boats. When the market rises, almost every fund rises with it — this is the biggest chunk of most returns and has nothing to do with the manager.',
  },
  {
    icon: Layers,
    title: 'Style & Sector tilts',
    tag: 'Not skill',
    body: 'Factor bets, not skill. Leaning into small-caps, value, or a hot sector can boost returns for a while — but it is a style choice you could replicate with a cheap index.',
  },
  {
    icon: Target,
    title: 'Stock Selection',
    tag: 'Genuine alpha',
    body: 'The real thing. Returns earned by picking the right stocks within a style — this is the genuine manager alpha that AlphaLens hunts for and rewards.',
    highlight: true,
  },
  {
    icon: Clock,
    title: 'Timing',
    tag: 'Rare skill',
    body: 'Getting in and out right. Adding value by shifting exposure at the right moments. Real but rare — and we measure whether a manager actually has it.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-card scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="max-w-3xl text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Every fund return has four ingredients. Only one of them is skill.
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          We decompose every fund&apos;s track record into these four parts, so you can see
          whether you&apos;re paying for talent or just paying for the market.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ingredients.map((ing) => {
            const Icon = ing.icon
            return (
              <div
                key={ing.title}
                className={`rounded-xl border p-5 ${
                  ing.highlight
                    ? 'border-positive/40 bg-positive/8'
                    : 'border-border bg-background'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex size-9 items-center justify-center rounded-md ${
                      ing.highlight ? 'bg-positive/15 text-positive' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      ing.highlight
                        ? 'bg-positive/15 text-positive'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {ing.tag}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{ing.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{ing.body}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/8 px-6 py-5 text-center">
          <p className="text-base font-semibold text-foreground sm:text-lg">
            We monitor all 347 funds daily so you don&apos;t have to.
          </p>
        </div>
      </div>
    </section>
  )
}
