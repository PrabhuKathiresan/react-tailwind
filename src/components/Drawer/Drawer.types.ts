import { type ReactNode } from 'react'

export type DrawerAlignment = 'center' | 'start' | 'end' | 'top' | 'bottom'

export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface DrawerProps {
  /**
   * Controls if Drawer is open
   */
  isOpen: boolean

  /**
   * Handler method that invokes on close attempt
   */
  onClose?: () => void

  /**
   * Controls whether clicking outside / backdrop closes the drawer.
   * Set to false to prevent accidental dismissal.
   * @default true
   */
  closeOnOutsideClick?: boolean

  /**
   * Drawer alignment on the page ('start' | 'end' | 'top' | 'bottom' | 'center')
   * @default "end"
   */
  align?: DrawerAlignment

  /**
   * Whether to add backdrop overlay
   * @default true
   */
  backdrop?: boolean

  /**
   * Optional Drawer title
   */
  title?: ReactNode

  /**
   * Controls if the title should be sticky on top
   */
  titleSticky?: boolean

  /**
   * Drawer description text
   */
  description?: ReactNode

  /**
   * Main content of the drawer
   */
  children?: ReactNode

  /**
   * Optional drawer footer action bar (e.g. action buttons)
   */
  footer?: ReactNode

  /**
   * Keeps the footer sticky at the bottom of the drawer
   * @default false
   */
  footerSticky?: boolean

  /**
   * Drawer size ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full')
   * @default "md"
   */
  size?: DrawerSize

  /**
   * Shows top-right ✕ close button
   * @default true
   */
  showCloseButton?: boolean

  /**
   * Shows left ← back button in header
   */
  showBackButton?: boolean

  /**
   * Displays top drag handle pill (especially for mobile bottom sheets)
   * Defaults to true when align="bottom"
   */
  dragHandle?: boolean

  /**
   * Dialog Panel class
   */
  panelClass?: string

  /**
   * Drawer content class
   */
  contentClass?: string

  /**
   * Drawer title class
   */
  titleClass?: string

  /**
   * Drawer description class
   */
  descriptionClass?: string
}

export type AlignmentMap = {
  [key in DrawerAlignment]: string
}

export type SizeMap = {
  [key in DrawerSize]: string
}
