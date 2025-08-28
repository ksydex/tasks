import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Tag {
  id: string
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
  storyPoints?: number
  createdAt: Date
}

interface TaskState {
  tasks: Task[]
  columns: Column[]
  tags: Tag[]
  
  // Task operations
  addTask: (title: string, description?: string, tagIds?: string[], storyPoints?: number) => void
  deleteTask: (id: string) => void
  editTask: (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'tagIds' | 'storyPoints'>>) => void
  moveTask: (id: string, status: string) => void
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

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      columns: defaultColumns,
      tags: defaultTags,
      
      // Task operations
      addTask: (title: string, description?: string, tagIds: string[] = [], storyPoints?: number) => {
        if (!title.trim()) return
        
        const newTask: Task = {
          id: Date.now().toString(),
          title: title.trim(),
          description: description?.trim(),
          status: get().columns[0]?.id || 'todo',
          tagIds,
          storyPoints,
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
      
      editTask: (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'tagIds' | 'storyPoints'>>) => {
        if (updates.title && !updates.title.trim()) return
        
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { 
              ...task, 
              ...updates,
              title: updates.title?.trim() || task.title,
              description: updates.description?.trim() || task.description,
              tagIds: updates.tagIds !== undefined ? updates.tagIds : task.tagIds,
              storyPoints: updates.storyPoints !== undefined ? updates.storyPoints : task.storyPoints
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