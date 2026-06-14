'use client'

import { useState } from 'react'
import type { Fund } from '@/lib/types'
import {
  INVEST_LIVE,
  buildInvestUrl,
  WAITLIST_ENDPOINT,
  WAITLIST_FALLBACK_EMAIL,
} from '@/lib/invest-config'

/**
 * The "Invest" call-to-action on the fund drawer.
 * - LIVE mode (AssetPlus partner URL configured): opens the handoff in a new tab.
 * - WAITLIST mode (no partner URL yet): opens a notify-me modal.
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
        <WaitlistModal fund={fund} onClose={() => setOpen(false)} />
      ) : null}
    </>
  )
}

function WaitlistModal({ fund, onClose }: { fund: Fund; onClose: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('sending')
    const payload = {
      name: name.trim(),
      email: email.trim(),
      interest_scheme_code: fund.code,
      interest_scheme_name: fund.name,
      source: 'fund_drawer',
      ts: new Date().toISOString(),
    }
    try {
      if (WAITLIST_ENDPOINT) {
        const res = await fetch(WAITLIST_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('bad status')
        setStatus('done')
      } else {
        // No endpoint configured — fall back to mailto so nothing is lost.
        const subject = encodeURIComponent('AlphaPicker — notify me when investing goes live')
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\nInterested in: ${payload.interest_scheme_name} (${payload.interest_scheme_code})`,
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
              We&apos;ll email you the moment investing goes live on AlphaPicker.
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
              we&apos;ll notify you when it&apos;s live — starting with{' '}
              <span className="font-medium text-foreground">{fund.name}</span>.
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
