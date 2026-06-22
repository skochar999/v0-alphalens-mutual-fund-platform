import fs from 'node:fs'
import path from 'node:path'
import { marked } from 'marked'

export type ContentDoc = {
  title: string
  slug: string
  description: string
  type?: string
  level?: string
  html: string
}

type Kind = 'guides' | 'reports'

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  if (!m) return { data: {}, body: raw }
  const data: Record<string, string> = {}
  for (const line of m[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    data[key] = val
  }
  return { data, body: m[2] }
}

function firstParagraph(body: string): string {
  const line = body
    .split('\n')
    .map((l) => l.trim())
    .find(
      (l) =>
        l.length > 40 &&
        !l.startsWith('#') &&
        !l.startsWith('>') &&
        !l.startsWith('*') &&
        !l.startsWith('-') &&
        !l.startsWith('|') &&
        !l.startsWith('---'),
    )
  return (line ?? '').replace(/[*_`[\]]/g, '').slice(0, 180)
}

function dir(kind: Kind) {
  return path.join(process.cwd(), 'content', kind)
}

function readAll(kind: Kind): ContentDoc[] {
  const d = dir(kind)
  if (!fs.existsSync(d)) return []
  return fs
    .readdirSync(d)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(d, file), 'utf8')
      const { data, body } = parseFrontmatter(raw)
      const html = marked.parse(body, { async: false, gfm: true }) as string
      return {
        title: data.title ?? file.replace(/\.md$/, ''),
        slug: data.slug ?? file.replace(/^\d+_/, '').replace(/\.md$/, ''),
        description: data.description ?? firstParagraph(body),
        type: data.type,
        level: data.level,
        html,
      }
    })
}

export function getGuides(): ContentDoc[] {
  return readAll('guides')
}
export function getReports(): ContentDoc[] {
  return readAll('reports')
}
export function getGuide(slug: string): ContentDoc | undefined {
  return readAll('guides').find((d) => d.slug === slug)
}
export function getReport(slug: string): ContentDoc | undefined {
  return readAll('reports').find((d) => d.slug === slug)
}
