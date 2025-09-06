import React, { memo, useMemo, useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tag } from '@/components/ui/primitives'
import { DueStatus } from '@/components/ui/composites'
import { Draggable } from '@hello-pangea/dnd'
import { useTaskStore } from '@/store/todo-store'
import { TaskContextMenu } from './TaskContextMenu'
import { TaskCheck } from './TaskCheck'
import { useSearchParams } from 'react-router-dom'
import type { Task } from '@/store/todo-store'

interface TaskCardProps {
  task: Task
  index: number
}

const TaskCard = memo(({ task, index }: TaskCardProps) => {
  const { tags, priorities, toggleTaskCompletion } = useTaskStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showCheck, setShowCheck] = useState(task.isDone)
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout>()

  const taskTags = useMemo(() =>
    tags.filter(tag => task.tagIds?.includes(tag.id)),
    [tags, task.tagIds]
  )
  const taskPriority = useMemo(() =>
    priorities.find(p => p.id === task.priority),
    [priorities, task.priority]
  )

  // Handle hover state with delay
  useEffect(() => {
    if (isHovered && !task.isDone) {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowCheck(true)
      }, 500) // 0.5 second delay
    } else if (!isHovered && !task.isDone) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      setShowCheck(false)
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [isHovered, task.isDone])

  // Update showCheck when task.isDone changes
  useEffect(() => {
    setShowCheck(task.isDone)
  }, [task.isDone])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)



  const handleCardClick = () => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('taskId', task.id)
    setSearchParams(newParams)
  }




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
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
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