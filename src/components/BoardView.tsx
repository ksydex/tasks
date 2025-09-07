import React, { memo } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { KanbanColumn } from '@/components/KanbanColumn'
import { useTaskStore, useTasksByStatus, useTaskStats, type Task } from '@/store/todo-store'

interface BoardViewProps {
  className?: string
}

const BoardView = memo(({ className = "" }: BoardViewProps) => {
  const { columns, moveTaskToPosition } = useTaskStore()
  const tasksByStatus = useTasksByStatus()
  const stats = useTaskStats()

  const handleDragEnd = (result: DropResult) => {
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
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={`grid gap-6 ${columns.length === 1 ? 'grid-cols-1' : columns.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'} ${className}`}>
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasksByStatus[column.id] || []}
            count={stats[column.id] || 0}
          />
        ))}
      </div>
    </DragDropContext>
  )
})

BoardView.displayName = 'BoardView'

export { BoardView }
