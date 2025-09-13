import { useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTaskStore, useTasksByStatus } from '@/store/todo-store'
import { type ViewType } from '@/components/TabPane'

export function useHomePage() {
  // View state
  const [activeView, setActiveView] = useState<ViewType>('board')

  // URL params (needed for potential future use)
  const [searchParams, setSearchParams] = useSearchParams()

  // Store data
  const { tasks } = useTaskStore()
  const tasksByStatus = useTasksByStatus()

  // View change handler
  const handleViewChange = useCallback((view: ViewType) => {
    setActiveView(view)
  }, [])

  return {
    // State
    activeView,

    // Store data
    tasks,
    tasksByStatus,

    // Event handlers
    handleViewChange,

    // URL params (for potential future use)
    searchParams,
    setSearchParams,
  }
}
