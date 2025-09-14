import { useEffect } from 'react'

/**
 * Хук для управления глобальными стилями скроллбара.
 * Обеспечивает динамическое обновление CSS переменных скроллбара при изменении темы.
 */
export function useScrollbar() {
  useEffect(() => {
    // Функция для обновления CSS переменных скроллбара
    const updateScrollbarVariables = () => {
      const root = document.documentElement
      const isDark = root.classList.contains('dark')

      // Обновляем переменные скроллбара в зависимости от темы
      if (isDark) {
        // Темная тема - более контрастные цвета
        root.style.setProperty('--scrollbar-thumb', '215 10% 45%')
        root.style.setProperty('--scrollbar-thumb-hover', '215 10% 55%')
        root.style.setProperty('--scrollbar-track', '215 10% 15%')
      } else {
        // Светлая тема - более мягкие цвета
        root.style.setProperty('--scrollbar-thumb', '220 13% 70%')
        root.style.setProperty('--scrollbar-thumb-hover', '220 13% 60%')
        root.style.setProperty('--scrollbar-track', '220 13% 95%')
      }
    }

    // Обновляем переменные при монтировании
    updateScrollbarVariables()

    // Создаем MutationObserver для отслеживания изменений класса dark
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateScrollbarVariables()
        }
      })
    })

    // Начинаем наблюдение за изменениями в documentElement
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Очистка при размонтировании
    return () => {
      observer.disconnect()
    }
  }, [])
}

/**
 * Утилиты для работы со скроллбарами
 */
export const scrollbarUtils = {
  /**
   * Применяет тонкий скроллбар к элементу
   */
  applyThin: (element: HTMLElement) => {
    element.classList.add('scrollbar-thin')
  },

  /**
   * Скрывает скроллбар, сохраняя функциональность
   */
  hide: (element: HTMLElement) => {
    element.classList.add('scrollbar-hide')
  },

  /**
   * Удаляет все классы скроллбара
   */
  reset: (element: HTMLElement) => {
    element.classList.remove('scrollbar-thin', 'scrollbar-hide')
  }
} as const
