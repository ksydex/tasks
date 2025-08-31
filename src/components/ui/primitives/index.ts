/**
 * =====================================
 *          PRIMITIVE COMPONENTS
 * =====================================
 *
 * Basic building blocks with minimal styling
 * These components handle single responsibilities
 */

// Form elements
export * from "./button"
export * from "./input"
export * from "./badge"
export * from "./text"

// Status components
export * from "./status-indicator"
export * from "./priority-badge"

// Re-export for backward compatibility
export { Button, type ButtonProps } from "./button"
export { Input, type InputProps } from "./input"
export { Badge, type BadgeProps } from "./badge"
export { Text, type TextProps } from "./text"
export { StatusIndicator, type StatusIndicatorProps } from "./status-indicator"
export { PriorityBadge, type PriorityBadgeProps } from "./priority-badge"
