import React, { forwardRef, useId } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { Label } from '../Label'
import { TextContent } from '../TextContent'
import type { QuantityStepperProps, QuantityStepperSize } from './QuantityStepper.types'

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

const CONTAINER_SIZE_CLASS: Record<QuantityStepperSize, string> = {
  sm: 'h-8 text-xs',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
}

const BUTTON_SIZE_CLASS: Record<QuantityStepperSize, string> = {
  sm: 'w-7.5 h-full',
  md: 'w-9.5 h-full',
  lg: 'w-11 h-full',
}

const ICON_SIZE_CLASS: Record<QuantityStepperSize, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-4.5',
}

const INPUT_TEXT_CLASS: Record<QuantityStepperSize, string> = {
  sm: 'w-12 text-xs',
  md: 'w-16 text-sm',
  lg: 'w-20 text-base',
}

export const QuantityStepper = forwardRef<HTMLInputElement, QuantityStepperProps>((props, ref) => {
  const {
    value,
    onChange,
    min = 0,
    max = 99999,
    step = 1,
    label,
    labelHint,
    helperText,
    error,
    showErrorMessage = true,
    size = 'md',
    prefix,
    suffix,
    disabled = false,
    className,
    onFocus,
    id: customId,
    ...restProps
  } = props

  const autoId = useId()
  const stepperId = customId || `stepper-${autoId}`
  const hasError = Boolean(error)

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
      {/* Label Header Row matching Input */}
      {label && (
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor={stepperId} className={disabled ? 'opacity-70 cursor-not-allowed' : ''}>
            {label}
          </Label>
          {labelHint && <TextContent xsmall>{labelHint}</TextContent>}
        </div>
      )}

      {/* Input Container Frame matching Input outline & focus ring */}
      <div
        className={buildClassName(
          'inline-flex items-center rounded-lg shadow-2xs transition-all duration-150',
          'outline outline-1 -outline-offset-1',
          CONTAINER_SIZE_CLASS[size],
          hasError
            ? '!outline-red-500 !ring-1 !ring-red-500/50 dark:!outline-red-500'
            : 'outline-[var(--ui-border)]',
          disabled
            ? 'pointer-events-none bg-gray-100 dark:bg-gray-800 outline-[var(--ui-border-muted)]'
            : 'bg-white dark:bg-gray-700',
          'focus-within:outline-[var(--ui-focus-ring)] focus-within:outline-2 focus-within:-outline-offset-2',
        )}
        data-testid="quantity-stepper"
      >
        {/* Decrement Button */}
        <button
          type="button"
          disabled={isAtMin}
          onClick={handleDecrement}
          tabIndex={-1}
          aria-label="Decrease quantity"
          className={buildClassName(
            'flex items-center justify-center rounded-l-lg text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors shrink-0',
            BUTTON_SIZE_CLASS[size],
            isAtMin
              ? 'opacity-30 hover:bg-transparent cursor-not-allowed'
              : 'cursor-pointer hover:bg-gray-100/80 dark:hover:bg-gray-600/60',
          )}
          data-testid="stepper-decrement"
        >
          <MinusIcon className={ICON_SIZE_CLASS[size]} />
        </button>

        {prefix && (
          <span className="pl-1 text-gray-400 dark:text-gray-400 select-none text-xs shrink-0">
            {prefix}
          </span>
        )}

        {/* Number Input */}
        <input
          ref={ref}
          id={stepperId}
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

        {suffix && (
          <span className="pr-1 text-gray-500 dark:text-gray-400 select-none text-xs shrink-0">
            {suffix}
          </span>
        )}

        {/* Increment Button */}
        <button
          type="button"
          disabled={isAtMax}
          onClick={handleIncrement}
          tabIndex={-1}
          aria-label="Increase quantity"
          className={buildClassName(
            'flex items-center justify-center rounded-r-lg text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors shrink-0',
            BUTTON_SIZE_CLASS[size],
            isAtMax
              ? 'opacity-30 hover:bg-transparent cursor-not-allowed'
              : 'cursor-pointer hover:bg-gray-100/80 dark:hover:bg-gray-600/60',
          )}
          data-testid="stepper-increment"
        >
          <PlusIcon className={ICON_SIZE_CLASS[size]} />
        </button>
      </div>

      {/* Footer Row matching Input error / helper text */}
      {(showErrorMessage && error) || helperText ? (
        <div className="flex items-center justify-between gap-2 mt-0.5">
          {showErrorMessage && error ? (
            <TextContent xsmall className="text-red-500 dark:text-red-400 font-medium">
              {error}
            </TextContent>
          ) : helperText ? (
            <TextContent xsmall muted>
              {helperText}
            </TextContent>
          ) : null}
        </div>
      ) : null}
    </div>
  )
})

QuantityStepper.displayName = 'QuantityStepper'
