import {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import type { InputProps, InputSize } from './Input.types'
import { TextContent } from '../TextContent'

const sizeClasses: Record<InputSize, { input: string; group: string; icon: string; text: string }> =
  {
    sm: {
      input: 'px-2.5 py-1.5 text-xs leading-5',
      group: 'w-8 text-xs',
      icon: 'size-3.5',
      text: 'text-xs',
    },
    md: {
      input: 'px-3.5 py-2 text-sm leading-6',
      group: 'w-10 text-sm',
      icon: 'size-4',
      text: 'text-sm',
    },
    lg: {
      input: 'px-4 py-2.5 text-base leading-7',
      group: 'w-12 text-base',
      icon: 'size-5',
      text: 'text-base',
    },
  }

export function buildInputClass(
  className?: string,
  {
    isFocusWithin = false,
    disabled = false,
    hasError = false,
    size = 'md',
  }: { isFocusWithin?: boolean; disabled?: boolean; hasError?: boolean; size?: InputSize } = {},
) {
  const currentSize = sizeClasses[size] || sizeClasses.md

  return buildClassName(
    'transition-all duration-150',
    'block w-full rounded-lg bg-white',
    currentSize.input,
    'text-gray-900 outline outline-1 -outline-offset-1',
    hasError
      ? '!outline-red-500 !ring-1 !ring-red-500/50 dark:!outline-red-500'
      : 'outline-[var(--ui-border)]',
    disabled
      ? 'pointer-events-none bg-gray-100 dark:bg-gray-800 dark:text-gray-600 dark:placeholder-gray-600 placeholder-gray-400 outline-[var(--ui-border-muted)]'
      : 'bg-white dark:bg-gray-700 dark:text-white outline-[var(--ui-border)] dark:placeholder-gray-400 placeholder-gray-400',
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
    prefix,
    suffix,
    clearable = false,
    onClear,
    showCount = false,
    helperText,
    size = 'md',
    value,
    defaultValue,
    onChange,
    maxLength,
    required,
    'aria-describedby': ariaDescribedBy,
    ...inputProps
  } = props

  const innerRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement)

  const [uncontrolledValue, setUncontrolledValue] = useState<string>(String(defaultValue ?? ''))

  const isControlled = value !== undefined
  const currentVal = isControlled ? String(value ?? '') : uncontrolledValue
  const charLength = currentVal.length

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value)
      }
      onChange?.(e)
    },
    [isControlled, onChange],
  )

  const handleClear = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.value = ''
      const event = new Event('input', {
        bubbles: true,
      }) as unknown as ChangeEvent<HTMLInputElement>
      Object.defineProperty(event, 'target', { writable: true, value: { value: '' } })
      if (!isControlled) {
        setUncontrolledValue('')
      }
      onChange?.(event)
    }
    onClear?.()
  }, [isControlled, onChange, onClear])

  const hasError = Boolean(error)
  const currentSize = sizeClasses[size] || sizeClasses.md

  const errorId = id && hasError && showErrorMessage ? `${id}-error` : undefined
  const helperId = id && helperText && !hasError ? `${id}-helper` : undefined
  const describedBy = [ariaDescribedBy, errorId, helperId].filter(Boolean).join(' ') || undefined

  const showClearButton = clearable && charLength > 0 && !inputProps.disabled

  const actualRightGroup =
    rightGroup ??
    (showClearButton ? (
      <button
        type="button"
        onClick={handleClear}
        className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        aria-label="Clear input text"
        title="Clear text"
        tabIndex={-1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={currentSize.icon}
        >
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    ) : null)

  const hasRightGroup = actualRightGroup !== null && actualRightGroup !== undefined
  const hasLeftGroup = leftGroup != null && leftGroup !== undefined

  return (
    <div className={buildClassName('group', hasError && 'has-error', containerClass)}>
      {label && (
        <div
          className={buildClassName('flex items-center justify-between mb-1.5', labelWrapperClass)}
        >
          <Label className={labelClass} htmlFor={id} aria-required={required}>
            {label}
          </Label>
          {labelHint && <TextContent xsmall>{labelHint}</TextContent>}
        </div>
      )}

      <div className="flex rounded-lg shadow-2xs">
        {/* Static Prefix Addon */}
        {prefix && (
          <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[var(--ui-border)] bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium shrink-0">
            {prefix}
          </span>
        )}

        <div className="relative flex-1 min-w-0">
          {hasLeftGroup && (
            <span
              className={buildClassName(
                'absolute top-0 h-full flex items-center justify-center text-gray-400 dark:text-gray-500',
                currentSize.group,
              )}
            >
              {leftGroup}
            </span>
          )}

          <input
            ref={innerRef}
            autoComplete="off"
            {...inputProps}
            value={value}
            defaultValue={defaultValue}
            onChange={handleInputChange}
            maxLength={maxLength}
            name={name}
            id={id}
            type={type}
            required={required}
            aria-invalid={hasError ? true : undefined}
            aria-describedby={describedBy}
            className={buildClassName(
              buildInputClass(className, {
                disabled: inputProps.disabled,
                hasError,
                size,
              }),
              prefix ? '!rounded-l-none' : '',
              suffix ? '!rounded-r-none' : '',
              hasRightGroup ? (size === 'lg' ? 'pe-12' : size === 'sm' ? 'pe-8' : 'pe-10') : '',
              hasLeftGroup ? (size === 'lg' ? 'ps-12' : size === 'sm' ? 'ps-8' : 'ps-10') : '',
            )}
          />

          {hasRightGroup && (
            <span
              className={buildClassName(
                'absolute end-0 top-0 h-full flex items-center justify-center text-gray-400 dark:text-gray-500',
                currentSize.group,
              )}
            >
              {actualRightGroup}
            </span>
          )}
        </div>

        {/* Static Suffix Addon */}
        {suffix && (
          <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-[var(--ui-border)] bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium shrink-0">
            {suffix}
          </span>
        )}
      </div>

      {/* Footer Row: Error / Helper Text & Live Character Count */}
      {(showErrorMessage && error) || helperText || showCount ? (
        <div className="mt-1.5 flex items-center justify-between gap-2 text-xs">
          <div className="min-w-0 flex-1">
            {showErrorMessage && error ? (
              <TextContent error small id={errorId}>
                {error}
              </TextContent>
            ) : helperText ? (
              <TextContent muted small id={helperId}>
                {helperText}
              </TextContent>
            ) : null}
          </div>

          {showCount && (
            <span
              className={buildClassName(
                'text-[11px] font-medium shrink-0 ml-auto',
                maxLength && charLength >= maxLength
                  ? 'text-red-500 font-semibold'
                  : 'text-gray-400 dark:text-gray-500',
              )}
            >
              {charLength}
              {maxLength ? ` / ${maxLength}` : ''}
            </span>
          )}
        </div>
      ) : null}
    </div>
  )
})

Input.displayName = 'Input'
