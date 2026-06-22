import Link from 'next/link'
import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { getGuides } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Guides — AlphaPicker',
  description:
    'Plain-language guides to mutual fund metrics, costs, risk and how returns really work — each explained with a worked example.',
}

export default function GuidesIndex() {
  const guides = getGuides()
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="article-eyebrow">Guides</p>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Mutual fund concepts, explained simply
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          No jargon, no hype — just clear explanations with worked examples, so you can
          read any fund like a quant. Every concept ties back to the one question that
          matters: is it skill, or luck?
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40"
            >
              {g.type === 'guide-hub' ? (
                <span className="mb-2 inline-flex w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary">
                  Start here
                </span>
              ) : null}
              <h2 className="text-base font-bold text-foreground group-hover:text-primary">
                {g.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {g.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
