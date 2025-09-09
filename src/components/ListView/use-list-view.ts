import { useMemo } from 'react'
import type { Task } from '@/store/todo-store'

export interface UseListViewProps {
  tasks: Task[]
  sortBy?: 'createdAt' | 'dueDate' | 'priority' | 'title'
  sortOrder?: 'asc' | 'desc'
  filterFn?: (task: Task) => boolean
}

export function useListView({
  tasks,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  filterFn
}: UseListViewProps) {
  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = filterFn ? tasks.filter(filterFn) : tasks

    // Sort tasks
    filtered = [...filtered].sort((a, b) => {
      let aValue: any = a[sortBy]
      let bValue: any = b[sortBy]

      // Handle special cases
      if (sortBy === 'dueDate') {
        aValue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
        bValue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
      } else if (sortBy === 'priority') {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0
      } else if (sortBy === 'title') {
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      }
    })

    return filtered
  }, [tasks, filterFn, sortBy, sortOrder])

  return {
    filteredTasks,
    hasFilteredTasks: filteredTasks.length > 0,
  }
}
