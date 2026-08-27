import { forwardRef, useId } from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import type { RadioProps, RadioSize, RadioTheme } from './Radio.types'
import { TextContent } from '../TextContent'

const SIZE_MAP: Record<RadioSize, string> = {
  sm: 'size-4',
  md: 'size-4.5',
  lg: 'size-5.5',
}

const THEME_MAP: Record<RadioTheme, string> = {
  primary:
    'checked:border-[var(--ui-primary)] checked:hover:border-[var(--ui-primary)] focus:ring-[var(--ui-primary-ring)]',
  success: 'checked:border-emerald-600 checked:hover:border-emerald-600 focus:ring-emerald-500',
  danger:
    'checked:border-[var(--ui-danger)] checked:hover:border-[var(--ui-danger)] focus:ring-[var(--ui-danger-ring)]',
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    id,
    name,
    label,
    description,
    size = 'md',
    theme = 'primary',
    labelClass = '',
    descriptionClass = '',
    wrapperClass = '',
    containerClass = '',
    error,
    disabled = false,
    className = '',
    required,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props

  const generatedId = useId()
  const radioId = id ?? (name && rest.value ? `${name}-${rest.value}` : generatedId)

  const hasError = Boolean(error)
  const errorId = radioId && hasError ? `${radioId}-error` : undefined
  const descId = radioId && description ? `${radioId}-desc` : undefined
  const describedBy = [ariaDescribedBy, errorId, descId].filter(Boolean).join(' ') || undefined

  return (
    <div className={buildClassName(wrapperClass)}>
      <div className={buildClassName('flex items-start gap-2.5', containerClass)}>
        <div className="grid place-items-center shrink-0 pt-0.5">
          <input
            ref={ref}
            {...rest}
            id={radioId}
            name={name}
            type="radio"
            disabled={disabled}
            required={required}
            aria-required={required ? true : undefined}
            aria-invalid={hasError ? true : undefined}
            aria-describedby={describedBy}
            aria-checked={rest.checked}
            className={buildClassName(
              'peer transition-all col-start-1 row-start-1 appearance-none shrink-0 rounded-full',
              'border focus:ring-2 focus:ring-offset-2',
              'checked:border-5 checked:bg-white',
              'dark:focus:ring-offset-gray-800',
              SIZE_MAP[size],
              THEME_MAP[theme],
              disabled
                ? 'border-[var(--ui-border-muted)] bg-gray-100 dark:bg-gray-800 pointer-events-none'
                : 'bg-white dark:bg-gray-700 border-[var(--ui-border)] hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer',
              className,
            )}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-0.5 min-w-0">
            {label && (
              <Label
                htmlFor={radioId}
                aria-required={required}
                className={buildClassName(
                  disabled
                    ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                    : 'cursor-pointer text-gray-700 dark:text-gray-200 font-medium',
                  labelClass,
                )}
              >
                {label}
              </Label>
            )}
            {description && (
              <p
                id={descId}
                className={buildClassName(
                  'text-xs leading-normal',
                  disabled
                    ? 'text-gray-300 dark:text-gray-600'
                    : 'text-gray-500 dark:text-gray-400',
                  descriptionClass,
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {error && (
        <div className="mt-1">
          <TextContent error small id={errorId}>
            {error}
          </TextContent>
        </div>
      )}
    </div>
  )
})

Radio.displayName = 'Radio'
