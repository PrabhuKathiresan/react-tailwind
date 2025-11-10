import React, { useEffect, useState, type ChangeEvent, type ReactNode } from 'react'
import { RadioButton } from '../RadioButton'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'

type RadionButtonGroupItem = {
  label: string
  value: any
}

export interface RadioButtonGroupProps {
  name: string
  label?: ReactNode
  labelClass?: string
  labelWrapperClass?: string
  labelHint?: ReactNode
  containerClass?: string
  value?: any
  options: string[] | RadionButtonGroupItem[]
  row?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = (props) => {
  const {
    name,
    label = null,
    labelClass = '',
    labelWrapperClass = '',
    labelHint = null,
    containerClass = '',
    options,
    value,
    row,
    onChange,
  } = props
  const [items, setItems] = useState<RadionButtonGroupItem[]>([])

  useEffect(() => {
    setItems(() => {
      return options?.map((option) => {
        if (typeof option === 'string') {
          return { label: option, value: option }
        }
        return option
      })
    })
  }, [options])

  return (
    <div className={buildClassName(containerClass)}>
      {label && (
        <div
          className={buildClassName('flex items-center justify-between mb-4', labelWrapperClass)}
        >
          <Label className={labelClass}>{label}</Label>
          {labelHint}
        </div>
      )}
      <div
        className={buildClassName(
          'flex gap-2',
          row ? 'flex-row items-center' : 'flex-col items-start',
        )}
      >
        {items.map((item) => (
          <RadioButton
            key={item.value}
            name={name}
            id={item.value}
            label={item.label}
            value={item.value}
            checked={value === item.value}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}
