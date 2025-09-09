import { useState, useCallback } from 'react'
import { useTaskStore } from '@/store/todo-store'

interface UseAddTaskFormProps {
  onOpenDetailed: (initialTitle?: string) => void
}

export function useAddTaskForm({ onOpenDetailed }: UseAddTaskFormProps) {
  const [title, setTitle] = useState('')
  const { addTask } = useTaskStore()

  // Form submission handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    addTask(title)
    setTitle('')
  }, [title, addTask])

  // Detailed form opening handler
  const handleOpenDetailed = useCallback(() => {
    onOpenDetailed(title)
    setTitle('')
  }, [title, onOpenDetailed])

  // Title change handler
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }, [])

  // Clear title
  const clearTitle = useCallback(() => {
    setTitle('')
  }, [])

  return {
    // State
    title,

    // Computed
    isSubmitDisabled: !title.trim(),

    // Handlers
    handleSubmit,
    handleOpenDetailed,
    handleTitleChange,
    clearTitle,
  }
}
