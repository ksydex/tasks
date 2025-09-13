import React, { memo } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { LucideIcon } from 'lucide-react'

export interface TabItem {
  value: string
  label: string
  icon?: LucideIcon
  hiddenOnMobile?: boolean
}

export interface IconTabsProps {
  /** Current active tab value */
  value: string
  /** Callback when tab changes */
  onValueChange: (value: string) => void
  /** Array of tab items */
  tabs: TabItem[]
  /** Optional className for the tabs container */
  className?: string
  /** Optional className for the tabs list */
  tabsListClassName?: string
  /** Whether tabs are disabled */
  disabled?: boolean
  /** Default tab value */
  defaultValue?: string
}

/**
 * Переиспользуемый компонент вкладок с поддержкой иконок.
 * Основан на паттерне из TaskCommentsPanel.
 */
const IconTabs = memo(({
  value,
  onValueChange,
  tabs,
  className = "",
  tabsListClassName = "",
  disabled = false,
  defaultValue
}: IconTabsProps) => {
  return (
    <Tabs
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      className={className}
    >
      <TabsList className={`grid w-full grid-cols-${tabs.length} ${tabsListClassName}`}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={disabled}
              className="flex items-center gap-2"
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
              <span className={tab.hiddenOnMobile ? "hidden sm:inline" : ""}>
                {tab.label}
              </span>
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
})

IconTabs.displayName = 'IconTabs'

export { IconTabs }
export default IconTabs
