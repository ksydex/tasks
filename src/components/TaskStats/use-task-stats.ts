import { useMemo } from 'react'
import { useTaskStore } from '@/store/todo-store'

export function useTaskStats() {
  const { tasks } = useTaskStore()

  // Calculate task statistics
  const stats = useMemo(() => {
    if (tasks.length === 0) {
      return {
        hasAnyTasks: false,
        totalTasks: 0,
        completedTasks: 0,
        progressValue: 0,
      }
    }

    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.isDone).length
    const progressValue = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return {
      hasAnyTasks: true,
      totalTasks,
      completedTasks,
      progressValue,
    }
  }, [tasks])

  return stats
}
