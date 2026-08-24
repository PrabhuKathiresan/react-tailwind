import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeTheme = 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Defines theme of the Badge
   * @default "info"
   */
  theme?: BadgeTheme
  children: ReactNode
  /**
   * Defines if badge is removable
   */
  removable?: boolean
  /**
   * Defines if corners are rounded
   */
  rounded?: boolean
  /**
   * Handler on removing badge
   */
  onRemove?: () => void
  /**
   * Size preset controlling padding
   * @default "md"
   */
  size?: BadgeSize
  /**
   * Optional icon rendered before the label
   */
  icon?: ReactNode
}
