import React, { memo } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { KanbanColumn } from '@/components/KanbanColumn'
import { useBoardView } from './use-board-view'

interface BoardViewProps {
  className?: string
}

const BoardView = memo(({ className = "" }: BoardViewProps) => {
  const {
    columns,
    tasksByStatus,
    stats,
    gridLayoutClass,
    handleDragEnd,
  } = useBoardView()

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={`h-full overflow-x-auto overflow-y-hidden ${className}`}>
        <div className="flex gap-4 h-full p-4 min-w-max">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasksByStatus[column.id] || []}
              count={stats[column.id] || 0}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  )
})

BoardView.displayName = 'BoardView'

export { BoardView }
export default BoardView
