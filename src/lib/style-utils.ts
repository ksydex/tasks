/**
 * =====================================
 *          STYLE UTILITIES
 * =====================================
 *
 * Common styling patterns and utility functions
 * Reduces duplication and provides consistent patterns
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { designTokens, componentTokens } from "./design-tokens";

/**
 * Enhanced className utility that merges Tailwind classes properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Focus ring utility - consistent focus styles across components
 */
export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * Common transition patterns
 */
export const transitions = {
  default: "transition-colors duration-200 ease-out",
  transform: "transition-transform duration-200 ease-out",
  shadow: "transition-shadow duration-200 ease-out",
  all: "transition-all duration-200 ease-out",
} as const;

/**
 * Interactive state classes
 */
export const interactiveStates = {
  hover: "hover:bg-accent hover:text-accent-foreground",
  pressed: "active:scale-95",
  disabled: "disabled:pointer-events-none disabled:opacity-50",
  loading: "animate-pulse pointer-events-none",
} as const;

/**
 * Layout utility classes
 */
export const layouts = {
  // Flex patterns
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexStart: "flex items-center justify-start",
  flexEnd: "flex items-center justify-end",

  // Grid patterns
  gridCols2: "grid grid-cols-2 gap-4",
  gridCols3: "grid grid-cols-3 gap-4",
  gridCols4: "grid grid-cols-4 gap-4",
  gridResponsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",

  // Container patterns
  container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  section: "py-8 md:py-12 lg:py-16",
} as const;

/**
 * Typography utility classes
 */
export const typography = {
  heading1: "text-4xl font-bold tracking-tight lg:text-5xl",
  heading2: "text-3xl font-semibold tracking-tight",
  heading3: "text-2xl font-semibold tracking-tight",
  heading4: "text-xl font-semibold tracking-tight",
  body: "text-base leading-7",
  bodySmall: "text-sm leading-6",
  caption: "text-xs text-muted-foreground",
  lead: "text-xl text-muted-foreground leading-relaxed",
} as const;

/**
 * Component-specific style builders
 */
export const styleBuilders = {
  /**
   * Creates consistent card styling
   */
  card: (options?: {
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    border?: boolean;
  }) => {
    const { padding = 'md', hover = false, border = true } = options || {};

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    return cn(
      'rounded-lg bg-card text-card-foreground',
      border && 'border shadow-sm',
      paddingClasses[padding],
      hover && 'hover:shadow-md transition-shadow',
    );
  },

  /**
   * Creates consistent form field styling
   */
  formField: (options?: {
    size?: 'sm' | 'md' | 'lg';
    state?: 'default' | 'error' | 'success';
  }) => {
    const { size = 'md', state = 'default' } = options || {};

    const sizeClasses = {
      sm: 'h-8 px-2 text-xs',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base'
    };

    const stateClasses = {
      default: 'border-input focus-visible:ring-ring',
      error: 'border-destructive focus-visible:ring-destructive',
      success: 'border-green-500 focus-visible:ring-green-500'
    };

    return cn(
      'flex w-full rounded-md border bg-background',
      'ring-offset-background placeholder:text-muted-foreground',
      focusRing,
      interactiveStates.disabled,
      sizeClasses[size],
      stateClasses[state]
    );
  },

  /**
   * Creates consistent button styling (supplements the variant system)
   */
  iconButton: (size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12'
    };

    return cn(
      'inline-flex items-center justify-center rounded-md',
      'hover:bg-accent hover:text-accent-foreground',
      focusRing,
      transitions.default,
      sizes[size]
    );
  }
};

/**
 * Responsive design utilities
 */
export const responsive = {
  // Common breakpoint patterns
  mobileFirst: "flex flex-col sm:flex-row",
  hideOnMobile: "hidden sm:flex",
  showOnMobile: "flex sm:hidden",

  // Grid responsive patterns
  responsiveGrid: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  responsiveColumns: "columns-1 gap-4 sm:columns-2 lg:columns-3",
} as const;

/**
 * Animation utilities
 */
export const animations = {
  fadeIn: "animate-in fade-in-0 duration-200",
  fadeOut: "animate-out fade-out-0 duration-200",
  slideIn: "animate-in slide-in-from-bottom-4 duration-300",
  slideOut: "animate-out slide-out-to-bottom-4 duration-300",
  scaleIn: "animate-in zoom-in-95 duration-200",
  scaleOut: "animate-out zoom-out-95 duration-200",
} as const;

/**
 * Creates CSS variables for dynamic theming
 */
export const createThemeVars = (theme: Record<string, string>) => {
  return Object.entries(theme).reduce((acc, [key, value]) => {
    acc[`--${key}`] = value;
    return acc;
  }, {} as Record<string, string>);
};

/**
 * Safely access design tokens with fallbacks
 */
export const getToken = (path: string, fallback: string = '') => {
  try {
    const keys = path.split('.');
    let value: any = designTokens;

    for (const key of keys) {
      value = value?.[key];
    }

    return value || fallback;
  } catch {
    return fallback;
  }
};
