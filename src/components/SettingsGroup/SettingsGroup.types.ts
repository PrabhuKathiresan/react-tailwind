import type { ReactNode } from 'react'

export interface SettingsGroupProps {
  /** The group's heading, e.g. "Numbering". */
  title: string
  /** One line under the heading, e.g. what these settings affect. */
  description?: ReactNode
  /** Rows: ListRow (with `disclosure` for rows that open a form), or a padded row holding a control. */
  children: ReactNode
  /**
   * The rows run edge to edge by cancelling the page's own side padding.
   * @default true
   */
  bleed?: boolean
}
