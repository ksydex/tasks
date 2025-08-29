import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { Search, Plus, FileText, HelpCircle, ChevronDown, ArrowRight, Check, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createCommands, type BaseCommand } from '@/commands'

// Command state interface
interface CommandState {
  selectedCommand: BaseCommand | null
}

interface PowerfulInputProps {
  onOpenDetailed?: (initialTitle?: string) => void
}

export function PowerfulInput({ onOpenDetailed }: PowerfulInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [commandPopoverOpen, setCommandPopoverOpen] = useState(false)
  const [commandsModalOpen, setCommandsModalOpen] = useState(false)
  const [commandState, setCommandState] = useState<CommandState>({
    selectedCommand: null
  })

  const { toast } = useToast()

  // Command handlers - easily extensible
  const commands = createCommands({
    onOpenDetailed,
    onClose: () => {
      setIsOpen(false)
      setCommandPopoverOpen(false)
      setCommandState({ selectedCommand: null })
    }
  })

      // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        setCommandPopoverOpen(true)
        // Reset state when opening
        setCommandState({
          selectedCommand: null
        })
      }

      if (e.key === 'Escape') {
        setIsOpen(false)
        setCommandPopoverOpen(false)
        setCommandState({
          selectedCommand: null
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

    // Handle command selection
  const handleCommandSelect = (command: BaseCommand) => {
    setCommandState({
      selectedCommand: command
    })
    setCommandPopoverOpen(false)
  }

  // Handle command execution
  const handleCommandExecute = (action: string, data?: any) => {
    // Command components handle their own execution logic
    console.log('Command executed:', action, data)
  }

  // Render command component
  const renderCommandComponent = (command: BaseCommand) => {
    const CommandComponent = command.component
    return (
      <CommandComponent
        onExecute={handleCommandExecute}
        onClose={() => {
          setIsOpen(false)
          setCommandPopoverOpen(false)
          setCommandState({ selectedCommand: null })
        }}
      />
    )
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
                    <div className="flex items-center gap-2">
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
                      {commands.map((command) => (
                        <CommandItem
                          key={command.key}
                          value={command.key}
                          onSelect={() => handleCommandSelect(command)}
                          className="flex items-center gap-2"
                        >
                          <command.icon className="h-4 w-4" />
                          <div className="flex flex-col">
                            <span className="font-medium">{command.name}</span>
                            <span className="text-xs data-[selected=true]:text-white/90">
                              {command.description}
                            </span>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              commandState.selectedCommand?.key === command.key ? "opacity-100" : "opacity-0"
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

            {/* Command Component - Always Present */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {commandState.selectedCommand ? (
                <>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 animate-in slide-in-from-left-2 duration-200" />
                  <div className="animate-in slide-in-from-right-2 duration-300 min-w-0 flex-1">
                    {renderCommandComponent(commandState.selectedCommand)}
                  </div>
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                  <div className="flex gap-2 flex-1">
                    <Skeleton className="h-9 transition-all ease-out" style={{ width: '140px' }} />
                    <Skeleton className="h-9 transition-all ease-out" style={{ width: '100px' }} />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </>
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

      {/* Commands Modal */}
      <Dialog open={commandsModalOpen} onOpenChange={setCommandsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Available Commands</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Here are all the available commands you can use in the powerful input:
            </p>
            <div className="space-y-3">
              {commands.map((command) => (
                <div key={command.key} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <command.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{command.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        /{command.key}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{command.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Tip: Press <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Cmd+K</kbd> to open the command input.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
