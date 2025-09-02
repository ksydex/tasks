import type { Task } from '@/store/todo-store'

/**
 * Пропсы для компонента DetailedTaskForm.
 */
export interface DetailedTaskFormProps {
  /** Задача для редактирования (если не указана, создается новая) */
  task?: Task
  /** Кастомный триггер для открытия формы */
  trigger?: React.ReactNode
  /** Начальное название для новой задачи */
  initialTitle?: string
  /** Внешнее управление состоянием открытия */
  open?: boolean
  /** Обработчик изменения состояния открытия */
  onOpenChange?: (open: boolean) => void
}
