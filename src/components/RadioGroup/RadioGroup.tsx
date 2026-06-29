import React, { useMemo } from 'react'
import { Radio } from '../Radio'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import { TextContent } from '../TextContent'
import { RadioGroupProps, RadionGroupItem } from './RadioGroup.types'

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const {
    name,
    label,
    labelClass,
    labelWrapperClass,
    labelHint,
    containerClass,
    options,
    value,
    row,
    error,
    showErrorMessage,
    onChange,
  } = props
  const items = useMemo(
    () =>
      options?.map((option) =>
        typeof option === 'string' ? { label: option, value: option } : option,
      ) ?? [],
    [options],
  )

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
          'flex gap-4',
          row ? 'flex-row items-center' : 'flex-col items-start',
        )}
      >
        {items.map((item) => (
          <Radio
            key={item.value}
            name={name}
            id={`${name}-${item.value}`}
            label={item.label}
            value={item.value}
            checked={value === item.value}
            onChange={onChange}
          />
        ))}
      </div>
      {showErrorMessage && error && (
        <div className="mt-1">
          <TextContent error small>
            {error}
          </TextContent>
        </div>
      )}
    </div>
  )
}
