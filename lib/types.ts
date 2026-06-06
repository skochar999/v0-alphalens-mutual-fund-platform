export interface Fund {
  code: number
  name: string
  amc: string
  cat: string
  score: number
  aret: number | null
  hrate: number | null
  pickAnn: number | null
  ter: number | null
  ret: number | null
  mret: number | null
  navOnly: boolean
  decomp: boolean
  dStyle: number | null
  dSector: number | null
  dPick: number | null
  dTiming: number | null
  skill?: string
  catRank?: number
  catSize?: number
  ir?: number | null
  pickHit?: number | null
}

export interface Stats {
  n_funds: number
  pct_pos_alpha: number
  avg_total_ann: number
  avg_alpha_ann: number
  overall_beat: number
  as_of: string
}

export interface Category {
  cat: string
  count: number
}

export interface Amc {
  amc: string
  count: number
}

export interface Health {
  status: string
  funds: number
  loaded_at: string
  data_dir: string
}

const BASE = 'https://alphalens-production-21b7.up.railway.app'

async function getJson(path: string) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`Request failed: ${path}`)
  return res.json()
}

export async function fetchFunds(): Promise<Fund[]> {
  const data = await getJson('/api/funds')
  return Array.isArray(data) ? data : (data.funds ?? [])
}

export async function fetchStats(): Promise<Stats> {
  return getJson('/api/stats')
}

export async function fetchCategories(): Promise<Category[]> {
  return getJson('/api/categories')
}

export async function fetchAmcs(): Promise<Amc[]> {
  return getJson('/api/amcs')
}

export async function fetchHealth(): Promise<Health> {
  return getJson('/health')
}
