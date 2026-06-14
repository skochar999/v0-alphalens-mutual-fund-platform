'use client'

import { useState } from 'react'
import type { Fund } from '@/lib/types'
import {
  INVEST_LIVE,
  buildInvestUrl,
  WAITLIST_ENDPOINT,
  WAITLIST_GOOGLE_FORM,
  buildGoogleFormBody,
  WAITLIST_FALLBACK_EMAIL,
} from '@/lib/invest-config'

/* ------------------------------------------------------------------ *
 * Triggers
 * ------------------------------------------------------------------ */

/**
 * Full-width "Invest" CTA on the fund drawer.
 * - LIVE mode (AssetPlus partner URL configured): opens the handoff in a new tab.
 * - WAITLIST mode (no partner URL yet): opens the notify-me modal for this fund.
 */
export function InvestCta({ fund }: { fund: Fund }) {
  const [open, setOpen] = useState(false)

  if (INVEST_LIVE) {
    return (
      <a
        href={buildInvestUrl(fund)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
      >
        Invest in this fund
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </a>
    )
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
      >
        Invest in this fund
        <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
          Coming soon
        </span>
      </button>
      {open ? (
        <WaitlistModal fund={fund} source="fund_drawer" onClose={() => setOpen(false)} />
      ) : null}
    </>
  )
}

/**
 * Compact per-row "Invest" button for the rankings table. In LIVE mode it opens
 * the AssetPlus handoff; otherwise it opens the waitlist modal for that fund.
 * Click is stopped from bubbling so it doesn't also open the row's drawer.
 */
export function RowInvestButton({ fund }: { fund: Fund }) {
  const [open, setOpen] = useState(false)

  const base =
    'inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors'

  if (INVEST_LIVE) {
    return (
      <a
        href={buildInvestUrl(fund)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={`${base} bg-primary text-primary-foreground hover:opacity-90`}
      >
        Invest
      </a>
    )
  }

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }}
        className={`${base} border border-primary/40 text-primary hover:bg-primary/10`}
      >
        Invest
      </button>
      {open ? (
        <WaitlistModal
          fund={fund}
          source="rankings_table"
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  )
}

/* ------------------------------------------------------------------ *
 * Modal (shared by every trigger; fund is optional)
 * ------------------------------------------------------------------ */

export function WaitlistModal({
  fund,
  source,
  onClose,
}: {
  fund: Fund | null
  source: string
  onClose: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('sending')

    // Fold the fund (if any) and the trigger source into the single "Fund"
    // column so no Google Form change is needed.
    const fundLabel = fund
      ? `${fund.name} (${fund.code}) · ${source}`
      : `General waitlist · ${source}`

    const payload = {
      name: name.trim(),
      email: email.trim(),
      interest_scheme_code: fund?.code ?? '',
      interest_scheme_name: fund?.name ?? 'General waitlist',
      source,
      ts: new Date().toISOString(),
    }

    try {
      if (WAITLIST_GOOGLE_FORM.action) {
        // Google Forms: url-encoded POST, no-cors (response is opaque, so we
        // confirm optimistically — a network failure still falls through).
        await fetch(WAITLIST_GOOGLE_FORM.action, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: buildGoogleFormBody({
            name: payload.name,
            email: payload.email,
            fund: fundLabel,
          }).toString(),
        })
        setStatus('done')
      } else if (WAITLIST_ENDPOINT) {
        const res = await fetch(WAITLIST_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('bad status')
        setStatus('done')
      } else {
        const subject = encodeURIComponent('AlphaPicker — notify me when investing goes live')
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\nInterested in: ${fundLabel}`,
        )
        window.location.href = `mailto:${WAITLIST_FALLBACK_EMAIL}?subject=${subject}&body=${body}`
        setStatus('done')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Join the investing waitlist">
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-card p-6 shadow-xl">
        {status === 'done' ? (
          <div className="text-center">
            <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-positive/15 text-positive">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h3 className="text-base font-bold text-foreground">You&apos;re on the list</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              We&apos;ll email you the moment investing goes live — plus our monthly
              newsletter with the latest top-ranked funds.
            </p>
            <button onClick={onClose} className="mt-4 w-full rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground hover:opacity-90">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h3 className="text-base font-bold text-foreground">Investing is coming soon</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              We&apos;re building the ability to invest directly. Leave your email and
              we&apos;ll notify you when it&apos;s live
              {fund ? (
                <>
                  {' '}— starting with{' '}
                  <span className="font-medium text-foreground">{fund.name}</span>
                </>
              ) : null}
              . You&apos;ll also get our monthly newsletter with new top picks.
            </p>
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            />
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            />
            {status === 'error' ? (
              <p className="mt-2 text-xs text-negative">Something went wrong — please try again.</p>
            ) : null}
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary">
                Cancel
              </button>
              <button type="submit" disabled={status === 'sending'} className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60">
                {status === 'sending' ? 'Adding…' : 'Notify me'}
              </button>
            </div>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Mutual fund investments are subject to market risks.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
