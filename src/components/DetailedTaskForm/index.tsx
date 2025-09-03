import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FileText } from 'lucide-react'
import { useTaskForm } from './use-task-form'
import { TaskInfoPanel } from './TaskInfoPanel'
import { TaskCommentsPanel } from './TaskCommentsPanel'
import { TASK_FORM_TEXTS } from './constants'
import type { DetailedTaskFormProps } from './types'

/**
 * Детальная форма для создания и редактирования задач.
 * Поддерживает все поля задачи: название, описание, приоритет, story points, дату и теги.
 */
export function DetailedTaskForm({ task, trigger, initialTitle, open: externalOpen, onOpenChange }: DetailedTaskFormProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  const {
    formState,
    errors,
    isSubmitting,
    isEditing,
    tagOptions,
    priorities,
    updateField,
    handleSubmit,
    resetForm,
  } = useTaskForm(task, initialTitle)

  /**
   * Обрабатывает отправку формы.
   */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await handleSubmit()
    if (success) {
      setOpen(false)
    }
  }

  /**
   * Обрабатывает закрытие формы.
   */
  const handleClose = () => {
    resetForm()
    setOpen(false)
  }

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <FileText className="h-4 w-4 mr-2" />
      {TASK_FORM_TEXTS.addWithDetails}
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0">
        <div className="flex flex-col lg:flex-row h-full overflow-hidden">
          <TaskInfoPanel
            formState={formState}
            errors={errors}
            isSubmitting={isSubmitting}
            isEditing={isEditing}
            task={task}
            tagOptions={tagOptions}
            priorities={priorities}
            updateField={updateField}
            onSubmit={onSubmit}
            onCancel={handleClose}
          />
          <TaskCommentsPanel />
        </div>
      </DialogContent>
    </Dialog>
  )
}
