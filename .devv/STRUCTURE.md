# This file is only for editing file nodes, do not break the structure
## Project Description
A powerful kanban-style task management application with drag & drop, customizable columns, tags system, and comprehensive settings management. Features beautiful card-based design, full task editing, and dynamic workflow organization.

## Key Features
- **Drag & Drop Kanban**: Full drag and drop functionality with smooth animations and visual feedback
- **Custom Columns**: Editable columns with custom icons (or no icon), colors, and titles via settings panel
- **Tag System**: Searchable multi-select tags with colorful styling, custom icons/emojis (or no icon), and seamless selection experience
- **Task Management**: Complete CRUD operations with rich editing interface including story points
- **Click-to-Edit**: Tasks open in detailed edit form when clicked
- **Context Menu**: Right-click task cards or use 3-dots menu in task form to access delete option (properly aligned with dialog header)
- **Dual Add Forms**: Simple one-field add on home page + detailed form for complex tasks with seamless title transfer
- **Settings Panel**: Centralized management of columns and tags with live preview and grey color option
- **Visual Design**: Column headers with colored top borders, clean task cards without borders
- **Progress Tracking**: Dynamic progress calculation based on completion column
- **Theme Support**: Light/dark mode toggle with consistent design system
- **Local Persistence**: All data saved with Zustand and localStorage including story points
- **Responsive Design**: Adaptive grid layout that works across all devices

## Data Storage
**Local Only:**
- Tasks: Zustand store with localStorage (title, description, status, tagIds, storyPoints, createdAt)
- Columns: Customizable columns with optional icons, colors, and titles (grey color available)
- Tags: Tag system with colors, optional icons/emojis, and names (grey color available)
- Settings: All preferences persisted locally

## SDK & External Services
**Devv SDK:** None required - fully client-side application
**External APIs:** @hello-pangea/dnd for drag and drop functionality
**Environment Variables:** None required

## Critical Notes
- Drag and drop requires @hello-pangea/dnd package for React 18 compatibility
- Task cards use DetailedTaskForm as trigger for click-to-edit functionality
- Column deletion automatically moves tasks to first remaining column
- Tag deletion removes tags from all associated tasks
- Settings dialog provides icon/color pickers with predefined options including "no icon" and grey color
- Simple add form on homepage only captures task name, detailed form accessed via icon button
- Task titles can be seamlessly transferred from simple form to detailed form
- Column headers display colored top borders instead of task card borders
- Story points displayed as badges on task cards when present
- Right-click context menu properly integrated with drag-and-drop functionality
- 3-dots menu button properly aligned with dialog close button in task form header

## File Structure
/src
├── components/      # Task management components
│   ├── ui/         # Pre-installed shadcn/ui components
│   │   └── multi-select.tsx # Searchable multi-select component with color support
│   ├── AddTaskForm.tsx # Simple one-field add form for task names only
│   ├── DetailedTaskForm.tsx # Full task editor with searchable multi-select tags and 3-dots menu
│   ├── TaskCard.tsx    # Draggable task card with click-to-edit, tags display, and right-click context menu
│   ├── KanbanColumn.tsx # Droppable column with dynamic headers and custom styling
│   ├── TaskStats.tsx   # Dynamic progress bar adapting to column configuration
│   ├── TaskContextMenu.tsx # Reusable context menu for task actions (right-click & dropdown variants)
│   └── SettingsDialog.tsx # Complete settings management for columns and tags
│
├── store/          # State management
│   └── todo-store.ts # Enhanced store with columns, tags, and drag operations
│
├── pages/          # Application pages
│   ├── HomePage.tsx # Drag & drop kanban board with dynamic columns
│   └── NotFoundPage.tsx # 404 error page
│
├── hooks/          # Custom Hooks directory
│   ├── use-mobile.ts # Pre-installed mobile detection Hook
│   └── use-toast.ts  # Toast notification system hook
│
├── lib/            # Utility library directory
│   └── utils.ts    # Utility functions including cn for class merging
│
├── App.tsx         # Root component with routing configuration
├── main.tsx        # Application entry point
└── index.css       # Design system with kanban-inspired layouts and drag feedback styles