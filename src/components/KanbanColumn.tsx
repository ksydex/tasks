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
    <Card
      className="flex flex-col h-full border-t-4"
      style={{ borderTopColor: column.color }}
    >
      <CardHeader className="mb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-2 text-lg">
            {column.icon && <span>{column.icon}</span>}
            <span>{column.title}</span>
          </div>
          <ColumnBadge color={column.color} count={count} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-3 min-h-[200px] transition-colors ${
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
      </CardContent>
    </Card>
  )
})

KanbanColumn.displayName = 'KanbanColumn'

export { KanbanColumn }