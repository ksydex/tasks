import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, PlusCircle } from 'lucide-react'
import { useAddTaskForm } from './use-add-task-form'

interface AddTaskFormProps {
  onOpenDetailed: (initialTitle?: string) => void
}

export function AddTaskForm({ onOpenDetailed }: AddTaskFormProps) {
  const {
    title,
    isSubmitDisabled,
    handleSubmit,
    handleOpenDetailed,
    handleTitleChange,
  } = useAddTaskForm({ onOpenDetailed })

  return (
    <div className="flex gap-2">
      <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
        <Input
          type="text"
          placeholder="Add a task..."
          value={title}
          onChange={handleTitleChange}
          className="flex-1"
        />
        <Button type="submit" size="sm" disabled={isSubmitDisabled}>
          <Plus className="h-4 w-4" />
        </Button>
      </form>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleOpenDetailed}
        className="shrink-0"
      >
        <PlusCircle className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default AddTaskForm
