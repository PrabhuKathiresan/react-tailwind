import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import XIcon from '../Icons/X.svg'
import { BadgeProps } from './Badge.types'
import { TextContent } from '../TextContent'

const ThemeClassMap = {
  success:
    'bg-[var(--ui-success-light)] text-[var(--ui-success-text)] ring-[var(--ui-success-ring-subtle)]',
  danger:
    'bg-[var(--ui-danger-light)] text-[var(--ui-danger-text)] ring-[var(--ui-danger-ring-subtle)]',
  warning:
    'bg-[var(--ui-warning-light)] text-[var(--ui-warning-text)] ring-[var(--ui-warning-ring-subtle)]',
  info: 'bg-[var(--ui-info-light)] text-[var(--ui-info-text)] ring-[var(--ui-info-ring-subtle)]',
  secondary:
    'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 ring-[var(--ui-secondary-ring-subtle)]',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    theme = 'info',
    className = '',
    children,
    removable = false,
    rounded = false,
    onRemove = () => {},
    ...restProps
  } = props

  return (
    <TextContent
      ref={ref}
      className={buildClassName(
        className,
        'inline-flex items-center pl-3 py-1 text-xs font-medium ring-1 ring-inset',
        ThemeClassMap[theme],
        rounded ? 'rounded-full' : 'rounded-md',
      )}
      data-testid={`badge-${theme}`}
      {...restProps}
    >
      <TextContent className="pr-3 inline-flex items-center">{children}</TextContent>
      {removable ? (
        <XIcon
          className="size-5 px-0.5 mr-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Remove"
          onClick={() => onRemove()}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onRemove()
            }
          }}
        />
      ) : null}
    </TextContent>
  )
})

Badge.displayName = 'Badge'
