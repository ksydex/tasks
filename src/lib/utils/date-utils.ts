/**
 * Утилиты для работы с датами.
 * Безопасный парсинг и валидация дат.
 */

/**
 * Безопасно парсит дату из строки или объекта Date.
 * @param date - Дата для парсинга
 * @returns Объект Date или null, если парсинг не удался
 */
export function safeParseDate(date: string | Date | undefined | null): Date | null {
  if (!date) return null;

  if (date instanceof Date) {
    return isNaN(date.getTime()) ? null : date;
  }

  if (typeof date === 'string') {
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

/**
 * Преобразует дату в строку формата YYYY-MM-DD для input[type="date"].
 * @param date - Дата для преобразования
 * @returns Строка в формате YYYY-MM-DD или пустая строка
 */
export function dateToInputValue(date: Date | undefined | null): string {
  const safeDate = safeParseDate(date);
  if (!safeDate) return '';

  return safeDate.toISOString().split('T')[0];
}

/**
 * Проверяет, является ли дата прошедшей (раньше сегодняшнего дня).
 * @param date - Дата для проверки
 * @returns true, если дата в прошлом
 */
export function isDateInPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * Форматирует дату для отображения пользователю.
 * @param date - Дата для форматирования
 * @param locale - Локаль для форматирования (по умолчанию 'ru-RU')
 * @returns Отформатированная строка даты
 */
export function formatDateForDisplay(date: Date | undefined | null, locale: string = 'ru-RU'): string {
  const safeDate = safeParseDate(date);
  if (!safeDate) return '';

  return safeDate.toLocaleDateString(locale);
}

/**
 * Получает статус дедлайна на основе даты.
 * @param dueDate - Дата дедлайна
 * @returns Статус дедлайна
 */
export function getDueDateStatus(dueDate: Date | undefined | null): 'overdue' | 'dueToday' | 'dueSoon' | 'normal' {
  const safeDate = safeParseDate(dueDate);
  if (!safeDate) return 'normal';

  const now = new Date();
  const due = new Date(safeDate);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays === 0) return 'dueToday';
  if (diffDays <= 3) return 'dueSoon';
  return 'normal';
}
