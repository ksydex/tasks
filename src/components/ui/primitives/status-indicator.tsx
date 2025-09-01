import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { componentBorderRadius } from "@/lib/style-utils"

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> {
  icon?: React.ReactNode
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
}

const statusIndicatorVariants = cva(
  `inline-flex items-center gap-1 text-xs px-2 py-1 ${componentBorderRadius.status} border transition-colors`,
  {
    variants: {
      variant: {
        success: "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
        warning: "text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
        error: "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
        info: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
        neutral: "text-muted-foreground bg-muted/20 border-border"
      }
    },
    defaultVariants: {
      variant: "neutral"
    }
  }
)

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(statusIndicatorVariants({ variant }), className)}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0">
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
