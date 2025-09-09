import { useState } from 'react'
import { useTaskStore } from '@/store/todo-store'
import type { Column, Tag, PriorityLevel } from '@/store/todo-store'
import type { Priority } from '@/lib/status-colors'

// Constants moved from component
export const columnIcons = ['📋', '⚡', '✅', '🔄', '⏸️', '🚀', '🎯', '💡', '🔍', '📊']
export const tagIcons = ['🔥', '⭐', '🐛', '💡', '📝', '🎨', '⚙️', '📱', '🌟', '🚨']
export const priorityIcons = ['🔽', '⚖️', '🔺', '🚨', '⏫', '⬇️', '➡️', '⬆️', '🎯', '🚀']
export const colors = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1', '#6b7280'
]

export function useSettingsDialog() {
  // Store data and actions
  const {
    columns,
    tags,
    priorities,
    addColumn,
    editColumn,
    deleteColumn,
    addTag,
    editTag,
    deleteTag,
    editPriority
  } = useTaskStore()

  // Local state for editing
  const [editingColumn, setEditingColumn] = useState<string | null>(null)
  const [editingTag, setEditingTag] = useState<string | null>(null)
  const [editingPriority, setEditingPriority] = useState<Priority | null>(null)
  const [showNewColumn, setShowNewColumn] = useState(false)
  const [showNewTag, setShowNewTag] = useState(false)

  // Event handlers
  const handleColumnSave = (id: string, updates: Partial<Column>) => {
    editColumn(id, updates)
    setEditingColumn(null)
  }

  const handleTagSave = (id: string, updates: Partial<Tag>) => {
    editTag(id, updates)
    setEditingTag(null)
  }

  const handlePrioritySave = (id: Priority, updates: Partial<PriorityLevel>) => {
    editPriority(id, updates)
    setEditingPriority(null)
  }

  const handleNewColumn = (data: { title: string; icon: string; color: string }) => {
    if (data.title.trim()) {
      addColumn(data.title, data.icon, data.color)
      setShowNewColumn(false)
    }
  }

  const handleNewTag = (data: { name: string; icon: string; color: string }) => {
    if (data.name.trim()) {
      addTag(data.name, data.color, data.icon)
      setShowNewTag(false)
    }
  }

  // Actions for UI state management
  const startEditingColumn = (columnId: string) => setEditingColumn(columnId)
  const cancelEditingColumn = () => setEditingColumn(null)
  const startEditingTag = (tagId: string) => setEditingTag(tagId)
  const cancelEditingTag = () => setEditingTag(null)
  const startEditingPriority = (priorityId: Priority) => setEditingPriority(priorityId)
  const cancelEditingPriority = () => setEditingPriority(null)
  const showNewColumnForm = () => setShowNewColumn(true)
  const hideNewColumnForm = () => setShowNewColumn(false)
  const showNewTagForm = () => setShowNewTag(true)
  const hideNewTagForm = () => setShowNewTag(false)

  return {
    // Store data
    columns,
    tags,
    priorities,

    // UI state
    editingColumn,
    editingTag,
    editingPriority,
    showNewColumn,
    showNewTag,

    // Event handlers
    handleColumnSave,
    handleTagSave,
    handlePrioritySave,
    handleNewColumn,
    handleNewTag,
    deleteColumn,
    deleteTag,

    // UI actions
    startEditingColumn,
    cancelEditingColumn,
    startEditingTag,
    cancelEditingTag,
    startEditingPriority,
    cancelEditingPriority,
    showNewColumnForm,
    hideNewColumnForm,
    showNewTagForm,
    hideNewTagForm,
  }
}
