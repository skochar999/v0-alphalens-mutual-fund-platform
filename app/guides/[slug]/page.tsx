import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { getGuide, getGuides } from '@/lib/content'

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const g = getGuide(slug)
  if (!g) return {}
  return { title: `${g.title} — AlphaPicker`, description: g.description }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const g = getGuide(slug)
  if (!g) notFound()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          href="/guides"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← All guides
        </Link>
        <p className="article-eyebrow mt-6">
          {g.type === 'guide-hub' ? 'Guide · Start here' : 'Guide'}
        </p>
        <div className="md-content" dangerouslySetInnerHTML={{ __html: g.html }} />
      </article>
      <Footer />
    </main>
  )
}
