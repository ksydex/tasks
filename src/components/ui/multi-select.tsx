import * as React from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

interface MultiSelectProps {
  options: Array<{
    label: string
    value: string
    icon?: string
    color?: string
  }>
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleUnselect = React.useCallback((item: string) => {
    onChange(selected.filter((s) => s !== item))
  }, [onChange, selected])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "" && selected.length > 0) {
          handleUnselect(selected[selected.length - 1])
        }
      }
      // Escape key to close
      if (e.key === "Escape") {
        input.blur()
      }
    }
  }, [handleUnselect, selected])

  const selectables = options.filter((option) => !selected.includes(option.value))
  const selectedItems = options.filter((option) => selected.includes(option.value))

  return (
    <div className={cn("relative", className)}>
      <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
        <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-1 flex-wrap">
            {selectedItems.map((item) => {
              return (
                <Badge 
                  key={item.value} 
                  variant="secondary" 
                  className="gap-1 text-xs"
                  style={item.color ? { 
                    backgroundColor: item.color + '20',
                    color: item.color,
                    borderColor: item.color + '40'
                  } : {}}
                >
                  {item.icon && <span className="text-xs">{item.icon}</span>}
                  {item.label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item.value)
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => handleUnselect(item.value)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              )
            })}
            <CommandInput
              ref={inputRef}
              value=""
              onValueChange={() => {}}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={selectedItems.length === 0 ? placeholder : ""}
              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && selectables.length > 0 ? (
            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandList>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((option) => {
                    return (
                      <CommandItem
                        key={option.value}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onSelect={() => {
                          onChange([...selected, option.value])
                          inputRef?.current?.focus()
                        }}
                        className="cursor-pointer"
                      >
                        {option.icon && <span className="mr-2">{option.icon}</span>}
                        {option.label}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </div>
          ) : null}
        </div>
      </Command>
    </div>
  )
}