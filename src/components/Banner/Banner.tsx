import React, { forwardRef } from 'react'
import TriangleAlertIcon from '../Icons/TriangleAlert.svg'
import CircleXIcon from '../Icons/CircleX.svg'
import CircleCheckIcon from '../Icons/CircleCheck.svg'
import InfoIcon from '../Icons/Info.svg'
import XIcon from '../Icons/X.svg'
import { buildClassName } from '../../utils/build-classname'
import { Button } from '../Button'
import { BannerProps } from './Banner.types'

const sizeMap = {
  xs: 'size-4',
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-8',
  xl: 'size-10',
}

const IconMap = {
  info: InfoIcon,
  error: CircleXIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon,
}

const TypeClassMap = {
  info: 'bg-[var(--ui-info-light)] ring-[var(--ui-info-ring-subtle)] text-[var(--ui-info-text)]',
  error:
    'bg-[var(--ui-danger-light)] ring-[var(--ui-danger-ring-subtle)] text-[var(--ui-danger-text)]',
  success:
    'bg-[var(--ui-success-light)] ring-[var(--ui-success-ring-subtle)] text-[var(--ui-success-text)]',
  warning:
    'bg-[var(--ui-warning-light)] ring-[var(--ui-warning-ring-subtle)] text-[var(--ui-warning-text)]',
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
  const {
    type = 'info',
    iconSize = 'sm',
    children,
    icon,
    removable = false,
    onRemove,
    className,
    ...restProps
  } = props

  const DefaultIcon = IconMap[type]
  const iconNode =
    icon !== undefined ? (
      icon
    ) : (
      <DefaultIcon
        data-testid={`banner-${type}-icon`}
        className={buildClassName('shrink-0', sizeMap[iconSize])}
      />
    )

  return (
    <div
      ref={ref}
      className={buildClassName(
        'text-sm rounded-md flex w-full p-3 items-center gap-3 ring-1 ring-inset',
        TypeClassMap[type],
        className,
      )}
      data-testid={`banner-${type}`}
      {...restProps}
    >
      {iconNode}
      <div className="flex items-center w-full justify-between">{children}</div>
      {removable && (
        <Button
          iconOnly
          aria-label="Dismiss banner"
          size="xs"
          variant="plain"
          theme="secondary"
          className="hover:bg-black/10 dark:hover:bg-white/10 shrink-0"
          onClick={() => onRemove?.()}
          data-testid="banner-remove-btn"
        >
          <XIcon className="size-4.5" data-testid="banner-remove-icon" />
        </Button>
      )}
    </div>
  )
})

Banner.displayName = 'Banner'
