import React, { memo } from 'react'
import { IconTabs, type TabItem } from '@/components/ui/icon-tabs'
import { Kanban, List } from 'lucide-react'
import { useBoardBar } from './use-board-bar'
import type { ViewType } from '@/components/TabPane'

interface BoardBarProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
  className?: string
}

const BoardBar = memo(({
  activeView,
  onViewChange,
  className = ""
}: BoardBarProps) => {
  const { boardTitle } = useBoardBar()

  const viewTabs: TabItem[] = [
    {
      value: 'board',
      label: 'Board',
      icon: Kanban
    },
    {
      value: 'list',
      label: 'List',
      icon: List
    }
  ]

  return (
    <div className={`h-12 bg-background border-b border-border flex items-center justify-between px-4 ${className}`}>
      {/* Left side - Board Title */}
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-lg font-semibold text-foreground min-w-0 truncate">
          {boardTitle}
        </h2>
      </div>

      {/* Center - View Toggle */}
      <div className="flex items-center">
        <IconTabs
          value={activeView}
          onValueChange={onViewChange}
          tabs={viewTabs}
        />
      </div>

      {/* Right side - Empty for now */}
      <div className="flex items-center gap-2">
        {/* Future actions can be added here */}
      </div>
    </div>
  )
})

BoardBar.displayName = 'BoardBar'

export { BoardBar }
export default BoardBar
