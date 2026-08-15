import { useId, useMemo, useState, type ChangeEvent } from 'react'
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
  } = props

  const groupId = useId()
  const [internalValue, setInternalValue] = useState<T[]>(defaultValue || [])

  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

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

  // Select All State calculation
  const allSelected = useMemo(() => {
    if (!enabledItems.length) return false
    return enabledItems.every((item) => currentValue.includes(item.value))
  }, [enabledItems, currentValue])

  const isIndeterminate = useMemo(() => {
    if (allSelected) return false
    return enabledItems.some((item) => currentValue.includes(item.value))
  }, [allSelected, enabledItems, currentValue])

  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  }

  const handleGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  }

  const layoutClass = columns
    ? columnClasses[columns]
    : inline
      ? 'flex flex-wrap gap-3'
      : 'flex flex-col gap-3'

  return (
    <div className={buildClassName('mb-3 space-y-3', containerClass)}>
      {label && (
        <div className={buildClassName('flex items-center justify-between', labelWrapperClass)}>
          <Label className={labelClass}>{label}</Label>
          {labelHint && (
            <BodyText muted small>
              {labelHint}
            </BodyText>
          )}
        </div>
      )}

      {/* Select All Checkbox Header */}
      {showSelectAll && items.length > 0 && (
        <div className="pb-1 border-b border-gray-200 dark:border-gray-800">
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
              checked={currentValue.includes(item.value)}
              onChange={handleGroupChange}
            />
          )
        })}
      </div>

      {/* Group-level Error or Helper Text */}
      {(error || helperText) && (
        <div className="mt-1.5 ml-0.5">
          {error ? (
            <TextContent error small>
              {error}
            </TextContent>
          ) : (
            <TextContent muted small>
              {helperText}
            </TextContent>
          )}
        </div>
      )}
    </div>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'
