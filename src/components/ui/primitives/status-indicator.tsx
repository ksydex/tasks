import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { statusIndicatorVariants, dueDateColors, type DueDateStatus } from "@/lib/status-colors"

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> {
  icon?: React.ReactNode
  status?: DueDateStatus
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, status = "normal", icon, children, ...props }, ref) => {
    const iconColorClass = status ? dueDateColors[status].icon : dueDateColors.normal.icon;

    return (
      <div
        ref={ref}
        className={cn(statusIndicatorVariants({ status }), className)}
        {...props}
      >
        {icon && (
          <span className={cn("flex-shrink-0", iconColorClass)}>
            {icon}
          </span>
        )}
        {children}
      </div>
    )
  }
)
StatusIndicator.displayName = "StatusIndicator"

export { StatusIndicator, statusIndicatorVariants }
