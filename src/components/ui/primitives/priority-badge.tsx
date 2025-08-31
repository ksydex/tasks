import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { priorityBadgeVariants, type Priority } from "@/lib/status-colors"

export interface PriorityBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priorityBadgeVariants> {
  priority?: Priority
  showAccent?: boolean
}

const PriorityBadge = React.forwardRef<HTMLDivElement, PriorityBadgeProps>(
  ({ className, priority = "medium", showAccent = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          priorityBadgeVariants({ priority }),
          showAccent && "border-l-4",
          className
        )}
        {...props}
      >
        {children || priority.charAt(0).toUpperCase() + priority.slice(1)}
      </div>
    )
  }
)
PriorityBadge.displayName = "PriorityBadge"

export { PriorityBadge, priorityBadgeVariants }
