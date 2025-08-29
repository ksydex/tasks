import { Plus, FileText, Search, Settings, Tag, Users, Calendar, HelpCircle } from 'lucide-react'
import { useTaskStore } from '@/store/todo-store'

// Argument definition for commands
export interface CommandArgument {
  key: string
  label: string
  placeholder: string
  type: 'text' | 'number'
  required?: boolean
}

// Command interface for extensibility
export interface CommandHandler {
  id: string
  name: string
  description: string
  pattern: RegExp
  icon: React.ComponentType<{ className?: string }>
  arguments: CommandArgument[]
  actionTypes: string[]
  execute: (action: string, args: Record<string, any>) => void
}

// Command registry - easily extensible
export const createCommandHandlers = (onOpenDetailed?: (initialTitle?: string) => void): CommandHandler[] => {
  const { addTask } = useTaskStore.getState()

  return [
    {
      id: 'add-task',
      name: 'Add Task',
      description: 'Create a new task quickly or with details',
      pattern: /^\/add-task\s*(.*)$/,
      icon: Plus,
      arguments: [
        {
          key: 'taskName',
          label: 'Task Name',
          placeholder: 'Enter task name...',
          type: 'text',
          required: true
        },
        {
          key: 'storyPoints',
          label: 'Story Points',
          placeholder: 'Story points (optional)',
          type: 'number',
          required: false
        }
      ],
      actionTypes: ['fast-create', 'detailed-create'],
      execute: (action, args) => {
        if (action === 'fast-create' && args.taskName?.trim()) {
          addTask(args.taskName.trim(), undefined, [], args.storyPoints ? parseInt(args.storyPoints) : undefined)
        } else if (action === 'detailed-create') {
          onOpenDetailed?.(args.taskName?.trim())
        }
      }
    },
    {
      id: 'help',
      name: 'Help',
      description: 'Show available commands',
      pattern: /^\/help\s*(.*)$/,
      icon: HelpCircle,
      arguments: [],
      actionTypes: ['show-help'],
      execute: (action, args) => {
        if (action === 'show-help') {
          const commands = getAvailableCommands()
          console.log('Available commands:', commands)
          // In a real implementation, you might want to show this in a modal or toast
        }
      }
    }
  ]
}

// Utility function to get all available commands for help/autocomplete
export const getAvailableCommands = (): Array<{ id: string; name: string; description: string }> => {
  const handlers = createCommandHandlers()
  return handlers.map(handler => ({
    id: handler.id,
    name: handler.name,
    description: handler.description
  }))
}
