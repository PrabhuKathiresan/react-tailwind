import type { ReactNode } from 'react'

export type BottomNavigationLabelVisibility = 'always' | 'active' | 'never'
export type BottomNavigationTheme = 'primary' | 'dark' | 'light'

export interface BottomNavigationItem {
  /** Unique tab identifier */
  id: string
  /** Display label text */
  label: ReactNode
  /** Icon rendered in standard state */
  icon: ReactNode
  /** Optional custom icon rendered when active */
  activeIcon?: ReactNode
  /** Optional notification badge text or number (e.g. 3 or "NEW") */
  badge?: string | number
  /** Badge color variant ('danger' | 'info' | 'success') */
  badgeVariant?: 'danger' | 'info' | 'success'
  /** Disables tab click */
  disabled?: boolean
  /** Custom click handler */
  onClick?: () => void
}

export interface BottomNavigationProps {
  /** Array of bottom navigation items (3 to 5 recommended) */
  items: BottomNavigationItem[]
  /** Controlled active tab ID */
  activeId: string
  /** Callback fired when a tab is selected */
  onChange: (id: string) => void
  /** Fixed positioning at bottom of viewport (default: true) */
  fixed?: boolean
  /** Controls when tab labels are visible ('always' | 'active' | 'never', default: 'always') */
  showLabels?: BottomNavigationLabelVisibility
  /** Theme styling variant ('primary' | 'dark' | 'light', default: 'light') */
  theme?: BottomNavigationTheme
  /** Active tab indicator visual style ('pill' | 'line' | 'dot' | 'none', default: 'pill') */
  activeIndicatorStyle?: 'pill' | 'line' | 'dot' | 'none'
  /** Outer container class string */
  containerClass?: string
  /** Tab button item class string */
  itemClass?: string
}
