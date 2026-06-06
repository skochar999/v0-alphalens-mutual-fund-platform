'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Methodology as MethodologyData } from '@/lib/types'

const faqs = [
  {
    q: 'How is the score calculated?',
    a: 'We decompose each fund\u2019s NAV history into market beta, style/sector tilts, stock selection and timing. The AlphaPicker Score rewards genuine, repeatable stock-selection skill and consistency (how often the fund beats its benchmark), while discounting returns that simply came from the market rising or from one-off lucky bets.',
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
  {
    q: 'How often is data updated?',
    a: 'NAVs and the resulting scores are refreshed daily after market close, so the rankings you see always reflect the most recent available track record across all 347 funds we monitor.',
  },
]

export function Methodology({
  methodology,
}: {
  methodology?: MethodologyData | null
}) {
  const [open, setOpen] = useState<number | null>(0)
  const [detailOpen, setDetailOpen] = useState(false)

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
          {faqs.map((faq, i) => {
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
