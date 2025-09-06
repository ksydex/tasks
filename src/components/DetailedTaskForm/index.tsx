import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X } from 'lucide-react'
import { useTaskForm } from './use-task-form'
import { TaskInfoPanel } from './TaskInfoPanel'
import { TaskCommentsPanel } from './TaskCommentsPanel'
import { TASK_FORM_TEXTS } from './constants'
import type { DetailedTaskFormProps } from './types'
import { useTaskStore } from '@/store/todo-store'
import { TaskContextMenu } from '../TaskContextMenu'
import { TaskCheck } from '../TaskCheck'
import { DialogTitle } from '../ui'

/**
 * Детальная форма для редактирования задач.
 * Поддерживает все поля задачи: название, описание, приоритет, story points, дату и теги.
 */
export function DetailedTaskForm({ task: taskProp, taskId, trigger, open: externalOpen, onOpenChange }: DetailedTaskFormProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  // Получаем задачу по ID из store, если передан taskId
  const taskFromStore = useTaskStore((state) =>
    taskId ? state.tasks.find(t => t.id === taskId) : undefined
  )

  // Используем задачу из пропсов или из store
  const task = taskProp || taskFromStore

  // Если задача не найдена, не рендерим форму
  if (!task) {
    return null
  }

  const {
    formState,
    errors,
    isEditing,
    tagOptions,
    priorities,
    updateField,
    resetForm,
  } = useTaskForm(task)

  const columns = useTaskStore((s) => s.columns)
  const moveTask = useTaskStore((s) => s.moveTask)


  /**
   * Обрабатывает закрытие формы.
   */
  const handleClose = () => {
    resetForm()
    setOpen(false)
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}

      <DialogContent className="max-w-7xl p-0" hideCloseButton>
        {/* Для обхода ошибки в консоли */}
        <div className="hidden">
          <DialogTitle>
            {TASK_FORM_TEXTS.editTitle}
          </DialogTitle>
        </div>
        {/* --------------------------- */}

        <div className="flex h-fit items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <TaskCheck
              checked={formState.isDone}
              onCheckedChange={() => updateField('isDone', !formState.isDone)}
              size="md"
              className="mr-1"
            />
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
            task={task}
            tagOptions={tagOptions}
            priorities={priorities}
            updateField={updateField}
          />
          <TaskCommentsPanel />
        </div>
      </DialogContent>
    </Dialog>
  )
}
