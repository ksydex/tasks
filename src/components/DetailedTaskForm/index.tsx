import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, X } from 'lucide-react'
import { useTaskForm } from './use-task-form'
import { TaskInfoPanel } from './TaskInfoPanel'
import { TaskCommentsPanel } from './TaskCommentsPanel'
import { TASK_FORM_TEXTS } from './constants'
import type { DetailedTaskFormProps } from './types'
import { useTaskStore } from '@/store/todo-store'
import { TaskContextMenu } from '../TaskContextMenu'

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

  const columns = useTaskStore((s) => s.columns)
  const moveTask = useTaskStore((s) => s.moveTask)

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
      <DialogContent className="max-w-7xl p-0" hideCloseButton>
        <div className="flex h-fit items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Select
              value={formState.status}
              onValueChange={(value) => {
                if (isEditing && task) {
                  moveTask(task.id, value)
                }
                updateField('status', value)
              }}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent>
                {columns.map((col) => (
                  <SelectItem key={col.id} value={col.id}>
                    <span className="mr-2">{col.icon}</span>
                    {col.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            {isEditing && task && (
              <TaskContextMenu taskId={task.id} variant="dropdown" onDelete={handleClose} />
            )}
            <DialogClose asChild>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row overflow-hidden">
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
