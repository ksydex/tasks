import React, { memo, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusIndicator, Tag } from '@/components/ui/primitives'
import { Clock, AlertTriangle } from 'lucide-react'
import { Draggable } from '@hello-pangea/dnd'
import { useTaskStore, formatDueDate } from '@/store/todo-store'
import { getDueDateStatus } from '@/lib/status-colors'
import { DetailedTaskForm } from './DetailedTaskForm'
import { TaskContextMenu } from './TaskContextMenu'
import type { Task } from '@/store/todo-store'

interface TaskCardProps {
  task: Task
  index: number
}

const TaskCard = memo(({ task, index }: TaskCardProps) => {
  const { tags } = useTaskStore()

  const taskTags = useMemo(() =>
    tags.filter(tag => task.tagIds?.includes(tag.id)),
    [tags, task.tagIds]
  )

  const formatDate = useMemo(() => (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }, [])

  const dueDateStatus = useMemo(() =>
    task.dueDate ? getDueDateStatus(task.dueDate) : null,
    [task.dueDate]
  )

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskContextMenu taskId={task.id}>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`${snapshot.isDragging ? 'rotate-2 scale-105' : ''} transition-transform`}
          >
            <DetailedTaskForm
              task={task}
              trigger={
                <Card
                  hover="lift"
                  className="group cursor-pointer"
                  {...provided.dragHandleProps}
                >
                  <CardContent className="p-0">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm leading-snug text-card-foreground group-hover:text-foreground transition-colors">
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                        </div>
                        {task.storyPoints && (
                          <Badge variant="outline" className="text-xs font-mono shrink-0">
                            {task.storyPoints}
                          </Badge>
                        )}
                      </div>

                      {taskTags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {taskTags.map((tag) => (
                            <Tag
                              key={tag.id}
                              color={tag.color}
                              icon={tag.icon}
                            >
                              {tag.name}
                            </Tag>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(task.createdAt)}</span>
                        </div>

                        {task.dueDate && dueDateStatus && (
                          <StatusIndicator
                            status={dueDateStatus}
                            icon={dueDateStatus === 'overdue' ? <AlertTriangle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          >
                            {formatDueDate(task.dueDate)}
                          </StatusIndicator>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              }
            />
          </div>
        </TaskContextMenu>
      )}
    </Draggable>
  )
})

TaskCard.displayName = 'TaskCard'

export { TaskCard }