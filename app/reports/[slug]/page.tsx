import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { getReport, getReports } from '@/lib/content'

export function generateStaticParams() {
  return getReports().map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const r = getReport(slug)
  if (!r) return {}
  return { title: `${r.title} — AlphaPicker`, description: r.description }
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const r = getReport(slug)
  if (!r) notFound()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/reports"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← All reports
        </Link>
        <p className="article-eyebrow mt-6">Report</p>
        <div className="md-content" dangerouslySetInnerHTML={{ __html: r.html }} />
      </article>
      <Footer />
    </main>
  )
}
