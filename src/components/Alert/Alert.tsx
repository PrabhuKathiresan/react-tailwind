import React, { forwardRef } from 'react'
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
    'bg-[var(--ui-danger-light)] ring-[var(--ui-danger-ring-subtle)] text-[var(--ui-danger-text)]',
  warning:
    'bg-[var(--ui-warning-light)] ring-[var(--ui-warning-ring-subtle)] text-[var(--ui-warning-text)]',
  info: 'bg-[var(--ui-info-light)] ring-[var(--ui-info-ring-subtle)] text-[var(--ui-info-text)]',
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    type = 'info',
    className,
    message,
    children,
    removable = false,
    onRemove,
    icon,
    title,
    ...restProps
  } = props

  const DefaultIcon = AlertTypeIconMap[type] || InfoIcon
  const iconNode =
    icon !== undefined ? (
      icon
    ) : (
      <DefaultIcon className="size-5 shrink-0" data-testid={`alert-${type}-icon`} />
    )

  return (
    <div
      ref={ref}
      className={buildClassName(
        'flex items-center justify-between rounded-md p-3 text-sm ring-1 ring-inset gap-2',
        TypeClassMap[type],
        className,
      )}
      {...restProps}
    >
      <span className="inline-flex items-start gap-2 min-w-0">
        {iconNode && <span className="shrink-0 inline-flex mt-0.5">{iconNode}</span>}
        <span className="inline-flex flex-col gap-0.5 min-w-0">
          {title && <span className="font-semibold">{title}</span>}
          <span className="inline-flex items-center">{message ?? children}</span>
        </span>
      </span>
      {removable && (
        <Button
          iconOnly
          aria-label="Dismiss alert"
          size="xs"
          variant="plain"
          theme="secondary"
          className="hover:bg-black/10 dark:hover:bg-white/10 shrink-0"
          onClick={() => onRemove?.()}
          data-testid="alert-remove-btn"
        >
          <XIcon className="size-4.5" data-testid="alert-remove-icon" />
        </Button>
      )}
    </div>
  )
})

Alert.displayName = 'Alert'
