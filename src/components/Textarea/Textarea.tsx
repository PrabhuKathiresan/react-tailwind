import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { Label } from '../Label'
import { isEmpty } from '../../utils/is-empty'
import { buildClassName } from '../../utils/build-classname'
import { TextContent } from '../TextContent'
import type { TextareaProps, TextareaResize, TextareaSize } from './Textarea.types'

const sizeClasses: Record<TextareaSize, { textarea: string; text: string }> = {
  sm: {
    textarea: 'px-2.5 py-1.5 text-xs leading-5 min-h-[60px]',
    text: 'text-xs',
  },
  md: {
    textarea: 'px-3.5 py-2 text-sm leading-6 min-h-[80px]',
    text: 'text-sm',
  },
  lg: {
    textarea: 'px-4 py-2.5 text-base leading-7 min-h-[100px]',
    text: 'text-base',
  },
}

const resizeClasses: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    name,
    id = name,
    label = null,
    labelHint = null,
    className = '',
    labelClass = '',
    labelWrapperClass = '',
    containerClass = '',
    error,
    showErrorMessage = true,
    rightGroup = null,
    leftGroup = null,
    size = 'md',
    autoSize = false,
    showCount = false,
    helperText,
    resize = 'vertical',
    value,
    defaultValue,
    onChange,
    maxLength,
    required,
    'aria-describedby': ariaDescribedBy,
    ...inputProps
  } = props

  const innerRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement)

  const [uncontrolledValue, setUncontrolledValue] = useState<string>(String(defaultValue ?? ''))

  const isControlled = value !== undefined
  const currentVal = isControlled ? String(value ?? '') : uncontrolledValue
  const charLength = currentVal.length

  // Handle Auto-Resize behavior
  useEffect(() => {
    if (autoSize && innerRef.current) {
      innerRef.current.style.height = 'auto'
      innerRef.current.style.height = `${innerRef.current.scrollHeight}px`
    }
  }, [autoSize, currentVal])

  const handleTextareaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value)
      }
      onChange?.(e)
    },
    [isControlled, onChange],
  )

  const hasError = !isEmpty(error)
  const hasRightGroup = rightGroup != null && rightGroup !== undefined
  const hasLeftGroup = leftGroup != null && leftGroup !== undefined
  const currentSize = sizeClasses[size] || sizeClasses.md

  const errorId = id && hasError && showErrorMessage ? `${id}-error` : undefined
  const helperId = id && helperText && !hasError ? `${id}-helper` : undefined
  const describedBy = [ariaDescribedBy, errorId, helperId].filter(Boolean).join(' ') || undefined

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
      <div className="relative">
        {hasLeftGroup && (
          <span className="absolute top-2.5 left-3 flex items-center justify-center text-gray-400 dark:text-gray-500">
            {leftGroup}
          </span>
        )}
        <textarea
          ref={innerRef}
          autoComplete="off"
          {...inputProps}
          value={value}
          defaultValue={defaultValue}
          onChange={handleTextareaChange}
          maxLength={maxLength}
          name={name}
          id={id}
          required={required}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={describedBy}
          className={buildClassName(
            'transition-all duration-150',
            'block w-full rounded-lg bg-white',
            currentSize.textarea,
            autoSize ? 'resize-none overflow-hidden' : resizeClasses[resize],
            'text-gray-900 outline outline-1 -outline-offset-1',
            hasError
              ? '!outline-red-500 !ring-1 !ring-red-500/50 dark:!outline-red-500'
              : 'outline-[var(--ui-border)]',
            'focus:outline-[var(--ui-focus-ring)] focus:outline-2 focus:-outline-offset-2',
            'dark:bg-gray-700 dark:placeholder-gray-400 placeholder:text-gray-400 dark:text-white',
            'disabled:pointer-events-none disabled:bg-gray-100 disabled:outline-[var(--ui-border-muted)]',
            'dark:disabled:bg-gray-800 dark:disabled:text-gray-600 dark:disabled:placeholder-gray-600 dark:disabled:outline-[var(--ui-border-muted)]',
            hasRightGroup ? 'pe-10' : '',
            hasLeftGroup ? 'ps-10' : '',
            className,
          )}
        />
        {hasRightGroup && (
          <span className="absolute end-3 top-2.5 flex items-center justify-center text-gray-400 dark:text-gray-500">
            {rightGroup}
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

Textarea.displayName = 'Textarea'
