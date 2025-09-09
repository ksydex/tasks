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
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings, Plus, Trash2, Edit3 } from 'lucide-react'
import { useSettingsDialog, columnIcons, tagIcons, priorityIcons, colors } from './use-settings-dialog'
import type { Column, Tag, PriorityLevel } from '@/store/todo-store'

interface EditFormProps {
  item: Column | Tag | PriorityLevel
  type: 'column' | 'tag' | 'priority'
  onSave: (updates: any) => void
  onCancel: () => void
}

function EditForm({ item, type, onSave, onCancel }: EditFormProps) {
  const [title, setTitle] = useState('title' in item ? item.title : item.name)
  const [icon, setIcon] = useState(item.icon)
  const [color, setColor] = useState(item.color)

  const icons = type === 'column' ? columnIcons : type === 'tag' ? tagIcons : priorityIcons

  const handleSave = () => {
    if (type === 'column') {
      onSave({ title, icon, color })
    } else {
      onSave({ name: title, icon, color })
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="space-y-2">
        <Label>
          {type === 'column' ? 'Column Name' : type === 'tag' ? 'Tag Name' : 'Priority Name'}
        </Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            type === 'column' ? 'Enter column name' :
            type === 'tag' ? 'Enter tag name' :
            'Enter priority name'
          }
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
    priorities,
    editingColumn,
    editingTag,
    editingPriority,
    showNewColumn,
    showNewTag,
    handleColumnSave,
    handleTagSave,
    handlePrioritySave,
    handleNewColumn,
    handleNewTag,
    deleteColumn,
    deleteTag,
    startEditingColumn,
    cancelEditingColumn,
    startEditingTag,
    cancelEditingTag,
    startEditingPriority,
    cancelEditingPriority,
    showNewColumnForm,
    hideNewColumnForm,
    showNewTagForm,
    hideNewTagForm,
  } = useSettingsDialog()

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="columns">Columns</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="priorities">Priorities</TabsTrigger>
          </TabsList>

          <TabsContent value="columns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Board Columns</h3>
              <Button
                onClick={showNewColumnForm}
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
                onCancel={hideNewColumnForm}
              />
            )}

            <div className="space-y-3">
              {columns.map((column) => (
                <Card key={column.id}>
                  <CardContent>
                    {editingColumn === column.id ? (
                      <EditForm
                        item={column}
                        type="column"
                        onSave={(updates) => handleColumnSave(column.id, updates)}
                        onCancel={cancelEditingColumn}
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
                            onClick={() => startEditingColumn(column.id)}
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
                onClick={showNewTagForm}
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
                onCancel={hideNewTagForm}
              />
            )}

            <div className="space-y-3">
              {tags.map((tag) => (
                <Card key={tag.id}>
                  <CardContent>
                    {editingTag === tag.id ? (
                      <EditForm
                        item={tag}
                        type="tag"
                        onSave={(updates) => handleTagSave(tag.id, updates)}
                        onCancel={cancelEditingTag}
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
                            onClick={() => startEditingTag(tag.id)}
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

          <TabsContent value="priorities" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Task Priorities</h3>
            </div>

            <div className="space-y-3">
              {priorities.map((priority) => (
                <Card key={priority.id}>
                  <CardContent>
                    {editingPriority === priority.id ? (
                      <EditForm
                        item={priority}
                        type="priority"
                        onSave={(updates) => handlePrioritySave(priority.id, updates)}
                        onCancel={cancelEditingPriority}
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="secondary"
                            className="gap-1"
                            style={{
                              backgroundColor: priority.color + '20',
                              color: priority.color,
                              borderColor: priority.color
                            }}
                          >
                            {priority.icon && <span>{priority.icon}</span>}
                            {priority.name}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditingPriority(priority.id)}
                          >
                            <Edit3 className="h-4 w-4" />
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

export default SettingsDialog
