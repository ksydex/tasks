import React, { memo } from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TaskTableRow } from '../TaskTableRow'
import { useListView } from './use-list-view'
import type { Task } from '@/store/todo-store'

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
  const { filteredTasks, hasFilteredTasks } = useListView({
    tasks,
    sortBy,
    sortOrder,
    filterFn
  })

  if (!hasFilteredTasks) {
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

export { ListView }
export default ListView
