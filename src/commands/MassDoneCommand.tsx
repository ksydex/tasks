import React, { useState, useCallback, useRef, useEffect } from 'react'
import { CheckCircle2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { useTaskStore, useTasksByStatus } from '@/store/todo-store'
import { CommandComponentProps } from './types'

export function MassDoneCommand({ onExecute, onClose }: CommandComponentProps) {
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { columns, editTask } = useTaskStore()
  const tasksByStatus = useTasksByStatus()

  // Auto-focus on mount
  useEffect(() => {
    if (triggerRef.current) {
      triggerRef.current.focus()
    }
  }, [])

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
    setIsOpen(false)
  }, [])

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

  return (
    <div className="flex gap-2 flex-1" onKeyDown={handleKeyDown}>
      {/* Column Selector */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            className="h-9 justify-between min-w-[200px]"
          >
            <div className="flex items-center gap-2">
              {selectedColumn ? (
                <>
                  <span>{selectedColumn.icon}</span>
                  <span>{selectedColumn.title}</span>
                  <Badge variant="secondary" className="text-xs">
                    {incompleteTasksCount}
                  </Badge>
                </>
              ) : (
                <span>Select column...</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground px-2 py-1">
              Columns with incomplete tasks:
            </div>
            {availableColumns.map(column => {
              const columnTasks = tasksByStatus[column.id] || []
              const incompleteCount = columnTasks.filter(task => !task.isDone).length

              return (
                <Button
                  key={column.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-2"
                  onClick={() => handleColumnSelect(column.id)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-lg">{column.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{column.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {incompleteCount} incomplete task{incompleteCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {incompleteCount}
                    </Badge>
                  </div>
                </Button>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>

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
