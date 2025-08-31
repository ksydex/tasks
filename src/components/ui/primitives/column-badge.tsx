import * as React from "react"
import { Badge, type BadgeProps } from "./badge"
import { createTagStyles } from "@/lib/status-colors"
import { cn } from "@/lib/utils"

export interface ColumnBadgeProps extends Omit<BadgeProps, "style"> {
  color: string
  count: number
}

const ColumnBadge = ({ className, color, count, ...props }: ColumnBadgeProps) => {
  const tagStyles = createTagStyles(color)

  return (
    <Badge
      variant="secondary"
      className={cn("text-xs px-2 py-0.5", className)}
      style={{
        backgroundColor: tagStyles.backgroundColor,
        color: tagStyles.color
      }}
      {...props}
    >
      {count}
    </Badge>
  )
}
ColumnBadge.displayName = "ColumnBadge"

export { ColumnBadge }
