import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flag } from 'lucide-react';
import { FormFieldWrapper } from './form-field';
import type { Priority } from '@/lib/status-colors';
import type { PriorityLevel } from '@/store/todo-store';

/**
 * Интерфейс для пропсов селектора приоритета.
 */
interface PrioritySelectorProps {
  /** ID поля */
  id: string;
  /** Заголовок поля */
  label: string;
  /** Текущее значение приоритета */
  value: Priority | null;
  /** Функция изменения значения */
  onChange: (priority: Priority | null) => void;
  /** Список доступных приоритетов */
  priorities: PriorityLevel[];
  /** Сообщение об ошибке */
  error?: string;
  /** Дополнительные CSS классы */
  className?: string;
  /** Обязательное ли поле */
  required?: boolean;
}

/**
 * Компонент для выбора приоритета задачи.
 * Поддерживает сброс значения и отображение иконок приоритетов.
 */
export function PrioritySelector({
  id,
  label,
  value,
  onChange,
  priorities,
  error,
  className,
  required = false,
}: PrioritySelectorProps) {
  /**
   * Обрабатывает изменение значения приоритета.
   */
  const handleValueChange = (newValue: string) => {
    const priority = newValue === '' ? null : newValue as Priority;
    onChange(priority);
  };

  /**
   * Получает отображаемое имя приоритета.
   */
  const getDisplayName = (priority: Priority | null): string | null => {
    if (!priority) return null;

    const priorityLevel = priorities.find(p => p.id === priority);
    if (priorityLevel) {
      return priorityLevel.name;
    }

    // Fallback для случая, если приоритет не найден в списке
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <FormFieldWrapper
      id={id}
      label={label}
      error={error}
      className={className}
      required={required}
    >
      <Select value={value || ''} onValueChange={handleValueChange}>
        <SelectTrigger
          showReset={true}
          onReset={() => onChange(null)}
          value={value}
          placeholder="Выберите приоритет..."
        >
          <SelectValue placeholder="Выберите приоритет...">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              {getDisplayName(value)}
            </div>
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {priorities.map((priorityLevel) => (
            <SelectItem key={priorityLevel.id} value={priorityLevel.id}>
              <div className="flex items-center gap-2">
                {priorityLevel.icon && <span>{priorityLevel.icon}</span>}
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: priorityLevel.color }}
                />
                {priorityLevel.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormFieldWrapper>
  );
}
