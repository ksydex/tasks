import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDown, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectDropdownItem {
  id: string
  primary: string // main text (name/title)
  secondary?: string // description
  badge?: string | number // count or other indicator
  icon?: React.ComponentType<{ className?: string }> | string // icon component or emoji string
}

// Built-in icon renderer types
export type SelectDropdownIconRenderer = (item: SelectDropdownItem, isSelected?: boolean) => React.ReactNode

export interface SelectDropdownProps {
  items: SelectDropdownItem[]
  value?: string // selected item id
  onValueChange: (value: string, item: SelectDropdownItem) => void
  placeholder?: string
  triggerWidth?: string // width of trigger button
  contentWidth?: string // width of popover content
  searchable?: boolean // enable search functionality
  headerText?: string // optional header in content
  disabled?: boolean
  className?: string // additional classes for trigger
  showSelectedIcon?: boolean // show check icon for selected item
  renderIcon?: SelectDropdownIconRenderer // render prop for icons
  showReset?: boolean // show reset button
  onReset?: () => void // reset handler
  portal?: boolean // render in portal
  scrollable?: boolean // enable scroll for long lists
  maxHeight?: string // max height for scrollable content
}

export function SelectDropdown({
  items,
  value,
  onValueChange,
  placeholder = "Select option...",
  triggerWidth = "w-[200px]",
  contentWidth = "w-[200px]",
  searchable = false,
  headerText,
  disabled = false,
  className,
  showSelectedIcon = false,
  renderIcon,
  showReset = false,
  onReset,
  portal = true,
  scrollable = true,
  maxHeight = "max-h-[300px]"
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false)

  const selectedItem = value ? items.find(item => item.id === value) : undefined

  const handleSelect = (itemId: string) => {
    const item = items.find(i => i.id === itemId)
    if (item) {
      onValueChange(itemId, item)
      setOpen(false)
    }
  }


  const triggerContent = selectedItem ? (
    <div className="flex items-center gap-2">
      {renderIcon && renderIcon(selectedItem, true)}
      <span className="truncate">{selectedItem.primary}</span>
      {selectedItem.badge && (
        <Badge variant="secondary" className="text-xs">
          {selectedItem.badge}
        </Badge>
      )}
    </div>
  ) : (
    <span>{placeholder}</span>
  )

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onReset?.()
  }

  // Unified implementation using Command component
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(triggerWidth, "justify-between h-9 font-normal pr-2", className)}
            disabled={disabled}
          >
            {triggerContent}
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>

          {showReset && value && (
            <button
              type="button"
              onMouseDown={handleReset}
              onClick={handleReset}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-0.5 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors z-10"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn(contentWidth, "p-0 bg-background border-border")} align="start">
        <Command>
          {searchable && <CommandInput placeholder="Search..." className="h-9" />}
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandList className={cn(scrollable && maxHeight, "overflow-y-auto")}>
            <CommandGroup>
              {headerText && !searchable && (
                <div className="text-xs font-medium text-muted-foreground px-3 py-2 border-b">
                  {headerText}
                </div>
              )}
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => handleSelect(item.id)}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  {renderIcon && renderIcon(item, selectedItem?.id === item.id)}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium text-sm truncate">{item.primary}</span>
                    {item.secondary && (
                      <span className="text-xs data-[selected=true]:text-white/90 mt-0.5">
                        {item.secondary}
                      </span>
                    )}
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {item.badge}
                    </Badge>
                  )}
                  {showSelectedIcon && (
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4 shrink-0",
                        selectedItem?.id === item.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// Built-in icon renderer for React components (Lucide icons, etc.)
const IconRenderer: SelectDropdownIconRenderer = (item, isSelected) => {
  const icon = item.icon
  if (!icon) return null

  // Handle React component objects (Lucide icons)
  if (typeof icon === 'object' && icon && '$$typeof' in icon) {
    return React.createElement(icon as any, { className: "h-4 w-4 shrink-0" })
  }

  // Handle function constructors
  if (typeof icon === 'function') {
    const IconComponent = icon as React.ComponentType<{ className?: string }>
    return <IconComponent className="h-4 w-4 shrink-0" />
  }

  return null
}

// Built-in icon renderer for emoji strings
const EmojiRenderer: SelectDropdownIconRenderer = (item, isSelected) => {
  const icon = item.icon
  if (!icon) return null

  // Handle emoji strings
  if (typeof icon === 'string') {
    return <span className="text-lg shrink-0">{icon}</span>
  }

  return null
}

// Attach built-in renderers to the component
SelectDropdown.Icon = IconRenderer
SelectDropdown.Emoji = EmojiRenderer
