import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, Phone } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getAvailableCommands } from './registry'
import { CommandComponentProps } from './types'

export function HelpCommand({ onExecute, onClose }: CommandComponentProps) {
  const [commandsModalOpen, setCommandsModalOpen] = useState(false)
  const { toast } = useToast()
  const commands = getAvailableCommands()

  const handleShowCommands = () => {
    setCommandsModalOpen(true)
    onExecute('show-commands')
  }

  const handleContactSupport = () => {
    toast({
      title: "Whoops!",
      description: "There's no support yet.",
    })
    onExecute('contact-support')
  }

  return (
    <>
      {/* No arguments section - just buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          size="sm"
          onClick={handleShowCommands}
          className="h-8 px-3"
        >
          <HelpCircle className="h-4 w-4 mr-1" />
          Show Commands
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleContactSupport}
          className="h-8 px-3"
        >
          <Phone className="h-4 w-4 mr-1" />
          Contact Support
        </Button>
      </div>

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
