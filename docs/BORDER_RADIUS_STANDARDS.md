# Border Radius Standards

## Overview

This document outlines the border radius standards for the design system to ensure visual consistency across all components.

## Design Tokens

Border radius values are defined in `src/lib/design-tokens.ts`:

```typescript
borderRadius: {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',    // 4px
  md: 'calc(var(--radius) - 2px)',     // 6px
  lg: 'var(--radius)',                 // 12px
  xl: 'calc(var(--radius) + 4px)',    // 16px
  full: '9999px'
}
```

## Component Standards

### Interactive Elements
- **Border Radius**: `rounded-md` (4px)
- **Components**: Buttons, Inputs, Selects, Checkboxes
- **Rationale**: Provides good touch targets with subtle rounding

### Status Indicators & Badges
- **Border Radius**: `rounded-md` (4px)
- **Components**: Badge, Tag, StatusIndicator, DueStatus, PriorityBadge
- **Rationale**: Consistent with interactive elements, good readability

### Containers & Cards
- **Border Radius**: `rounded-lg` (6px)
- **Components**: Cards, Modals, Popovers, Dropdowns
- **Rationale**: More prominent containers need stronger visual definition

### Large Elements
- **Border Radius**: `rounded-xl` (10px)
- **Components**: Sheets, Large modals
- **Rationale**: Large elements benefit from more pronounced rounding

### Circular Elements
- **Border Radius**: `rounded-full`
- **Components**: Avatars, Icons, Circular buttons
- **Rationale**: Perfect circles for specific use cases

## Implementation

### Using Style Utils

```typescript
import { getComponentBorderRadius } from '@/lib/style-utils'

// For status components
const statusClass = getComponentBorderRadius('status') // 'rounded-md'

// For containers
const containerClass = getComponentBorderRadius('container') // 'rounded-lg'
```

### Direct Usage

```typescript
// ✅ Correct - Consistent with standards
<Badge className="rounded-md">Status</Badge>
<StatusIndicator className="rounded-md">Info</StatusIndicator>

// ❌ Incorrect - Inconsistent
<Badge className="rounded">Status</Badge>
<StatusIndicator className="rounded-lg">Info</StatusIndicator>
```

## Migration Checklist

- [x] StatusIndicator: `rounded` → `rounded-md`
- [x] DueStatus: `rounded` → `rounded-md`
- [x] PriorityBadge: `rounded` → `rounded-md`
- [x] Badge: Already using `rounded-md` ✅
- [x] Tag: Inherits from Badge ✅

## Benefits

1. **Visual Consistency**: All similar components have the same border radius
2. **Design Token Usage**: Leverages existing design tokens
3. **Maintainability**: Centralized standards make updates easier
4. **User Experience**: Consistent visual hierarchy improves usability
