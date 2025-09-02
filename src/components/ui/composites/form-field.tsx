import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/**
 * Интерфейс для пропсов поля формы.
 */
interface FormFieldWrapperProps {
  /** ID поля для связи с label */
  id: string;
  /** Заголовок поля */
  label: string;
  /** Дополнительное описание поля */
  description?: string;
  /** Сообщение об ошибке */
  error?: string;
  /** Дополнительные CSS классы */
  className?: string;
  /** Дочерние элементы (input, textarea и т.д.) */
  children: React.ReactNode;
  /** Обязательное ли поле */
  required?: boolean;
}

/**
 * Переиспользуемый компонент для полей формы.
 * Обеспечивает единообразное отображение label, описания и ошибок.
 */
export function FormFieldWrapper({
  id,
  label,
  description,
  error,
  className,
  children,
  required = false,
}: FormFieldWrapperProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id} className={cn(required && 'after:content-["*"] after:ml-0.5 after:text-destructive')}>
        {label}
      </Label>

      {children}

      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}

      {error && (
        <p className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
