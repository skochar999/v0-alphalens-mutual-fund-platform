export function fmtPct(v: number | null, digits = 1): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—'
  const sign = v > 0 ? '+' : ''
  return `${sign}${v.toFixed(digits)}%`
}

// Format a rupee amount into lakh/crore notation
export function fmtRupees(v: number): string {
  if (!Number.isFinite(v)) return '—'
  const abs = Math.abs(v)
  if (abs >= 1e7) {
    return `₹${(v / 1e7).toFixed(2)} Cr`
  }
  if (abs >= 1e5) {
    return `₹${(v / 1e5).toFixed(2)} L`
  }
  return `₹${Math.round(v).toLocaleString('en-IN')}`
}

// Format an ISO datetime into "4 Jun 2026"
export function fmtAsOf(iso: string | null | undefined): string | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  const day = d.getDate()
  const month = d.toLocaleString('en-GB', { month: 'short' })
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}

export function fmtNum(v: number | null, digits = 1): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—'
  return v.toFixed(digits)
}

// hrate is already percent-scaled (e.g. 47 => 47%)
export function fmtRate(v: number | null): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—'
  return `${Math.round(v)}%`
}

// TER is already percent-scaled (e.g. 1.4 => 1.40%)
export function fmtTer(v: number | null): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—'
  return `${v.toFixed(2)}%`
}

// pickAnn is basis-point-like (e.g. 2463.4 => +24.6%)
export function fmtPickAnn(v: number | null): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—'
  const pct = v / 100
  const sign = pct > 0 ? '+' : ''
  return `${sign}${pct.toFixed(1)}%`
}

export function scoreColor(score: number): {
  bg: string
  text: string
  label: string
} {
  if (score >= 60)
    return { bg: 'bg-positive/12', text: 'text-positive', label: 'Strong' }
  if (score >= 40)
    return { bg: 'bg-warning/12', text: 'text-warning', label: 'Average' }
  return { bg: 'bg-negative/12', text: 'text-negative', label: 'Weak' }
}
