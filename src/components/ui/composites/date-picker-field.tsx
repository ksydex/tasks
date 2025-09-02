import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Clock } from 'lucide-react';
import { FormFieldWrapper } from './form-field';
import { formatDateForDisplay, isDateInPast } from '@/lib/utils/date-utils';
import { cn } from '@/lib/utils';

/**
 * Интерфейс для пропсов поля выбора даты.
 */
interface DatePickerFieldProps {
  /** ID поля */
  id: string;
  /** Заголовок поля */
  label: string;
  /** Текущее значение даты в формате YYYY-MM-DD */
  value: string;
  /** Функция изменения значения */
  onChange: (date: string) => void;
  /** Дополнительное описание поля */
  description?: string;
  /** Сообщение об ошибке */
  error?: string;
  /** Дополнительные CSS классы */
  className?: string;
  /** Обязательное ли поле */
  required?: boolean;
  /** Отключать ли прошедшие даты */
  disablePastDates?: boolean;
  /** Плейсхолдер для кнопки */
  placeholder?: string;
}

/**
 * Компонент для выбора даты с календарем.
 * Поддерживает валидацию и отключение прошедших дат.
 */
export function DatePickerField({
  id,
  label,
  value,
  onChange,
  description,
  error,
  className,
  required = false,
  disablePastDates = true,
  placeholder = 'Выберите дату',
}: DatePickerFieldProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  /**
   * Обрабатывает выбор даты в календаре.
   */
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onChange(date.toISOString().split('T')[0]);
      setCalendarOpen(false);
    }
  };

  /**
   * Проверяет, должна ли дата быть отключена.
   */
  const isDateDisabled = (date: Date): boolean => {
    if (!disablePastDates) return false;
    return isDateInPast(date);
  };

  /**
   * Получает отображаемый текст для кнопки.
   */
  const getButtonText = (): string => {
    if (!value) return placeholder;

    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return placeholder;
      return formatDateForDisplay(date);
    } catch {
      return placeholder;
    }
  };

  return (
    <FormFieldWrapper
      id={id}
      label={label}
      description={description}
      error={error}
      className={className}
      required={required}
    >
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}
            type="button"
          >
            <Clock className="mr-2 h-4 w-4" />
            {getButtonText()}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </FormFieldWrapper>
  );
}
