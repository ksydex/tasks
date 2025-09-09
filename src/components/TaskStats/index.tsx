import { Progress } from '@/components/ui/progress'
import { useTaskStats } from './use-task-stats'

export function TaskStats() {
  const { hasAnyTasks, totalTasks, progressValue } = useTaskStats()

  if (!hasAnyTasks) return null

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{totalTasks} tasks</span>
        <div className="flex items-center gap-1">
          <Progress value={progressValue} className="w-16 h-1.5" />
          <span className="text-xs font-medium text-muted-foreground">{progressValue}%</span>
        </div>
      </div>
    </div>
  )
}

export default TaskStats
