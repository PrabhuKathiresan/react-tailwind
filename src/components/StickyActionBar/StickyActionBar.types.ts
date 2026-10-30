import type { HTMLAttributes, ReactNode } from 'react'

export interface StickyActionBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Primary summary content rendered on the left/start side (e.g. Total amount, item count)
   */
  summaryContent?: ReactNode
  /**
   * Action buttons rendered on the right/end side (e.g. Save, Cancel buttons)
   */
  actionsContent?: ReactNode
  /**
   * Optional expandable drawer content triggered when clicking summary
   */
  drawerContent?: ReactNode
  /**
   * Title for the expandable summary drawer
   * @default "Summary Details"
   */
  drawerTitle?: string
  /**
   * Positioning mode for the bar
   * @default "fixed"
   */
  position?: 'fixed' | 'sticky' | 'relative'
  /**
   * Custom maximum width container class
   * @default "max-w-5xl"
   */
  containerMaxWidth?: string
  /**
   * Pads the bar's bottom edge for `env(safe-area-inset-bottom)` so its actions clear the
   * home indicator on notched phones (no effect elsewhere).
   * @default true
   */
  safeArea?: boolean
  /**
   * Distance from the viewport bottom for `fixed`/`sticky` bars, as a CSS length or variable,
   * e.g. `var(--app-bottom-inset)` to sit above an app's bottom navigation.
   * @default '0px'
   */
  bottomOffset?: string
}
