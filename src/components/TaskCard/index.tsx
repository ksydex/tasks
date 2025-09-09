import React, { memo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tag } from '@/components/ui/primitives'
import { DueStatus } from '@/components/ui/composites'
import { Draggable } from '@hello-pangea/dnd'
import { TaskContextMenu } from '../TaskContextMenu'
import { TaskCheck } from '../TaskCheck'
import { useTaskCard } from './use-task-card'
import type { Task } from '@/store/todo-store'

interface TaskCardProps {
  task: Task
  index: number
}

const TaskCard = memo(({ task, index }: TaskCardProps) => {
  const {
    taskTags,
    taskPriority,
    showCheck,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleCardClick,
    handleToggleCompletion,
  } = useTaskCard({ task })

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskContextMenu taskId={task.id}>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={`${snapshot.isDragging ? 'rotate-2 scale-105' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card
              hover="lift"
              padding="sm"
              className={`group cursor-pointer ${task.isDone ? 'opacity-75' : ''} ${
                snapshot.isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              {...provided.dragHandleProps}
              onClick={handleCardClick}
            >
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div
                      className={`transition-opacity duration-300 ${
                        showCheck ? 'opacity-100' : 'opacity-0'
                      } ${showCheck ? 'w-5' : 'w-0'} overflow-hidden`}
                    >
                      <TaskCheck
                        checked={task.isDone}
                        onCheckedChange={handleToggleCompletion}
                        size="sm"
                        className="mt-0.5 flex-shrink-0"
                      />
                    </div>
                    <div
                      className={`flex-1 min-w-0 transition-all duration-300 ${
                        showCheck ? 'ml-1' : 'ml-0'
                      }`}
                    >
                      <h3 className={`font-medium text-sm leading-snug text-card-foreground group-hover:text-foreground transition-colors ${
                        task.isDone ? 'line-through text-muted-foreground' : ''
                      }`}>
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
                    <div className="flex items-center gap-2 text-xs">
                      {taskPriority && (
                        <Badge
                          variant="secondary"
                          className="gap-1"
                          style={{
                            backgroundColor: taskPriority.color + '20',
                            color: taskPriority.color,
                            borderColor: taskPriority.color
                          }}
                        >
                          {taskPriority.icon && <span>{taskPriority.icon}</span>}
                          {taskPriority.name}
                        </Badge>
                      )}
                    </div>

                    {task.dueDate ? (
                      <DueStatus dueDate={task.dueDate} />
                    ) : (
                      <DueStatus />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TaskContextMenu>
      )}
    </Draggable>
  )
})

TaskCard.displayName = 'TaskCard'

export { TaskCard }
export default TaskCard
