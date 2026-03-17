import { cn } from '@/lib/utils'
import { getAIScoreBadge } from '@/lib/mock-data'

interface AIScoreBadgeProps {
  score: number
  showScore?: boolean
  className?: string
}

export function AIScoreBadge({ score, showScore = true, className }: AIScoreBadgeProps) {
  const { label, variant } = getAIScoreBadge(score)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-green-100 text-green-800': variant === 'high',
          'bg-amber-100 text-amber-800': variant === 'medium',
          'bg-red-100 text-red-800': variant === 'low',
        },
        className
      )}
    >
      {showScore && <span className="font-semibold">{score}</span>}
      <span>{label}</span>
    </span>
  )
}
