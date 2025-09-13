import React, { memo } from 'react'
import { Button } from '@/components/ui/button'
import { TaskStats } from '@/components/TaskStats'
import { SettingsDialog } from '@/components/SettingsDialog'
import { Moon, Sun, Kanban, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppBar } from './use-app-bar'

interface AppBarProps {
  className?: string
}

const AppBar = memo(({ className = "" }: AppBarProps) => {
  const { isDark, toggleTheme } = useAppBar()

  return (
    <header className={`h-15 bg-background border-b border-border flex items-center justify-between px-4 ${className}`}>
      {/* Left side - Logo and App Title */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent rounded-lg">
          <Kanban className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Task Board</h1>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        <TaskStats />
        <SettingsDialog />
        <Link to="/design-tokens">
          <Button
            variant="ghost"
            size="icon"
            title="View Design Token System"
          >
            <Palette className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="relative"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>
    </header>
  )
})

AppBar.displayName = 'AppBar'

export { AppBar }
export default AppBar
