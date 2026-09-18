import Link from 'next/link'
import { IS_DISTRIBUTOR } from '@/lib/compliance-config'
import { ThemeToggle } from '@/components/theme-toggle'

const LINK =
  'rounded-sm px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground'

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-foreground">Alpha</span>
            <span className="text-primary">Picker</span>
          </span>
          {/* Tagline survives the repositioning — it makes no claim about
              commissions, so it needed no rewrite. See 08 §3. */}
          <span className="label-micro hidden sm:inline">data over hype</span>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link href="/guides" className={LINK}>
            Guides
          </Link>
          <Link href="/reports" className={`${LINK} hidden sm:inline-block`}>
            Reports
          </Link>
          {IS_DISTRIBUTOR && (
            <Link href="/disclosures" className={`${LINK} hidden sm:inline-block`}>
              Disclosures
            </Link>
          )}
          <div className="mx-1.5 hidden h-5 w-px bg-border sm:block" />
          <ThemeToggle />
          <Link
            href="/#rankings"
            className="ml-1.5 rounded-sm bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {IS_DISTRIBUTOR ? 'Invest' : 'See scores'}
          </Link>
        </nav>
      </div>
    </header>
  )
}
