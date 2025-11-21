export type BadgeTheme = 'success' | 'danger' | 'warning' | 'info' | 'secondary'

export interface BadgeProps {
  /**
   * Defines theme of the Badge
   * @default "info"
   */
  theme?: BadgeTheme
  className?: string
  children: any
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
}
