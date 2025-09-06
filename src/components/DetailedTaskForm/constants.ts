/**
 * Константы для формы задач.
 * Централизованное хранение всех текстовых и конфигурационных значений.
 */

export const TASK_FORM_TEXTS = {
  // Заголовки
  addWithDetails: 'Добавить с деталями',
  createTitle: 'Создать новую задачу',
  editTitle: 'Редактировать задачу',

  // Поля формы
  title: 'Название задачи',
  titlePlaceholder: 'Введите название задачи...',
  description: 'Описание',
  descriptionPlaceholder: 'Добавьте детали, заметки или требования...',
  priority: 'Приоритет',
  priorityPlaceholder: 'Выберите приоритет...',
  storyPoints: 'Story Points',
  storyPointsPlaceholder: 'Оценка усилий (необязательно)',
  dueDate: 'Срок выполнения',
  dueDatePlaceholder: 'Выберите дату',
  tags: 'Теги',
  tagsPlaceholder: 'Выберите или найдите теги...',
  tagsSearchPlaceholder: 'Поиск тегов...',
  tagsEmptyText: 'Теги не найдены.',
  completed: 'Завершена',

  // Кнопки
  cancel: 'Отмена',
  createTask: 'Создать задачу',
  saveChanges: 'Сохранить изменения',

  // Описания
  dueDateDescription: 'Необязательно. Установите дедлайн для этой задачи.',
  createdInfo: 'Создано',
  completedInfo: 'Завершено',

  // Валидация
  titleRequired: 'Название задачи обязательно для заполнения',
} as const;

export const FORM_VALIDATION = {
  title: {
    maxLength: 100,
    minLength: 1,
  },
  description: {
    maxLength: 500,
  },
  storyPoints: {
    min: 0,
    max: 100,
    step: 1,
  },
} as const;

export const FORM_CONFIG = {
  descriptionRows: 4,
  calendarDisabledPast: true,
} as const;

export const ICON_SIZES = {
  small: 'h-4 w-4',
  medium: 'h-5 w-5',
} as const;
