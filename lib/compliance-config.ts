/**
 * Compliance / disclosure configuration.
 * ======================================
 * Single source of truth for everything that changes the moment AlphaPicker
 * starts earning commission — copy, taglines, disclaimers and the disclosure
 * page — so the site can never be in a state where it *is* a distributor but
 * still *claims* it is not.
 *
 * THE RULE: distributor status is derived from INVEST_LIVE, which is derived
 * from NEXT_PUBLIC_ASSETPLUS_PARTNER_URL. One env var flips the transaction
 * handoff AND the positioning together, atomically. There is no window in
 * which the site earns a commission while telling users it does not.
 *
 * See 01_BUSINESS_AND_REGULATORY.md §4 for the AMFI Code of Conduct items
 * these settings implement, and 00_GO_LIVE_TRACKER.md §1 for why C gates E.
 */

import { INVEST_LIVE } from '@/lib/invest-config'

/**
 * True once the site can transact — i.e. once it is a commission-earning
 * AMFI-registered Mutual Fund Distributor. Every piece of distributor copy,
 * every disclosure and every tagline keys off this one boolean.
 */
export const IS_DISTRIBUTOR = INVEST_LIVE

/**
 * ARN number, issued by AMFI 2026-09. The ARN is public information — it is
 * required to be displayed on every page — so it is hardcoded here rather than
 * held in an env var.
 *
 * This is deliberate. 09_VERCEL_AUDIT.md §2 found that an unset NEXT_PUBLIC_ARN
 * would publicly render the literal string "ARN-PENDING" the instant the
 * distributor switch flipped. A hardcoded public constant cannot be forgotten
 * at deploy time; an env var can. The env var still overrides, for the day the
 * ARN moves to a corporate registration (07 §7.4).
 */
const ARN_FALLBACK = 'ARN-362697'

export const ARN = (process.env.NEXT_PUBLIC_ARN || ARN_FALLBACK).trim()

/** The entity or individual the ARN is registered to. See 07 §7.4 — the ARN
 *  is currently issued personally; on incorporation this may become the company. */
export const ARN_HOLDER = (process.env.NEXT_PUBLIC_ARN_HOLDER || 'Siddhartha Kochar').trim()

/**
 * AMFI item 2: "AMFI-registered Mutual Fund Distributor" must appear at font
 * size ≥ 12pt on website, app, cards and signage.
 * ⚠️ 12pt ≈ 16px. Render this with `text-base` (16px) or larger — never
 * `text-sm` (14px) or `text-xs` (12px), which are below the floor.
 */
export const ARN_TAGLINE_CLASS = 'text-base font-medium'

export function arnTagline(): string {
  if (!IS_DISTRIBUTOR) return ''
  const arn = ARN || 'ARN-PENDING — set NEXT_PUBLIC_ARN'
  return `AMFI-registered Mutual Fund Distributor · ${arn}`
}

/**
 * The general disclaimer that appears in the footer, under the rankings table
 * and at the foot of reports. Two variants, chosen by distributor status.
 *
 * Pre-live it states what is true today: non-personalised educational
 * analytics, no advice. It deliberately does NOT carry the old absolute
 * "we are not a distributor and earn no commissions" — the ARN is issued, and
 * an absolute claim that has to be retracted is worse than one never made.
 */
export function generalDisclaimer(): string {
  const base =
    'AlphaPicker provides non-personalised, educational analysis and does not constitute ' +
    'investment advice or a recommendation to buy, sell, or hold any security. ' +
    'Mutual fund investments are subject to market risks; read all scheme-related documents ' +
    'carefully. Past performance is not indicative of future results.'

  if (!IS_DISTRIBUTOR) return base

  return (
    `${ARN_HOLDER} is an AMFI-registered Mutual Fund Distributor` +
    `${ARN ? ` (${ARN})` : ''}. When you invest through AlphaPicker we are paid a trail ` +
    'commission by the asset management company, disclosed in full on our disclosures page. ' +
    `${base} We are not an investment adviser; for advice specific to your situation, ` +
    'consult a SEBI-registered investment adviser.'
  )
}

/** Short form, for tight spaces like the rankings banner. */
export function shortDisclaimer(): string {
  return IS_DISTRIBUTOR
    ? 'Mutual Fund investments are subject to market risks. Past performance is not indicative of future results. ' +
        'This is non-personalised information, not investment advice. AlphaPicker is an AMFI-registered Mutual Fund ' +
        'Distributor and is paid a trail commission when you invest through it — see Disclosures.'
    : 'Mutual Fund investments are subject to market risks. Past performance is not indicative of future results. ' +
        'This is non-personalised information, not investment advice.'
}
