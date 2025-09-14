import { useTheme } from '../../hooks/use-theme'

export function useAppBar() {
  const { isDark, toggleTheme } = useTheme()

  return {
    // State
    isDark,

    // Event handlers
    toggleTheme,
  }
}
