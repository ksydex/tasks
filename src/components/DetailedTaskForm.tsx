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
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarDays, Trash2, FileText, Calendar as CalendarIcon, Clock, Flag } from 'lucide-react'
import { useTaskStore } from '@/store/todo-store'
import { TaskContextMenu } from './TaskContextMenu'
import type { Task } from '@/store/todo-store'
import type { Priority } from '@/lib/status-colors'

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
  const [priority, setPriority] = useState<Priority | null>(null)
  const [storyPoints, setStoryPoints] = useState<number | undefined>()
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const [dueDate, setDueDate] = useState<string>('')
  const [calendarOpen, setCalendarOpen] = useState(false)

  const { addTask, editTask, tags, priorities } = useTaskStore()

  const isEditing = !!task

  useEffect(() => {
    if (task && open) {
      setTitle(task.title)
      setDescription(task.description || '')
      setPriority(task.priority || null)
      setStoryPoints(task.storyPoints)
      setSelectedTagIds(task.tagIds || [])
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '')
    } else if (open && initialTitle) {
      setTitle(initialTitle)
      setDescription('')
      setPriority(null)
      setStoryPoints(undefined)
      setSelectedTagIds([])
      setDueDate('')
    } else if (!open) {
      setTitle('')
      setDescription('')
      setPriority(null)
      setStoryPoints(undefined)
      setSelectedTagIds([])
      setDueDate('')
    }
  }, [task, open, initialTitle])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const dueDateObj = dueDate ? new Date(dueDate) : undefined

    if (isEditing && task) {
      editTask(task.id, {
        title,
        description: description || undefined,
        tagIds: selectedTagIds,
        priority,
        storyPoints,
        dueDate: dueDateObj
      })
    } else {
      addTask(title, description || undefined, selectedTagIds, priority, storyPoints, dueDateObj)
    }

    setTitle('')
    setDescription('')
    setPriority(null)
    setStoryPoints(undefined)
    setSelectedTagIds([])
    setDueDate('')
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
        {isEditing && task && (
          <div className="absolute right-12 top-2">
            <TaskContextMenu
              taskId={task.id}
              variant="dropdown"
              onDelete={() => setOpen(false)}
            />
          </div>
        )}
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
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
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority || ""} onValueChange={(value: string) => setPriority(value === "" ? null : value as Priority)}>
              <SelectTrigger
                showReset={true}
                onReset={() => setPriority(null)}
                value={priority}
                placeholder="Select priority..."
              >
                <SelectValue placeholder="Select priority...">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4" />
                    {priority && typeof priority === 'string' ? priorities.find(p => p.id === priority)?.name || priority.charAt(0).toUpperCase() + priority.slice(1) : null}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priorityLevel) => (
                  <SelectItem key={priorityLevel.id} value={priorityLevel.id}>
                    <div className="flex items-center gap-2">
                      {priorityLevel.icon && <span>{priorityLevel.icon}</span>}
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: priorityLevel.color }}
                      ></div>
                      {priorityLevel.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label htmlFor="dueDate">Due Date</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {dueDate ? new Date(dueDate).toLocaleDateString() : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate ? new Date(dueDate) : undefined}
                  onSelect={(date) => {
                    setDueDate(date ? date.toISOString().split('T')[0] : '')
                    setCalendarOpen(false)
                  }}
                  disabled={(date) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return date < today
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              Optional. Set a deadline for this task.
            </p>
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