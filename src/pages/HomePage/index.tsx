import { PowerfulInput } from '@/components/PowerfulInput'
import { TaskStats } from '@/components/TaskStats'
import { SettingsDialog } from '@/components/SettingsDialog'
import { TabPane } from '@/components/TabPane'
import { BoardView } from '@/components/BoardView'
import { ListView } from '@/components/ListView'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Kanban, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useHomePage } from './use-home-page'

function HomePage() {
  const {
    isDark,
    activeView,
    tasks,
    greeting,
    toggleTheme,
    handleViewChange,
  } = useHomePage()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent rounded-lg">
                <Kanban className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Task Board</h1>
                <p className="text-sm text-muted-foreground">{greeting}! Organize your workflow efficiently.</p>
              </div>
            </div>

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
          </div>

          {/* PowerfulInput is now positioned at bottom-left of screen */}
        </header>

        <TabPane
          activeView={activeView}
          onViewChange={handleViewChange}
          boardContent={<BoardView />}
          listContent={
            <ListView
              tasks={tasks}
              emptyMessage="No tasks found. Create your first task to get started!"
            />
          }
        />
      </div>

      {/* Powerful Command Input */}
      <PowerfulInput />
    </div>
  )
}

export default HomePage
