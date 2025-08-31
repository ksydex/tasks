/**
 * =====================================
 *       COMPONENT VARIANT SYSTEM
 * =====================================
 *
 * Centralized component variant definitions using class-variance-authority
 * This provides consistent styling patterns across all UI components
 */

import { cva } from "class-variance-authority";

/**
 * Button variants - exported for reuse across button-like components
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Card variants - for consistent card styling
 */
export const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hover: {
        none: "",
        lift: "hover:shadow-md transition-shadow",
        grow: "hover:scale-[1.02] transition-transform",
      }
    },
    defaultVariants: {
      padding: "md",
      hover: "none",
    },
  }
);

/**
 * Badge variants - for status indicators and labels
 */
export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Input variants - for form controls
 */
export const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3",
        lg: "h-12 px-4 text-base",
      },
      state: {
        default: "",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
      }
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
);

/**
 * Text variants - for consistent typography
 */
export const textVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

/**
 * Kanban-specific variants
 */
export const kanbanVariants = {
  column: cva(
    "flex flex-col bg-muted/20 rounded-lg p-4 min-h-[500px]",
    {
      variants: {
        size: {
          sm: "w-64",
          md: "w-72",
          lg: "w-80",
        }
      },
      defaultVariants: {
        size: "md",
      },
    }
  ),

  card: cva(
    "bg-card border rounded-lg p-3 shadow-sm cursor-pointer transition-all",
    {
      variants: {
        priority: {
          low: "border-l-4 border-l-blue-400",
          medium: "border-l-4 border-l-yellow-400",
          high: "border-l-4 border-l-red-400",
          urgent: "border-l-4 border-l-purple-600",
        },
        state: {
          default: "hover:shadow-md",
          dragging: "rotate-2 shadow-lg scale-105",
          selected: "ring-2 ring-primary ring-offset-2",
        }
      },
      defaultVariants: {
        priority: "medium",
        state: "default",
      },
    }
  ),
};

/**
 * Layout variants - for consistent spacing and positioning
 */
export const layoutVariants = {
  container: cva("mx-auto w-full", {
    variants: {
      size: {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        full: "max-w-full",
      },
      padding: {
        none: "",
        sm: "px-4",
        md: "px-6",
        lg: "px-8",
      }
    },
    defaultVariants: {
      size: "lg",
      padding: "md",
    },
  }),

  stack: cva("flex flex-col", {
    variants: {
      gap: {
        none: "",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
      }
    },
    defaultVariants: {
      gap: "md",
      align: "stretch",
    },
  }),
};

/**
 * Type exports for component props
 */
export type ButtonVariant = Parameters<typeof buttonVariants>[0];
export type CardVariant = Parameters<typeof cardVariants>[0];
export type BadgeVariant = Parameters<typeof badgeVariants>[0];
export type InputVariant = Parameters<typeof inputVariants>[0];
export type TextVariant = Parameters<typeof textVariants>[0];
