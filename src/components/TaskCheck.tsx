import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TaskCheckProps {
  checked: boolean
  onCheckedChange: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Переиспользуемый компонент чекбокса для задач.
 * Поддерживает различные размеры и состояния завершения.
 */
export function TaskCheck({
  checked,
  onCheckedChange,
  className,
  size = 'md'
}: TaskCheckProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full border-2 transition-all duration-200 cursor-pointer',
        checked
          ? 'bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700'
          : 'border-muted-foreground/60 bg-background hover:bg-green-50 hover:border-green-600/50 dark:hover:bg-green-950/50',
        sizeClasses[size],
        className
      )}
      onClick={(e) => {
        e.stopPropagation()
        onCheckedChange()
      }}
    >
      {checked && (
        <Check
          strokeWidth={2.5}
          className={cn(
            'transition-all duration-200',
            size === 'sm' ? 'h-2.5 w-2.5' : size === 'md' ? 'h-3 w-3' : 'h-3.5 w-3.5'
          )}
        />
      )}
    </div>
  )
}
