import React, { useEffect, useState, type ChangeEvent, type ReactNode } from 'react'
import { Checkbox } from '../Checkbox'
import { Label } from '../Label';
import { buildClassName } from '../../utils/build-classname';
import { BodyText } from '../BodyText';

export type CheckboxGroupItem = {
  /**
   * Checkbox item label
   */
  label: string,
  /**
   * Checkbox item value
   */
  value: any,
}

export interface CheckboxGroupProps {
  /**
   * Group name
   */
  name?: string,
  /**
   * Selected value
   */
  value?: any;
  /**
   * Label of checkbox group field
   */
  label?: ReactNode;
  /**
   * Label class for checkbox group field
   */
  labelClass?: string;
  /**
   * Label wrapper class for checkbox group field
   */
  labelWrapperClass?: string;
  /**
   * Group field hint
   */
  labelHint?: ReactNode;
  /**
   * Group field container
   */
  containerClass?: string;
  /**
   * On change handler
   * @param e ChangeEvent<HTMLInputElement>
   * @returns void
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /**
   * List of checkbox field option
   */
  options: string[] | CheckboxGroupItem[];

  /**
   * Defines whether to list the checkbox inline
   */
  inline?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const {
    name,
    options,
    label = null,
    labelClass = '',
    labelWrapperClass = '',
    labelHint = null,
    containerClass = '',
    value = [],
    onChange,
    inline
  } = props
  const [items, setItems] = useState<CheckboxGroupItem[]>([])

  useEffect(() => {
    setItems(() => options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option }
      }
      return option
    }))
  }, [options])

  return (
    <div className={buildClassName('mb-3 space-y-3', containerClass)}>
      {
        label && (
          <div className={buildClassName('flex items-center justify-between', labelWrapperClass)}>
            <Label className={labelClass}>{label}</Label>
            <BodyText muted small>{labelHint}</BodyText>
          </div>
        )
      }
      <div className={buildClassName('flex gap-3', inline ? 'flex-wrap' : 'flex-col')}>
        {
          items.map((item) => (
            <Checkbox
              key={item.value}
              label={item.label}
              value={item.value}
              checked={value.includes(item.value)}
              name={name}
              id={item.value}
              onChange={onChange}
            />
          ))
        }
      </div>
    </div>
  )
}
