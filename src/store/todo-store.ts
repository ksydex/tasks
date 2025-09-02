import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Priority } from '@/lib/status-colors'

export interface Tag {
  id: string
  name: string
  color: string
  icon: string
}

export interface PriorityLevel {
  id: Priority
  name: string
  color: string
  icon: string
}

export interface Column {
  id: string
  title: string
  icon: string
  color: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: string
  tagIds: string[]
  priority: Priority
  storyPoints?: number
  dueDate?: Date
  createdAt: Date
}

interface TaskState {
  tasks: Task[]
  columns: Column[]
  tags: Tag[]
  priorities: PriorityLevel[]

  // Task operations
  addTask: (title: string, description?: string, tagIds?: string[], priority?: Priority, storyPoints?: number, dueDate?: Date) => void
  deleteTask: (id: string) => void
  editTask: (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'tagIds' | 'priority' | 'storyPoints' | 'dueDate'>>) => void
  moveTask: (id: string, status: string) => void
  moveTaskToPosition: (taskId: string, sourceColumnId: string, destColumnId: string, sourceIndex: number, destIndex: number) => void
  reorderTasks: (sourceIndex: number, destIndex: number, status: string) => void

  // Column operations
  addColumn: (title: string, icon: string, color: string) => void
  editColumn: (id: string, updates: Partial<Pick<Column, 'title' | 'icon' | 'color'>>) => void
  deleteColumn: (id: string) => void
  reorderColumns: (sourceIndex: number, destIndex: number) => void

  // Tag operations
  addTag: (name: string, color: string, icon: string) => void
  editTag: (id: string, updates: Partial<Pick<Tag, 'name' | 'color' | 'icon'>>) => void
  deleteTag: (id: string) => void

  // Priority operations
  editPriority: (id: Priority, updates: Partial<Pick<PriorityLevel, 'name' | 'color' | 'icon'>>) => void
}

const defaultColumns: Column[] = [
  { id: 'todo', title: 'To Do', icon: '📋', color: '#3b82f6' },
  { id: 'in-progress', title: 'In Progress', icon: '⚡', color: '#f59e0b' },
  { id: 'done', title: 'Done', icon: '✅', color: '#10b981' },
]

const defaultTags: Tag[] = [
  { id: 'urgent', name: 'Urgent', color: '#ef4444', icon: '🔥' },
  { id: 'feature', name: 'Feature', color: '#8b5cf6', icon: '⭐' },
  { id: 'bug', name: 'Bug', color: '#f97316', icon: '🐛' },
  { id: 'improvement', name: 'Improvement', color: '#06b6d4', icon: '💡' },
]

