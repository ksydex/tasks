import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTaskStore } from '@/store/todo-store'
import type { Task } from '@/store/todo-store'

interface UseTaskCardProps {
  task: Task
}

export function useTaskCard({ task }: UseTaskCardProps) {
  // Store connections
  const { tags, priorities, toggleTaskCompletion } = useTaskStore()
  const [searchParams, setSearchParams] = useSearchParams()

  // Hover state management
  const [showCheck, setShowCheck] = useState(task.isDone)
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout>()

  // Derived task data
  const taskTags = useMemo(() =>
    tags.filter(tag => task.tagIds?.includes(tag.id)),
    [tags, task.tagIds]
  )

  const taskPriority = useMemo(() =>
    priorities.find(p => p.id === task.priority),
    [priorities, task.priority]
  )

  // Handle hover state with delay
  useEffect(() => {
    if (isHovered && !task.isDone) {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowCheck(true)
      }, 500) // 0.5 second delay
    } else if (!isHovered && !task.isDone) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      setShowCheck(false)
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [isHovered, task.isDone])

  // Update showCheck when task.isDone changes
  useEffect(() => {
    setShowCheck(task.isDone)
  }, [task.isDone])

  // Event handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  const handleCardClick = useCallback(() => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('taskId', task.id)
    setSearchParams(newParams)
  }, [task.id, searchParams, setSearchParams])

  const handleToggleCompletion = useCallback(() => {
    toggleTaskCompletion(task.id)
  }, [task.id, toggleTaskCompletion])

  return {
    // Derived data
    taskTags,
    taskPriority,

    // State
    showCheck,
    isHovered,

    // Event handlers
    handleMouseEnter,
    handleMouseLeave,
    handleCardClick,
    handleToggleCompletion,
  }
}
