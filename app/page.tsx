'use client'

import { useState } from 'react'
import useSWR from 'swr'
import {
  fetchAmcs,
  fetchCategories,
  fetchFunds,
  fetchHealth,
  fetchStats,
  type Fund,
} from '@/lib/types'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { WaitlistBanner } from '@/components/waitlist-banner'
import { TheProblem } from '@/components/the-problem'
import { Calculator } from '@/components/calculator'
import { HowItWorks } from '@/components/how-it-works'
import { ScorePillars } from '@/components/score-pillars'
import { DoesItWork } from '@/components/does-it-work'
import { RankingsTable } from '@/components/rankings-table'
import { Methodology } from '@/components/methodology'
import { Pricing } from '@/components/pricing'
import { FundDrawer } from '@/components/fund-drawer'
import { Footer } from '@/components/footer'
import { AskAlphaPicker } from '@/components/ask-alphapicker'

export default function Page() {
  const { data: funds, isLoading: fundsLoading } = useSWR('funds', fetchFunds)
  const { data: stats, isLoading: statsLoading } = useSWR('stats', fetchStats)
  const { data: categories } = useSWR('categories', fetchCategories)
  const { data: amcs } = useSWR('amcs', fetchAmcs)
  const { data: health } = useSWR('health', fetchHealth)

  const [selected, setSelected] = useState<Fund | null>(null)

  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero stats={stats ?? null} loading={statsLoading} />
      <WaitlistBanner />
      <TheProblem />
      <Calculator />
      <HowItWorks nFunds={stats?.n_funds ?? null} />
      <ScorePillars />
      <DoesItWork />
      <RankingsTable
        funds={funds ?? []}
        categories={categories ?? []}
        amcs={amcs ?? []}
        loading={fundsLoading}
        loadedAt={health?.loaded_at ?? null}
        onSelect={setSelected}
      />
      <Methodology methodology={stats?.methodology ?? null} nFunds={stats?.n_funds ?? null} />
      <Pricing />
      <Footer />
      <FundDrawer fund={selected} onClose={() => setSelected(null)} />
      <AskAlphaPicker />
    </main>
  )
}
