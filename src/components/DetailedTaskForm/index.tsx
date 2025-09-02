import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MultiSelect } from '@/components/ui/multi-select'
import { CalendarDays, FileText } from 'lucide-react'
import { useTaskForm } from './use-task-form'
import { TaskContextMenu } from '../TaskContextMenu'
import { FormFieldWrapper, PrioritySelector, DatePickerField } from '@/components/ui/composites'
import { TASK_FORM_TEXTS, FORM_VALIDATION, FORM_CONFIG } from './constants'
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
      <DialogContent className="sm:max-w-md">
        {isEditing && task && (
          <div className="absolute right-12 top-2">
            <TaskContextMenu
              taskId={task.id}
              variant="dropdown"
              onDelete={handleClose}
            />
          </div>
        )}
        <DialogHeader>
          <DialogTitle>
            {isEditing ? TASK_FORM_TEXTS.editTitle : TASK_FORM_TEXTS.createTitle}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <FormFieldWrapper
            id="title"
            label={TASK_FORM_TEXTS.title}
            error={errors.title}
            required
          >
            <Input
              id="title"
              value={formState.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder={TASK_FORM_TEXTS.titlePlaceholder}
              maxLength={FORM_VALIDATION.title.maxLength}
              required
            />
          </FormFieldWrapper>

          <FormFieldWrapper
            id="description"
            label={TASK_FORM_TEXTS.description}
            error={errors.description}
          >
            <Textarea
              id="description"
              value={formState.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder={TASK_FORM_TEXTS.descriptionPlaceholder}
              rows={FORM_CONFIG.descriptionRows}
              maxLength={FORM_VALIDATION.description.maxLength}
            />
          </FormFieldWrapper>

          <PrioritySelector
            id="priority"
            label={TASK_FORM_TEXTS.priority}
            value={formState.priority}
            onChange={(priority) => updateField('priority', priority)}
            priorities={priorities}
            error={errors.priority}
          />

          <FormFieldWrapper
            id="storyPoints"
            label={TASK_FORM_TEXTS.storyPoints}
            error={errors.storyPoints}
          >
            <Input
              id="storyPoints"
              type="number"
              min={FORM_VALIDATION.storyPoints.min}
              max={FORM_VALIDATION.storyPoints.max}
              step={FORM_VALIDATION.storyPoints.step}
              value={formState.storyPoints || ''}
              onChange={(e) => updateField('storyPoints', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder={TASK_FORM_TEXTS.storyPointsPlaceholder}
            />
          </FormFieldWrapper>

          <DatePickerField
            id="dueDate"
            label={TASK_FORM_TEXTS.dueDate}
            value={formState.dueDate}
            onChange={(date) => updateField('dueDate', date)}
            description={TASK_FORM_TEXTS.dueDateDescription}
            disablePastDates={FORM_CONFIG.calendarDisabledPast}
            placeholder={TASK_FORM_TEXTS.dueDatePlaceholder}
          />

          <FormFieldWrapper
            id="tags"
            label={TASK_FORM_TEXTS.tags}
          >
            <MultiSelect
              options={tagOptions}
              selected={formState.selectedTagIds}
              onChange={(tagIds) => updateField('selectedTagIds', tagIds)}
              placeholder={TASK_FORM_TEXTS.tagsPlaceholder}
              searchPlaceholder={TASK_FORM_TEXTS.tagsSearchPlaceholder}
              emptyText={TASK_FORM_TEXTS.tagsEmptyText}
            />
          </FormFieldWrapper>

          {isEditing && task && (
            <>
              <Separator />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {TASK_FORM_TEXTS.createdInfo} {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              {TASK_FORM_TEXTS.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting || !formState.title.trim()}>
              {isEditing ? TASK_FORM_TEXTS.saveChanges : TASK_FORM_TEXTS.createTask}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
