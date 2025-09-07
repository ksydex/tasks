import React, { memo, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tag } from '@/components/ui/primitives'
import { DueStatus } from '@/components/ui/composites'
import { TaskCheck } from './TaskCheck'
import { useTaskStore } from '@/store/todo-store'
import { useSearchParams } from 'react-router-dom'
import type { Task } from '@/store/todo-store'
import { formatDueDate, isOverdue } from '@/store/todo-store'
import { CheckCircle2, Circle, ArrowUpDown } from 'lucide-react'

export interface TaskTableRowProps {
  task: Task
  onTaskClick?: (task: Task) => void
  showCheck?: boolean
}

const TaskTableRow = memo(({
  task,
  onTaskClick,
  showCheck = true
}: TaskTableRowProps) => {
  const { tags, priorities, toggleTaskCompletion } = useTaskStore()
  const [searchParams, setSearchParams] = useSearchParams()

  const taskTags = useMemo(() =>
    tags.filter(tag => task.tagIds?.includes(tag.id)),
    [tags, task.tagIds]
  )
  const taskPriority = useMemo(() =>
    priorities.find(p => p.id === task.priority),
    [priorities, task.priority]
  )

  const handleTaskClick = () => {
    if (onTaskClick) {
      onTaskClick(task)
    } else {
      // Default behavior: open task details
      const newParams = new URLSearchParams(searchParams)
      newParams.set('taskId', task.id)
      setSearchParams(newParams)
    }
  }

  const handleRowClick = (e: React.MouseEvent) => {
    // Don't trigger row click if clicking on checkbox
    if ((e.target as HTMLElement).closest('[role="checkbox"]')) {
      return
    }
    handleTaskClick()
  }

  return (
    <TableRow
      className={`cursor-pointer hover:bg-muted/50 ${task.isDone ? 'opacity-75' : ''}`}
      onClick={handleRowClick}
    >
      <TableCell className="justify-items-center">
        {showCheck && (
          <TaskCheck
            checked={task.isDone}
            onCheckedChange={() => toggleTaskCompletion(task.id)}
            size="md"
            aria-label={`Mark task "${task.title}" as ${task.isDone ? 'incomplete' : 'complete'}`}
          />
        )}
      </TableCell>

      <TableCell className="font-medium">
        <div className="space-y-1">
          <div className={`text-sm ${task.isDone ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </div>
          {task.description && (
            <div className="text-xs text-muted-foreground line-clamp-1">
              {task.description}
            </div>
          )}
        </div>
      </TableCell>

      <TableCell>
        {(() => {
          const { columns } = useTaskStore.getState()
          const column = columns.find(col => col.id === task.status)
          return column ? (
            <Badge
              variant="secondary"
              className="gap-1 h-5 text-xs w-max"
              style={{
                backgroundColor: column.color + '20',
                color: column.color,
                borderColor: column.color
              }}
            >
              {column.icon && <span>{column.icon}</span>}
              {column.title}
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1 h-5 text-xs w-max">
              {task.status}
            </Badge>
          )
        })()}
      </TableCell>

      <TableCell>
        {taskPriority && (
          <Badge
            variant="secondary"
            className="gap-1 h-5 text-xs"
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
      </TableCell>

      <TableCell>
        <div className="flex flex-wrap gap-1 w-max">
          {taskTags.slice(0, 2).map((tag) => (
            <Tag
              key={tag.id}
              color={tag.color}
              icon={tag.icon}
              className="text-xs"
            >
              {tag.name}
            </Tag>
          ))}
          {taskTags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{taskTags.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>

      <TableCell>
        {task.dueDate && (
          <DueStatus className="w-max" dueDate={task.dueDate} size="sm" />
        )}
      </TableCell>

      <TableCell className="text-center">
        {task.storyPoints && (
          <Badge variant="outline" className="text-xs font-mono">
            {task.storyPoints}
          </Badge>
        )}
      </TableCell>
    </TableRow>
  )
})

TaskTableRow.displayName = 'TaskTableRow'

export interface ListViewProps {
  tasks: Task[]
  onTaskClick?: (task: Task) => void
  showCheck?: boolean
  emptyMessage?: string
  className?: string
  itemClassName?: string
  renderItem?: (task: Task) => React.ReactNode
  sortBy?: 'createdAt' | 'dueDate' | 'priority' | 'title'
  sortOrder?: 'asc' | 'desc'
  filterFn?: (task: Task) => boolean
}

const ListView = memo(({
  tasks,
  onTaskClick,
  showCheck = true,
  emptyMessage = "No tasks found",
  className = "",
  sortBy = 'createdAt',
  sortOrder = 'desc',
  filterFn
}: ListViewProps) => {
  // Filter tasks if filter function provided
  const filteredTasks = useMemo(() => {
    let filtered = filterFn ? tasks.filter(filterFn) : tasks

    // Sort tasks
    filtered = [...filtered].sort((a, b) => {
      let aValue: any = a[sortBy]
      let bValue: any = b[sortBy]

      // Handle special cases
      if (sortBy === 'dueDate') {
        aValue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
        bValue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
      } else if (sortBy === 'priority') {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0
      } else if (sortBy === 'title') {
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      }
    })

    return filtered
  }, [tasks, filterFn, sortBy, sortOrder])

  if (filteredTasks.length === 0) {
    return (
      <div className={`text-center py-12 text-muted-foreground ${className}`}>
        <div className="text-sm">{emptyMessage}</div>
      </div>
    )
  }

  return (
    <div className={`rounded-md border ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <span className="sr-only">Status</span>
            </TableHead>
            <TableHead className="max-w-md min-w-[200px]">Task</TableHead>
            <TableHead className="w-fit">Column</TableHead>
            <TableHead className="w-fit">Priority</TableHead>
            <TableHead className="w-fit">Tags</TableHead>
            <TableHead className="w-fit">Due Date</TableHead>
            <TableHead className="w-fit text-center">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TaskTableRow
              key={task.id}
              task={task}
              onTaskClick={onTaskClick}
              showCheck={showCheck}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
})

ListView.displayName = 'ListView'

export { ListView, TaskTableRow }
