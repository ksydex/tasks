import type { Task } from '@/store/todo-store'

/**
 * Пропсы для компонента DetailedTaskForm.
 */
export interface DetailedTaskFormProps {
  /** Задача для редактирования */
  task?: Task
  /** ID задачи для редактирования (альтернатива task) */
  taskId?: string
  /** Кастомный триггер для открытия формы */
  trigger?: React.ReactNode
  /** Внешнее управление состоянием открытия */
  open?: boolean
  /** Обработчик изменения состояния открытия */
  onOpenChange?: (open: boolean) => void
}
