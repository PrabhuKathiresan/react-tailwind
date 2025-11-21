import { useEffect, useId, useState, type ChangeEvent } from 'react'
import { Checkbox } from '../Checkbox'
import { Label } from '../Label'
import { BodyText } from '../BodyText'
import { buildClassName } from '../../utils/build-classname'
import type { CheckboxGroupItem, CheckboxGroupProps } from './CheckboxGroup.types'

export const CheckboxGroup = <T,>(props: CheckboxGroupProps<T>) => {
  const {
    name,
    options,
    label,
    labelClass = '',
    labelWrapperClass = '',
    labelHint,
    containerClass = '',
    value = [],
    onChange,
    inline = false,
  } = props

  const [items, setItems] = useState<CheckboxGroupItem<T>[]>([])
  const groupId = useId() // unique per group

  /**
   * Normalize options (strings → {label, value})
   */
  useEffect(() => {
    const normalized = options.map((opt) =>
      typeof opt === 'string' ? ({ label: opt, value: opt } as CheckboxGroupItem<T>) : opt,
    )
    setItems(normalized)
  }, [options])

  /**
   * Group-level change handler. Converts raw checkbox change events
   * into a typed updated values array.
   */
  const handleGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const checked = e.target.checked

    // Convert HTML string value → typed T value
    // Locate in normalized items
    const matched = items.find((i) => String(i.value) === raw)
    const itemValue = matched?.value as T

    let updated: T[]

    if (checked) {
      updated = [...value, itemValue]
    } else {
      updated = value.filter((v) => v !== itemValue)
    }

    onChange?.(updated, e)
  }

  return (
    <div className={buildClassName('mb-3 space-y-3', containerClass)}>
      {label && (
        <div className={buildClassName('flex items-center justify-between', labelWrapperClass)}>
          <Label className={labelClass}>{label}</Label>
          <BodyText muted small>
            {labelHint}
          </BodyText>
        </div>
      )}

      <div className={buildClassName('flex gap-3', inline ? 'flex-wrap' : 'flex-col')}>
        {items.map((item, index) => {
          const key =
            typeof item.value === 'string' || typeof item.value === 'number' ? item.value : index

          return (
            <Checkbox
              key={key}
              name={name}
              id={`${groupId}-${String(item.value)}`}
              label={item.label}
              value={String(item.value)}
              checked={value.includes(item.value)}
              onChange={handleGroupChange}
            />
          )
        })}
      </div>
    </div>
  )
}

CheckboxGroup.displayName = 'CheckboxGroup'
