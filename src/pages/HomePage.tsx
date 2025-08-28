import { useState, useEffect } from 'react'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { AddTaskForm } from '@/components/AddTaskForm'
import { DetailedTaskForm } from '@/components/DetailedTaskForm'
import { KanbanColumn } from '@/components/KanbanColumn'
import { TaskStats } from '@/components/TaskStats'
import { SettingsDialog } from '@/components/SettingsDialog'
import { useTaskStore, useTasksByStatus, useTaskStats } from '@/store/todo-store'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Kanban } from 'lucide-react'

function HomePage() {
  const [isDark, setIsDark] = useState(false)
  const [detailedFormOpen, setDetailedFormOpen] = useState(false)
  const [initialTitle, setInitialTitle] = useState('')
  const { columns, moveTask, reorderTasks } = useTaskStore()
  const tasksByStatus = useTasksByStatus()
  const stats = useTaskStats()

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  const handleOpenDetailed = (title?: string) => {
    setInitialTitle(title || '')
    setDetailedFormOpen(true)
  }

  const handleDetailedFormClose = (open: boolean) => {
    setDetailedFormOpen(open)
    if (!open) {
      setInitialTitle('')
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Moving to different column
    if (destination.droppableId !== source.droppableId) {
      moveTask(result.draggableId, destination.droppableId)
    } else {
      // Reordering within the same column
      reorderTasks(source.index, destination.index, source.droppableId)
    }
  }

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
                <p className="text-sm text-muted-foreground">{getGreeting()}! Organize your workflow efficiently.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <TaskStats />
              <SettingsDialog />
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
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <AddTaskForm onOpenDetailed={handleOpenDetailed} />
          </div>
          
          <DetailedTaskForm 
            initialTitle={initialTitle}
            open={detailedFormOpen}
            onOpenChange={handleDetailedFormClose}
            trigger={<div />}
          />
        </header>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={`grid gap-6 ${columns.length === 1 ? 'grid-cols-1' : columns.length === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={tasksByStatus[column.id] || []}
                count={stats[column.id] || 0}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default HomePage 