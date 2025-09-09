import { useState, useEffect, useCallback } from 'react'

export type ViewType = 'board' | 'list'

interface UseTabPaneProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
  persistView?: boolean
  storageKey?: string
}

export function useTabPane({
  activeView,
  onViewChange,
  persistView = true,
  storageKey = "task-view-preference"
}: UseTabPaneProps) {
  const [internalView, setInternalView] = useState<ViewType>(activeView)

  // Load persisted view preference on mount
  useEffect(() => {
    if (persistView) {
      const savedView = localStorage.getItem(storageKey) as ViewType
      if (savedView && (savedView === 'board' || savedView === 'list')) {
        setInternalView(savedView)
        onViewChange(savedView)
      }
    }
  }, [persistView, storageKey, onViewChange])

  // Sync internal view with external activeView
  useEffect(() => {
    setInternalView(activeView)
  }, [activeView])

  // View change handler
  const handleViewChange = useCallback((value: string) => {
    const newView = value as ViewType
    setInternalView(newView)

    // Persist view preference
    if (persistView) {
      localStorage.setItem(storageKey, newView)
    }

    onViewChange(newView)
  }, [persistView, storageKey, onViewChange])

  return {
    // State
    internalView,

    // Handlers
    handleViewChange,
  }
}
