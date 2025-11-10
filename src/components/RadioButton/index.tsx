import React, { forwardRef, type InputHTMLAttributes } from 'react'
import { Label } from '../Label'
import { type InputCustomProps } from '../common-type'
import { buildClassName } from '../../utils/build-classname';

export interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement>, InputCustomProps {
  type?: 'radio'
  wrapperClass?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
  const {
    type = 'radio',
    name,
    id = name,
    wrapperClass = '',
    containerClass = '',
    label = null,
    labelClass = '',
    labelHint = null,
    error = null,
    ...radioProps
  } = props

  return (
    <div className={buildClassName(wrapperClass)}>
      <div className={buildClassName('flex items-center gap-2', containerClass)}>
        <div className="grid place-items-center">
          <input
            ref={ref}
            {...radioProps}
            type="radio"
            id={id}
            name={name}
            className="peer transition-all col-start-1 row-start-1 appearance-none shrink-0 size-4.5 border-1 border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 checked:border-5 checked:border-blue-600 rounded-full bg-white"
          />
        </div>
        {label && (
          <Label htmlFor={id} className={buildClassName('cursor-pointer font-normal text-gray-600', labelClass)}>{label}</Label>
        )}
      </div>
      {error && (
        <div className="mt-1 text-red-600 text-sm">{error}</div>
      )}
    </div>
  )
})
