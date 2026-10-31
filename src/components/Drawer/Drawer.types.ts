import { type ReactNode } from 'react'
import type { ResponsiveValue } from '../../hooks/use-breakpoint'

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
   * Drawer alignment on the page ('start' | 'end' | 'top' | 'bottom' | 'center').
   * Pass `{ base, md, lg }` to change it per breakpoint, e.g. `{ base: 'bottom', md: 'end' }`
   * for a bottom sheet on phones and a side panel from 768px.
   * @default "end"
   */
  align?: ResponsiveValue<DrawerAlignment>

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
   * Drawer size ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full').
   * Pass `{ base, md, lg }` to change it per breakpoint, e.g. `{ base: 'full', md: 'md' }`.
   * @default "md"
   */
  size?: ResponsiveValue<DrawerSize>

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

  /**
   * How the drawer shows on phones (below 768px). 'fullscreen' fills the
   * screen with one bar (close, title, `headerAction`), moves the description
   * into the scrolling content and drops the footer, so forms keep as much
   * room as possible above the keyboard; the phone's back button closes it.
   * Larger screens are unchanged. `titleClass` doesn't apply to that bar.
   * @default 'default'
   */
  phoneLayout?: 'default' | 'fullscreen'

  /**
   * The main action (e.g. Save) for the phone full-screen bar. A submit
   * button outside the form names it with `form`.
   */
  headerAction?: ReactNode
}

export type AlignmentMap = {
  [key in DrawerAlignment]: string
}

export type SizeMap = {
  [key in DrawerSize]: string
}
