import type { ReactNode } from 'react'

export type AlertType = 'success' | 'danger' | 'warning' | 'info'

export interface BaseAlertProps {
  /**
   * Defines alert type
   * @default "info"
   */
  type?: AlertType
  className?: string
  /**
   * Defines if alert is removable
   */
  removable?: boolean
  /**
   * Handler when closing / dismissing alert
   * @returns void
   */
  onRemove?: () => void
}

/**
 * Alert component used to display important messages.
 *
 * One of `message` or `children` is required.
 * @remarks Only one should be provided at a time.
 */
export type AlertProps =
  | (BaseAlertProps & {
      /** Text content to display in alert */
      message: string
      children?: never
    })
  | (BaseAlertProps & {
      /** ReactNode to display in alert */
      children: ReactNode
      message?: never
    })
