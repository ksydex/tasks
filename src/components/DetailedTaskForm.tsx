import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MultiSelect } from '@/components/ui/multi-select'
import { CalendarDays, Trash2, FileText } from 'lucide-react'
import { useTaskStore } from '@/store/todo-store'
import { TaskContextMenu } from './TaskContextMenu'
import type { Task } from '@/store/todo-store'

interface DetailedTaskFormProps {
  task?: Task
  trigger?: React.ReactNode
  initialTitle?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DetailedTaskForm({ task, trigger, initialTitle, open: externalOpen, onOpenChange }: DetailedTaskFormProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [storyPoints, setStoryPoints] = useState<number | undefined>()
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  
  const { addTask, editTask, tags } = useTaskStore()
  
  const isEditing = !!task
  
  useEffect(() => {
    if (task && open) {
      setTitle(task.title)
      setDescription(task.description || '')
      setStoryPoints(task.storyPoints)
      setSelectedTagIds(task.tagIds || [])
    } else if (open && initialTitle) {
      setTitle(initialTitle)
      setDescription('')
      setStoryPoints(undefined)
      setSelectedTagIds([])
    } else if (!open) {
      setTitle('')
      setDescription('')
      setStoryPoints(undefined)
      setSelectedTagIds([])
    }
  }, [task, open, initialTitle])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    
    if (isEditing && task) {
      editTask(task.id, { 
        title, 
        description: description || undefined,
        tagIds: selectedTagIds,
        storyPoints
      })
    } else {
      addTask(title, description || undefined, selectedTagIds, storyPoints)
    }
    
    setTitle('')
    setDescription('')
    setStoryPoints(undefined)
    setSelectedTagIds([])
    setOpen(false)
  }
  

  
  const tagOptions = tags.map(tag => ({
    label: tag.name,
    value: tag.id,
    icon: tag.icon || undefined,
    color: tag.color
  }))
  
  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <FileText className="h-4 w-4 mr-2" />
      Add with Details
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </DialogTitle>
            {isEditing && task && (
              <div className="flex items-center">
                <TaskContextMenu 
                  taskId={task.id} 
                  variant="dropdown"
                  onDelete={() => setOpen(false)}
                />
              </div>
            )}
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task details, notes, or requirements..."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="storyPoints">Story Points</Label>
            <Input
              id="storyPoints"
              type="number"
              min="0"
              max="100"
              value={storyPoints || ''}
              onChange={(e) => setStoryPoints(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Estimate effort (optional)"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Tags</Label>
            <MultiSelect
              options={tagOptions}
              selected={selectedTagIds}
              onChange={setSelectedTagIds}
              placeholder="Select or search tags..."
              searchPlaceholder="Search tags..."
              emptyText="No tags found."
            />
          </div>
          
          {isEditing && task && (
            <>
              <Separator />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                Created {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </>
          )}
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              {isEditing ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}