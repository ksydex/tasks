# Command UI Pattern Rule

## Overview
All commands in the powerful input system must follow a consistent UI pattern for optimal user experience and visual consistency.

## UI Pattern Requirements

### 1. Single Row Layout
- **All commands must use a simple 1-row UI layout**
- Commands should fit within the powerful input's horizontal space
- No multi-step modals or complex navigation flows
- Use inline controls and compact button layouts

### 2. Layout Structure
```tsx
<div className="flex gap-2 flex-1">
  {/* Input fields and controls */}
  {/* Action buttons */}
</div>
```

### 3. Button Patterns
- **Primary Action**: Use default Button with icon + text
- **Secondary Action**: Use `variant="outline"` Button with icon + text
- **Icon-only Actions**: Use `size="sm"` with just icon for compact actions
- **Button Height**: Use `h-8` for compact buttons, `h-9` for inputs

### 4. Input Patterns
- **Text Inputs**: Use `h-9` height for consistency
- **Auto-focus**: Focus the primary input on mount using `useRef` and `useEffect`
- **Keyboard Support**: Handle Enter key for primary actions

### 5. Examples

#### AddTaskCommand Pattern
```tsx
<div className="flex gap-2 flex-1">
  <Input placeholder="Enter task name..." className="h-9" />
  <Input placeholder="Story points" className="h-9" />
  <Button size="sm" className="h-8 px-3">
    <Plus className="h-4 w-4" />
  </Button>
  <Button size="sm" variant="outline" className="h-8 px-3">
    <FileText className="h-4 w-4 mr-1" />
    Detailed
  </Button>
</div>
```

#### HelpCommand Pattern
```tsx
<div className="flex items-center gap-2 shrink-0">
  <Button size="sm" className="h-8 px-3">
    <HelpCircle className="h-4 w-4 mr-1" />
    Show Commands
  </Button>
  <Button size="sm" variant="outline" className="h-8 px-3">
    <Phone className="h-4 w-4 mr-1" />
    Contact Support
  </Button>
</div>
```

## Prohibited Patterns

### ❌ Avoid These
- Multi-step modals or dialogs
- Complex navigation flows
- Large card layouts
- Multi-row layouts
- Dropdown selectors that require clicking outside the input area

### ✅ Use These Instead
- Inline selectors (if needed)
- Compact button groups
- Single-row form layouts
- Icon + text button combinations
- Keyboard shortcuts for actions

## Implementation Guidelines

1. **Keep it Simple**: Commands should be quick actions, not complex workflows
2. **Consistent Spacing**: Use `gap-2` between elements
3. **Responsive**: Ensure commands work on different screen sizes
4. **Accessible**: Include proper ARIA labels and keyboard navigation
5. **Fast**: Users should be able to complete actions quickly

## Migration Notes

When updating existing commands:
1. Remove any Card/Dialog wrappers
2. Convert to single-row layout
3. Use consistent button sizing and spacing
4. Maintain all functionality while simplifying UI
5. Test keyboard navigation and accessibility
