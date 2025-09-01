import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { Clock, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import { componentBorderRadius } from "@/lib/style-utils"
import { getDueDateStatus, type DueDateStatus, type Priority } from "@/lib/status-colors"

export interface DueStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dueStatusVariants> {
  dueDate?: Date
  priority?: Priority
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
    priority = "medium",
    showIcon = true,
    showPriority = false,
    size = "md",
    children,
    ...props
  }, ref) => {
    const status: DueDateStatus = dueDate ? getDueDateStatus(dueDate) : "normal"

    const getIcon = () => {
      if (!showIcon) return null
      if (status === "overdue") return <AlertTriangle className="h-3 w-3" />
      return <Clock className="h-3 w-3" />
    }

    const getPriorityText = () => {
      if (!showPriority) return null
      return priority.charAt(0).toUpperCase() + priority.slice(1)
    }

    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      })
    }

    return (
      <div
        ref={ref}
        className={cn(
          dueStatusVariants({ status, size }),
          className
        )}
        {...props}
      >
        {getIcon()}
        <span>
          {children || (dueDate ? formatDate(dueDate) : "No due date")}
        </span>
        {getPriorityText() && (
          <>
            <span className="text-muted-foreground">•</span>
            <span className="font-medium">{getPriorityText()}</span>
          </>
        )}
      </div>
    )
  }
)
DueStatus.displayName = "DueStatus"

export { DueStatus, dueStatusVariants }
