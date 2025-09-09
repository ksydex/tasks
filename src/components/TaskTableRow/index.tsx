import React, { memo } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tag } from '@/components/ui/primitives'
import { DueStatus } from '@/components/ui/composites'
import { TaskCheck } from '../TaskCheck'
import { useTaskTableRow } from './use-task-table-row'
import type { Task } from '@/store/todo-store'

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
  const {
    taskTags,
    taskPriority,
    taskColumn,
    handleRowClick,
    handleToggleCompletion,
  } = useTaskTableRow(task, onTaskClick)

  return (
    <TableRow
      className={`cursor-pointer hover:bg-muted/50 ${task.isDone ? 'opacity-75' : ''}`}
      onClick={handleRowClick}
    >
      <TableCell className="justify-items-center">
        {showCheck && (
          <TaskCheck
            checked={task.isDone}
            onCheckedChange={handleToggleCompletion}
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
        {taskColumn ? (
          <Badge
            variant="secondary"
            className="gap-1 h-5 text-xs w-max"
            style={{
              backgroundColor: taskColumn.color + '20',
              color: taskColumn.color,
              borderColor: taskColumn.color
            }}
          >
            {taskColumn.icon && <span>{taskColumn.icon}</span>}
            {taskColumn.title}
          </Badge>
        ) : (
          <Badge variant="outline" className="gap-1 h-5 text-xs w-max">
            {task.status}
          </Badge>
        )}
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

export { TaskTableRow }
export default TaskTableRow
