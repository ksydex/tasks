import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { MultiSelect } from '@/components/ui/multi-select'
import { CalendarDays, Check } from 'lucide-react'
import { TaskCheck } from '../TaskCheck'
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
  isDone: boolean
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
  task?: Task
  tagOptions: Array<{ label: string; value: string }>
  priorities: PriorityLevel[]
  updateField: (field: string, value: any) => void
}

/**
 * Панель с детальной информацией о задаче.
 * Содержит форму для редактирования всех полей задачи.
 */
export function TaskInfoPanel({
  formState,
  errors,
  task,
  tagOptions,
  priorities,
  updateField,
}: TaskInfoPanelProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="p-4">
        <div className="space-y-6">
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
        </div>
      </div>

      <Separator />
      <div className="flex p-4 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          {TASK_FORM_TEXTS.createdInfo} {new Date(task.createdAt).toLocaleDateString()}
        </div>
        {task.doneDate && (
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            {TASK_FORM_TEXTS.completedInfo} {new Date(task.doneDate).toLocaleDateString()}
          </div>
        )}
      </div>

    </div>
  )
}
