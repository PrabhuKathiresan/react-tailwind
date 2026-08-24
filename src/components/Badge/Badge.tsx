import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import XIcon from '../Icons/X.svg'
import { BadgeProps } from './Badge.types'
import { TextContent } from '../TextContent'

const ThemeClassMap: Record<string, string> = {
  success:
    'bg-[var(--ui-success-light)] text-[var(--ui-success-text)] ring-[var(--ui-success-ring-subtle)]',
  danger:
    'bg-[var(--ui-danger-light)] text-[var(--ui-danger-text)] ring-[var(--ui-danger-ring-subtle)]',
  warning:
    'bg-[var(--ui-warning-light)] text-[var(--ui-warning-text)] ring-[var(--ui-warning-ring-subtle)]',
  info: 'bg-[var(--ui-info-light)] text-[var(--ui-info-text)] ring-[var(--ui-info-ring-subtle)]',
  primary: 'bg-[var(--ui-info-light)] text-[var(--ui-info-text)] ring-[var(--ui-info-ring-subtle)]',
  secondary:
    'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 ring-[var(--ui-secondary-ring-subtle)]',
}

const SIZE_CLASS = {
  sm: 'text-xs py-0.5 px-2',
  md: 'text-xs py-1 px-3',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    theme = 'info',
    className,
    children,
    removable = false,
    rounded = false,
    onRemove,
    size = 'md',
    icon,
    ...restProps
  } = props

  return (
    <TextContent
      ref={ref}
      className={buildClassName(
        'inline-flex items-center gap-1 font-medium ring-1 ring-inset',
        SIZE_CLASS[size],
        ThemeClassMap[theme] || ThemeClassMap.info,
        rounded ? 'rounded-full' : 'rounded-md',
        icon ? 'pl-2' : '',
        removable ? 'pr-1' : '',
        className,
      )}
      data-testid={`badge-${theme}`}
      {...restProps}
    >
      {icon && <span className="shrink-0 inline-flex">{icon}</span>}
      {children}
      {removable && (
        <XIcon
          className="size-4 shrink-0 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Remove"
          onClick={() => onRemove?.()}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onRemove?.()
            }
          }}
        />
      )}
    </TextContent>
  )
})

Badge.displayName = 'Badge'
