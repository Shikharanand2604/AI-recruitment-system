import { cn } from '@/lib/utils'
import type { ApplicationStatus, ApprovalStatus } from '@/lib/mock-data'

interface StatusBadgeProps {
  status: ApplicationStatus | ApprovalStatus
  className?: string
}

const statusStyles: Record<ApplicationStatus | ApprovalStatus, string> = {
  New: 'bg-blue-100 text-blue-800',
  Screening: 'bg-cyan-100 text-cyan-800',
  Interview: 'bg-indigo-100 text-indigo-800',
  Offer: 'bg-purple-100 text-purple-800',
  Hired: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Pending: 'bg-amber-100 text-amber-800',
  Approved: 'bg-green-100 text-green-800',
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status] || 'bg-gray-100 text-gray-800',
        className
      )}
    >
      {status}
    </span>
  )
}
