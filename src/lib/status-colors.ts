/**
 * =====================================
 *         STATUS COLOR SYSTEM
 * =====================================
 *
 * Semantic color definitions for task statuses and priorities
 * Replaces hardcoded color values with systematic approach
 */

import { cva } from "class-variance-authority"
import { componentBorderRadius } from "./style-utils";

/**
 * Due date status colors
 */
export const dueDateColors = {
  overdue: {
    text: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    icon: "text-destructive"
  },
  dueToday: {
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-800",
    icon: "text-orange-600 dark:text-orange-400"
  },
  dueSoon: {
    text: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    border: "border-yellow-200 dark:border-yellow-800",
    icon: "text-yellow-600 dark:text-yellow-400"
  },
  normal: {
    text: "text-muted-foreground",
    bg: "bg-muted/20",
    border: "border-border",
    icon: "text-muted-foreground"
  }
} as const;

/**
 * Task priority colors
 */
export const priorityColors = {
  low: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-l-blue-400",
    accent: "bg-blue-400"
  },
  medium: {
    text: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    border: "border-l-yellow-400",
    accent: "bg-yellow-400"
  },
  high: {
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-l-orange-400",
    accent: "bg-orange-400"
  },
  urgent: {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-l-red-400",
    accent: "bg-red-400"
  }
} as const;

/**
 * Status indicator component variants
 */
export const statusIndicatorVariants = cva(
  `inline-flex items-center gap-1 text-xs px-2 py-1 ${componentBorderRadius.status} transition-colors`,
  {
    variants: {
      status: {
        overdue: [
          dueDateColors.overdue.text,
          dueDateColors.overdue.bg,
          dueDateColors.overdue.border,
          "border"
        ].join(" "),
        dueToday: [
          dueDateColors.dueToday.text,
          dueDateColors.dueToday.bg,
          dueDateColors.dueToday.border,
          "border"
        ].join(" "),
        dueSoon: [
          dueDateColors.dueSoon.text,
          dueDateColors.dueSoon.bg,
          dueDateColors.dueSoon.border,
          "border"
        ].join(" "),
        normal: [
          dueDateColors.normal.text,
          dueDateColors.normal.bg,
          dueDateColors.normal.border,
          "border"
        ].join(" ")
      }
    },
    defaultVariants: {
      status: "normal"
    }
  }
);

/**
 * Priority badge variants
 */
export const priorityBadgeVariants = cva(
  `inline-flex items-center gap-1 text-xs px-2 py-0.5 ${componentBorderRadius.status} font-medium transition-colors`,
  {
    variants: {
      priority: {
        low: [
          priorityColors.low.text,
          priorityColors.low.bg,
          "border border-blue-200 dark:border-blue-800"
        ].join(" "),
        medium: [
          priorityColors.medium.text,
          priorityColors.medium.bg,
          "border border-yellow-200 dark:border-yellow-800"
        ].join(" "),
        high: [
          priorityColors.high.text,
          priorityColors.high.bg,
          "border border-orange-200 dark:border-orange-800"
        ].join(" "),
        urgent: [
          priorityColors.urgent.text,
          priorityColors.urgent.bg,
          "border border-red-200 dark:border-red-800"
        ].join(" ")
      }
    },
    defaultVariants: {
      priority: "medium"
    }
  }
);

/**
 * Utility function to create dynamic color styles for tags
 */
export const createTagStyles = (color: string) => ({
  backgroundColor: `${color}15`, // 15% opacity
  color: color,
  borderColor: `${color}30` // 30% opacity
});

/**
 * Get due date status from date
 */
export const getDueDateStatus = (dueDate: Date): keyof typeof dueDateColors => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "overdue";
  if (diffDays === 0) return "dueToday";
  if (diffDays <= 3) return "dueSoon";
  return "normal";
};

/**
 * Type exports
 */
export type DueDateStatus = keyof typeof dueDateColors;
export type Priority = keyof typeof priorityColors;
export type StatusIndicatorVariant = Parameters<typeof statusIndicatorVariants>[0];
export type PriorityBadgeVariant = Parameters<typeof priorityBadgeVariants>[0];
