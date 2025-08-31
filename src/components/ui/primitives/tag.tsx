import * as React from "react"
import { Badge, type BadgeProps } from "./badge"
import { createTagStyles } from "@/lib/status-colors"
import { cn } from "@/lib/utils"

export interface TagProps extends Omit<BadgeProps, "style"> {
  color: string
  icon?: React.ReactNode
}

const Tag = ({ className, color, icon, children, ...props }: TagProps) => {
  const tagStyles = createTagStyles(color)

  return (
    <Badge
      variant="secondary"
      className={cn("gap-1 text-xs px-2 py-0 border", className)}
      style={{
        backgroundColor: tagStyles.backgroundColor,
        color: tagStyles.color,
        borderColor: tagStyles.borderColor
      }}
      {...props}
    >
      {icon && <span className="text-[10px] flex-shrink-0">{icon}</span>}
      {children}
    </Badge>
  )
}
Tag.displayName = "Tag"

export { Tag }
