import React from 'react';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTaskStore } from '@/store/todo-store';
import { useToast } from '@/hooks/use-toast';

interface TaskContextMenuProps {
  taskId: string;
  children?: React.ReactNode;
  variant?: 'context' | 'dropdown';
  onDelete?: () => void;
}

export function TaskContextMenu({ 
  taskId, 
  children, 
  variant = 'context',
  onDelete 
}: TaskContextMenuProps) {
  const { deleteTask, tasks } = useTaskStore();
  const { toast } = useToast();

  const task = tasks.find(t => t.id === taskId);

  const handleDelete = () => {
    if (task) {
      deleteTask(taskId);
      toast({
        title: "Task deleted",
        description: `"${task.title}" has been deleted.`,
      });
      onDelete?.();
    }
  };

  const menuItems = (
    <DropdownMenuItem 
      onClick={handleDelete}
      className="text-destructive focus:text-destructive focus:bg-destructive/10"
    >
      <Trash2 className="w-4 h-4 mr-2" />
      Delete task
    </DropdownMenuItem>
  );

  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menuItems}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children || <div className="w-full h-full" />}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem 
          onClick={handleDelete}
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete task
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}