import React, { forwardRef, useRef, type ReactElement, type RefAttributes } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type { SegmentedControlProps } from './SegmentedControl.types'

const SIZE_CONTAINER_CLASS = {
  sm: 'p-0.5 gap-0.5 rounded-lg text-xs',
  md: 'p-1 gap-1 rounded-xl text-sm',
  lg: 'p-1.5 gap-1.5 rounded-xl text-base',
}

const SIZE_OPTION_CLASS = {
  sm: 'px-2 py-1 text-xs font-medium rounded-md',
  md: 'px-3 py-1.5 text-sm font-semibold rounded-lg',
  lg: 'px-4 py-2 text-base font-semibold rounded-lg',
}

const SIZE_ICON_CLASS = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
}

const SegmentedControlBase = forwardRef<HTMLDivElement, SegmentedControlProps>((props, ref) => {
  const {
    options,
    value,
    onChange,
    disabled = false,
    size = 'md',
    fullWidth = false,
    className,
    ...restProps
  } = props

  // One Tab stop (the chosen option); the arrow keys, Home and End choose another and move
  // focus to it, as a tab list does. Without moving focus, the next key would start again
  // from the option just left.
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const enabledOptions = options.filter((opt) => !opt.disabled && !disabled)
    if (enabledOptions.length === 0) return
    const currentPos = enabledOptions.findIndex((opt) => opt.value === options[currentIndex].value)
    let nextPos: number
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
      nextPos = (currentPos + 1) % enabledOptions.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
      nextPos = (currentPos - 1 + enabledOptions.length) % enabledOptions.length
    else if (e.key === 'Home') nextPos = 0
    else if (e.key === 'End') nextPos = enabledOptions.length - 1
    else return
    e.preventDefault()
    const next = enabledOptions[nextPos]
    onChange(next.value)
    optionRefs.current[options.findIndex((opt) => opt.value === next.value)]?.focus()
  }

  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation="horizontal"
      className={buildClassName(
        'inline-flex items-center border border-[var(--ui-border)] bg-gray-100/80 dark:bg-gray-800/80',
        SIZE_CONTAINER_CLASS[size],
        fullWidth ? 'w-full flex' : '',
        disabled ? 'opacity-60 cursor-not-allowed' : '',
        className,
      )}
      data-testid="segmented-control"
      {...restProps}
    >
      {options.map((option, index) => {
        const isSelected = value === option.value
        const isOptionDisabled = disabled || option.disabled

        return (
          <button
            key={option.value}
            ref={(element) => {
              optionRefs.current[index] = element
            }}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-disabled={isOptionDisabled}
            tabIndex={isSelected && !isOptionDisabled ? 0 : -1}
            disabled={isOptionDisabled}
            title={option.title}
            onClick={() => {
              if (!isOptionDisabled) {
                onChange(option.value)
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={buildClassName(
              'inline-flex items-center justify-center gap-1.5 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-primary-ring)]',
              SIZE_OPTION_CLASS[size],
              // Full width splits the row equally, so the width comes from the
              // row, not padding; tight side padding keeps labels on one line
              // on narrow screens.
              fullWidth ? 'min-w-0 flex-1 px-1.5' : '',
              isOptionDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              isSelected
                ? 'bg-white text-[var(--ui-primary)] dark:bg-gray-700 dark:text-blue-400 shadow-xs font-semibold'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
            )}
            data-testid={`segmented-option-${option.value}`}
          >
            {option.icon && (
              <span
                className={buildClassName(
                  'shrink-0 inline-flex items-center justify-center',
                  SIZE_ICON_CLASS[size],
                )}
              >
                {option.icon}
              </span>
            )}
            {/* A label never wraps; if there's truly no room it's cut off. */}
            <span className="min-w-0 truncate">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
})

SegmentedControlBase.displayName = 'SegmentedControl'

/**
 * Generic over the option values, so `onChange` gets the same union the
 * options use (e.g. `'percent' | 'amount'`) and can be passed a typed state
 * setter directly. forwardRef drops generics, hence the cast.
 */
export const SegmentedControl = SegmentedControlBase as (<T extends string = string>(
  props: SegmentedControlProps<T> & RefAttributes<HTMLDivElement>,
) => ReactElement | null) & { displayName?: string }
