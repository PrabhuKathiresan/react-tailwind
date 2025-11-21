import React, { type ChangeEvent, type InputHTMLAttributes } from 'react'
import { type InputCustomProps } from '../common-type'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import { Input } from '../Input'

export type RangeValue = {
  min: any
  max: any
}

export interface RangeInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>,
    InputCustomProps {
  value?: RangeValue
}

export const RangeInput: React.FC<RangeInputProps> = (props) => {
  const {
    name,
    id = name,
    label = null,
    labelClass = '',
    labelWrapperClass = '',
    labelHint = null,
    containerClass = '',
    min = 0,
    max = 0,
    value,
    onChange,
    ...rangeProps
  } = props

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: _value = '0', name: _name } = e.target
    let changedValue = parseInt(_value)
    let nextValue = {
      ...props.value,
      [_name]: changedValue,
    }
    if (e.target.name === 'max' && value?.min && changedValue < parseInt(value.min || '0')) {
      nextValue[_name as keyof RangeValue] = parseInt(value.min)
    }

    if (e.target.name === 'min' && value?.max && changedValue > parseInt(value.max || '0')) {
      nextValue[_name as keyof RangeValue] = parseInt(value.max)
    }

    onChange &&
      onChange({
        target: {
          name,
          value: nextValue,
        },
      } as ChangeEvent<HTMLInputElement>)
  }

  return (
    <div className={buildClassName('mb-3 relative', containerClass)}>
      {label && (
        <div
          className={buildClassName('flex items-center justify-between mb-4', labelWrapperClass)}
        >
          <Label className={labelClass} htmlFor={id}>
            {label}
          </Label>
          {labelHint}
        </div>
      )}
      <div className="flex w-full gap-4 items-center">
        <Input
          {...rangeProps}
          id={id}
          name="min"
          type="number"
          min={min}
          max={value?.max}
          value={value?.min || ''}
          className="appearance-none"
          containerClass="flex-1 shrink-0 mb-0"
          placeholder="Min"
          onChange={handleRangeChange}
        />
        <span>to</span>
        <Input
          {...rangeProps}
          id={id}
          name="max"
          type="number"
          min={value?.min}
          max={max}
          value={value?.max || ''}
          className="appearance-none"
          containerClass="flex-1 shrink-0 mb-0"
          placeholder="Max"
          onChange={handleRangeChange}
          disabled={!value?.min}
        />
      </div>
      {/* {min && <span className="text-xs text-gray-500 absolute top-[78%] -left-[15px]">Rs.{min}</span>}
      {max && <span className="text-xs text-gray-500 absolute top-[78%] -right-[15px]">Rs. {max}</span>} */}
    </div>
  )
}
