import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { TOUCH_TARGET_CLASS } from '../../utils/touch-target'
import type { ChipGroupProps, ChipProps } from './Chip.types'

const SIZE_CLASS = {
  sm: 'h-6 px-2.5 gap-1 text-xs',
  md: 'h-8 px-3 gap-1.5 text-sm',
}

/**
 * A pill-shaped choice: one click picks it. Use several in a `ChipGroup` for quick
 * presets (a due date in 7, 15 or 30 days) or quick filters. Selected chips show in the
 * info colours and are announced as pressed toggles.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>((props, ref) => {
  const { selected = false, size = 'sm', icon, className, children, ...restProps } = props

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={buildClassName(
        'relative inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap ring-1 ring-inset select-none cursor-pointer',
        'transition-[color,background-color,box-shadow] duration-150 ease-out',
        'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        SIZE_CLASS[size],
        selected
          ? 'bg-info-subtle text-info-fg ring-info-ring-subtle font-semibold'
          : 'bg-gray-100 text-gray-700 ring-transparent hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
        TOUCH_TARGET_CLASS,
        className,
      )}
      data-testid="chip"
      {...restProps}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </button>
  )
})

Chip.displayName = 'Chip'

/**
 * A row of chips, named for screen readers. Stays on one line unless `wrap`.
 */
export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>((props, ref) => {
  const { label, wrap = false, className, children, ...restProps } = props

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={buildClassName(
        'flex items-center gap-1.5',
        wrap ? 'flex-wrap' : 'flex-nowrap',
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  )
})

ChipGroup.displayName = 'ChipGroup'
