import { forwardRef } from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import { InputProps } from './Input.types'
import { TextContent } from '../TextContent'

export function buildInputClass(
  className?: string,
  { isFocusWithin = false, disabled = false }: { isFocusWithin?: boolean; disabled?: boolean } = {},
) {
  return buildClassName(
    'transition-all',
    'block w-full rounded-lg bg-white px-3.5 py-2 text-base sm:text-sm/6',
    'text-gray-900 outline outline-1 -outline-offset-1',
    'outline-gray-300 dark:outline-gray-600',
    'invalid:group-[.has-error]:outline-red-500',
    disabled
      ? 'pointer-events-none bg-gray-100 dark:bg-gray-800 dark:text-gray-600 dark:placeholder-gray-600 placeholder-gray-400 outline-gray-200 dark:outline-gray-700'
      : 'bg-white dark:bg-gray-700 dark:text-white outline-gray-300 dark:outline-gray-600 dark:placeholder-gray-400 placeholder-gray-400',
    isFocusWithin
      ? 'focus-within:outline-[var(--ui-focus-ring)] focus-within:outline-2 focus-within:-outline-offset-2'
      : 'focus:outline-[var(--ui-focus-ring)] focus:outline-2 focus:-outline-offset-2',
    className,
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    name,
    id = name,
    type,
    label,
    labelHint,
    className,
    labelClass,
    labelWrapperClass,
    containerClass,
    error,
    showErrorMessage = true,
    rightGroup,
    leftGroup,
    ...inputProps
  } = props
  const hasError = Boolean(error)
  const hasRightGroup = rightGroup !== null && rightGroup !== undefined
  const hasLeftGroup = leftGroup != null && leftGroup !== undefined

  return (
    <div className={buildClassName('group', hasError && 'has-error', containerClass)}>
      {label && (
        <div
          className={buildClassName('flex items-center justify-between mb-2', labelWrapperClass)}
        >
          <Label className={labelClass} htmlFor={id}>
            {label}
          </Label>
          {labelHint}
        </div>
      )}
      <div className="relative">
        {hasLeftGroup && (
          <span className="absolute top-0 h-full flex items-center justify-center w-10">
            {leftGroup}
          </span>
        )}
        <input
          ref={ref}
          autoComplete="off"
          {...inputProps}
          name={name}
          id={id}
          type={type}
          className={buildClassName(
            buildInputClass(className, { disabled: inputProps.disabled }),
            hasRightGroup ? 'pe-10' : '',
            hasLeftGroup ? 'ps-10' : '',
          )}
        />
        {hasRightGroup && (
          <span className="absolute end-0.75 top-0 h-full flex items-center justify-center w-10">
            {rightGroup}
          </span>
        )}
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
})

Input.displayName = 'Input'
