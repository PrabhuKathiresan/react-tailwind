import React, { useId, useMemo } from 'react'
import { Radio } from '../Radio'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import { TextContent } from '../TextContent'
import type { RadioGroupProps } from './RadioGroup.types'

const COLUMN_GRID_MAP: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-4',
}

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    name,
    variant = 'default',
    size = 'md',
    theme = 'primary',
    label,
    labelClass,
    labelWrapperClass,
    labelHint,
    containerClass,
    options,
    value,
    columns,
    disabled = false,
    row,
    error,
    showErrorMessage = true,
    onChange,
    required,
    'aria-describedby': ariaDescribedBy,
  } = props

  const groupId = useId()

  const items = useMemo(
    () =>
      options?.map((option) =>
        typeof option === 'string'
          ? {
              label: option,
              value: option,
              description: undefined,
              icon: undefined,
              disabled: undefined,
            }
          : option,
      ) ?? [],
    [options],
  )

  const isCards = variant === 'cards'
  const hasError = Boolean(error)
  const labelId = label ? `${groupId}-label` : undefined
  const errorId = groupId && hasError && showErrorMessage ? `${groupId}-error` : undefined
  const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      className={buildClassName(containerClass)}
    >
      {label && (
        <div
          className={buildClassName('flex items-center justify-between mb-3', labelWrapperClass)}
        >
          <Label id={labelId} className={labelClass} aria-required={required}>
            {label}
          </Label>
          {labelHint}
        </div>
      )}

      <div
        className={buildClassName(
          columns
            ? buildClassName('grid gap-3', COLUMN_GRID_MAP[columns])
            : row || isCards
              ? 'flex flex-wrap gap-3'
              : 'flex flex-col gap-3',
        )}
      >
        {items.map((item) => {
          const isSelected = value === item.value
          const isItemDisabled = disabled || Boolean(item.disabled)

          if (isCards) {
            return (
              <label
                key={item.value}
                htmlFor={`${name}-${item.value}`}
                className={buildClassName(
                  'relative flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer select-none min-w-[200px] flex-1',
                  isSelected
                    ? 'border-[var(--ui-primary)] bg-blue-50/40 dark:bg-blue-950/30 ring-2 ring-[var(--ui-primary-ring)]/30'
                    : 'border-[var(--ui-border)] bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600',
                  isItemDisabled &&
                    'opacity-50 cursor-not-allowed pointer-events-none bg-gray-50 dark:bg-gray-800/50',
                )}
              >
                <Radio
                  name={name}
                  id={`${name}-${item.value}`}
                  value={item.value}
                  aria-label={item.label}
                  size={size}
                  theme={theme}
                  checked={isSelected}
                  disabled={isItemDisabled}
                  onChange={onChange}
                  containerClass="pt-0.5"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {item.icon && (
                      <span className="shrink-0 text-gray-500 dark:text-gray-400">{item.icon}</span>
                    )}
                    <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {item.label}
                    </span>
                  </div>
                  {item.description && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </label>
            )
          }

          return (
            <Radio
              key={item.value}
              name={name}
              id={`${name}-${item.value}`}
              label={item.label}
              description={item.description}
              value={item.value}
              size={size}
              theme={theme}
              checked={isSelected}
              disabled={isItemDisabled}
              onChange={onChange}
            />
          )
        })}
      </div>

      {showErrorMessage && error && (
        <div className="mt-1.5">
          <TextContent error small id={errorId}>
            {error}
          </TextContent>
        </div>
      )}
    </div>
  )
}

RadioGroup.displayName = 'RadioGroup'
