/**
 * Brand copy — single source of truth.
 * ====================================
 * Positioning lines live here, not inline in components, so changing the brand
 * line is a one-line edit rather than a search across surfaces.
 *
 * See 08_POSITIONING_AND_BRAND.md for the reasoning. The rules that constrain
 * anything added to this file:
 *
 *   - NEVER "independent", "unconflicted", "unbiased", or any claim that we
 *     earn nothing from what a user buys. Retired 2026-09-17.
 *   - NEVER "best interest" or other fiduciary language. An AMFI-registered
 *     distributor paid a trail commission does not owe a fiduciary duty; a
 *     SEBI-registered Investment Adviser does. Borrowing that language is a
 *     sharper version of the exact problem the repositioning exists to fix.
 *   - NEVER "best fund", "recommended", "our picks", "you should".
 *     Descriptive, never prescriptive (01 §6).
 *   - Every claim must trace to a number in the product or a line in the
 *     published methodology. If it cannot be linked, it does not ship.
 *
 * WRITE SHORT. The audience does not read paragraphs. If a sentence can lose
 * half its words and keep its meaning, it has to.
 */

/**
 * The brand line. Three words each for the three things we actually do:
 *   Real skill      — the factor model, on Indian mutual funds
 *   Right exposure  — wrapper and cost optimisation, on global ETFs
 *   Fair pricing    — what the fund costs, and what we are paid for it
 *
 * ⚠️ "Right exposure" describes the ANALYSIS, never a recommendation. It must
 * not appear next to a named fund or a suggestion to buy one — that turns a
 * description into advice, which is RIA territory.
 */
export const TAGLINE = 'Real skill. Right exposure. Fair pricing.'

/** Terse variant for tight spaces. Makes no commission claim. */
export const TAGLINE_SHORT = 'data over hype'

/** Hero headline. The question the product exists to answer. */
export const HEADLINE = 'Skill or luck?'

/**
 * The whole product in one sentence, at a reading age far below the analysis
 * it describes. Earlier draft named "market, style and sector decomposition" —
 * accurate, and nobody finished the sentence.
 */
export const SUBHEAD =
  'Most of what a fund earns is just the market going up. ' +
  'We show you the part the manager actually earned.'

/**
 * The credibility anchor. This is the line that has to carry authority, so it
 * is a statement of method rather than an adjective about ourselves.
 *
 * Substantiation: return attribution — separating market, style and sector
 * exposure from security selection — is standard practice in institutional
 * manager evaluation. The claim is about the METHOD being the institutional
 * one, not that any particular hedge fund uses AlphaPicker. Keep it that way.
 */
export const CREDIBILITY =
  'The method institutions use to judge a fund manager — run across every Indian mutual fund, daily.'
