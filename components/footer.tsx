import Link from 'next/link'
import {
  ARN_TAGLINE_CLASS,
  IS_DISTRIBUTOR,
  arnTagline,
  generalDisclaimer,
} from '@/lib/compliance-config'
import { TAGLINE } from '@/lib/brand'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-foreground">Alpha</span>
              <span className="text-primary">Picker</span>
            </span>
            <span className="label-micro">{TAGLINE}</span>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:justify-end">
            <Link href="/guides" className="text-muted-foreground transition-colors hover:text-foreground">
              Guides
            </Link>
            <Link href="/reports" className="text-muted-foreground transition-colors hover:text-foreground">
              Reports
            </Link>
            {IS_DISTRIBUTOR && (
              <Link href="/disclosures" className="font-medium text-primary hover:underline">
                Commission &amp; disclosures
              </Link>
            )}
          </nav>
        </div>

        <div className="rule-fade my-8" />

        {/* AMFI Code of Conduct item 2 — the registration tagline must appear
            at font size ≥ 12pt (≈16px). ARN_TAGLINE_CLASS is text-base (16px);
            never render this at text-sm or smaller, and never inside a
            label-micro, which is 11px. */}
        {IS_DISTRIBUTOR && (
          <p className={`${ARN_TAGLINE_CLASS} mb-4 text-foreground`}>{arnTagline()}</p>
        )}

        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {generalDisclaimer()}
        </p>
      </div>
    </footer>
  )
}
