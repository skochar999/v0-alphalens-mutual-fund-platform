import Link from 'next/link'
import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { getReports } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Reports — AlphaPicker',
  description:
    'Original, data-backed research on Indian mutual funds — decomposing returns into skill, luck, market, style and sector.',
}

export default function ReportsIndex() {
  const reports = getReports()
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="article-eyebrow">Reports</p>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Original research on fund-manager skill
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          We decompose Indian fund managers&apos; returns into skill, luck, market, style
          and sector — and publish what we find. Data-led, method in the open.
        </p>

        {reports.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">More reports coming soon.</p>
        ) : (
          <div className="mt-10 flex flex-col gap-4">
            {reports.map((r) => (
              <Link
                key={r.slug}
                href={`/reports/${r.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40"
              >
                <h2 className="text-lg font-bold text-foreground group-hover:text-primary">
                  {r.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
                <span className="mt-3 text-sm font-medium text-primary">
                  Read the report →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
