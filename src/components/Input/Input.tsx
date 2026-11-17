import {
  useCallback,
  forwardRef,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import type { InputProps, InputSize } from './Input.types'
import { buildInputClass, sizeClasses } from './input-class'
import { TextContent } from '../TextContent'

// A native date or time field is its own control, styled differently by each browser.
// Android Chrome puts a margin around the value, making the field taller than the text
// fields beside it and its text further in, and draws its own arrow. So these fix the
// height, rather than setting a minimum, and clear what surrounds the value.
const nativePickerClasses: Record<InputSize, string> = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
}
const NATIVE_PICKER_BASE =
  'relative appearance-none text-left [&::-webkit-date-and-time-value]:m-0 [&::-webkit-date-and-time-value]:w-full [&::-webkit-date-and-time-value]:p-0 [&::-webkit-date-and-time-value]:text-left'
// The browser's own icon is hidden but still opens the picker, under the calendar drawn here.
const CALENDAR_INDICATOR =
  '[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:end-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0'
const NATIVE_PICKER_TYPES = ['date', 'month', 'week', 'datetime-local', 'time']
const CALENDAR_TYPES = ['date', 'month', 'week', 'datetime-local']

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    name,
    id: idProp,
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
    endAdornment,
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
  // Without an id (or a name to use), the label still names the field.
  const generatedId = useId()
  const id = idProp ?? name ?? generatedId

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

  // An end adornment's width, so the text stops short of it.
  const adornmentRef = useRef<HTMLDivElement>(null)
  const [adornmentWidth, setAdornmentWidth] = useState(0)
  const hasAdornment = endAdornment != null && endAdornment !== false
  useLayoutEffect(() => {
    const element = adornmentRef.current
    if (!hasAdornment || !element) return
    const measure = () => setAdornmentWidth(element.offsetWidth)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [hasAdornment])

  const actualRightGroup = hasAdornment
    ? null
    : (rightGroup ??
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
      ) : null))

  const isNativePicker = NATIVE_PICKER_TYPES.includes(type ?? '')
  // Only when nothing else is there; Firefox always draws its own, so ours steps aside.
  const showCalendarIcon = CALENDAR_TYPES.includes(type ?? '') && !actualRightGroup

  const hasRightGroup =
    showCalendarIcon || (actualRightGroup !== null && actualRightGroup !== undefined)
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
            style={
              hasAdornment
                ? { ...inputProps.style, paddingInlineEnd: adornmentWidth + 8 }
                : inputProps.style
            }
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
              isNativePicker ? [NATIVE_PICKER_BASE, nativePickerClasses[size]].join(' ') : '',
              showCalendarIcon ? CALENDAR_INDICATOR : '',
            )}
          />

          {hasAdornment && (
            <div
              ref={adornmentRef}
              data-testid="input-end-adornment"
              className="absolute inset-y-0 end-0 flex items-center gap-1.5 pe-1"
            >
              <span aria-hidden="true" className="h-5 w-px bg-[var(--ui-border)]" />
              {endAdornment}
            </div>
          )}

          {hasRightGroup && (
            <span
              className={buildClassName(
                'absolute end-0 top-0 h-full flex items-center justify-center text-gray-400 dark:text-gray-500',
                currentSize.group,
                showCalendarIcon && 'pointer-events-none [@supports(-moz-appearance:none)]:hidden',
              )}
            >
              {showCalendarIcon ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  data-testid="input-calendar-icon"
                  className={currentSize.icon}
                >
                  <path d="M8 2v4M16 2v4M3 10h18" />
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                </svg>
              ) : (
                actualRightGroup
              )}
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
