import { scoreColor } from '@/lib/format'

/**
 * The score is the single most-read number on the site, so it is set in mono
 * tabular figures and given a hairline rather than a filled pill — a filled
 * badge reads as a rating stamp, which is precisely the thing AlphaPicker is
 * positioned against (08 §5: never imply a rating we do not issue).
 */
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
      className={`num inline-flex items-center justify-center rounded-sm border border-current/20 font-semibold ${bg} ${text} ${
        size === 'lg' ? 'px-2.5 py-1 text-base' : 'px-2 py-0.5 text-sm'
      }`}
    >
      {score.toFixed(1)}
    </span>
  )
}
