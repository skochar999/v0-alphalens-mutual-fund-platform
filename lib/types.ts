export interface Fund {
  code: number
  name: string
  amc: string
  cat: string
  score: number
  aret: number | null
  hrate: number | null
  pickAnn: number | null
  /** Months of holdings history behind pickAnn; <12 ⇒ pickAnn suppressed to null */
  pickN?: number | null
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
  /** Score v2 pillar percentiles (0–100); null without 12m of holdings */
  pSkill?: number | null
  pConv?: number | null
  pCost?: number | null
}

export interface Methodology {
  universe: string
  stock_picking_history: string
  score_formula?: string
  what_we_ignore?: string
  validation?: string
}

export interface Stats {
  n_funds: number
  pct_pos_alpha: number
  avg_total_ann: number
  avg_alpha_ann: number
  overall_beat: number
  as_of: string
  methodology?: Methodology
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

// Same-origin: requests go to alphapicker.in and are proxied to the Railway
// backend by the rewrites in next.config.mjs (some ISPs DNS-block
// *.up.railway.app, so the browser must never call it directly).
const BASE = ''

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
