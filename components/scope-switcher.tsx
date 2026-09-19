'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * India / Global — the top-level choice between the two product lines
 * (08 §1 decision 1: one brand, two lines).
 *
 * Global is in build. It is shown as a real destination with an honest status
 * rather than hidden or stubbed: a segment that looks live and does nothing is
 * worse than one that says what it is.
 */
const SEGMENTS = [
  { href: '/', label: 'India', sub: 'Mutual funds' },
  { href: '/global', label: 'Global', sub: 'ETFs' },
] as const

export function ScopeSwitcher() {
  const pathname = usePathname()
  const activeHref = pathname?.startsWith('/global') ? '/global' : '/'

  return (
    <div
      role="tablist"
      aria-label="Market"
      className="flex items-center rounded-sm border border-border bg-secondary/50 p-0.5"
    >
      {SEGMENTS.map((s) => {
        const active = s.href === activeHref
        return (
          <Link
            key={s.href}
            href={s.href}
            role="tab"
            aria-selected={active}
            className={`rounded-[3px] px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
              active
                ? 'bg-card text-foreground shadow-[0_0_0_1px_var(--border-strong)]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {s.label}
          </Link>
        )
      })}
    </div>
  )
}
