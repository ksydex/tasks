/**
 * =====================================
 *         DESIGN TOKENS SYSTEM
 * =====================================
 *
 * Centralized design token definitions that map to CSS variables
 * This provides type safety and IDE autocomplete for design values
 */

export const designTokens = {
  /**
   * Color tokens - semantic color definitions
   */
  colors: {
    // Base colors
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',

    // UI surfaces
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))'
    },
    popover: {
      DEFAULT: 'hsl(var(--popover))',
      foreground: 'hsl(var(--popover-foreground))'
    },

    // Brand colors
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))'
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))'
    },

    // Functional colors
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))'
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))'
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))'
    },

    // Interactive elements
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',

    // Chart colors
    chart: {
      1: 'hsl(var(--chart-1))',
      2: 'hsl(var(--chart-2))',
      3: 'hsl(var(--chart-3))',
      4: 'hsl(var(--chart-4))',
      5: 'hsl(var(--chart-5))'
    },

    // Sidebar specific
    sidebar: {
      DEFAULT: 'hsl(var(--sidebar-background))',
      foreground: 'hsl(var(--sidebar-foreground))',
      primary: 'hsl(var(--sidebar-primary))',
      'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
      accent: 'hsl(var(--sidebar-accent))',
      'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
      border: 'hsl(var(--sidebar-border))',
      ring: 'hsl(var(--sidebar-ring))'
    }
  },

  /**
   * Spacing tokens - consistent spacing scale
   */
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },

  /**
   * Border radius tokens
   */
  borderRadius: {
    none: '0',
    sm: 'calc(var(--radius) - 4px)',    // 4px
    md: 'calc(var(--radius) - 2px)',     // 6px
    lg: 'var(--radius)',                 // 12px
    xl: 'calc(var(--radius) + 4px)',    // 16px
    full: '9999px'
  },

  /**
   * Typography tokens
   */
  typography: {
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },

  /**
   * Animation tokens
   */
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms'
    },
    easing: {
      ease: 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out'
    }
  },

  /**
   * Shadow tokens
   */
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  }
} as const;

/**
 * Component-specific design constants
 */
export const componentTokens = {
  button: {
    height: {
      sm: '2rem',     // 32px
      md: '2.25rem',  // 36px
      lg: '2.5rem'    // 40px
    },
    padding: {
      sm: '0.5rem 0.75rem',
      md: '0.5rem 1rem',
      lg: '0.5rem 1.5rem'
    }
  },

  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem'
    },
    gap: '1rem'
  },

  input: {
    height: '2.25rem', // 36px
    padding: '0.5rem 0.75rem'
  },

  kanban: {
    column: {
      width: '18rem',    // 288px
      gap: '1rem',
      padding: '1rem'
    },
    card: {
      minHeight: '7.5rem', // 120px
      padding: '1rem',
      gap: '0.5rem'
    }
  }
} as const;

/**
 * Type exports for TypeScript integration
 */
export type DesignTokens = typeof designTokens;
export type ComponentTokens = typeof componentTokens;
export type ColorToken = keyof typeof designTokens.colors;
export type SpacingToken = keyof typeof designTokens.spacing;
