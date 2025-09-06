import React from 'react'

// Base command interface
export interface BaseCommand {
  key: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  component: React.ComponentType<CommandComponentProps>
}

// Props passed to command components
export interface CommandComponentProps {
  onExecute: (action: string, data?: any) => void
  onClose: () => void
}

// Command execution context
export interface CommandContext {
  onNavigateToTask?: (taskId: string) => void
  onClose: () => void
}
