'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Methodology as MethodologyData } from '@/lib/types'

const faqs = [
  {
    q: 'How is the score calculated?',
    a: 'Three pillars. Skill (45%): the statistical consistency of pure stock-picking, measured by decomposing every disclosed portfolio against a multi-factor risk model \u2014 plus how much of the fund\u2019s behaviour can\u2019t be explained by factors at all. Conviction (45%): patient, concentrated portfolios with real weight behind top ideas, measured from actual month-to-month holdings. Cost (10%): fees come straight off your return. Deliberately absent: past returns, star ratings and brand \u2014 the research is unambiguous that they predict nothing.',
  },
  {
    q: 'Has the score been tested?',
    a: 'Yes \u2014 walk-forward, the way quant funds test strategies. At each historical month we rank funds using only data available at the time, then measure how those rankings predicted the NEXT 12 months. The current formula was positively predictive in 76% of test windows; ranking funds by past returns alone predicted nothing. Published academic signals that failed this test were rejected from the score.',
  },
  {
    q: 'What is alpha?',
    a: 'Alpha is the return a fund earns above and beyond what its market exposure alone would predict. If the market returned 12% and a fund returned 15% with comparable risk, the extra 3% is alpha — the part attributable to the manager\u2019s decisions rather than the market.',
  },
  {
    q: 'Why exclude index funds?',
    a: 'Index funds and ETFs are designed to track a benchmark, not beat it, so measuring their stock-selection skill is meaningless — by construction they have none. AlphaPicker focuses on actively managed funds where the question \u201cis the manager actually adding value?\u201d is worth answering.',
  },
  {
    q: 'Where does the data come from?',
    a: 'We use publicly reported daily NAV history, scheme metadata and expense ratios sourced from AMC disclosures and official industry feeds. Benchmarks are mapped per scheme category so each fund is compared against the right yardstick.',
  },
]

export function Methodology({
  methodology,
  nFunds,
}: {
  methodology?: MethodologyData | null
  nFunds?: number | null
}) {
  const [open, setOpen] = useState<number | null>(0)
  const [detailOpen, setDetailOpen] = useState(false)

  const fundLabel = nFunds ? nFunds.toLocaleString('en-IN') : 'the'
  const faqsWithUpdate = [
    ...faqs,
    {
      q: 'How often is data updated?',
      a: `NAVs and the resulting scores are refreshed daily after market close, so the rankings you see always reflect the most recent available track record across all ${fundLabel} funds we monitor.`,
    },
  ]

  return (
    <section id="methodology" className="border-b border-border bg-card scroll-mt-16">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">
          For the curious
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          How does AlphaPicker actually work?
        </h2>

        <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
          {faqsWithUpdate.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/40"
                >
                  <span className="font-medium text-foreground">{faq.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {methodology && (
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-background">
            <button
              onClick={() => setDetailOpen((v) => !v)}
              aria-expanded={detailOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/40"
            >
              <span className="font-medium text-foreground">Detailed methodology</span>
              <ChevronDown
                className={`size-5 shrink-0 text-muted-foreground transition-transform ${
                  detailOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {detailOpen && (
              <div className="px-5 pb-5">
                <h3 className="text-sm font-semibold text-foreground">What we cover</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {methodology.universe}
                </p>
                {methodology.score_formula && (
                  <>
                    <h3 className="mt-4 text-sm font-semibold text-foreground">
                      The score formula
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {methodology.score_formula}
                    </p>
                  </>
                )}
                {methodology.what_we_ignore && (
                  <>
                    <h3 className="mt-4 text-sm font-semibold text-foreground">
                      What we deliberately ignore
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {methodology.what_we_ignore}
                    </p>
                  </>
                )}
                {methodology.validation && (
                  <>
                    <h3 className="mt-4 text-sm font-semibold text-foreground">
                      How we validate it
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {methodology.validation}
                    </p>
                  </>
                )}
                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  Stock-picking rating
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {methodology.stock_picking_history}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
