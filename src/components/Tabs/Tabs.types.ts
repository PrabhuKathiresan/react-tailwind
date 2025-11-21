import type { ReactNode } from 'react'

/**
 * Single tab item.
 */
export type TabsItem = {
  /** Visible label for the tab */
  label: ReactNode
  /** Content rendered inside the TabPanel for this tab */
  content: ReactNode
  /** Optional icon (ReactNode) shown before the label */
  icon?: ReactNode
  /** optional id or key; if missing index will be used */
  id?: string | number
}

/**
 * Tabs component props
 */
export interface TabsProps {
  /**
   * Tabs data (label + panel). Order defines visual order.
   */
  tabs: TabsItem[]

  /**
   * Variant for the tab list's appearance.
   * Only supported values: "underline" | "segmented" | "solid"
   *
   * - "underline" (default): modern underline indicator under active tab
   * - "segmented": segmented pill style where selected tab looks like a pill
   * - "solid": solid nav tabs (selected tab has solid background)
   */
  variant?: 'underline' | 'segmented' | 'solid'

  /**
   * Starting tab index (controlled by TabGroup defaultIndex)
   */
  defaultIndex?: number

  /**
   * Extra classes for the outer group container
   */
  className?: string

  /**
   * Extra classes to apply to the TabList wrapper
   */
  listClass?: string

  /**
   * Extra classes to apply to individual TabPanel wrapper
   */
  panelClass?: string

  /**
   * Whether tabs should stretch to fill their container equally.
   * NOTE: you said `fullWidth` isn't supported in your current system, so it's **not** included.
   */
}
