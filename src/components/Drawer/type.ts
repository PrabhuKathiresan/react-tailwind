import { type ReactNode } from 'react'

export type DrawerAlignment = 'center' | 'start' | 'end' | 'top' | 'bottom' | 'top-center'

export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface DrawerProps {
  /**
   * Controls if Drawer is open
   */
  isOpen: boolean
  /**
   * Handler method that invokes on close attempt
   * @returns void
   */
  onClose?: () => void
  /**
   * Drawer alignment on the page
   * @default "end"
   */
  align?: DrawerAlignment
  /**
   * Whether to add backdrop, when drawer is open
   * @default "true"
   */
  backdrop?: boolean
  /**
   * Drawer title
   */
  title: ReactNode
  /**
   * Controls if the title should be sticky on top
   */
  titleSticky?: boolean
  /**
   * Drawer description section
   */
  description?: ReactNode
  /**
   * Content of the drawer
   */
  children?: ReactNode
  /**
   * Drawer size
   * @default "md"
   */
  size?: DrawerSize
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
  /**
   * Should show back button on Drawer
   */
  showBackButton?: boolean
}

export type AlignmentMap = {
  [key in DrawerAlignment]: string
}

export type SizeMap = {
  [key in DrawerSize]: string
}
