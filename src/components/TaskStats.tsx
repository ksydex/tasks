import { useTaskStore } from '@/store/todo-store'
import { Progress } from '@/components/ui/progress'

export function TaskStats() {
  const { tasks } = useTaskStore()

  if (tasks.length === 0) return null

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.isDone).length
  const progressValue = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

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