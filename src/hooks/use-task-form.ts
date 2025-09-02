import { useState, useEffect, useCallback } from 'react';
import { useTaskStore } from '@/store/todo-store';
import { safeParseDate, dateToInputValue } from '@/lib/utils/date-utils';
import type { Task } from '@/store/todo-store';
import type { Priority } from '@/lib/status-colors';

/**
 * Интерфейс для состояния формы задачи.
 */
interface TaskFormState {
  title: string;
  description: string;
  priority: Priority | null;
  storyPoints: number | undefined;
  selectedTagIds: string[];
  dueDate: string;
}

/**
 * Интерфейс для ошибок валидации формы.
 */
interface TaskFormErrors {
  title?: string;
  description?: string;
  storyPoints?: string;
  priority?: string;
}

/**
 * Хук для управления формой задачи.
 * Обеспечивает состояние, валидацию и обработку событий.
 */
export function useTaskForm(task?: Task, initialTitle?: string) {
  const { addTask, editTask, tags, priorities } = useTaskStore();

  const [formState, setFormState] = useState<TaskFormState>({
    title: '',
    description: '',
    priority: null,
    storyPoints: undefined,
    selectedTagIds: [],
    dueDate: '',
  });

  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!task;

  /**
   * Инициализирует форму при открытии или изменении задачи.
   */
  useEffect(() => {
    if (task) {
      setFormState({
        title: task.title,
        description: task.description || '',
        priority: task.priority || null,
        storyPoints: task.storyPoints,
        selectedTagIds: task.tagIds || [],
        dueDate: dateToInputValue(task.dueDate),
      });
    } else if (initialTitle) {
      setFormState(prev => ({
        ...prev,
        title: initialTitle,
      }));
    } else {
      resetForm();
    }
    setErrors({});
  }, [task, initialTitle]);

  /**
   * Сбрасывает форму к начальному состоянию.
   */
  const resetForm = useCallback(() => {
    setFormState({
      title: '',
      description: '',
      priority: null,
      storyPoints: undefined,
      selectedTagIds: [],
      dueDate: '',
    });
    setErrors({});
  }, []);

  /**
   * Обновляет поле формы.
   */
  const updateField = useCallback(<K extends keyof TaskFormState>(
    field: K,
    value: TaskFormState[K]
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));

    // Очищаем ошибку для обновленного поля
    if (errors[field as keyof TaskFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  /**
   * Валидирует форму и возвращает true, если форма валидна.
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: TaskFormErrors = {};

    // Валидация названия
    if (!formState.title.trim()) {
      newErrors.title = 'Название задачи обязательно для заполнения';
    } else if (formState.title.length > 100) {
      newErrors.title = 'Название не может быть длиннее 100 символов';
    }

    // Валидация описания
    if (formState.description.length > 500) {
      newErrors.description = 'Описание не может быть длиннее 500 символов';
    }

    // Валидация story points
    if (formState.storyPoints !== undefined) {
      if (formState.storyPoints < 0 || formState.storyPoints > 100) {
        newErrors.storyPoints = 'Story Points должны быть от 0 до 100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState]);

  /**
   * Обрабатывает отправку формы.
   */
  const handleSubmit = useCallback(async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);

    try {
      const dueDateObj = formState.dueDate ? safeParseDate(formState.dueDate) : undefined;

      if (isEditing && task) {
        editTask(task.id, {
          title: formState.title.trim(),
          description: formState.description || undefined,
          tagIds: formState.selectedTagIds,
          priority: formState.priority,
          storyPoints: formState.storyPoints,
          dueDate: dueDateObj,
        });
      } else {
        addTask(
          formState.title.trim(),
          formState.description || undefined,
          formState.selectedTagIds,
          formState.priority,
          formState.storyPoints,
          dueDateObj
        );
      }

      resetForm();
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении задачи:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, isEditing, task, validateForm, editTask, addTask, resetForm]);

  /**
   * Получает опции тегов для MultiSelect.
   */
  const tagOptions = tags.map(tag => ({
    label: tag.name,
    value: tag.id,
    icon: tag.icon || undefined,
    color: tag.color,
  }));

  return {
    formState,
    errors,
    isSubmitting,
    isEditing,
    tagOptions,
    priorities,
    updateField,
    handleSubmit,
    resetForm,
    validateForm,
  };
}
