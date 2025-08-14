import { cn } from "@/lib/utils"
import { Status } from "@/services/api/status"

interface StatusBadgeProps {
  status: Status
  className?: string
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  [Status.TO_REFINE]: {
    label: 'To Refine',
    className: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  [Status.SOMEDAY]: {
    label: 'Someday',
    className: 'bg-gray-100 text-gray-700 border-gray-200'
  },
  [Status.TODO]: {
    label: 'To Do',
    className: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  [Status.IN_PROGRESS]: {
    label: 'In Progress',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  [Status.DONE]: {
    label: 'Done',
    className: 'bg-green-100 text-green-800 border-green-200'
  }
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}