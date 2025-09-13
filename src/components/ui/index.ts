/**
 * =====================================
 *            UI LIBRARY INDEX
 * =====================================
 *
 * Main entry point for all UI components
 * Maintains backward compatibility while organizing components
 */

// Primitives - Basic building blocks
export * from "./primitives"

// Composites - Complex components
export * from "./composites"

// Patterns - Complete UI workflows
export * from "./patterns"

// Legacy exports - maintain backward compatibility
// These will be gradually deprecated in favor of organized imports

export { Button, buttonVariants } from "./button"
export { Input, inputVariants } from "./input"
export { Badge, badgeVariants } from "./badge"
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
} from "./card"

// Other existing components (not yet organized)
export * from "./accordion"
export * from "./alert-dialog"
export * from "./alert"
export * from "./aspect-ratio"
export * from "./avatar"
export * from "./breadcrumb"
export * from "./calendar"
export * from "./carousel"
export * from "./chart"
export * from "./checkbox"
export * from "./collapsible"
export * from "./command"
export * from "./context-menu"
export * from "./drawer"
export * from "./dropdown-menu"
export * from "./hover-card"
export * from "./input-otp"
export * from "./label"
export * from "./menubar"
export * from "./multi-select"
export * from "./navigation-menu"
export * from "./pagination"
export * from "./popover"
export * from "./progress"
export * from "./radio-group"
export * from "./resizable"
export * from "./scroll-area"
export * from "./select"
export * from "./select-dropdown"
export * from "./separator"
export * from "./sheet"
export * from "./sidebar"
export * from "./skeleton"
export * from "./slider"
export * from "./sonner"
export * from "./switch"
export * from "./table"
export * from "./tabs"
export * from "./textarea"
export * from "./toast"

export * from "./toggle-group"
export * from "./toggle"
export * from "./tooltip"
