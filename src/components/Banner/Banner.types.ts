export type BannerType = 'info' | 'error' | 'success' | 'warning'
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface BannerProps {
  /**
   * Defines banner type
   * @default "info"
   */
  type?: BannerType
  children: any
  /**
   * Controls the icon size
   * @default "sm"
   */
  iconSize?: IconSize
}
