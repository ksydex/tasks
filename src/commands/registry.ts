import React from 'react'
import { Plus, HelpCircle, CheckCircle2 } from 'lucide-react'
import { BaseCommand, CommandContext } from './types'
import { AddTaskCommand } from './AddTaskCommand'
import { HelpCommand } from './HelpCommand'
import { MassDoneCommand } from './MassDoneCommand'

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
            context.onNavigateToTask?.(data?.taskId)
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
      key: 'mass-done',
      name: 'Mass Done',
      description: 'Mark all tasks in a selected column as done',
      icon: CheckCircle2,
      component: MassDoneCommand
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