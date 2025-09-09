import { useCallback, useMemo } from 'react'
import { DropResult } from '@hello-pangea/dnd'
import { useTaskStore, useTasksByStatus, useTaskStats } from '@/store/todo-store'

export function useBoardView() {
  // Store data and actions
  const { columns, moveTaskToPosition } = useTaskStore()
  const tasksByStatus = useTasksByStatus()
  const stats = useTaskStats()

  // Drag and drop handler
  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Use the new moveTaskToPosition for both cross-column and same-column moves
    moveTaskToPosition(
      result.draggableId,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    )
  }, [moveTaskToPosition])

  // Grid layout class based on column count
  const gridLayoutClass = useMemo(() => {
    if (columns.length === 1) return 'grid-cols-1'
    if (columns.length === 2) return 'grid-cols-1 lg:grid-cols-2'
    return 'grid-cols-1 lg:grid-cols-3'
  }, [columns.length])

  return {
    // Data
    columns,
    tasksByStatus,
    stats,

    // Layout
    gridLayoutClass,

    // Event handlers
    handleDragEnd,
  }
}
