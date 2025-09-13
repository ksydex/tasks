import React from 'react';
import { SelectDropdown, type SelectDropdownItem } from '@/components/ui/select-dropdown';
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
  const handleValueChange = (newValue: string, item: SelectDropdownItem) => {
    const priority = newValue as Priority;
    onChange(priority);
  };

  /**
   * Обрабатывает сброс значения приоритета.
   */
  const handleReset = () => {
    onChange(null);
  };

  /**
   * Конвертирует приоритеты в формат SelectDropdownItem.
   */
  const priorityItems: SelectDropdownItem[] = priorities.map(priority => ({
    id: priority.id,
    primary: priority.name,
    icon: Flag
  }));

  /**
   * Кастомный рендерер иконок для приоритетов.
   */
  const renderPriorityIcon = (item: SelectDropdownItem) => {
    const priority = priorities.find(p => p.id === item.id);
    if (!priority) return null;

    return (
      <div className="flex items-center gap-2">
        {priority.icon && <span>{priority.icon}</span>}
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: priority.color }}
        />
      </div>
    );
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
      <SelectDropdown
        items={priorityItems}
        value={value || undefined}
        onValueChange={handleValueChange}
        placeholder="Выберите приоритет..."
        showReset={!required}
        onReset={handleReset}
        renderIcon={renderPriorityIcon}
        triggerWidth="w-full"
        contentWidth="w-[200px]"
        searchable={false}
      />
    </FormFieldWrapper>
  );
}
