import { forwardRef } from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import type { CheckboxProps } from './Checkbox.types'
import { TextContent } from '../TextContent'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    id,
    name,
    label,
    labelClass = '',
    wrapperClass = '',
    containerClass = '',
    error,
    disabled = false,
    className = '',
    // Checkbox-only props removed from rest
    ...rest
  } = props

  const checkboxId = id ?? name ?? 'checkbox-' + Math.random()

  return (
    <div className={buildClassName(wrapperClass)}>
      <div className={buildClassName('flex items-center', containerClass)}>
        <label
          htmlFor={checkboxId}
          className={buildClassName(
            'inline-flex items-center relative select-none',
            disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
          )}
        >
          <input
            ref={ref}
            {...rest}
            id={checkboxId}
            name={name}
            type="checkbox"
            disabled={disabled}
            aria-checked={rest.checked}
            className={buildClassName(
              'peer size-4.5 cursor-pointer transition-all appearance-none rounded',
              'border focus:ring-2 focus:ring-offset-2',
              'checked:bg-blue-600 checked:border-blue-600',
              'focus:ring-blue-500 dark:focus:ring-offset-gray-900',
              disabled
                ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 pointer-events-none'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md',
              className,
            )}
          />

          <span
            className="absolute text-white opacity-0 peer-checked:opacity-100 
              top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.25 w-3.25"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>

        {label && (
          <Label
            htmlFor={checkboxId}
            className={buildClassName(
              disabled
                ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                : 'cursor-pointer text-gray-600 dark:text-gray-300',
              'ml-2 font-normal',
              labelClass,
            )}
          >
            {label}
          </Label>
        )}
      </div>

      {error && (
        <div className="mt-1">
          <TextContent error small>
            {error}
          </TextContent>
        </div>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'
