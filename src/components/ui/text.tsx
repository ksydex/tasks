import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { textVariants } from "@/lib/component-variants"

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, as: Comp = "p", ...props }, ref) => {
    return React.createElement(
      Comp,
      {
        className: cn(textVariants({ variant }), className),
        ref,
        ...props,
      }
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants }
