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
}
