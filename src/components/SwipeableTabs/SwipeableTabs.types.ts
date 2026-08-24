import type { ReactNode } from 'react'

export interface SwipeableTabItem {
  /** Unique tab identifier */
  id: string
  /** Tab header label */
  label: ReactNode
  /** Tab panel content element */
  content: ReactNode
  /** Icon rendered next to label */
  icon?: ReactNode
  /** Notification badge text or number */
  badge?: string | number
  /** Disables tab selection */
  disabled?: boolean
}

export type SwipeableTabsHeaderVariant = 'default' | 'pills' | 'segmented'

export interface SwipeableTabsProps {
  /** Array of tab items */
  items: SwipeableTabItem[]
  /** Controlled active tab ID */
  activeId?: string
  /** Default active tab ID (uncontrolled mode) */
  defaultActiveId?: string
  /** Callback fired when active tab changes */
  onChange?: (id: string) => void
  /** Enables touch swipe navigation (default: true) */
  swipeable?: boolean
  /** Minimum horizontal swipe distance threshold in px (default: 50) */
  threshold?: number
  /** Visual tab header variant ('default' | 'pills' | 'segmented', default: 'default') */
  headerVariant?: SwipeableTabsHeaderVariant
  /** Outer container class string */
  containerClass?: string
  /** Tab header row class string */
  headerClass?: string
  /** Tab panel view container class string */
  contentClass?: string
}
