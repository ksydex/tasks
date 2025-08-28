import { useTaskStore, useTaskStats } from '@/store/todo-store'
import { Progress } from '@/components/ui/progress'

export function TaskStats() {
  const { columns } = useTaskStore()
  const stats = useTaskStats()
  
  if (stats.total === 0) return null
  
  // Find the "done" column (usually the last one) to calculate progress
  const doneColumn = columns.find(col => 
    col.title.toLowerCase().includes('done') || 
    col.title.toLowerCase().includes('complete')
  ) || columns[columns.length - 1]
  
  const doneCount = stats[doneColumn?.id] || 0
  const progressValue = stats.total > 0 ? Math.round((doneCount / stats.total) * 100) : 0

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{stats.total} tasks</span>
        <div className="flex items-center gap-1">
          <Progress value={progressValue} className="w-16 h-1.5" />
          <span className="text-xs font-medium text-muted-foreground">{progressValue}%</span>
        </div>
      </div>
    </div>
  )
}