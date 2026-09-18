import Link from 'next/link'
import {
  ARN_TAGLINE_CLASS,
  IS_DISTRIBUTOR,
  arnTagline,
  generalDisclaimer,
} from '@/lib/compliance-config'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-bold">
            <span className="text-foreground">Alpha</span>
            <span className="text-primary">Picker</span>
          </span>

          {/* AMFI Code of Conduct item 2 — the registration tagline must appear
              at font size ≥ 12pt (≈16px). ARN_TAGLINE_CLASS is text-base (16px);
              never render this at text-sm or smaller. */}
          {IS_DISTRIBUTOR && (
            <p className={`${ARN_TAGLINE_CLASS} text-foreground`}>{arnTagline()}</p>
          )}

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {generalDisclaimer()}
          </p>

          <nav className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/guides" className="text-muted-foreground hover:text-foreground">
              Guides
            </Link>
            <Link href="/reports" className="text-muted-foreground hover:text-foreground">
              Reports
            </Link>
            {IS_DISTRIBUTOR && (
              <Link
                href="/disclosures"
                className="font-medium text-primary hover:underline"
              >
                Commission &amp; disclosures
              </Link>
            )}
          </nav>
        </div>
      </div>
    </footer>
  )
}
