import { useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'task-board-theme'

/**
 * Хук для управления темой приложения с сохранением в localStorage.
 * Автоматически восстанавливает сохраненную тему при загрузке страницы.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [isDark, setIsDark] = useState(false)

  // Инициализация темы при монтировании компонента
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Проверяем localStorage для сохраненной темы
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null

        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          // Используем сохраненную тему
          applyTheme(savedTheme)
        } else {
          // Если нет сохраненной темы, проверяем системные настройки
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          const systemTheme = prefersDark ? 'dark' : 'light'
          applyTheme(systemTheme)
        }
      } catch (error) {
        console.warn('Failed to initialize theme:', error)
        // Fallback к светлой теме
        applyTheme('light')
      }
    }

    initializeTheme()
  }, [])

  // Применение темы к DOM и обновление состояния
  const applyTheme = useCallback((newTheme: Theme) => {
    const isDarkMode = newTheme === 'dark'

    // Обновляем DOM
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Обновляем состояние
    setTheme(newTheme)
    setIsDark(isDarkMode)

    // Сохраняем в localStorage
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
  }, [])

  // Переключение темы
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    applyTheme(newTheme)
  }, [theme, applyTheme])

  // Установка конкретной темы
  const setThemeMode = useCallback((newTheme: Theme) => {
    applyTheme(newTheme)
  }, [applyTheme])

  return {
    // Состояние
    theme,
    isDark,

    // Методы
    toggleTheme,
    setTheme: setThemeMode,
  }
}
