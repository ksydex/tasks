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

## Design Patterns & Architecture

### Logic Separation via Custom Hooks
This project follows a pattern of separating component logic from presentation using custom hooks. This approach enhances reusability, testability, and maintainability.

**Co-location Pattern:**
- For components with business logic, a dedicated folder structure is used (e.g., `src/components/MyComponent/`)
- **Component File**: The presentational (UI) part resides in `index.tsx`. This file should be as "dumb" as possible, receiving data and callbacks via props or from its companion hook
- **Hook File**: All related logic is encapsulated in a custom hook named with a `use-` prefix (e.g., `use-my-component.ts`) within the same folder
- **Global Hooks**: The global `src/hooks` directory is reserved for truly generic hooks not tied to specific component business logic

**Refactored Components:**
- `SettingsDialog/` - Complex state management and form handling logic separated
- `ListView/` & `TaskTableRow/` - Sorting/filtering logic and row interaction logic extracted
- `BoardView/` - Drag-and-drop logic and data fetching separated
- `HomePage/` - Page-level state management (theme, view) separated
- `TaskStats/` - Calculation logic and store connections extracted
- `PowerfulInput/` - Command state management and keyboard handling logic separated
- `AddTaskForm/` - Form state and task creation logic extracted
- `TabPane/` - View persistence and state synchronization logic separated
- `TaskCard/` - Hover effects, drag state, and task data fetching separated
- `TaskContextMenu/` - Task deletion logic and toast notifications extracted

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
- **Architecture**: Major components use custom hook pattern for logic separation and improved maintainability
- **Testing**: Use `bun dev` as primary testing command after refactoring to ensure components work correctly

## File Structure
/src
├── components/      # Task management components
│   ├── ui/         # Pre-installed shadcn/ui components
│   │   └── multi-select.tsx # Searchable multi-select component with color support
│   ├── SettingsDialog/     # Complete settings management (refactored)
│   │   ├── index.tsx       # Presentational settings dialog component
│   │   └── use-settings-dialog.ts # Settings state management and event handling logic
│   ├── ListView/           # Task list view with table display (refactored)
│   │   ├── index.tsx       # Presentational list component
│   │   └── use-list-view.ts # Sorting and filtering logic
│   ├── TaskTableRow/       # Individual table row for task display (refactored)
│   │   ├── index.tsx       # Presentational row component
│   │   └── use-task-table-row.ts # Row interaction logic and data fetching
│   ├── BoardView/          # Kanban board view (refactored)
│   │   ├── index.tsx       # Presentational board component
│   │   └── use-board-view.ts # Drag-and-drop logic and data management
│   ├── TaskStats/          # Progress tracking component (refactored)
│   │   ├── index.tsx       # Presentational stats component
│   │   └── use-task-stats.ts # Stats calculation logic
│   ├── DetailedTaskForm/   # Full task editor (already follows pattern)
│   │   ├── index.tsx       # Task form component
│   │   └── use-task-form.ts # Form state management and validation
│   ├── PowerfulInput/      # Command palette with keyboard shortcuts (refactored)
│   │   ├── index.tsx       # Presentational command input component
│   │   └── use-powerful-input.ts # Command state and keyboard handling logic
│   ├── AddTaskForm/        # Simple task creation form (refactored)
│   │   ├── index.tsx       # Presentational form component
│   │   └── use-add-task-form.ts # Form state and task creation logic
│   ├── TabPane/            # View switching tabs with persistence (refactored)
│   │   ├── index.tsx       # Presentational tabs component
│   │   └── use-tab-pane.ts # View state and localStorage persistence logic
│   ├── TaskCard/           # Draggable task card with interactions (refactored)
│   │   ├── index.tsx       # Presentational card component
│   │   └── use-task-card.ts # Hover effects, drag state, and task data logic
│   ├── TaskContextMenu/    # Context menu for task actions (refactored)
│   │   ├── index.tsx       # Presentational menu component
│   │   └── use-task-context-menu.ts # Task deletion and notification logic
│   └── KanbanColumn.tsx    # Droppable column with dynamic headers and custom styling
│
├── store/          # State management
│   └── todo-store.ts # Enhanced store with columns, tags, and drag operations
│
├── pages/          # Application pages
│   ├── HomePage/           # Main application page (refactored)
│   │   ├── index.tsx       # Presentational home page layout
│   │   └── use-home-page.ts # Page state management (theme, view selection)
│   └── NotFoundPage.tsx    # 404 error page
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