import React, { forwardRef, type InputHTMLAttributes } from 'react'
import { Label } from '../Label'
import { type InputCustomProps } from '../common-type'
import { buildClassName } from '../../utils/build-classname';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement>, Omit<InputCustomProps, 'labelHint'> {
  /**
   * Type is constant 'checkbox'
   */
  type?: 'checkbox'
  /**
   * Input wrapper class
   */
  wrapperClass?: string;
}

export const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    type,
    name,
    id = name,
    wrapperClass = '',
    containerClass = '',
    label = null,
    labelClass = '',
    error = null,
    disabled = false,
    className = '',
    ...checkboxProps
  } = props

  return (
    <div className={buildClassName(wrapperClass)}>
      <div className={buildClassName('flex items-center', containerClass)}>
        <label className={buildClassName('inline-flex items-center relative', disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer')}>
          <input
            ref={ref}
            {...checkboxProps}
            id={id}
            name={name}
            type="checkbox"
            disabled={disabled}
            className={buildClassName(
              'peer size-4.5 cursor-pointer transition-all appearance-none rounded hover:shadow-md border border-gray-300 checked:bg-blue-600 checked:border-blue-600',
              'bg-gray-50 dark:bg-gray-700',
              'focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900'
            )}
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.25 w-3.25" viewBox="0 0 20 20" fill="currentColor"
              stroke="currentColor" strokeWidth="1">
              <path fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"></path>
            </svg>
          </span>
        </label>
        {label && (
          <Label htmlFor={id} className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ml-2 font-normal text-gray-600 ${labelClass}`}>
            {label}
          </Label>
        )}
      </div>
      {error && (
        <div className="mt-1 text-red-600 text-sm">{error}</div>
      )}
    </div>
  )
})
