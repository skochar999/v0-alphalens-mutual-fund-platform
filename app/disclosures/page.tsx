import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import {
  ARN,
  ARN_HOLDER,
  ARN_TAGLINE_CLASS,
  IS_DISTRIBUTOR,
  arnTagline,
} from '@/lib/compliance-config'
import rateCard from '@/content/disclosures/commission-rates.json'
import { COMMISSION, COVERAGE } from '@/lib/commission'

export const metadata: Metadata = {
  title: 'Disclosures — AlphaPicker',
  description:
    'What AlphaPicker earns, who pays it, and every commission rate receivable across competing schemes.',
}

type Rate = {
  category: string
  trailMin: number | null
  trailMax: number | null
  note?: string
}

const rates = (rateCard.rates ?? []) as Rate[]
const asOf = rateCard.asOf as string | null

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-8 first:border-t-0">
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

function pct(v: number | null) {
  return v === null || v === undefined ? '—' : `${v.toFixed(2)}%`
}

export default function DisclosuresPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <header>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Disclosures
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Most places that rank funds for you do not tell you what they earn when you act on
            the ranking. This page does. Read it before you invest anything.
          </p>

          {/* AMFI item 2 — registration tagline, ≥12pt (16px). */}
          {IS_DISTRIBUTOR && (
            <p className={`mt-6 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-foreground ${ARN_TAGLINE_CLASS}`}>
              {arnTagline()}
            </p>
          )}
        </header>

        <Section id="who-we-are" title="Who we are">
          {IS_DISTRIBUTOR ? (
            <p>
              AlphaPicker is operated by {ARN_HOLDER}, an AMFI-registered Mutual Fund Distributor
              {ARN ? ` (${ARN})` : ''}. We distribute mutual funds. We are{' '}
              <strong className="text-foreground">not</strong> an investment adviser and we are
              not registered with SEBI as one.
            </p>
          ) : (
            <p>
              AlphaPicker is a mutual fund analytics platform operated by {ARN_HOLDER}. You
              cannot currently invest through AlphaPicker. When that changes, this page will
              carry our AMFI registration and every rate we receive — published{' '}
              <strong className="text-foreground">before</strong> the first transaction, not
              after.
            </p>
          )}
        </Section>

        <Section id="how-we-are-paid" title="How we are paid">
          {IS_DISTRIBUTOR ? (
            <>
              <p>
                You pay AlphaPicker nothing. There is no subscription, no transaction fee and no
                platform fee.
              </p>
              <p>
                When you invest in a mutual fund through AlphaPicker, we are paid an ongoing{' '}
                <strong className="text-foreground">trail commission</strong> by the asset
                management company. That commission is not an extra charge on top of your
                investment — it is already inside the Regular plan&apos;s total expense ratio
                (TER), which is deducted from the scheme&apos;s NAV whether you invest through a
                distributor or not.
              </p>
              <p>
                A <strong className="text-foreground">Direct</strong> plan of the same scheme has
                a lower TER because it carries no distributor commission. Identical portfolio,
                identical manager, lower fee. You can always buy the Direct plan straight from
                the AMC, and we would rather say so here than have you discover it elsewhere.
                Our{' '}
                <Link href="/guides" className="text-primary underline underline-offset-4">
                  guide to what a fund costs
                </Link>{' '}
                works through the arithmetic of that difference over twenty years.
              </p>
            </>
          ) : (
            <p>
              AlphaPicker currently earns nothing from what you buy, because you cannot buy
              anything here. We do not sell data, we do not sell leads, and there is no paid
              placement in the rankings.
            </p>
          )}
        </Section>

        <Section id="rates" title="Commission rates receivable, across competing schemes">
          <p>
            AMFI requires a distributor to disclose not only what it earns on what it sells, but
            the rates receivable across{' '}
            <strong className="text-foreground">competing schemes</strong> — so you can see
            whether we had a financial reason to prefer one fund over another.
          </p>

          {rates.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-secondary/40 px-4 py-6 text-sm">
              <p className="font-semibold text-foreground">Not yet published.</p>
              <p className="mt-1">
                {IS_DISTRIBUTOR
                  ? 'This table is being compiled and will be published here. Until it is, do not treat this page as a complete commission disclosure.'
                  : 'These rates will be published here before investing goes live on AlphaPicker.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50 text-left">
                      <th scope="col" className="px-4 py-2.5 font-semibold text-foreground">
                        Category
                      </th>
                      <th scope="col" className="px-4 py-2.5 text-right font-semibold text-foreground">
                        Trail, lowest
                      </th>
                      <th scope="col" className="px-4 py-2.5 text-right font-semibold text-foreground">
                        Trail, highest
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-semibold text-foreground">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rates.map((r) => (
                      <tr key={r.category} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5 text-foreground">{r.category}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-foreground">
                          {pct(r.trailMin)}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-foreground">
                          {pct(r.trailMax)}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">{r.note ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs">
                Rates are per annum, as receivable by the distributor, and are subject to change
                by the AMC. Figures are {COMMISSION.basis} — GST is added by the AMC and remitted
                onward, so it is not income to us.
                {COMMISSION.provider
                  ? ` Sourced from ${COMMISSION.provider}'s published rate card${
                      COMMISSION.slab ? ` (band ${COMMISSION.slab})` : ''
                    }.`
                  : null}{' '}
                {asOf ? `Last updated ${asOf}.` : null}
              </p>

              {COVERAGE && COVERAGE.pct < 100 ? (
                <div className="rounded-lg border border-border bg-secondary/40 px-4 py-3 text-xs leading-relaxed">
                  <p className="font-semibold text-foreground">
                    What this table does not cover
                  </p>
                  <p className="mt-1">
                    Our distribution partner carries {COVERAGE.matched} of the{' '}
                    {COVERAGE.ranked} schemes AlphaPicker ranks ({COVERAGE.pct}%). The ranges above
                    describe only those. Schemes we rank but cannot distribute earn us nothing, and
                    you cannot invest in them here — they are still ranked on their merits.
                  </p>
                  {COVERAGE.uncoveredAmcs.length ? (
                    <p className="mt-1.5">
                      No scheme from these fund houses is currently available through our partner:{' '}
                      <span className="text-foreground">{COVERAGE.uncoveredAmcs.join(', ')}</span>.
                    </p>
                  ) : null}
                </div>
              ) : null}
            </>
          )}
        </Section>

        <Section id="conflict" title="The conflict, stated rather than denied">
          <p>
            A distributor that ranks funds and is paid when you buy them has a conflict. Pretending
            otherwise would be the dishonest move, so here is how we handle it.
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong className="text-foreground">The score cannot see commission.</strong> The
              model is fitted on returns data. There is no commission field in the input, so
              there is no path by which a higher-paying scheme scores better.
            </li>
            <li>
              <strong className="text-foreground">Every fund is ranked, not just sellable
              ones.</strong> Schemes we earn nothing on appear in the rankings on the same terms
              as schemes we do.
            </li>
            <li>
              <strong className="text-foreground">No paid placement.</strong> No AMC can pay for
              position, prominence, inclusion or a mention. None has been offered the chance.
            </li>
            <li>
              <strong className="text-foreground">We describe, we do not instruct.</strong>{' '}
              AlphaPicker tells you what the data says about a fund. It does not tell you what to
              buy, does not build portfolios for you, and does not offer personalised
              recommendations — that is investment advice, which requires a SEBI Investment
              Adviser registration we do not hold.
            </li>
          </ul>
        </Section>

        <Section id="scheme-documents" title="Scheme documents">
          <p>
            Before investing in any scheme, read its Scheme Information Document (SID), Statement
            of Additional Information (SAI) and Key Information Memorandum (KIM). These are
            published by the asset management company and are the authoritative description of
            the scheme — its objective, strategy, risks, costs and terms. Nothing on AlphaPicker
            replaces them.
          </p>
          <p>
            Every AMC publishes these on its own website, and{' '}
            <a
              href="https://www.amfiindia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              AMFI
            </a>{' '}
            maintains the list of registered fund houses and their disclosures.
          </p>
          {/* TODO before go-live (AMFI item 5): render per-scheme SID/SAI/KIM deep links
              inside the fund drawer, next to each fund, not only on this page. A single
              site-wide link is the floor, not the target. Tracked in 00_GO_LIVE_TRACKER.md. */}
        </Section>

        <Section id="risk" title="Risk">
          <p>
            Mutual fund investments are subject to market risks. Read all scheme-related
            documents carefully. Past performance is not indicative of future results, and
            nothing on AlphaPicker — including any score, ranking, attribution or historical
            statistic — is a prediction of, or a promise about, future returns.
          </p>
          <p>
            AlphaPicker&apos;s scores are the output of a statistical model applied to historical
            data. Models are wrong in ways their authors do not anticipate. Treat the numbers as
            one input to your own judgement, not a substitute for it.
          </p>
        </Section>

        <Section id="grievance" title="Complaints">
          <p>
            If something here is wrong, misleading, or you have a complaint about how AlphaPicker
            has dealt with you, write to{' '}
            <a
              href="mailto:skochar999@gmail.com"
              className="text-primary underline underline-offset-4"
            >
              skochar999@gmail.com
            </a>{' '}
            and you will get a reply.
          </p>
          {IS_DISTRIBUTOR && (
            <p>
              Complaints about a mutual fund scheme or an AMC can be raised with the AMC directly,
              with AMFI, or through SEBI&apos;s{' '}
              <a
                href="https://scores.sebi.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                SCORES
              </a>{' '}
              platform.
            </p>
          )}
        </Section>

        <p className="mt-10 text-xs text-muted-foreground">
          This page is maintained manually and is intended to be complete. If you think something
          is missing from it, that is worth an email.
        </p>
      </div>

      <Footer />
    </main>
  )
}
