import Link from 'next/link'
import { IS_DISTRIBUTOR, generalDisclaimer } from '@/lib/compliance-config'

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-positive"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-foreground">
      <Check />
      <span>{children}</span>
    </li>
  )
}

/**
 * "What it costs / how we're paid" section.
 *
 * ⚠️ The ₹2,000/yr Premium tier was RETIRED with the Option A decision
 * (2026-09-17, see 01_BUSINESS_AND_REGULATORY.md §6): charging a client a fee
 * *and* earning commission from that same client is the exact conflict SEBI
 * separates — fee or commission, not both. The Premium *features* survive as
 * free distribution drivers; only the price is gone.
 *
 * The right-hand card is the honest answer to "so how do you make money?" and
 * switches with IS_DISTRIBUTOR, so it can never describe a revenue model the
 * site is not actually running.
 */
export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            What it costs
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Free to use. Here&apos;s exactly how we&apos;re paid.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            {IS_DISTRIBUTOR
              ? 'Every score, ranking and breakdown is free, and always will be. We are paid a trail commission by the fund house when you invest through us — never by you, and never in a way that changes what the numbers say.'
              : 'Every score, ranking and breakdown is free, and always will be. You cannot invest through AlphaPicker yet; when you can, what we earn will be published in full before you are asked to act on anything.'}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          {/* What you get */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
            <h3 className="text-lg font-bold text-foreground">What you get</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              See the truth about any fund.
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tabular-nums text-foreground">₹0</span>
              <span className="text-sm text-muted-foreground">/ forever</span>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              <Feature>Every fund&apos;s AlphaPicker score &amp; full rankings</Feature>
              <Feature>Per-fund skill-vs-luck breakdown &amp; factor attribution</Feature>
              <Feature>Search, sort &amp; category filters</Feature>
              <Feature>Methodology, guides &amp; reports</Feature>
              <Feature>
                <span className="font-semibold">Coming:</span> Portfolio X-ray, watchlist &amp;
                score-change alerts, advanced screener, multi-fund compare — all free
              </Feature>
            </ul>
            <a
              href="#rankings"
              className="mt-7 w-full rounded-xl border border-border bg-background px-4 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Browse fund scores
            </a>
          </div>

          {/* How we're paid */}
          <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-card p-7 shadow-md">
            <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
              No small print
            </span>
            <h3 className="text-lg font-bold text-foreground">How we&apos;re paid</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {IS_DISTRIBUTOR
                ? 'By the fund house, not by you.'
                : 'Not yet — and you will know before it changes.'}
            </p>

            {IS_DISTRIBUTOR ? (
              <>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  <Feature>
                    You pay AlphaPicker <span className="font-semibold">nothing</span>. No
                    subscription, no transaction fee, no platform fee.
                  </Feature>
                  <Feature>
                    When you invest through us, the AMC pays us an ongoing{' '}
                    <span className="font-semibold">trail commission</span>, already included in
                    the scheme&apos;s Regular-plan expense ratio.
                  </Feature>
                  <Feature>
                    We publish the rates we receive{' '}
                    <span className="font-semibold">across competing schemes</span> — so you can
                    check for yourself whether a ranking could have been bought.
                  </Feature>
                  <Feature>
                    The score is computed from returns data before any commission is known. The
                    model has no commission input, because it has no commission field.
                  </Feature>
                </ul>
                <Link
                  href="/disclosures"
                  className="mt-7 w-full rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  See every rate we receive
                </Link>
              </>
            ) : (
              <>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  <Feature>
                    Today AlphaPicker earns nothing from what you buy — you cannot yet transact
                    here.
                  </Feature>
                  <Feature>
                    When investing goes live, AlphaPicker will be an AMFI-registered Mutual Fund
                    Distributor paid a trail commission by the fund house.
                  </Feature>
                  <Feature>
                    The rates we receive across competing schemes will be published on a public
                    disclosures page, before the first transaction.
                  </Feature>
                  <Feature>
                    The score will not change. It is computed from returns data and has no
                    commission input.
                  </Feature>
                </ul>
                <a
                  href="#newsletter"
                  className="mt-7 w-full rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Tell me when investing goes live
                </a>
              </>
            )}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          {generalDisclaimer()}
        </p>
      </div>
    </section>
  )
}
