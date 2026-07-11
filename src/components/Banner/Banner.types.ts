import type { HTMLAttributes, ReactNode } from 'react'

export type BannerType = 'info' | 'error' | 'success' | 'warning'
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Defines banner type
   * @default "info"
   */
  type?: BannerType
  children?: ReactNode
  /**
   * Controls the icon size
   * @default "sm"
   */
  iconSize?: IconSize
  /**
   * Override the default type icon. Pass null to suppress the icon entirely.
   */
  icon?: ReactNode
  /**
   * Makes the banner dismissible with a close button
   */
  removable?: boolean
  /**
   * Called when the dismiss button is clicked
   */
  onRemove?: () => void
}
