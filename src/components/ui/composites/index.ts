/**
 * =====================================
 *         COMPOSITE COMPONENTS
 * =====================================
 *
 * Complex components built from primitives
 * These handle multiple related responsibilities
 */

// Layout components
export * from "./card"

// Interactive components
export * from "./dialog"
export * from "./form"

// Status components
export * from "./due-status"

// Re-export for backward compatibility
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  type CardProps
} from "./card"

export { DueStatus, type DueStatusProps } from "./due-status"
