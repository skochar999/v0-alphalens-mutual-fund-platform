export function fmtPct(v: number | null, digits = 1): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—'
  const sign = v > 0 ? '+' : ''
  return `${sign}${v.toFixed(digits)}%`
}

export function fmtNum(v: number | null, digits = 1): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—'
  return v.toFixed(digits)
}

export function fmtRate(v: number | null): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—'
  return `${Math.round(v * 100)}%`
}

// TER stored as fraction (0.014 => 1.40%)
export function fmtTer(v: number | null): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—'
  return `${(v * 100).toFixed(2)}%`
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
