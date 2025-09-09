import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { createCommands, type BaseCommand } from '@/commands'

// Command state interface
interface CommandState {
  selectedCommand: BaseCommand | null
}

export function usePowerfulInput() {
  // UI state
  const [isOpen, setIsOpen] = useState(false)
  const [commandPopoverOpen, setCommandPopoverOpen] = useState(false)
  const [commandsModalOpen, setCommandsModalOpen] = useState(false)
  const [commandState, setCommandState] = useState<CommandState>({
    selectedCommand: null
  })

  // External dependencies
  const [searchParams, setSearchParams] = useSearchParams()
  const { toast } = useToast()

  // Navigation handler
  const handleNavigateToTask = useCallback((taskId: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('taskId', taskId)
    setSearchParams(newParams)
  }, [searchParams, setSearchParams])

  // Close handler
  const handleClose = useCallback(() => {
    setIsOpen(false)
    setCommandPopoverOpen(false)
    setCommandState({ selectedCommand: null })
  }, [])

  // Commands creation
  const commands = createCommands({
    onNavigateToTask: handleNavigateToTask,
    onClose: handleClose
  })

  // Keyboard event handler
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
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleClose])

  // Command selection handler
  const handleCommandSelect = useCallback((command: BaseCommand) => {
    setCommandState({
      selectedCommand: command
    })
    setCommandPopoverOpen(false)
  }, [])

  // Command execution handler
  const handleCommandExecute = useCallback((action: string, data?: any) => {
    // Command components handle their own execution logic
    console.log('Command executed:', action, data)
  }, [])

  // UI control handlers
  const openInput = useCallback(() => setIsOpen(true), [])
  const closeInput = useCallback(() => setIsOpen(false), [])
  const openCommandsModal = useCallback(() => setCommandsModalOpen(true), [])
  const closeCommandsModal = useCallback(() => setCommandsModalOpen(false), [])

  return {
    // State
    isOpen,
    commandPopoverOpen,
    commandsModalOpen,
    commandState,
    commands,

    // State setters
    setCommandPopoverOpen,
    setCommandsModalOpen,

    // Handlers
    handleCommandSelect,
    handleCommandExecute,
    handleClose,
    openInput,
    closeInput,
    openCommandsModal,
    closeCommandsModal,
  }
}
