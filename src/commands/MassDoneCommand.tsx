import React, { useState, useCallback } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SelectDropdown, type SelectDropdownItem } from '@/components/ui/select-dropdown'
import { useTaskStore, useTasksByStatus } from '@/store/todo-store'
import { CommandComponentProps } from './types'

// Convert columns to SelectDropdownItem format
function convertColumnsToItems(columns: any[], tasksByStatus: any): SelectDropdownItem[] {
  return columns.map(column => {
    const columnTasks = tasksByStatus[column.id] || []
    const incompleteCount = columnTasks.filter((task: any) => !task.isDone).length

    return {
      id: column.id,
      primary: column.title,
      secondary: `${incompleteCount} incomplete task${incompleteCount !== 1 ? 's' : ''}`,
      badge: incompleteCount,
      data: column
    }
  })
}

// Render icon for columns (emoji strings)
function renderColumnIcon(item: SelectDropdownItem, isSelected?: boolean) {
  const column = item.data
  if (!column?.icon) return null

  // Handle emoji strings
  if (typeof column.icon === 'string') {
    return <span className="text-lg shrink-0">{column.icon}</span>
  }

  return null
}

export function MassDoneCommand({ onExecute, onClose }: CommandComponentProps) {
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null)
  const { columns, editTask } = useTaskStore()
  const tasksByStatus = useTasksByStatus()

  // Get columns that have incomplete tasks
  const availableColumns = columns.filter(column => {
    const columnTasks = tasksByStatus[column.id] || []
    return columnTasks.some(task => !task.isDone)
  })

  const selectedColumn = selectedColumnId ? columns.find(col => col.id === selectedColumnId) : null
  const selectedColumnTasks = selectedColumnId ? tasksByStatus[selectedColumnId] || [] : []
  const incompleteTasksCount = selectedColumnTasks.filter(task => !task.isDone).length

  const handleColumnSelect = useCallback((columnId: string) => {
    setSelectedColumnId(columnId)
  }, [])

  // Handle column selection from SelectDropdown
  const handleColumnChange = useCallback((columnId: string, item: SelectDropdownItem) => {
    handleColumnSelect(columnId)
  }, [handleColumnSelect])

  const handleMassComplete = useCallback(() => {
    if (!selectedColumnId) return

    const columnTasks = tasksByStatus[selectedColumnId] || []
    const incompleteTasks = columnTasks.filter(task => !task.isDone)

    // Mark all incomplete tasks as done
    incompleteTasks.forEach(task => {
      editTask(task.id, {
        isDone: true,
        doneDate: new Date()
      })
    })

    const completedCount = incompleteTasks.length
    onExecute('mass-complete', {
      columnId: selectedColumnId,
      completedCount
    })
    onClose()
  }, [selectedColumnId, tasksByStatus, editTask, onExecute, onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedColumnId && incompleteTasksCount > 0) {
      handleMassComplete()
    }
  }, [selectedColumnId, incompleteTasksCount, handleMassComplete])

  // If no columns have incomplete tasks
  if (availableColumns.length === 0) {
    return (
      <div className="flex items-center gap-2 shrink-0">
        <div className="text-sm text-muted-foreground px-3">
          All tasks completed! 🎉
        </div>
        <Button onClick={onClose} size="sm" className="h-8 px-3">
          Close
        </Button>
      </div>
    )
  }

  // Convert available columns for SelectDropdown
  const columnItems = convertColumnsToItems(availableColumns, tasksByStatus)

  return (
    <div className="flex gap-2 flex-1" onKeyDown={handleKeyDown}>
      {/* Column Selector */}
      <SelectDropdown
        items={columnItems}
        value={selectedColumnId || undefined}
        onValueChange={handleColumnChange}
        placeholder="Select column..."
        triggerWidth="min-w-[200px]"
        contentWidth="w-[300px]"
        searchable={false}
        headerText="Columns with incomplete tasks:"
        className="h-9 justify-between"
        renderIcon={renderColumnIcon}
      />

      {/* Action Buttons */}
      <Button
        size="sm"
        onClick={handleMassComplete}
        disabled={!selectedColumnId || incompleteTasksCount === 0}
        className="h-8 px-3 bg-green-600 hover:bg-green-700"
      >
        <CheckCircle2 className="h-4 w-4 mr-1" />
        Complete All
      </Button>
    </div>
  )
}
