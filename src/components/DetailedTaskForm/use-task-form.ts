import { useState, useEffect, useCallback, useRef } from 'react';
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
  status: string;
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
 * Обеспечивает состояние, валидацию и автосохранение изменений.
 */
export function useTaskForm(task?: Task, initialTitle?: string) {
  const { addTask, editTask, tags, priorities, columns } = useTaskStore();

  const [formState, setFormState] = useState<TaskFormState>({
    title: '',
    description: '',
    priority: null,
    storyPoints: undefined,
    selectedTagIds: [],
    dueDate: '',
    status: columns[0]?.id || 'todo',
  });

  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTaskId, setCreatedTaskId] = useState<string | null>(null);

  const isEditing = !!task;
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const initialFormStateRef = useRef<TaskFormState>();

  /**
   * Инициализирует форму при открытии или изменении задачи.
   */
  useEffect(() => {
    let newFormState: TaskFormState;

    if (task) {
      newFormState = {
        title: task.title,
        description: task.description || '',
        priority: task.priority || null,
        storyPoints: task.storyPoints,
        selectedTagIds: task.tagIds || [],
        dueDate: dateToInputValue(task.dueDate),
        status: task.status,
      };
      setCreatedTaskId(null);
    } else if (initialTitle) {
      newFormState = {
        title: initialTitle,
        description: '',
        priority: null,
        storyPoints: undefined,
        selectedTagIds: [],
        dueDate: '',
        status: columns[0]?.id || 'todo',
      };
      setCreatedTaskId(null);
    } else {
      newFormState = {
        title: '',
        description: '',
        priority: null,
        storyPoints: undefined,
        selectedTagIds: [],
        dueDate: '',
        status: columns[0]?.id || 'todo',
      };
      setCreatedTaskId(null);
    }

    setFormState(newFormState);
    initialFormStateRef.current = { ...newFormState };
    setErrors({});
  }, [task, initialTitle, columns]);

  /**
   * Сбрасывает форму к начальному состоянию.
   */
  const resetForm = useCallback(() => {
    const newFormState = {
      title: '',
      description: '',
      priority: null,
      storyPoints: undefined,
      selectedTagIds: [],
      dueDate: '',
      status: columns[0]?.id || 'todo',
    };
    setFormState(newFormState);
    initialFormStateRef.current = { ...newFormState };
    setCreatedTaskId(null);
    setErrors({});

    // Очищаем debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, [columns]);

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
   * Автосохранение изменений формы.
   */
  const autoSave = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const dueDateObj = formState.dueDate ? safeParseDate(formState.dueDate) : undefined;

      if (isEditing && task) {
        // Для существующей задачи - сохраняем изменения
        editTask(task.id, {
          title: formState.title.trim(),
          description: formState.description || undefined,
          tagIds: formState.selectedTagIds,
          priority: formState.priority,
          storyPoints: formState.storyPoints,
          dueDate: dueDateObj,
        });
      } else if (!isEditing && formState.title.trim() && !createdTaskId) {
        // Для новой задачи - создаем когда заполнено название
        const newTaskId = addTask(
          formState.title.trim(),
          formState.description || undefined,
          formState.selectedTagIds,
          formState.priority,
          formState.storyPoints,
          dueDateObj,
          formState.status
        );
        setCreatedTaskId(newTaskId);
      } else if (!isEditing && createdTaskId) {
        // Для уже созданной новой задачи - обновляем
        editTask(createdTaskId, {
          title: formState.title.trim(),
          description: formState.description || undefined,
          tagIds: formState.selectedTagIds,
          priority: formState.priority,
          storyPoints: formState.storyPoints,
          dueDate: dueDateObj,
        });
      }
    } catch (error) {
      console.error('Ошибка при автосохранении задачи:', error);
    }
  }, [formState, isEditing, task, createdTaskId, validateForm, editTask, addTask]);

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
   * Эффект для автосохранения изменений с debouncing.
   */
  useEffect(() => {
    // Не автосохраняем, если форма только инициализировалась
    if (!initialFormStateRef.current) {
      return;
    }

    // Проверяем, изменилось ли что-то в форме
    const hasChanges = JSON.stringify(formState) !== JSON.stringify(initialFormStateRef.current);

    if (!hasChanges) {
      return;
    }

    // Очищаем предыдущий timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Для нового заголовка задачи - сразу сохраняем без debounce
    if (!isEditing && !createdTaskId && formState.title.trim() &&
        formState.title !== initialFormStateRef.current.title) {
      autoSave();
      return;
    }

    // Для остальных изменений - сохраняем с debounce 1 секунда
    debounceTimeoutRef.current = setTimeout(() => {
      autoSave();
    }, 1000);

    // Cleanup
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [formState, isEditing, createdTaskId, autoSave]);



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
    resetForm,
    autoSave,
    createdTaskId,
  };
}
