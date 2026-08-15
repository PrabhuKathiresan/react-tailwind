import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type { QuantityStepperProps } from './QuantityStepper.types'

const MinusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const BUTTON_SIZE_CLASS = {
  sm: 'size-7',
  md: 'size-9',
  lg: 'size-10',
}

const ICON_SIZE_CLASS = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-4.5',
}

const INPUT_TEXT_CLASS = {
  sm: 'w-12 text-xs py-1',
  md: 'w-16 text-sm py-1.5',
  lg: 'w-20 text-base py-2',
}

export const QuantityStepper = forwardRef<HTMLInputElement, QuantityStepperProps>((props, ref) => {
  const {
    value,
    onChange,
    min = 0,
    max = 99999,
    step = 1,
    label,
    size = 'md',
    prefix,
    suffix,
    disabled = false,
    className,
    onFocus,
    ...restProps
  } = props

  const handleDecrement = () => {
    if (disabled) return
    const next = Math.max(min, Number((value - step).toFixed(4)))
    onChange(next)
  }

  const handleIncrement = () => {
    if (disabled) return
    const next = Math.min(max, Number((value + step).toFixed(4)))
    onChange(next)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (raw === '') {
      onChange(0)
      return
    }
    const parsed = parseFloat(raw)
    if (!isNaN(parsed)) {
      onChange(Math.max(min, Math.min(max, parsed)))
    }
  }

  const isAtMin = disabled || value <= min
  const isAtMax = disabled || value >= max

  return (
    <div className={buildClassName('flex flex-col gap-1 inline-flex', className)}>
      {label && (
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div
        className={buildClassName(
          'inline-flex items-center rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800 shadow-xs focus-within:ring-2 focus-within:ring-[var(--ui-primary-ring)] focus-within:border-[var(--ui-primary)] transition-all',
          disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900' : '',
        )}
        data-testid="quantity-stepper"
      >
        <button
          type="button"
          disabled={isAtMin}
          onClick={handleDecrement}
          tabIndex={-1}
          aria-label="Decrease quantity"
          className={buildClassName(
            'flex items-center justify-center rounded-l-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 transition-colors',
            BUTTON_SIZE_CLASS[size],
            isAtMin ? 'opacity-30 hover:bg-transparent cursor-not-allowed' : 'cursor-pointer',
          )}
          data-testid="stepper-decrement"
        >
          <MinusIcon className={ICON_SIZE_CLASS[size]} />
        </button>

        {prefix && <span className="pl-1 text-gray-400 dark:text-gray-500">{prefix}</span>}

        <input
          ref={ref}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value === 0 ? '' : value}
          placeholder="0"
          disabled={disabled}
          onFocus={(e) => {
            e.target.select()
            onFocus?.(e)
          }}
          onChange={handleInputChange}
          className={buildClassName(
            'text-center font-semibold text-gray-900 dark:text-white bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            INPUT_TEXT_CLASS[size],
          )}
          data-testid="stepper-input"
          {...restProps}
        />

        {suffix && <span className="pr-1 text-xs text-gray-500 dark:text-gray-400">{suffix}</span>}

        <button
          type="button"
          disabled={isAtMax}
          onClick={handleIncrement}
          tabIndex={-1}
          aria-label="Increase quantity"
          className={buildClassName(
            'flex items-center justify-center rounded-r-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 transition-colors',
            BUTTON_SIZE_CLASS[size],
            isAtMax ? 'opacity-30 hover:bg-transparent cursor-not-allowed' : 'cursor-pointer',
          )}
          data-testid="stepper-increment"
        >
          <PlusIcon className={ICON_SIZE_CLASS[size]} />
        </button>
      </div>
    </div>
  )
})

QuantityStepper.displayName = 'QuantityStepper'
