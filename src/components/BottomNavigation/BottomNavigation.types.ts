import type { ElementType, ReactNode } from 'react'

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
  /**
   * Destination for a navigation tab. When set, the item renders as a link
   * (`linkAs`) instead of a button, so it opens in a new tab and is announced as a link.
   */
  href?: string
}

export interface BottomNavigationProps {
  /** Array of bottom navigation items (3 to 5 recommended) */
  items: BottomNavigationItem[]
  /** Controlled active tab ID */
  activeId: string
  /** Callback fired when a tab is selected (optional when items navigate via `href`) */
  onChange?: (id: string) => void
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
  /**
   * Element or component used for items with an `href`, e.g. a router's `Link`.
   * @default 'a'
   */
  linkAs?: ElementType
  /**
   * Prop name `linkAs` takes the destination on ('to' for react-router's `Link`).
   * @default 'href'
   */
  linkHrefProp?: 'href' | 'to'
  /**
   * Accessible name of the navigation landmark.
   * @default 'Bottom Navigation'
   */
  ariaLabel?: string
  /**
   * Removes the bar from the tree (not just visually), e.g. while a full-screen task owns the bottom edge.
   * @default false
   */
  hidden?: boolean
  /**
   * Rounds the bar's top corners, so it reads as a surface over the page.
   * @default false
   */
  rounded?: boolean
}
