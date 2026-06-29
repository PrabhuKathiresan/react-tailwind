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
  success:
    'bg-[var(--ui-success-light)] ring-[var(--ui-success-ring-subtle)] text-[var(--ui-success-text)]',
  danger:
    'bg-[var(--ui-danger-light)]  ring-[var(--ui-danger-ring-subtle)]  text-[var(--ui-danger-text)]',
  warning:
    'bg-[var(--ui-warning-light)] ring-[var(--ui-warning-ring-subtle)] text-[var(--ui-warning-text)]',
  info: 'bg-[var(--ui-info-light)]    ring-[var(--ui-info-ring-subtle)]    text-[var(--ui-info-text)]',
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
          aria-label="Dismiss alert"
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
