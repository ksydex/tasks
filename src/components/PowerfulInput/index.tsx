import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SelectDropdown, type SelectDropdownItem } from '@/components/ui/select-dropdown'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePowerfulInput } from './use-powerful-input'
import type { BaseCommand } from '@/commands'

interface PowerfulInputProps {
  // No props needed anymore - we'll use URL navigation
}

// Convert commands to SelectDropdownItem format
function convertCommandsToItems(commands: BaseCommand[]): SelectDropdownItem[] {
  return commands.map(command => ({
    id: command.key,
    primary: command.name,
    secondary: command.description,
    data: command
  }))
}

// Render icon for commands (Lucide React components)
function renderCommandIcon(item: SelectDropdownItem, isSelected?: boolean) {
  const command = item.data as BaseCommand
  const icon = command?.icon
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

// Render command component helper
function renderCommandComponent(command: BaseCommand, onExecute: (action: string, data?: any) => void, onClose: () => void) {
  const CommandComponent = command.component
  return (
    <CommandComponent
      onExecute={onExecute}
      onClose={onClose}
    />
  )
}

export function PowerfulInput({}: PowerfulInputProps) {
  const {
    isOpen,
    commandsModalOpen,
    commandState,
    commands,
    setCommandsModalOpen,
    handleCommandSelect,
    handleCommandExecute,
    handleClose,
    openInput,
    closeInput,
    openCommandsModal,
    closeCommandsModal,
  } = usePowerfulInput()

  // Convert commands for SelectDropdown
  const commandItems = convertCommandsToItems(commands)

  // Commands converted successfully

  // Handle command selection from SelectDropdown
  const handleCommandChange = (commandKey: string, item: SelectDropdownItem) => {
    const command = item.data as BaseCommand
    handleCommandSelect(command)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeInput}
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
              <SelectDropdown
                items={commandItems}
                value={commandState.selectedCommand?.key}
                onValueChange={handleCommandChange}
                placeholder="Choose command..."
                triggerWidth="w-full"
                contentWidth="w-[200px]"
                searchable={true}
                showSelectedIcon={true}
                className="h-9 font-normal pr-2"
                renderIcon={renderCommandIcon}
              />
            </div>

            {/* Command Component - Always Present */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {commandState.selectedCommand ? (
                <>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 animate-in slide-in-from-left-2 duration-200" />
                  <div className="animate-in slide-in-from-right-2 duration-300 min-w-0 flex-1">
                    {renderCommandComponent(commandState.selectedCommand, handleCommandExecute, handleClose)}
                  </div>
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                  <div className="flex gap-2 flex-1">
                    <Skeleton className="h-9 transition-all ease-out" style={{ width: '140px' }} />
                    <Skeleton className="h-9 transition-all ease-out" style={{ width: '100px' }} />
                    <Skeleton className="h-9 w-8" />
                    <Skeleton className="h-9 w-20" />
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
            onClick={openInput}
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

export default PowerfulInput
