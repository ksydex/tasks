import { useCallback, useMemo } from 'react'
import { useTaskStore } from '@/store/todo-store'
import { useToast } from '@/hooks/use-toast'

interface UseTaskContextMenuProps {
  taskId: string
  onDelete?: () => void
}

export function useTaskContextMenu({ taskId, onDelete }: UseTaskContextMenuProps) {
  const { deleteTask, tasks } = useTaskStore()
  const { toast } = useToast()

  // Find the task
  const task = useMemo(() =>
    tasks.find(t => t.id === taskId),
    [tasks, taskId]
  )

  // Delete handler
  const handleDelete = useCallback(() => {
    if (task) {
      deleteTask(taskId)
      toast({
        title: "Task deleted",
        description: `"${task.title}" has been deleted.`,
      })
      onDelete?.()
    }
  }, [task, taskId, deleteTask, toast, onDelete])

  return {
    // Data
    task,

    // Handlers
    handleDelete,
  }
}
