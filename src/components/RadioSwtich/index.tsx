import React from 'react'
import { Radio, RadioGroup, type RadioGroupProps } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname';

export type RadioSwitchItem = string | { label: string; value: string, description?: string }

export type RadioSwitchProps = RadioGroupProps & {
  label?: string;
  selected: string;
  onChange: (value: string) => void;
  items: RadioSwitchItem[];
}

export const RadioSwitch: React.FC<RadioSwitchProps> = ({
  label,
  items,
  selected,
  onChange
}) => {

  const getLabel = (item: RadioSwitchItem) => {
    return typeof item === 'string' ? item : item.label;
  }

  const getValue = (item: RadioSwitchItem) => {
    return typeof item === 'string' ? item : item.value;
  }

  const getDescription = (item: RadioSwitchItem) => {
    return typeof item === 'string' ? '' : item.description || '';
  }

  return (
    <RadioGroup value={selected} onChange={onChange} aria-label={label} className="flex items-center bg-white rounded-full shadow-xs p-1 dark:bg-gray-800 gap-1 border border-gray-200 dark:border-gray-700">
      {items.map((item) => (
        <Radio
          key={getValue(item)}
          value={getValue(item)}
          className={
            buildClassName(
              'group relative flex cursor-pointer transition',
              'text-gray-500 dark:text-gray-300',
              'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white',
            )
          }
        >
          <div
            className={
              buildClassName(
                'dark:text-white justify-between px-3 py-1 transition',
                'group-data-checked:bg-blue-600 group-data-checked:text-white rounded-full'
              )
            }
          >
            <div className="text-sm/6">
              <p className="font-semibold dark:text-white">{getLabel(item)}</p>
              {
                (item as any).description && (
                  <div className="flex gap-2 text-white/50">
                    {getDescription(item)}
                  </div>
                )
              }
            </div>
          </div>
        </Radio>
      ))}
    </RadioGroup>
  )
}
