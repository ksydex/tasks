import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { Clock, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import { componentBorderRadius } from "@/lib/style-utils"
import { getDueDateStatus, type DueDateStatus, type Priority } from "@/lib/status-colors"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface DueStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dueStatusVariants> {
  dueDate?: Date
  priority?: Priority | null
  showIcon?: boolean
  showPriority?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const dueStatusVariants = cva(
  `inline-flex items-center ${componentBorderRadius.status} border transition-colors`,
  {
    variants: {
      status: {
        overdue: "text-destructive bg-destructive/10 border-destructive/20",
        dueToday: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800",
        dueSoon: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
        normal: "text-muted-foreground bg-muted/20 border-border"
      },
      size: {
        sm: "text-xs px-1.5 py-0.5 gap-1",
        md: "text-xs px-2 py-1 gap-1",
        lg: "text-sm px-2.5 py-1.5 gap-1.5"
      }
    },
    defaultVariants: {
      status: "normal",
      size: "md"
    }
  }
)

const DueStatus = React.forwardRef<HTMLDivElement, DueStatusProps>(
  ({
    className,
    dueDate,
    priority,
    showIcon = true,
    showPriority = false,
    size = "md",
    children,
    ...props
  }, ref) => {
    const status: DueDateStatus = dueDate ? getDueDateStatus(dueDate) : "normal"

    const getIcon = () => {
      if (!showIcon) return null
      if (!dueDate) return null
      if (status === "overdue") return <AlertTriangle className="h-3 w-3" />
      return <Clock className="h-3 w-3" />
    }

    const getPriorityText = () => {
      if (!showPriority || !priority || typeof priority !== 'string') return null
      try {
        return priority.charAt(0).toUpperCase() + priority.slice(1)
      } catch (error) {
        console.warn('Error formatting priority text:', error)
        return null
      }
    }

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      })
    }

    const formatRelativeTime = (date: Date) => {
      const now = new Date()
      const due = new Date(date)
      const diffTime = due.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays < 0) {
        return `Overdue ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`
      }
      if (diffDays === 0) {
        return 'Due today'
      }
      if (diffDays === 1) {
        return 'Due tomorrow'
      }
      if (diffDays <= 3) {
        return `Due in ${diffDays} days`
      }
      return formatDate(date)
    }

    const shouldShowRelativeTime = (date: Date) => {
      const now = new Date()
      const due = new Date(date)
      const diffTime = due.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 3 && diffDays >= -3 // Within 4 days (including overdue)
    }

    const hasPriority = !!(showPriority && priority && typeof priority === 'string')
    const displayText = (children as React.ReactNode) ?? (dueDate ? formatRelativeTime(dueDate) : null)

    // If no due date, no priority to show, and no custom children provided — render nothing
    if (!dueDate && !hasPriority && !children) {
      return null
    }
    const showTooltip = dueDate && shouldShowRelativeTime(dueDate)
    const actualDate = dueDate ? formatDate(dueDate) : null

    const statusContent = (
      <div
        ref={ref}
        className={cn(
          dueStatusVariants({ status, size }),
          className
        )}
        {...props}
      >
        {getIcon()}
        {displayText && (
          <span>
            {displayText}
          </span>
        )}
        {getPriorityText() && (
          <>
            {displayText && <span className="text-muted-foreground">•</span>}
            <span className="font-medium">{getPriorityText()}</span>
          </>
        )}
      </div>
    )

    if (showTooltip && actualDate) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {statusContent}
            </TooltipTrigger>
            <TooltipContent>
              <p>{actualDate}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return statusContent
  }
)
DueStatus.displayName = "DueStatus"

export { DueStatus, dueStatusVariants }
