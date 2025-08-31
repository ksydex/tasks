import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, FileText } from 'lucide-react'
import { useTaskStore } from '@/store/todo-store'
import { CommandComponentProps } from './types'

export function AddTaskCommand({ onExecute, onClose }: CommandComponentProps) {
  const [taskName, setTaskName] = useState('')
  const [storyPoints, setStoryPoints] = useState('')
  const taskNameRef = useRef<HTMLInputElement>(null)
  const { addTask } = useTaskStore()

  // Auto-focus on mount
  useEffect(() => {
    if (taskNameRef.current) {
      taskNameRef.current.focus()
    }
  }, [])

  const handleFastCreate = () => {
    if (!taskName.trim()) return

    const points = storyPoints ? parseInt(storyPoints) : undefined
    addTask(taskName.trim(), undefined, [], points)

    onExecute('fast-create', { taskName: taskName.trim(), storyPoints: points })
    onClose()
  }

  const handleDetailedCreate = () => {
    onExecute('detailed-create', { taskName: taskName.trim() })
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && taskName.trim()) {
      handleFastCreate()
    }
  }

  return (
    <div className="flex gap-2 flex-1">
      {/* Task Name Input */}
      <Input
        ref={taskNameRef}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter task name..."
        className="w-full h-9 transition-all duration-200"
      />
      {/* Story Points Input */}

      <Input
        value={storyPoints}
        onChange={(e) => setStoryPoints(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Story points (optional)"
        type="number"
        className="w-full h-9 transition-all duration-200"
      />

      {/* Action Buttons */}
      <Button
        size="sm"
        onClick={handleFastCreate}
        disabled={!taskName.trim()}
        className="h-8 px-3"
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleDetailedCreate}
        className="h-8 px-3"
      >
        <FileText className="h-4 w-4 mr-1" />
        Detailed
      </Button>
    </div>
  )
}
