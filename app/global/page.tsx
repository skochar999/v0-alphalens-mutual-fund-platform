import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { GlobalWaitlist } from '@/components/global-waitlist'

export const metadata: Metadata = {
  title: 'Global ETFs — AlphaPicker',
  description:
    'The same exposure can cost very different amounts depending on where you buy it. AlphaPicker Global compares the all-in rupee cost of global ETFs for an Indian investor. In build.',
}

/**
 * The Global product line, pre-launch.
 *
 * ⚠️ This page exists because the India/Global switcher needs an honest
 * destination. It states plainly that the product is in build. It must not
 * imply the product is live, quote a launch date we have not committed to, or
 * name a broker — the IFSC partner is not selected (05 §1, 10 §6).
 *
 * What it CAN do is state the thesis, which is settled: the same economic
 * exposure, bought through different domiciles and structures, carries
 * materially different all-in cost for an Indian resident once fees, tax
 * treatment, FX and execution are counted (04 §8.6).
 */
const POINTS = [
  {
    k: 'Same index, different cost',
    v: 'An S&P 500 ETF in Ireland, the US or India is the same exposure with a different all-in bill.',
  },
  {
    k: 'The bill, in rupees',
    v: 'Fees, withholding tax, FX spread and execution — counted together, for an Indian resident.',
  },
  {
    k: 'No tips',
    v: 'We show what each option costs you. What you buy is your call.',
  },
]

export default function GlobalPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />

      <section className="grid-backdrop border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="label-micro mb-4 text-primary">Global ETFs · in build</p>

          <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            Right exposure.
            <span className="mt-1 block text-muted-foreground">Lowest all-in cost.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground">
            The same index can cost you very different amounts depending on where
            you buy it. We do that arithmetic.
          </p>

          <div className="mt-12 flex flex-col">
            {POINTS.map((p) => (
              <div
                key={p.k}
                className="flex flex-col gap-1 border-b border-border py-4 last:border-0 sm:flex-row sm:gap-6"
              >
                <span className="w-56 shrink-0 text-sm font-semibold text-foreground">
                  {p.k}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {p.v}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <GlobalWaitlist />
          </div>

          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
            AlphaPicker Global is not yet live and is not open for investment.
            Nothing on this page is investment advice or an offer to transact.
            Overseas investment by Indian residents is subject to the RBI
            Liberalised Remittance Scheme and applicable tax rules.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
