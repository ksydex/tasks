import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, AlertTriangle } from 'lucide-react'
import { Draggable } from '@hello-pangea/dnd'
import { useTaskStore, isOverdue, isDueToday, isDueSoon, formatDueDate } from '@/store/todo-store'
import { DetailedTaskForm } from './DetailedTaskForm'
import { TaskContextMenu } from './TaskContextMenu'
import type { Task } from '@/store/todo-store'

interface TaskCardProps {
  task: Task
  index: number
}

export function TaskCard({ task, index }: TaskCardProps) {
  const { tags } = useTaskStore()

  const taskTags = tags.filter(tag => task.tagIds?.includes(tag.id))

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: new Date(date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  const getDueDateDisplay = () => {
    if (!task.dueDate) return null

    const isTaskOverdue = isOverdue(task.dueDate)
    const isTaskDueToday = isDueToday(task.dueDate)
    const isTaskDueSoon = isDueSoon(task.dueDate)

    let icon = <Clock className="h-3 w-3" />
    let textColor = 'text-muted-foreground'
    let bgColor = ''

    if (isTaskOverdue) {
      icon = <AlertTriangle className="h-3 w-3" />
      textColor = 'text-red-500'
      bgColor = 'bg-red-50 dark:bg-red-950/20'
    } else if (isTaskDueToday) {
      textColor = 'text-orange-500'
      bgColor = 'bg-orange-50 dark:bg-orange-950/20'
    } else if (isTaskDueSoon) {
      textColor = 'text-yellow-500'
      bgColor = 'bg-yellow-50 dark:bg-yellow-950/20'
    }

    return {
      icon,
      text: formatDueDate(task.dueDate),
      textColor,
      bgColor
    }
  }

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
                  className="group hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                  {...provided.dragHandleProps}
                >
                  <CardContent className="p-4">
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
                            <Badge
                              key={tag.id}
                              variant="secondary"
                              className="gap-1 text-xs px-2 py-0"
                              style={{
                                backgroundColor: tag.color + '20',
                                color: tag.color,
                                borderColor: tag.color + '40'
                              }}
                            >
                              {tag.icon && <span className="text-[10px]">{tag.icon}</span>}
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(task.createdAt)}</span>
                        </div>

                        {task.dueDate && (
                          <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${getDueDateDisplay()?.bgColor || ''}`}>
                            {getDueDateDisplay()?.icon}
                            <span className={getDueDateDisplay()?.textColor || 'text-muted-foreground'}>
                              {getDueDateDisplay()?.text}
                            </span>
                          </div>
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
}