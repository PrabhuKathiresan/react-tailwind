import type { ReactNode } from 'react'

/**
 * Available dialog placement modes.
 */
export type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right'

/**
 * Sizes for the dialog panel when in center/top modes.
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface DialogProps {
  /**
   * Controls the visibility of the dialog.
   */
  open: boolean

  /**
   * Called when clicking overlay or pressing the ESC key.
   */
  onClose?: () => void

  /**
   * Dialog position on the screen.
   * @default "center"
   */
  position?: DialogPosition

  /**
   * Controls dialog width for center/top/bottom modes.
   * @default "md"
   */
  size?: DialogSize

  /**
   * Custom classes for overlay.
   */
  overlayClass?: string

  /**
   * Custom classes for the panel.
   */
  panelClass?: string

  /**
   * Child content of the dialog panel.
   */
  children?: ReactNode

  /**
   * Controls if Dialog should have a backdrop
   * @default true
   */
  backdrop?: boolean

  /**
   * Controls if Dialog should close on ESC key press
   * @default true
   */
  closeOnEscape?: boolean
}

export type DialogSizeMap = Record<DialogSize, string>

export type DialogPositionClassMap = Record<DialogPosition, string>
