import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { MultiSelect } from '@/components/ui/multi-select'
import { CalendarDays } from 'lucide-react'
import { TaskContextMenu } from '../TaskContextMenu'
import { FormFieldWrapper, PrioritySelector, DatePickerField } from '@/components/ui/composites'
import { TASK_FORM_TEXTS, FORM_VALIDATION, FORM_CONFIG } from './constants'
import type { Task, PriorityLevel } from '@/store/todo-store'
import type { Priority } from '@/lib/status-colors'

interface TaskFormState {
  title: string
  description: string
  priority: Priority | null
  storyPoints: number | undefined
  selectedTagIds: string[]
  dueDate: string
}

interface TaskFormErrors {
  title?: string
  description?: string
  storyPoints?: string
  priority?: string
}

interface TaskInfoPanelProps {
  formState: TaskFormState
  errors: TaskFormErrors
  isSubmitting: boolean
  isEditing: boolean
  task?: Task
  tagOptions: Array<{ label: string; value: string }>
  priorities: PriorityLevel[]
  updateField: (field: string, value: any) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}

/**
 * Панель с детальной информацией о задаче.
 * Содержит форму для редактирования всех полей задачи.
 */
export function TaskInfoPanel({
  formState,
  errors,
  isSubmitting,
  isEditing,
  task,
  tagOptions,
  priorities,
  updateField,
  onSubmit,
  onCancel,
}: TaskInfoPanelProps) {
  return (
    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
      <div className="p-6 pr-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {isEditing ? TASK_FORM_TEXTS.editTitle : TASK_FORM_TEXTS.createTitle}
          </h2>
          {isEditing && task && (
            <TaskContextMenu
              taskId={task.id}
              variant="dropdown"
              onDelete={onCancel}
            />
          )}
        </div>

      <form onSubmit={onSubmit} className="space-y-6">
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
            className="text-lg font-medium"
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
            className="min-h-[120px]"
          />
        </FormFieldWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

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

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            {TASK_FORM_TEXTS.cancel}
          </Button>
          <Button type="submit" disabled={isSubmitting || !formState.title.trim()}>
            {isEditing ? TASK_FORM_TEXTS.saveChanges : TASK_FORM_TEXTS.createTask}
          </Button>
        </div>
      </form>
      </div>
    </div>
  )
}
