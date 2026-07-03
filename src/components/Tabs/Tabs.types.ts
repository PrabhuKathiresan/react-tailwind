import type { ReactNode } from 'react'

/**
 * Single tab item.
 */
export type TabsItem = {
  /** Visible label for the tab */
  label: ReactNode
  /** Content rendered inside the TabPanel for this tab */
  content: ReactNode
  /** Optional icon rendered before the label */
  icon?: ReactNode
  /** Unique key for this tab; falls back to index when omitted */
  id?: string | number
  /** Prevents this tab from being selected */
  disabled?: boolean
  /** Extra classes applied to this specific tab button */
  tabClass?: string
  /** Override the default panel className for this specific tab */
  panelClass?: string
}

/**
 * Tabs component props
 */
export interface TabsProps {
  /** Tab data array. Order defines visual order. */
  tabs: TabsItem[]

  /**
   * Visual style of the tab list.
   * - "underline" (default): active tab shows a bottom indicator line
   * - "segmented": active tab renders as a filled pill
   * - "solid": active tab renders with a solid block background
   */
  variant?: 'underline' | 'segmented' | 'solid'

  /** Initial selected index (uncontrolled) */
  defaultIndex?: number

  /** Controlled selected index — pair with onChange */
  selectedIndex?: number

  /** Called with the new index whenever the selected tab changes */
  onChange?: (index: number) => void

  /**
   * Layout direction of the tab list.
   * - "horizontal" (default): tabs sit in a row above the panel
   * - "vertical": tabs sit in a column to the left of the panel
   */
  orientation?: 'horizontal' | 'vertical'

  /** Stretch tabs to fill equal width across the tab list (horizontal only) */
  stretch?: boolean

  /** Extra classes for the outer TabGroup container */
  className?: string

  /** Extra classes for the TabList wrapper */
  listClass?: string

  /** Extra classes for the TabPanels wrapper */
  panelsClass?: string
}
