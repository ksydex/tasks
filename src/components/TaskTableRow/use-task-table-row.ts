import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTaskStore } from '@/store/todo-store'
import type { Task } from '@/store/todo-store'

export function useTaskTableRow(task: Task, onTaskClick?: (task: Task) => void) {
  const { tags, priorities, toggleTaskCompletion, columns } = useTaskStore()
  const [searchParams, setSearchParams] = useSearchParams()

  // Derived data
  const taskTags = useMemo(() =>
    tags.filter(tag => task.tagIds?.includes(tag.id)),
    [tags, task.tagIds]
  )

  const taskPriority = useMemo(() =>
    priorities.find(p => p.id === task.priority),
    [priorities, task.priority]
  )

  const taskColumn = useMemo(() =>
    columns.find(col => col.id === task.status),
    [columns, task.status]
  )

  // Event handlers
  const handleTaskClick = () => {
    if (onTaskClick) {
      onTaskClick(task)
    } else {
      // Default behavior: open task details
      const newParams = new URLSearchParams(searchParams)
      newParams.set('taskId', task.id)
      setSearchParams(newParams)
    }
  }

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't trigger row click if clicking on checkbox
    if ((e.target as HTMLElement).closest('[role="checkbox"]')) {
      return
    }
    handleTaskClick()
  }

  const handleToggleCompletion = () => {
    toggleTaskCompletion(task.id)
  }

  return {
    // Derived data
    taskTags,
    taskPriority,
    taskColumn,

    // Event handlers
    handleRowClick,
    handleToggleCompletion,
  }
}
