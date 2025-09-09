import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTaskStore, useTasksByStatus } from '@/store/todo-store'
import { type ViewType } from '@/components/TabPane'

export function useHomePage() {
  // Theme state
  const [isDark, setIsDark] = useState(false)

  // View state
  const [activeView, setActiveView] = useState<ViewType>('board')

  // URL params (needed for potential future use)
  const [searchParams, setSearchParams] = useSearchParams()

  // Store data
  const { tasks } = useTaskStore()
  const tasksByStatus = useTasksByStatus()

  // Initialize theme on component mount
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  // Theme toggle handler
  const toggleTheme = useCallback(() => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }, [isDark])

  // Greeting text based on time of day
  const getGreeting = useCallback(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }, [])

  // View change handler
  const handleViewChange = useCallback((view: ViewType) => {
    setActiveView(view)
  }, [])

  return {
    // State
    isDark,
    activeView,

    // Store data
    tasks,
    tasksByStatus,

    // Computed values
    greeting: getGreeting(),

    // Event handlers
    toggleTheme,
    handleViewChange,

    // URL params (for potential future use)
    searchParams,
    setSearchParams,
  }
}
