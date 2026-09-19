import Link from 'next/link'
import { IS_DISTRIBUTOR } from '@/lib/compliance-config'
import { ThemeToggle } from '@/components/theme-toggle'
import { ScopeSwitcher } from '@/components/scope-switcher'

const LINK =
  'rounded-sm px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground'

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            <span className="text-foreground">Alpha</span>
            <span className="text-primary">Picker</span>
          </Link>
          {/* The top-level India/Global choice sits beside the wordmark, not in
              the link list — it switches product line, it is not navigation. */}
          <ScopeSwitcher />
        </div>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link href="/guides" className={`${LINK} hidden sm:inline-block`}>
            Guides
          </Link>
          {IS_DISTRIBUTOR && (
            <Link href="/disclosures" className={`${LINK} hidden md:inline-block`}>
              What we earn
            </Link>
          )}
          <div className="mx-1 hidden h-5 w-px bg-border sm:block" />
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
