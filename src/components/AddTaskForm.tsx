import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, PlusCircle } from 'lucide-react'
import { useTaskStore } from '@/store/todo-store'

interface AddTaskFormProps {
  onOpenDetailed: (initialTitle?: string) => void
}

export function AddTaskForm({ onOpenDetailed }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const { addTask } = useTaskStore()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return
    
    addTask(title)
    setTitle('')
  }
  
  const handleOpenDetailed = () => {
    onOpenDetailed(title)
    setTitle('')
  }
  
  return (
    <div className="flex gap-2">
      <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
        <Input
          type="text"
          placeholder="Add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="sm" disabled={!title.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </form>
      <Button 
        type="button" 
        variant="outline" 
        size="sm"
        onClick={handleOpenDetailed}
        className="shrink-0"
      >
        <PlusCircle className="h-4 w-4" />
      </Button>
    </div>
  )
}