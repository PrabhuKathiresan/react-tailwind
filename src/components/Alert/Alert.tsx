import React from 'react'
import { buildClassName } from '../../utils/build-classname'
import BadgeCheckIcon from '../Icons/BadgeCheck.svg'
import CircleXIcon from '../Icons/CircleX.svg'
import CircleAlertIcon from '../Icons/CircleAlert.svg'
import InfoIcon from '../Icons/Info.svg'
import XIcon from '../Icons/X.svg'
import { Button } from '../Button'
import type { AlertProps } from './Alert.types'

const AlertTypeIconMap = {
  success: BadgeCheckIcon,
  danger: CircleXIcon,
  warning: CircleAlertIcon,
  info: InfoIcon,
}

const TypeClassMap = {
  success: 'bg-green-50 ring-green-600/20 text-green-700',
  danger: 'bg-red-50 ring-red-600/20 text-red-700',
  warning: 'bg-orange-50 ring-orange-600/20 text-orange-700',
  info: 'bg-blue-50 ring-blue-600/20 text-blue-700',
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
      className={buildClassName(
        className,
        'flex items-center justify-between rounded-md p-3 text-sm ring-1 ring-inset gap-2',
        TypeClassMap[type],
      )}
      {...restProps}
    >
      <span className="inline-flex items-center gap-2">
        <Icon className="size-5" data-testid={`alert-${type}-icon`} />
        <span className="pr-2 inline-flex items-center">{message || children}</span>
      </span>
      {removable && (
        <Button
          iconOnly
          size="xs"
          variant="plain"
          theme="secondary"
          className="hover:bg-black/5 text-gray-600 dark:hover:bg-black/5 dark:text-gray-600"
          onClick={() => onRemove()}
          data-testid="alert-remove-btn"
        >
          <XIcon className="size-4.5" data-testid="alert-remove-icon" />
        </Button>
      )}
    </div>
  )
}

Alert.displayName = 'Alert'
