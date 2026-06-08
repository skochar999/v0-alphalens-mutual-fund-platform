'use client'

import { useEffect, useRef, useState } from 'react'

const POSITIVE = '#34d399'
const NEGATIVE = '#f87171'
const BLUE = '#60a5fa'
const GRID = 'rgba(148, 163, 184, 0.12)'
const AXIS = 'rgba(148, 163, 184, 0.35)'

type Point = { x: number; y: number; r: number; vy: number; c: string }

// Deterministic-ish pseudo random for stable SSR/CSR start
function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

// Compact large numbers, e.g. 4_350_000 -> "4.35M"
function fmtCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return `${n}`
}

export function QuantEngine({ nFunds }: { nFunds?: number | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [readout, setReadout] = useState({
    points: 0,
    r2: 0.0,
    factors: 0,
    funds: 0,
  })
  const [log, setLog] = useState<string[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0
    let H = 0

    function resize() {
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // The "true" model the points scatter around (slope wanders slowly)
    let trueSlope = 0.55
    let trueIntercept = 0.18
    // The model's current fitted line (eased toward least-squares fit)
    let fitSlope = 0.2
    let fitIntercept = 0.5

    let points: Point[] = []
    const MAX_POINTS = 90

    function spawn() {
      const x = rand(0.04, 0.96)
      const noise = rand(-0.16, 0.16)
      const y = Math.min(0.97, Math.max(0.03, trueSlope * x + trueIntercept + noise))
      const above = noise > 0.06
      const below = noise < -0.06
      points.push({
        x,
        y,
        r: rand(1.4, 3.2),
        vy: 0,
        c: above ? POSITIVE : below ? NEGATIVE : 'rgba(148,163,184,0.7)',
      })
      if (points.length > MAX_POINTS) points.shift()
    }

    // seed
    for (let i = 0; i < 45; i++) spawn()

    let frame = 0
    let lastSpawn = 0
    let regCount = 0

    function leastSquares() {
      if (points.length < 2) return
      let sx = 0
      let sy = 0
      let sxy = 0
      let sxx = 0
      const n = points.length
      for (const p of points) {
        sx += p.x
        sy += p.y
        sxy += p.x * p.y
        sxx += p.x * p.x
      }
      const denom = n * sxx - sx * sx
      if (Math.abs(denom) < 1e-6) return
      const m = (n * sxy - sx * sy) / denom
      const b = (sy - m * sx) / n
      // ease toward the computed fit
      fitSlope += (m - fitSlope) * 0.08
      fitIntercept += (b - fitIntercept) * 0.08
    }

    function px(x: number) {
      return 16 + x * (W - 32)
    }
    function py(y: number) {
      return H - 16 - y * (H - 32)
    }

    function draw(t: number) {
      frame++
      // wander the true model slowly so the line keeps re-fitting
      trueSlope += Math.sin(t / 4000) * 0.0015
      trueIntercept += Math.cos(t / 5200) * 0.0009

      // spawn new streaming points
      if (t - lastSpawn > 90) {
        spawn()
        lastSpawn = t
        regCount++
      }

      leastSquares()

      ctx.clearRect(0, 0, W, H)

      // grid
      ctx.lineWidth = 1
      ctx.strokeStyle = GRID
      const cols = 10
      const rows = 6
      for (let i = 0; i <= cols; i++) {
        const x = 16 + (i / cols) * (W - 32)
        ctx.beginPath()
        ctx.moveTo(x, 12)
        ctx.lineTo(x, H - 12)
        ctx.stroke()
      }
      for (let i = 0; i <= rows; i++) {
        const y = 12 + (i / rows) * (H - 24)
        ctx.beginPath()
        ctx.moveTo(12, y)
        ctx.lineTo(W - 12, y)
        ctx.stroke()
      }

      // axes
      ctx.strokeStyle = AXIS
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(16, H - 16)
      ctx.lineTo(W - 16, H - 16)
      ctx.moveTo(16, 12)
      ctx.lineTo(16, H - 16)
      ctx.stroke()

      // confidence band around fit
      const y1a = fitSlope * 0 + fitIntercept
      const y2a = fitSlope * 1 + fitIntercept
      const band = 0.085
      ctx.fillStyle = 'rgba(96, 165, 250, 0.10)'
      ctx.beginPath()
      ctx.moveTo(px(0), py(y1a + band))
      ctx.lineTo(px(1), py(y2a + band))
      ctx.lineTo(px(1), py(y2a - band))
      ctx.lineTo(px(0), py(y1a - band))
      ctx.closePath()
      ctx.fill()

      // points + residual ticks
      for (const p of points) {
        const fy = fitSlope * p.x + fitIntercept
        // residual line
        ctx.strokeStyle = 'rgba(148,163,184,0.25)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(px(p.x), py(p.y))
        ctx.lineTo(px(p.x), py(fy))
        ctx.stroke()
        // dot
        ctx.fillStyle = p.c
        ctx.beginPath()
        ctx.arc(px(p.x), py(p.y), p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // fitted regression line (glowing)
      ctx.shadowColor = BLUE
      ctx.shadowBlur = 12
      ctx.strokeStyle = BLUE
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(px(0), py(fitSlope * 0 + fitIntercept))
      ctx.lineTo(px(1), py(fitSlope * 1 + fitIntercept))
      ctx.stroke()
      ctx.shadowBlur = 0

      // sweep scan line
      const sweep = (Math.sin(t / 1400) * 0.5 + 0.5)
      ctx.strokeStyle = 'rgba(96,165,250,0.35)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(px(sweep), 12)
      ctx.lineTo(px(sweep), H - 16)
      ctx.stroke()

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    // HUD updates (decoupled from rAF to limit React renders)
    let funds = 0
    let dataPoints = 4_200_000
    const fundCap = nFunds ?? 0
    const hud = setInterval(() => {
      funds = fundCap > 0 ? Math.min(fundCap, funds + Math.round(rand(3, 11))) : 0
      dataPoints += Math.round(rand(28000, 96000))
      const r2 = 0.82 + Math.sin(Date.now() / 2200) * 0.06
      setReadout({
        points: dataPoints,
        r2,
        factors: 4,
        funds,
      })
    }, 700)

    const messages = [
      'fetching NAV history · 10y daily',
      'aligning to Nifty 500 TRI benchmark',
      'estimating factor loadings (OLS)',
      'decomposing α: market · style · selection · timing',
      'bootstrapping 10,000 return paths',
      'computing t-stats on stock-selection α',
      'cross-validating across rolling windows',
      'ranking by risk-adjusted skill',
    ]
    let mi = 0
    setLog([messages[0]])
    const logTimer = setInterval(() => {
      mi = (mi + 1) % messages.length
      setLog((prev) => [...prev.slice(-3), messages[mi]])
    }, 1600)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      clearInterval(hud)
      clearInterval(logTimer)
    }
  }, [nFunds])

  return (
    <div className="animate-hero-in relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-950 shadow-xl">
      {/* canvas */}
      <div className="relative">
        <canvas ref={canvasRef} className="block h-64 w-full sm:h-72" />
        <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          excess return vs market beta
        </div>
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-slate-950/70 px-2 py-0.5 font-mono text-[10px] text-emerald-400 backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          LIVE
        </span>
      </div>

      {/* HUD readouts */}
      <div className="grid grid-cols-3 gap-px border-t border-slate-700/50 bg-slate-700/40">
        <Metric label="data points analyzed" value={fmtCompact(readout.points)} tone="text-sky-300" />
        <Metric label="model R²" value={readout.r2.toFixed(3)} tone="text-emerald-300" />
        <Metric label="funds analyzed" value={`${readout.funds}/${nFunds ?? '—'}`} tone="text-slate-100" />
      </div>

      {/* log ticker */}
      <div className="space-y-1 border-t border-slate-700/50 bg-slate-950 px-4 py-3 font-mono text-[11px] leading-relaxed">
        {log.map((line, i) => (
          <div
            key={`${line}-${i}`}
            className={
              i === log.length - 1 ? 'text-emerald-300' : 'text-slate-500'
            }
          >
            <span className="text-slate-600">{'> '}</span>
            {line}
            {i === log.length - 1 ? <span className="animate-pulse">▋</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: string
}) {
  return (
    <div className="bg-slate-950 px-3 py-3">
      <div className={`font-mono text-lg font-semibold tabular-nums sm:text-xl ${tone}`}>
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
    </div>
  )
}
