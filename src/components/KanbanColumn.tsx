import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Droppable } from '@hello-pangea/dnd'
import { TaskCard } from './TaskCard'
import type { Task, Column } from '@/store/todo-store'

interface KanbanColumnProps {
  column: Column
  tasks: Task[]
  count: number
}

export function KanbanColumn({ column, tasks, count }: KanbanColumnProps) {
  return (
    <Card className="flex flex-col h-full border-t-4" style={{ borderTopColor: column.color }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-2">
            {column.icon && <span className="text-lg">{column.icon}</span>}
            <span>{column.title}</span>
          </div>
          <Badge 
            variant="secondary" 
            className="text-xs px-2 py-0.5"
            style={{ backgroundColor: column.color + '20', color: column.color }}
          >
            {count}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-3 min-h-[200px] transition-colors ${
                snapshot.isDraggingOver ? 'bg-muted/50 rounded-lg p-2' : ''
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
}