import React, { forwardRef } from 'react'
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

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>((props, ref) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const enabledOptions = options.filter((opt) => !opt.disabled && !disabled)
    if (enabledOptions.length === 0) return

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const currentPos = enabledOptions.findIndex(
        (opt) => opt.value === options[currentIndex].value,
      )
      const nextPos = (currentPos + 1) % enabledOptions.length
      onChange(enabledOptions[nextPos].value)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const currentPos = enabledOptions.findIndex(
        (opt) => opt.value === options[currentIndex].value,
      )
      const prevPos = (currentPos - 1 + enabledOptions.length) % enabledOptions.length
      onChange(enabledOptions[prevPos].value)
    } else if (e.key === 'Home') {
      e.preventDefault()
      onChange(enabledOptions[0].value)
    } else if (e.key === 'End') {
      e.preventDefault()
      onChange(enabledOptions[enabledOptions.length - 1].value)
    }
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
              fullWidth ? 'flex-1' : '',
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
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
})

SegmentedControl.displayName = 'SegmentedControl'
