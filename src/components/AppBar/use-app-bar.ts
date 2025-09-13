import { useState, useEffect, useCallback } from 'react'

export function useAppBar() {
  // Theme state
  const [isDark, setIsDark] = useState(false)

  // Initialize theme on component mount
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  // Theme toggle handler
  const toggleTheme = useCallback(() => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }, [isDark])

  return {
    // State
    isDark,

    // Event handlers
    toggleTheme,
  }
}
