import type { HTMLAttributes, ReactNode } from 'react'

export type AlertType = 'success' | 'danger' | 'warning' | 'info'

export interface BaseAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  /**
   * Defines alert type
   * @default "info"
   */
  type?: AlertType
  /**
   * Defines if alert is removable
   */
  removable?: boolean
  /**
   * Handler when closing / dismissing alert
   */
  onRemove?: () => void
  /**
   * Override the default type icon. Pass null to suppress the icon entirely.
   */
  icon?: ReactNode
  /**
   * Optional bold title rendered above the message
   */
  title?: ReactNode
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
