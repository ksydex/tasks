import React from 'react'
import { Plus, HelpCircle } from 'lucide-react'
import { BaseCommand, CommandContext } from './types'
import { AddTaskCommand } from './AddTaskCommand'
import { HelpCommand } from './HelpCommand'

// Command registry - easily extensible
export const createCommands = (context: CommandContext): BaseCommand[] => {
  return [
    {
      key: 'add-task',
      name: 'Add Task',
      description: 'Create a new task quickly or with details',
      icon: Plus,
      component: (props) => {
        const wrappedOnExecute = (action, data) => {
          if (action === 'detailed-create') {
            context.onOpenDetailed?.(data?.taskName || '')
          }
          props.onExecute(action, data)
        }

        return React.createElement(AddTaskCommand, {
          ...props,
          onExecute: wrappedOnExecute
        })
      }
    },
    {
      key: 'help',
      name: 'Help',
      description: 'Show available commands and get support',
      icon: HelpCircle,
      component: HelpCommand
    }
  ]
}

// Utility function to get all available commands for help/autocomplete
export const getAvailableCommands = (): Omit<BaseCommand, 'component'>[] => {
  const commands = createCommands({} as CommandContext)
  return commands.map(({ component, ...cmd }) => cmd)
}