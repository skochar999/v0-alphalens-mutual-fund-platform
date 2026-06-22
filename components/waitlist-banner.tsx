'use client'

import { useState } from 'react'
import { WaitlistModal } from '@/components/invest-cta'

/**
 * Top-of-page, fund-agnostic waitlist call-to-action. Opens the shared
 * WaitlistModal with no fund attached (general signup + newsletter).
 */
export function WaitlistBanner() {
  const [open, setOpen] = useState(false)

  return (
    <section id="newsletter" className="border-b border-border bg-primary/5 scroll-mt-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16v16H4z" opacity="0" />
              <path d="M22 6 12 13 2 6" />
              <path d="M2 6h20v12H2z" />
            </svg>
          </span>
          <div>
            <h2 className="text-base font-bold text-foreground sm:text-lg">
              Get the funds worth watching — monthly
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              One email a month: the biggest score moves, skill standouts, and a
              data-driven read on what&apos;s hype. No spam, no selling.
            </p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
        >
          Subscribe free
        </button>
      </div>
      {open ? (
        <WaitlistModal fund={null} source="hero_banner" onClose={() => setOpen(false)} />
      ) : null}
    </section>
  )
}
