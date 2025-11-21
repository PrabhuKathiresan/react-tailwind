import { forwardRef } from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import { isEmpty } from '../../utils/is-empty'
import { TextContent } from '../TextContent'
import { RangeInputProps } from './RangeInput.types'

// export interface RangeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
//   label?: string
//   labelClass?: string
//   labelHint?: React.ReactNode
//   containerClass?: string
//   showValue?: boolean
//   valueSuffix?: string
//   error?: string | null
//   showErrorMessage?: boolean
// }

export const RangeInput = forwardRef<HTMLInputElement, RangeInputProps>((props, ref) => {
  const {
    label,
    labelClass = '',
    labelHint = null,
    containerClass = '',
    className = '',
    showValue = true,
    valueSuffix = '',
    error = null,
    showErrorMessage = true,
    id,
    min = 0,
    max = 100,
    value,
    ...inputProps
  } = props

  const hasError = !isEmpty(error)

  return (
    <div className={buildClassName('group space-y-2', containerClass)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label htmlFor={id} className={labelClass}>
            {label}
          </Label>
          {labelHint}
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={ref}
          type="range"
          id={id}
          min={min}
          max={max}
          value={value}
          {...inputProps}
          className={buildClassName(
            'w-full h-2 rounded-lg appearance-none cursor-pointer',
            'bg-gray-200 dark:bg-gray-700',
            'accent-blue-600', // for WebKit
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-blue-600',
            '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4',
            '[&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:bg-blue-600',
            hasError && 'accent-red-600',
            className,
          )}
        />

        {showValue && (
          <span className="text-sm text-gray-600 dark:text-gray-300 min-w-[3rem] text-right">
            {value}
            {valueSuffix}
          </span>
        )}
      </div>

      {showErrorMessage && hasError && (
        <div className="mt-1">
          <TextContent error small>
            {error}
          </TextContent>
        </div>
      )}
    </div>
  )
})
