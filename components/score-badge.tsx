import { scoreColor } from '@/lib/format'

export function ScoreBadge({
  score,
  size = 'sm',
}: {
  score: number
  size?: 'sm' | 'lg'
}) {
  const { bg, text } = scoreColor(score)
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md font-semibold tabular-nums ${bg} ${text} ${
        size === 'lg' ? 'px-3 py-1.5 text-base' : 'px-2 py-0.5 text-sm'
      }`}
    >
      {score.toFixed(1)}
    </span>
  )
}
