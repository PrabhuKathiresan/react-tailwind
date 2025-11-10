import React, { type ReactNode } from 'react'
import { buildClassName } from '../../utils/build-classname'
import BadgeCheckIcon from '../Icons/BadgeCheck.svg'
import CircleXIcon from '../Icons/CircleX.svg'
import CircleAlertIcon from '../Icons/CircleAlert.svg'
import InfoIcon from '../Icons/Info.svg'
import XIcon from '../Icons/X.svg'
import { Button } from '../Button'

export type AlertType = 'success' | 'danger' | 'warning' | 'info'

export interface BaseAlertProps {
  /**
   * Defines alert type
   * @default "info"
   */
  type?: AlertType;
  className?: string;
  /**
   * Defines if alert is removable
   */
  removable?: boolean;
  /**
   * Handler when closing / dismissing alert
   * @returns void
   */
  onRemove?: () => void;
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
      message: string;
      children?: never;
    })
  | (BaseAlertProps & {
      /** ReactNode to display in alert */
      children: ReactNode;
      message?: never;
    });

const AlertTypeIconMap = {
  success: BadgeCheckIcon,
  danger: CircleXIcon,
  warning: CircleAlertIcon,
  info: InfoIcon
}

const TypeClassMap = {
  success: 'bg-green-50 ring-green-600/20 text-green-700',
  danger: 'bg-red-50 ring-red-600/20 text-red-700',
  warning: 'bg-orange-50 ring-orange-600/20 text-orange-700',
  info: 'bg-blue-50 ring-blue-600/20 text-blue-700'
}

export const Alert: React.FC<AlertProps> = (props) => {
  const {
    type = 'info',
    className = '',
    message,
    children,
    removable = false,
    onRemove = () => {},
    ...restProps
  } = props

  const Icon = AlertTypeIconMap[type] || InfoIcon

  return (
    <div
      className={
        buildClassName(
          className,
          'flex items-center justify-between rounded-md p-3 text-sm ring-1 ring-inset gap-2',
          TypeClassMap[type]
        )
      }
      {...restProps}
    >
      <span className="inline-flex items-center gap-2">
        <Icon className='size-5' />
        <span className='pr-2 inline-flex items-center'>{message || children}</span>
      </span>
      {
        removable && (
          <Button iconOnly size="xs" variant="plain" theme="secondary" className="hover:bg-black/5 text-gray-600 dark:hover:bg-black/5 dark:text-gray-600" onClick={() => onRemove()}>
            <XIcon className="size-4.5" />
          </Button>
        )
      }
    </div>
  )
}
