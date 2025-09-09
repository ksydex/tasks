import React, { memo } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Kanban, List } from 'lucide-react'
import { useTabPane, type ViewType } from './use-tab-pane'
import type { ReactNode } from 'react'

export type { ViewType }

export interface TabPaneProps {
  /** Currently active view */
  activeView: ViewType
  /** Callback when view changes */
  onViewChange: (view: ViewType) => void
  /** Content for board view */
  boardContent: ReactNode
  /** Content for list view */
  listContent: ReactNode
  /** Optional className for the tabs container */
  className?: string
  /** Whether to persist view preference in localStorage */
  persistView?: boolean
  /** Storage key for view persistence */
  storageKey?: string
  /** Custom labels for tabs */
  boardLabel?: string
  listLabel?: string
  /** Whether tabs are disabled */
  disabled?: boolean
}

const TabPane = memo(({
  activeView,
  onViewChange,
  boardContent,
  listContent,
  className = "",
  persistView = true,
  storageKey = "task-view-preference",
  boardLabel = "Board",
  listLabel = "List",
  disabled = false
}: TabPaneProps) => {
  const {
    internalView,
    handleViewChange,
  } = useTabPane({
    activeView,
    onViewChange,
    persistView,
    storageKey
  })

  return (
    <Tabs
      value={internalView}
      onValueChange={handleViewChange}
      className={`w-full max-w-7xl mx-auto ${className}`}
    >
      <TabsList className="grid w-full grid-cols-2 mb-6" role="tablist" aria-label="Task view options">
        <TabsTrigger
          value="board"
          disabled={disabled}
          className="flex items-center gap-2"
          aria-describedby="board-view-description"
        >
          <Kanban className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">{boardLabel}</span>
          <span className="sm:hidden">{boardLabel}</span>
        </TabsTrigger>
        <TabsTrigger
          value="list"
          disabled={disabled}
          className="flex items-center gap-2"
          aria-describedby="list-view-description"
        >
          <List className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">{listLabel}</span>
          <span className="sm:hidden">{listLabel}</span>
        </TabsTrigger>
      </TabsList>

      {/* Hidden descriptions for screen readers */}
      <div id="board-view-description" className="sr-only">
        Kanban board view showing tasks organized in columns
      </div>
      <div id="list-view-description" className="sr-only">
        List view showing all tasks in a single scrollable list
      </div>

      <TabsContent value="board" className="mt-0" role="tabpanel" aria-labelledby="board-tab">
        <div className="transition-opacity duration-200 ease-in-out min-h-[400px]">
          {boardContent}
        </div>
      </TabsContent>

      <TabsContent value="list" className="mt-0" role="tabpanel" aria-labelledby="list-tab">
        <div className="transition-opacity duration-200 ease-in-out min-h-[400px]">
          {listContent}
        </div>
      </TabsContent>
    </Tabs>
  )
})

TabPane.displayName = 'TabPane'

export { TabPane }
export default TabPane
