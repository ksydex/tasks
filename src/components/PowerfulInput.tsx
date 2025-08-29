import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Plus, FileText, HelpCircle, ChevronDown, ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createCommandHandlers, type CommandHandler } from '@/lib/commands'

// Command state interface
interface CommandState {
  selectedCommand: CommandHandler | null
  args: Record<string, string>
  focusedArgIndex: number
}

interface PowerfulInputProps {
  onOpenDetailed?: (initialTitle?: string) => void
}

export function PowerfulInput({ onOpenDetailed }: PowerfulInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [commandPopoverOpen, setCommandPopoverOpen] = useState(false)
  const [commandState, setCommandState] = useState<CommandState>({
    selectedCommand: null,
    args: {},
    focusedArgIndex: 0
  })

  const argsInputRef = useRef<HTMLInputElement>(null)

    // Calculate optimal widths for argument inputs based on placeholder text
  const getArgumentWidths = (command: CommandHandler) => {
    const baseWidth = 120 // minimum width
    const charWidth = 7 // approximate character width in pixels
    const availableWidth = 400 // available space for arguments (container 800px - command 200px - actions 120px - gaps)

    const calculatedWidths = command.arguments.map(arg => {
      const placeholderLength = arg.placeholder.length
      const calculatedWidth = Math.max(baseWidth, placeholderLength * charWidth + 24) // 24px for padding
      return Math.min(calculatedWidth, 180) // max width per input
    })

    // If total width exceeds available space, scale down proportionally
    const totalWidth = calculatedWidths.reduce((sum, width) => sum + width, 0)
    if (totalWidth > availableWidth) {
      const scale = availableWidth / totalWidth
      return calculatedWidths.map(width => Math.max(baseWidth, width * scale))
    }

    return calculatedWidths
  }

  // Command handlers - easily extensible
  const commandHandlers = createCommandHandlers(onOpenDetailed)

      // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        setCommandPopoverOpen(true)
        // Reset state when opening
        setCommandState({
          selectedCommand: null,
          args: {},
          focusedArgIndex: 0
        })
      }

      if (e.key === 'Escape') {
        setIsOpen(false)
        setCommandPopoverOpen(false)
        setCommandState({
          selectedCommand: null,
          args: {},
          focusedArgIndex: 0
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus management
  useEffect(() => {
    if (isOpen && commandState.selectedCommand && argsInputRef.current) {
      argsInputRef.current.focus()
    }
  }, [isOpen, commandState.selectedCommand])

    // Handle command selection
  const handleCommandSelect = (command: CommandHandler) => {
    const initialArgs: Record<string, string> = {}
    command.arguments.forEach(arg => {
      initialArgs[arg.key] = ''
    })

    setCommandState(prev => ({
      ...prev,
      selectedCommand: command,
      args: initialArgs,
      focusedArgIndex: 0
    }))
    setCommandPopoverOpen(false)
  }

  // Handle args input change
  const handleArgChange = (key: string, value: string) => {
    setCommandState(prev => ({
      ...prev,
      args: { ...prev.args, [key]: value }
    }))
  }

  // Handle command execution
  const handleCommandExecute = (action: string) => {
    if (commandState.selectedCommand) {
      commandState.selectedCommand.execute(action, commandState.args)
      setIsOpen(false)
      setCommandPopoverOpen(false)
      // Reset state
      setCommandState({
        selectedCommand: null,
        args: {},
        focusedArgIndex: 0
      })
    }
  }

  // Render command actions based on command type
  const renderCommandActions = (handler: CommandHandler) => {
    const hasRequiredArgs = handler.arguments
      .filter(arg => arg.required)
      .every(arg => commandState.args[arg.key]?.trim())

    switch (handler.id) {
      case 'add-task':
        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => handleCommandExecute('fast-create')}
              disabled={!hasRequiredArgs}
              className="h-8 px-3"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCommandExecute('detailed-create')}
              className="h-8 px-3"
            >
              <FileText className="h-4 w-4 mr-1" />
              Detailed
            </Button>
          </div>
        )
      case 'help':
        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => handleCommandExecute('show-help')}
              className="h-8 px-3"
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              Show Commands
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

            {/* Command Input */}
      <div className={cn(
        "fixed bottom-4 left-4 z-50 transition-all duration-300 ease-out",
        isOpen
          ? "scale-100 opacity-100 translate-y-0"
          : "scale-95 opacity-0 translate-y-2 pointer-events-none"
      )}>
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-xl p-3 min-w-[580px] max-w-[800px] w-auto transition-all duration-300 ease-out relative">

          {/* Adaptive Layout Grid */}
          <div className="flex items-center gap-3 transition-all duration-300 ease-out">

            {/* Command Selection Part */}
            <div className="w-[200px] shrink-0">
              <Popover open={commandPopoverOpen} onOpenChange={setCommandPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={commandPopoverOpen}
                    className="w-full justify-between h-9 font-normal pr-2"
                  >
                  {commandState.selectedCommand ? (
                    <div className="flex items-center gap-2">
                      <commandState.selectedCommand.icon className="h-4 w-4" />
                      <span className="truncate">{commandState.selectedCommand.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Search className="h-4 w-4" />
                      <span>Choose command...</span>
                    </div>
                  )}
                  <ChevronDown className="mh-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0 bg-background border-border" align="start">
                <Command>
                  <CommandInput placeholder="Search commands..." className="h-9" />
                  <CommandEmpty>No command found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {commandHandlers.map((command) => (
                        <CommandItem
                          key={command.id}
                          value={command.id}
                          onSelect={() => handleCommandSelect(command)}
                          className="flex items-center gap-2"
                        >
                          <command.icon className="h-4 w-4" />
                          <div className="flex flex-col">
                            <span className="font-medium">{command.name}</span>
                            <span className="text-xs">
                              {command.description}
                            </span>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              commandState.selectedCommand?.id === command.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
              </Popover>
            </div>

            {/* Arguments Input Part - Always Present */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {commandState.selectedCommand ? (
                <>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 animate-in slide-in-from-left-2 duration-200" />
                  <div className="flex gap-2 animate-in slide-in-from-right-2 duration-300 min-w-0 flex-1">
                    {commandState.selectedCommand.arguments.map((arg, index) => {
                      const argWidths = getArgumentWidths(commandState.selectedCommand!)
                      const width = argWidths[index]

                      return (
                        <div
                          key={arg.key}
                          className="transition-all duration-300 ease-out"
                          style={{
                            width: `${width}px`,
                            minWidth: `${width}px`,
                            maxWidth: `${width}px`
                          }}
                        >
                          <Input
                            ref={index === 0 ? argsInputRef : undefined}
                            value={commandState.args[arg.key] || ''}
                            onChange={(e) => handleArgChange(arg.key, e.target.value)}
                            placeholder={arg.placeholder}
                            type={arg.type}
                            className="w-full h-9 transition-all duration-200"
                          />
                        </div>
                      )
                    })}
                    {commandState.selectedCommand.arguments.length === 0 && (
                      <div className="h-9 flex items-center justify-center text-muted-foreground text-sm animate-in fade-in duration-200 px-4">
                        No arguments required
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                  <div className="flex gap-2 flex-1">
                    <Skeleton className="h-9 transition-all ease-out" style={{ width: '140px' }} />
                    <Skeleton className="h-9 transition-all ease-out" style={{ width: '100px' }} />
                  </div>
                </>
              )}
            </div>

            {/* Command Actions - Always Present */}
            <div className="flex items-center gap-2 shrink-0">
              {commandState.selectedCommand ? (
                <div className="animate-in slide-in-from-right-2 duration-300">
                  {renderCommandActions(commandState.selectedCommand)}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-20" />
                </div>
              )}
            </div>
          </div>

          {/* Command Description */}
          <div className="mt-3 pt-2 border-t border-border text-xs text-muted-foreground">
            {commandState.selectedCommand ? (
              <span>
                <span className="font-medium">{commandState.selectedCommand.name}:</span> {commandState.selectedCommand.description}
              </span>
            ) : (
              <Skeleton className="h-3 w-64" />
            )}
          </div>
        </div>
      </div>

      {/* Trigger Button (when closed) */}
      {!isOpen && (
        <div className="fixed bottom-4 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="bg-background/80 backdrop-blur-sm border-border shadow-sm"
          >
            <Search className="h-4 w-4 mr-2" />
            Quick Actions
            <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      )}
    </>
  )
}
