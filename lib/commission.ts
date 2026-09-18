/**
 * Commission resolution.
 * ======================
 * Turns the generated rate card into the two things the UI needs: the per-scheme
 * commission line in the fund drawer (08 §7) and the provider/slab/coverage
 * metadata the disclosures page publishes.
 *
 * BUILT TO CHANGE. Three things are expected to move, and none is hardcoded here:
 *
 *   PROVIDER — AssetPlus offers co-branding only, no white-label or API (10 §6),
 *     so the distribution platform may change. Provider name, slab and as-of date
 *     are read from the data file, never assumed.
 *   SLAB — AssetPlus prices in five AUM bands and you climb them as the book grows.
 *     Re-running the generator with --slab S3 updates every surface at once.
 *   COVERAGE — a rate card covers what the platform distributes, which is not the
 *     same as what AlphaPicker ranks. Today only ~45% of ranked schemes have a
 *     rate, so absence is the normal case and must be handled, not patched over.
 *
 * Regenerate both JSON files with `build_commission_rates.py` in the AlphaLens
 * repo. Do not hand-edit them.
 *
 * ⚠️ NEVER GUESS A RATE. If a scheme has no published rate we say so. Inferring
 * one from a category midpoint would put an invented number on a page whose whole
 * purpose is accurate disclosure.
 */

import rateCard from '@/content/disclosures/commission-rates.json'
import schemeCard from '@/content/disclosures/scheme-commission.json'

export const COMMISSION = {
  provider: (rateCard.provider ?? null) as string | null,
  slab: (rateCard.slab ?? null) as string | null,
  asOf: (rateCard.asOf ?? null) as string | null,
  basis: (rateCard.basis ?? 'base brokerage, excluding GST') as string,
} as const

export const COVERAGE = (rateCard.coverage ?? null) as {
  matched: number
  ranked: number
  pct: number
  uncoveredAmcs: string[]
  partiallyCoveredAmcs: string[]
} | null

const SCHEMES = (schemeCard.schemes ?? {}) as Record<string, number>

/** Published trail for a scheme, as % per annum (base, excluding GST).
 *  `null` means this scheme has no published rate — usually because the
 *  distribution partner does not carry it. Callers must handle null. */
export function trailFor(schemeCode: number | string | undefined | null): number | null {
  if (schemeCode === undefined || schemeCode === null) return null
  const v = SCHEMES[String(schemeCode)]
  return typeof v === 'number' ? v : null
}

/** Rupees per year on an invested amount, at a given trail %. */
export function annualCommission(amount: number, trailPct: number): number {
  return (amount * trailPct) / 100
}

/** Whole rupees, Indian digit grouping. */
export function inr(n: number): string {
  return `₹${Math.round(n).toLocaleString('en-IN')}`
}

/**
 * The fund-level commission line (08 §7 — "the highest-leverage copy on the site").
 *
 * Returns null when there is no published rate, so the caller renders the
 * not-carried state instead of a number we cannot stand behind.
 *
 * On the "costs you less" clause: trail is paid *out of* the regular plan's
 * expense ratio, so the direct plan of the same scheme costs roughly the trail
 * less per year. That is the mechanism, not a coincidence — but it is an
 * approximation, so the copy says "about" and never quotes a precise saving we
 * have not computed from the direct plan's own TER.
 */
export function commissionLine(
  schemeCode: number | string | undefined | null,
  amount = 100_000,
): { headline: string; detail: string; rate: number } | null {
  const rate = trailFor(schemeCode)
  if (rate === null) return null
  return {
    rate,
    headline: `If you invest ${inr(amount)} in this fund, we earn about ${inr(
      annualCommission(amount, rate),
    )} a year, for as long as you hold it.`,
    detail:
      `That is ${rate.toFixed(2)}% a year, paid by the AMC out of this plan's expense ratio — ` +
      `not charged to you on top. The direct plan of the same fund pays us nothing and costs ` +
      `about that much less each year; you can buy it directly from the AMC.`,
  }
}
