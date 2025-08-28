import { useState } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings, Plus, Trash2, Edit3 } from 'lucide-react'
import { useTaskStore } from '@/store/todo-store'
import type { Column, Tag } from '@/store/todo-store'

const columnIcons = ['📋', '⚡', '✅', '🔄', '⏸️', '🚀', '🎯', '💡', '🔍', '📊']
const tagIcons = ['🔥', '⭐', '🐛', '💡', '📝', '🎨', '⚙️', '📱', '🌟', '🚨']
const colors = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', 
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1', '#6b7280'
]

interface EditFormProps {
  item: Column | Tag
  type: 'column' | 'tag'
  onSave: (updates: any) => void
  onCancel: () => void
}

function EditForm({ item, type, onSave, onCancel }: EditFormProps) {
  const [title, setTitle] = useState('title' in item ? item.title : item.name)
  const [icon, setIcon] = useState(item.icon)
  const [color, setColor] = useState(item.color)
  
  const icons = type === 'column' ? columnIcons : tagIcons
  
  const handleSave = () => {
    onSave(type === 'column' ? { title, icon, color } : { name: title, icon, color })
  }
  
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="space-y-2">
        <Label>{type === 'column' ? 'Column Name' : 'Tag Name'}</Label>
        <Input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={type === 'column' ? 'Enter column name' : 'Enter tag name'}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Icon</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={icon === '' ? 'default' : 'outline'}
            size="sm"
            className="w-10 h-10 p-0"
            onClick={() => setIcon('')}
          >
            ✕
          </Button>
          {icons.map((iconOption) => (
            <Button
              key={iconOption}
              variant={icon === iconOption ? 'default' : 'outline'}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setIcon(iconOption)}
            >
              {iconOption}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2">
          {colors.map((colorOption) => (
            <Button
              key={colorOption}
              variant="outline"
              size="sm"
              className="w-8 h-8 p-0 border-2"
              style={{ 
                backgroundColor: colorOption,
                borderColor: color === colorOption ? '#000' : colorOption
              }}
              onClick={() => setColor(colorOption)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={handleSave} size="sm">Save</Button>
        <Button onClick={onCancel} variant="outline" size="sm">Cancel</Button>
      </div>
    </div>
  )
}

export function SettingsDialog() {
  const { 
    columns, 
    tags, 
    addColumn, 
    editColumn, 
    deleteColumn,
    addTag,
    editTag,
    deleteTag
  } = useTaskStore()
  
  const [editingColumn, setEditingColumn] = useState<string | null>(null)
  const [editingTag, setEditingTag] = useState<string | null>(null)
  const [showNewColumn, setShowNewColumn] = useState(false)
  const [showNewTag, setShowNewTag] = useState(false)
  
  const handleColumnSave = (id: string, updates: Partial<Column>) => {
    editColumn(id, updates)
    setEditingColumn(null)
  }
  
  const handleTagSave = (id: string, updates: Partial<Tag>) => {
    editTag(id, updates)
    setEditingTag(null)
  }
  
  const handleNewColumn = (data: { title: string; icon: string; color: string }) => {
    if (data.title.trim()) {
      addColumn(data.title, data.icon, data.color)
      setShowNewColumn(false)
    }
  }
  
  const handleNewTag = (data: { name: string; icon: string; color: string }) => {
    if (data.name.trim()) {
      addTag(data.name, data.color, data.icon)
      setShowNewTag(false)
    }
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="columns" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="columns">Columns</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>
          
          <TabsContent value="columns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Board Columns</h3>
              <Button 
                onClick={() => setShowNewColumn(true)}
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Column
              </Button>
            </div>
            
            {showNewColumn && (
              <EditForm
                item={{ id: '', title: '', icon: columnIcons[0], color: colors[0] } as Column}
                type="column"
                onSave={handleNewColumn}
                onCancel={() => setShowNewColumn(false)}
              />
            )}
            
            <div className="space-y-3">
              {columns.map((column) => (
                <Card key={column.id}>
                  <CardContent className="p-4">
                    {editingColumn === column.id ? (
                      <EditForm
                        item={column}
                        type="column"
                        onSave={(updates) => handleColumnSave(column.id, updates)}
                        onCancel={() => setEditingColumn(null)}
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {column.icon && <span className="text-2xl">{column.icon}</span>}
                          <div>
                            <h4 className="font-medium">{column.title}</h4>
                            <div 
                              className="w-4 h-4 rounded-full border"
                              style={{ backgroundColor: column.color }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingColumn(column.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          {columns.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteColumn(column.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tags" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Task Tags</h3>
              <Button 
                onClick={() => setShowNewTag(true)}
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Tag
              </Button>
            </div>
            
            {showNewTag && (
              <EditForm
                item={{ id: '', name: '', icon: tagIcons[0], color: colors[0] } as Tag}
                type="tag"
                onSave={handleNewTag}
                onCancel={() => setShowNewTag(false)}
              />
            )}
            
            <div className="space-y-3">
              {tags.map((tag) => (
                <Card key={tag.id}>
                  <CardContent className="p-4">
                    {editingTag === tag.id ? (
                      <EditForm
                        item={tag}
                        type="tag"
                        onSave={(updates) => handleTagSave(tag.id, updates)}
                        onCancel={() => setEditingTag(null)}
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant="secondary"
                            className="gap-1"
                            style={{ 
                              backgroundColor: tag.color + '20',
                              color: tag.color,
                              borderColor: tag.color
                            }}
                          >
                            {tag.icon && <span>{tag.icon}</span>}
                            {tag.name}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingTag(tag.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTag(tag.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}