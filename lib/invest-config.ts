/**
 * Invest / transaction-handoff configuration.
 * ============================================
 * Phase 1 of the transaction layer (see transaction_layer_plan.md in the
 * AlphaLens repo). The "Invest" button on each fund has two modes, chosen by
 * whether ASSETPLUS_PARTNER_URL below is set:
 *
 *   1. LIVE mode  — partner URL present → button opens the AssetPlus client
 *      flow (clients are auto-assigned under your ARN). This is the real
 *      buy/SIP handoff. Go live by pasting your AssetPlus partner link here.
 *
 *   2. WAITLIST mode — partner URL empty (today, pre-ARN) → button opens a
 *      "notify me when investing goes live" modal that POSTs to
 *      WAITLIST_ENDPOINT. Captures demand before you can transact.
 *
 * THE GO-LIVE SWITCH: set NEXT_PUBLIC_ASSETPLUS_PARTNER_URL in Vercel env
 * (or paste it into PARTNER_URL_FALLBACK below) and redeploy. Every fund's
 * button becomes a real investment handoff — no code change needed.
 */

// Your AssetPlus client-acquisition link, e.g.
// "https://partner.assetplus.in/<your-code>". Empty until your ARN is issued
// and you've registered with AssetPlus. Prefer the env var; the fallback is
// here only so the value can also be hard-set without redeploying envs.
const PARTNER_URL_FALLBACK = ''

export const ASSETPLUS_PARTNER_URL =
  (process.env.NEXT_PUBLIC_ASSETPLUS_PARTNER_URL || PARTNER_URL_FALLBACK).trim()

/**
 * Where waitlist signups go. Phase-1 default: a managed form service
 * (Formspree, Google-Sheet webhook, etc.) — zero new infrastructure. When
 * Path B's Supabase exists, repoint this at your own /api/waitlist route;
 * the button code does not change.
 *
 * Set NEXT_PUBLIC_WAITLIST_ENDPOINT in Vercel env. If empty, the modal falls
 * back to a mailto: link so nothing is ever silently dropped.
 */
export const WAITLIST_ENDPOINT =
  (process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || '').trim()

/** Fallback contact if no waitlist endpoint is configured. */
export const WAITLIST_FALLBACK_EMAIL = 'skochar999@gmail.com'

export const INVEST_LIVE = ASSETPLUS_PARTNER_URL.length > 0

/**
 * Build the per-fund handoff URL. AssetPlus's referral link assigns the
 * client under your ARN; we append scheme context as query params so it's
 * available if/when AssetPlus supports prefilling or for your own analytics.
 */
export function buildInvestUrl(scheme: { code: number; name: string }): string {
  if (!INVEST_LIVE) return ''
  const sep = ASSETPLUS_PARTNER_URL.includes('?') ? '&' : '?'
  const params = new URLSearchParams({
    utm_source: 'alphapicker',
    utm_medium: 'fund_drawer',
    scheme_code: String(scheme.code),
  })
  return `${ASSETPLUS_PARTNER_URL}${sep}${params.toString()}`
}
