export type BannerType = 'info' | 'error' | 'success' | 'warning'
export type IconSize = 5 | 6 | 7 | 8 | 9 | 10

export interface BannerProps {
  /**
   * Defines banner type
   * @default "info"
   */
  type?: BannerType
  children: any
  /**
   * Controls the icon size
   */
  iconSize?: IconSize
}
