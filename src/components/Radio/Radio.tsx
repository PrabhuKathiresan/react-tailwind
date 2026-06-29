import { forwardRef, useId } from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import { RadioProps } from './Radio.types'
import { TextContent } from '../TextContent'

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
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
    // RadioButton-only props removed from rest
    ...rest
  } = props

  const generatedId = useId()
  const radioId = id ?? name ?? generatedId

  return (
    <div className={buildClassName(wrapperClass)}>
      <div className={buildClassName('flex items-center gap-2', containerClass)}>
        <div className="grid place-items-center">
          <input
            ref={ref}
            {...rest}
            id={radioId}
            name={name}
            type="radio"
            disabled={disabled}
            aria-checked={rest.checked}
            className={buildClassName(
              'peer transition-all col-start-1 row-start-1 appearance-none shrink-0 size-4.5 rounded-full',
              'border focus:ring-2 focus:ring-offset-2',
              'checked:border-5 checked:bg-white',
              'focus:ring-blue-500 checked:focus:ring-blue-600 dark:focus:ring-offset-gray-800',
              disabled
                ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 pointer-events-none'
                : buildClassName(
                    'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
                    'checked:border-blue-600 checked:hover:border-blue-600 dark:checked:border-blue-600 dark:checked:hover:border-blue-600',
                  ),
              className,
            )}
          />
        </div>
        {label && (
          <Label
            htmlFor={radioId}
            className={buildClassName(
              disabled
                ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                : 'cursor-pointer text-gray-600 dark:text-gray-300',
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
