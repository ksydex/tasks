import React, { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ColumnBadge } from '@/components/ui/primitives'
import { Droppable } from '@hello-pangea/dnd'
import { TaskCard } from './TaskCard'
import type { Task, Column } from '@/store/todo-store'

interface KanbanColumnProps {
  column: Column
  tasks: Task[]
  count: number
}

const KanbanColumn = memo(({ column, tasks, count }: KanbanColumnProps) => {
  return (
    <div
      className="flex flex-col w-72 h-full bg-muted/30 rounded-lg border border-border"
      style={{ borderTopColor: column.color, borderTopWidth: '4px' }}
    >
      {/* List Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {column.icon && <span className="text-lg">{column.icon}</span>}
            <h3 className="font-semibold text-sm text-foreground">{column.title}</h3>
          </div>
          <ColumnBadge color={column.color} count={count} />
        </div>
      </div>

      {/* Scrollable Cards Area */}
      <div className="flex-1 overflow-y-auto p-3">
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-3 min-h-full transition-colors ${
                snapshot.isDraggingOver ? 'bg-muted/50 rounded-lg' : ''
              }`}
            >
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  {snapshot.isDraggingOver ? 'Drop task here' : 'No tasks yet'}
                </div>
              ) : (
                tasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

    </div>
  )
})

KanbanColumn.displayName = 'KanbanColumn'

export { KanbanColumn }