const defaultPriorities: PriorityLevel[] = [
  { id: 'low', name: 'Low', color: '#3b82f6', icon: '🔽' },
  { id: 'medium', name: 'Medium', color: '#f59e0b', icon: '⚖️' },
  { id: 'high', name: 'High', color: '#f97316', icon: '🔺' },
  { id: 'urgent', name: 'Urgent', color: '#ef4444', icon: '🚨' },
]

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      columns: defaultColumns,
      tags: defaultTags,
      priorities: defaultPriorities,

      // Task operations
      addTask: (title: string, description?: string, tagIds: string[] = [], priority: Priority = 'medium', storyPoints?: number, dueDate?: Date) => {
        if (!title.trim()) return

        const newTask: Task = {
          id: Date.now().toString(),
          title: title.trim(),
          description: description?.trim(),
          status: get().columns[0]?.id || 'todo',
          tagIds,
          priority,
          storyPoints,
          dueDate,
          createdAt: new Date(),
        }

        set((state) => ({
          tasks: [newTask, ...state.tasks]
        }))
      },

      deleteTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        }))
      },

      editTask: (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'tagIds' | 'priority' | 'storyPoints' | 'dueDate'>>) => {
        if (updates.title && !updates.title.trim()) return

        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? {
              ...task,
              ...updates,
              title: updates.title?.trim() || task.title,
              description: updates.description?.trim() || task.description,
              tagIds: updates.tagIds !== undefined ? updates.tagIds : task.tagIds,
              priority: updates.priority !== undefined ? updates.priority : task.priority,
              storyPoints: updates.storyPoints !== undefined ? updates.storyPoints : task.storyPoints,
              dueDate: updates.dueDate !== undefined ? updates.dueDate : task.dueDate
            } : task
          )
        }))
      },

      moveTask: (id: string, status: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status } : task
          )
        }))
      },

      moveTaskToPosition: (taskId: string, sourceColumnId: string, destColumnId: string, sourceIndex: number, destIndex: number) => {
        set((state) => {
          // Find the task being moved
          const taskToMove = state.tasks.find(task => task.id === taskId)
          if (!taskToMove) return state

          // If same column, use existing reorderTasks logic
          if (sourceColumnId === destColumnId) {
            const columnTasks = state.tasks.filter((task) => task.status === sourceColumnId)
            const otherTasks = state.tasks.filter((task) => task.status !== sourceColumnId)

            const reorderedTasks = Array.from(columnTasks)
            const [removed] = reorderedTasks.splice(sourceIndex, 1)
            reorderedTasks.splice(destIndex, 0, removed)

            return {
              tasks: [...otherTasks, ...reorderedTasks]
            }
          }

          // Cross-column move: remove from source, add to destination at correct position
          const allTasks = [...state.tasks]

          // Remove the task from the array
          const taskIndex = allTasks.findIndex(task => task.id === taskId)
          allTasks.splice(taskIndex, 1)

          // Get destination column tasks after removal
          const destTasks = allTasks.filter(task => task.status === destColumnId)

          // Find where to insert in the full array
          let insertIndex
          if (destTasks.length === 0 || destIndex === 0) {
            // Insert at beginning of destination column
            insertIndex = allTasks.findIndex(task => task.status === destColumnId)
            if (insertIndex === -1) insertIndex = allTasks.length
          } else if (destIndex >= destTasks.length) {
            // Insert at end of destination column
            const lastDestTaskIndex = allTasks.map((task, idx) => ({ task, idx }))
              .filter(({ task }) => task.status === destColumnId)
              .pop()?.idx
            insertIndex = lastDestTaskIndex !== undefined ? lastDestTaskIndex + 1 : allTasks.length
          } else {
            // Insert at specific position
            const targetTask = destTasks[destIndex]
            insertIndex = allTasks.findIndex(task => task.id === targetTask.id)
          }

          // Insert the task with updated status
          allTasks.splice(insertIndex, 0, { ...taskToMove, status: destColumnId })

          return { tasks: allTasks }
        })
      },

      reorderTasks: (sourceIndex: number, destIndex: number, status: string) => {
        set((state) => {
          const columnTasks = state.tasks.filter((task) => task.status === status)
          const otherTasks = state.tasks.filter((task) => task.status !== status)

          const reorderedTasks = Array.from(columnTasks)
          const [removed] = reorderedTasks.splice(sourceIndex, 1)
          reorderedTasks.splice(destIndex, 0, removed)

          return {
            tasks: [...otherTasks, ...reorderedTasks]
          }
        })
      },

      // Column operations
      addColumn: (title: string, icon: string, color: string) => {
        const newColumn: Column = {
          id: Date.now().toString(),
          title: title.trim(),
          icon,
          color,
        }

        set((state) => ({
          columns: [...state.columns, newColumn]
        }))
      },

      editColumn: (id: string, updates: Partial<Pick<Column, 'title' | 'icon' | 'color'>>) => {
        set((state) => ({
          columns: state.columns.map((column) =>
            column.id === id ? { ...column, ...updates } : column
          )
        }))
      },

      deleteColumn: (id: string) => {
        set((state) => {
          const remainingColumns = state.columns.filter((col) => col.id !== id)
          const tasksToMove = state.tasks.filter((task) => task.status === id)
          const targetColumnId = remainingColumns[0]?.id

          if (!targetColumnId) return state // Can't delete all columns

          return {
            columns: remainingColumns,
            tasks: state.tasks.map((task) =>
              task.status === id ? { ...task, status: targetColumnId } : task
            )
          }
        })
      },

      reorderColumns: (sourceIndex: number, destIndex: number) => {
        set((state) => {
          const reorderedColumns = Array.from(state.columns)
          const [removed] = reorderedColumns.splice(sourceIndex, 1)
          reorderedColumns.splice(destIndex, 0, removed)

          return {
            columns: reorderedColumns
          }
        })
      },

      // Tag operations
      addTag: (name: string, color: string, icon: string) => {
        const newTag: Tag = {
          id: Date.now().toString(),
          name: name.trim(),
          color,
          icon,
        }

        set((state) => ({
          tags: [...state.tags, newTag]
        }))
      },

      editTag: (id: string, updates: Partial<Pick<Tag, 'name' | 'color' | 'icon'>>) => {
        set((state) => ({
          tags: state.tags.map((tag) =>
            tag.id === id ? { ...tag, ...updates } : tag
          )
        }))
      },

      deleteTag: (id: string) => {
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== id),
          tasks: state.tasks.map((task) => ({
            ...task,
            tagIds: task.tagIds.filter((tagId) => tagId !== id)
          }))
        }))
      },

      // Priority operations
      editPriority: (id: Priority, updates: Partial<Pick<PriorityLevel, 'name' | 'color' | 'icon'>>) => {
        set((state) => ({
          priorities: state.priorities.map((priority) =>
            priority.id === id ? { ...priority, ...updates } : priority
          )
        }))
      },
    }),
    {
      name: 'task-storage',
    }
  )
)

// Computed selectors
export const useTasksByStatus = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const columns = useTaskStore((state) => state.columns)

  const tasksByStatus: Record<string, Task[]> = {}
  columns.forEach((column) => {
    tasksByStatus[column.id] = tasks.filter((task) => task.status === column.id)
  })

  return tasksByStatus
}

export const useTaskStats = () => {
  const tasks = useTaskStore((state) => state.tasks)
  const columns = useTaskStore((state) => state.columns)

  const stats: Record<string, number> = { total: tasks.length }
  columns.forEach((column) => {
    stats[column.id] = tasks.filter((task) => task.status === column.id).length
  })

  return stats
}

// Utility functions for date handling
export const isOverdue = (dueDate: Date): boolean => {
  return new Date(dueDate) < new Date()
}

export const isDueToday = (dueDate: Date): boolean => {
  const today = new Date()
  const due = new Date(dueDate)
  return due.toDateString() === today.toDateString()
}

export const isDueSoon = (dueDate: Date, days: number = 3): boolean => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays >= 0 && diffDays <= days
}

export const formatDueDate = (dueDate: Date): string => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} overdue`
  } else if (diffDays === 0) {
    return 'Due today'
  } else if (diffDays === 1) {
    return 'Due tomorrow'
  } else if (diffDays <= 7) {
    return `Due in ${diffDays} days`
  } else {
    return due.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: due.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    })
  }
}