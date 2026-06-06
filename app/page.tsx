'use client'

import { useState } from 'react'
import useSWR from 'swr'
import {
  fetchAmcs,
  fetchCategories,
  fetchFunds,
  fetchStats,
  type Fund,
} from '@/lib/types'
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { RankingsTable } from '@/components/rankings-table'
import { FundDrawer } from '@/components/fund-drawer'
import { Footer } from '@/components/footer'

export default function Page() {
  const { data: funds, isLoading: fundsLoading } = useSWR('funds', fetchFunds)
  const { data: stats, isLoading: statsLoading } = useSWR('stats', fetchStats)
  const { data: categories } = useSWR('categories', fetchCategories)
  const { data: amcs } = useSWR('amcs', fetchAmcs)

  const [selected, setSelected] = useState<Fund | null>(null)

  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero stats={stats ?? null} loading={statsLoading} />
      <HowItWorks />
      <RankingsTable
        funds={funds ?? []}
        categories={categories ?? []}
        amcs={amcs ?? []}
        loading={fundsLoading}
        onSelect={setSelected}
      />
      <Footer />
      <FundDrawer fund={selected} onClose={() => setSelected(null)} />
    </main>
  )
}
