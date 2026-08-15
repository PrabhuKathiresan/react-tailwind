import { forwardRef, useEffect, useId, useRef, useImperativeHandle } from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import type { CheckboxProps, CheckboxSize, CheckboxVariant } from './Checkbox.types'
import { TextContent } from '../TextContent'

const sizeStyles: Record<
  CheckboxSize,
  { box: string; svg: string; text: string; subtext: string }
> = {
  sm: {
    box: 'size-3.5',
    svg: 'h-2.5 w-2.5',
    text: 'text-xs',
    subtext: 'text-[11px]',
  },
  md: {
    box: 'size-4.5',
    svg: 'h-3.25 w-3.25',
    text: 'text-sm',
    subtext: 'text-xs',
  },
  lg: {
    box: 'size-5.5',
    svg: 'h-4 w-4',
    text: 'text-base',
    subtext: 'text-sm',
  },
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    id,
    name,
    label,
    labelClass = '',
    wrapperClass = '',
    containerClass = '',
    error,
    helperText,
    disabled = false,
    indeterminate = false,
    size = 'md',
    variant = 'default',
    description,
    className = '',
    checked,
    onChange,
    ...rest
  } = props

  const generatedId = useId()
  const checkboxId = id ?? name ?? generatedId

  const innerRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = Boolean(indeterminate)
    }
  }, [indeterminate])

  const currentSize = sizeStyles[size] || sizeStyles.md
  const isCard = variant === 'card'

  return (
    <div className={buildClassName(wrapperClass)}>
      <div
        className={buildClassName(
          isCard
            ? 'rounded-xl border p-3.5 transition-all duration-150 relative'
            : 'flex items-start',
          isCard &&
            (disabled
              ? 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 opacity-70'
              : checked || indeterminate
                ? 'border-blue-500/80 bg-blue-50/30 dark:bg-blue-950/20 dark:border-blue-500/60 shadow-xs'
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 shadow-2xs'),
          containerClass,
        )}
      >
        <label
          htmlFor={checkboxId}
          className={buildClassName(
            'inline-flex items-start relative select-none w-full',
            disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
          )}
        >
          {/* Custom Checkbox Input Container */}
          <div className="relative inline-flex items-center shrink-0 pt-0.5">
            <input
              ref={innerRef}
              {...rest}
              id={checkboxId}
              name={name}
              type="checkbox"
              disabled={disabled}
              checked={checked}
              onChange={onChange}
              aria-checked={indeterminate ? 'mixed' : checked}
              className={buildClassName(
                'peer cursor-pointer transition-all appearance-none rounded',
                currentSize.box,
                'border focus:ring-2 focus:ring-offset-2',
                'checked:bg-blue-600 checked:border-blue-600 dark:checked:bg-blue-600 dark:checked:border-blue-600',
                'focus:ring-[var(--ui-focus-ring)] dark:focus:ring-offset-gray-900',
                disabled
                  ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 pointer-events-none'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-xs',
                indeterminate &&
                  '!bg-blue-600 !border-blue-600 dark:!bg-blue-600 dark:!border-blue-600',
                className,
              )}
            />

            {/* Checkmark SVG Icon — Rendered only when NOT indeterminate */}
            {!indeterminate && (
              <span
                className={buildClassName(
                  'absolute text-white pointer-events-none transition-opacity top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                  checked !== undefined
                    ? checked
                      ? 'opacity-100'
                      : 'opacity-0'
                    : 'opacity-0 peer-checked:opacity-100',
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={currentSize.svg}
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
            )}

            {/* Indeterminate Minus SVG Icon — Rendered only when indeterminate */}
            {indeterminate && (
              <span className="absolute text-white pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={currentSize.svg}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>

          {/* Label & Description Column */}
          {(label || description) && (
            <div className="ml-2.5 flex flex-col justify-center min-w-0 flex-1">
              {label && (
                <Label
                  htmlFor={checkboxId}
                  className={buildClassName(
                    disabled
                      ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                      : 'cursor-pointer text-gray-800 dark:text-gray-200 font-medium',
                    currentSize.text,
                    labelClass,
                  )}
                >
                  {label}
                </Label>
              )}

              {description && (
                <span
                  className={buildClassName(
                    'mt-0.5 text-gray-500 dark:text-gray-400 font-normal leading-normal',
                    currentSize.subtext,
                  )}
                >
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
      </div>

      {/* Helper text or error message */}
      {(error || helperText) && (
        <div className="mt-1.5 ml-0.5">
          {error ? (
            <TextContent error small>
              {error}
            </TextContent>
          ) : (
            <TextContent muted small>
              {helperText}
            </TextContent>
          )}
        </div>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'
