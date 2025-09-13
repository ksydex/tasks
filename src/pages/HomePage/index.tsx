import { PowerfulInput } from '@/components/PowerfulInput'
import { AppBar } from '@/components/AppBar'
import { BoardBar } from '@/components/BoardBar'
import { BoardView } from '@/components/BoardView'
import { ListView } from '@/components/ListView'
import { useHomePage } from './use-home-page'

function HomePage() {
  const {
    activeView,
    tasks,
    handleViewChange,
  } = useHomePage()

  return (
    <div className="h-screen w-screen bg-background grid grid-rows-[60px_48px_1fr] overflow-hidden">
      {/* App Bar - Fixed height, spans full width */}
      <AppBar />

      {/* Board Bar - Fixed height, spans full width */}
      <BoardBar
        activeView={activeView}
        onViewChange={handleViewChange}
      />

      {/* Lists Container - Takes remaining height, spans full width */}
      <div className="overflow-hidden">
        {activeView === 'board' ? (
          <BoardView />
        ) : (
          <div className="h-full p-4">
            <ListView
              tasks={tasks}
              emptyMessage="No tasks found. Create your first task to get started!"
            />
          </div>
        )}
      </div>

      {/* Powerful Command Input - Fixed position */}
      <PowerfulInput />
    </div>
  )
}

export default HomePage
