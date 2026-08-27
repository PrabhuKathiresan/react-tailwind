import { useCallback, useId, useMemo, useState, type ChangeEvent } from 'react'
import { Checkbox } from '../Checkbox'
import { Label } from '../Label'
import { BodyText } from '../BodyText'
import { TextContent } from '../TextContent'
import { buildClassName } from '../../utils/build-classname'
import type { CheckboxGroupItem, CheckboxGroupProps } from './CheckboxGroup.types'

const columnClasses: Record<number, string> = {
  1: 'grid grid-cols-1 gap-3',
  2: 'grid grid-cols-1 sm:grid-cols-2 gap-3',
  3: 'grid grid-cols-1 sm:grid-cols-3 gap-3',
  4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3',
}

export const CheckboxGroup = <T,>(props: CheckboxGroupProps<T>) => {
  const {
    name,
    options,
    label,
    labelClass = '',
    labelWrapperClass = '',
    labelHint,
    containerClass = '',
    value: controlledValue,
    defaultValue,
    onChange,
    inline = false,
    columns,
    size = 'md',
    variant = 'default',
    showSelectAll = false,
    selectAllLabel = 'Select All',
    error,
    helperText,
    disabled = false,
    required,
    'aria-describedby': ariaDescribedBy,
  } = props

  const groupId = useId()
  const [internalValue, setInternalValue] = useState<T[]>(defaultValue || [])

  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue || [] : internalValue

  const items = useMemo(
    () =>
      options.map((opt) =>
        typeof opt === 'string' ? ({ label: opt, value: opt } as CheckboxGroupItem<T>) : opt,
      ),
    [options],
  )

  const enabledItems = useMemo(
    () => items.filter((i) => !i.disabled && !disabled),
    [items, disabled],
  )

  const currentValueKeySet = useMemo(() => new Set(currentValue), [currentValue])

  // Select All State calculation
  const allSelected = useMemo(() => {
    if (!enabledItems.length) return false
    return enabledItems.every((item) => currentValueKeySet.has(item.value))
  }, [enabledItems, currentValueKeySet])

  const isIndeterminate = useMemo(() => {
    if (allSelected) return false
    return enabledItems.some((item) => currentValueKeySet.has(item.value))
  }, [allSelected, enabledItems, currentValueKeySet])

  const handleSelectAllChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let updated: T[]
      if (allSelected || isIndeterminate) {
        const enabledValues = new Set(enabledItems.map((i) => i.value))
        updated = currentValue.filter((v) => !enabledValues.has(v))
      } else {
        const enabledValues = enabledItems.map((i) => i.value)
        const uniqueSet = new Set([...currentValue, ...enabledValues])
        updated = Array.from(uniqueSet)
      }

      if (!isControlled) {
        setInternalValue(updated)
      }
      onChange?.(updated, e)
    },
    [allSelected, isIndeterminate, enabledItems, currentValue, isControlled, onChange],
  )

  const handleGroupChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      const checked = e.target.checked

      const matched = items.find((i) => String(i.value) === raw)
      const itemValue = matched ? matched.value : (raw as unknown as T)

      let updated: T[]
      if (checked) {
        updated = [...currentValue, itemValue]
      } else {
        updated = currentValue.filter((v) => v !== itemValue)
      }

      if (!isControlled) {
        setInternalValue(updated)
      }
      onChange?.(updated, e)
    },
    [items, currentValue, isControlled, onChange],
  )

  const hasError = Boolean(error)
  const labelId = label ? `${groupId}-label` : undefined
  const errorId = groupId && hasError ? `${groupId}-error` : undefined
  const helperId = groupId && helperText && !hasError ? `${groupId}-helper` : undefined
  const describedBy = [ariaDescribedBy, errorId, helperId].filter(Boolean).join(' ') || undefined

  const layoutClass = columns
    ? columnClasses[columns]
    : inline
      ? 'flex flex-wrap gap-3'
      : 'flex flex-col gap-3'

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      aria-describedby={describedBy}
      className={buildClassName('mb-3 space-y-3', containerClass)}
    >
      {label && (
        <div className={buildClassName('flex items-center justify-between', labelWrapperClass)}>
          <Label id={labelId} className={labelClass} aria-required={required}>
            {label}
          </Label>
          {labelHint && (
            <BodyText muted small>
              {labelHint}
            </BodyText>
          )}
        </div>
      )}

      {/* Select All Checkbox Header */}
      {showSelectAll && items.length > 0 && (
        <div className="pb-1 border-b border-[var(--ui-border)]">
          <Checkbox
            id={`${groupId}-select-all`}
            label={selectAllLabel}
            size={size}
            variant={variant}
            checked={allSelected}
            indeterminate={isIndeterminate}
            disabled={disabled || enabledItems.length === 0}
            onChange={handleSelectAllChange}
          />
        </div>
      )}

      {/* Group Items Layout */}
      <div className={layoutClass}>
        {items.map((item, index) => {
          const key =
            typeof item.value === 'string' || typeof item.value === 'number' ? item.value : index

          return (
            <Checkbox
              key={key}
              name={name}
              id={`${groupId}-${String(item.value)}`}
              label={item.label}
              description={item.description}
              value={String(item.value)}
              size={size}
              variant={variant}
              disabled={disabled || item.disabled}
              checked={currentValueKeySet.has(item.value)}
              onChange={handleGroupChange}
            />
          )
        })}
      </div>

      {/* Group-level Error or Helper Text */}
      {(error || helperText) && (
        <div className="mt-1.5 ml-0.5">
          {error ? (
            <TextContent error small id={errorId}>
              {error}
            </TextContent>
          ) : (
            <TextContent muted small id={helperId}>
              {helperText}
            </TextContent>
          )}
        </div>
      )}
    </div>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'
