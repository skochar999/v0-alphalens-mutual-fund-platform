'use client'

import { useState } from 'react'
import {
  WAITLIST_GOOGLE_FORM,
  buildGoogleFormBody,
} from '@/lib/invest-config'

/**
 * Early-interest capture for the Global line.
 *
 * Posts to the same Google Form already used for the MF waitlist, tagging the
 * `fund` field so Global signups are separable in the sheet. `no-cors` means
 * the response is opaque — Google Forms does not send CORS headers — so a
 * resolved fetch is the only success signal available. That is acceptable for
 * a waitlist and would not be for anything transactional.
 */
export function GlobalWaitlist() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || state === 'sending') return
    setState('sending')
    try {
      await fetch(WAITLIST_GOOGLE_FORM.action, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: buildGoogleFormBody({
          name: '',
          email: email.trim(),
          fund: 'GLOBAL_ETF_WAITLIST',
        }).toString(),
      })
      setState('done')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <p className="rounded-sm border border-positive/30 bg-positive/5 px-4 py-3 text-sm text-foreground">
        You’re on the list. We’ll email you when it opens.
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="flex max-w-md flex-col gap-2 sm:flex-row">
      <label className="sr-only" htmlFor="global-email">
        Email address
      </label>
      <input
        id="global-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-sm border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
      <button
        type="submit"
        disabled={state === 'sending'}
        className="rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {state === 'sending' ? 'Adding…' : 'Tell me when it opens'}
      </button>
      {state === 'error' && (
        <p className="text-sm text-negative">Something went wrong — try again.</p>
      )}
    </form>
  )
}
