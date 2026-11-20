import { buildClassName } from '../../utils/build-classname'
import type { InputSize } from './Input.types'

// Typed text is 16px below 768px: iOS Safari zooms the page into any field
// with smaller text when it's focused. From md the size steps down as designed.
export const sizeClasses: Record<
  InputSize,
  { input: string; group: string; icon: string; text: string }
> = {
  sm: {
    input: 'px-2.5 py-1.5 text-base md:text-xs leading-5',
    group: 'w-8 text-xs',
    icon: 'size-3.5',
    text: 'text-xs',
  },
  md: {
    input: 'px-3.5 py-2 text-base md:text-sm leading-6',
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

/**
 * A field's background, text and outline by state. Editable: the field colour. Disabled: sunken
 * and muted, dimmed but still readable. Read-only: muted, with the value at full strength, so it
 * reads as a value rather than an input while staying focusable and selectable.
 */
export function fieldStateClass({
  disabled = false,
  readOnly = false,
}: { disabled?: boolean; readOnly?: boolean } = {}) {
  if (disabled)
    return 'pointer-events-none bg-surface-sunken text-muted placeholder:text-muted outline-line-muted'
  if (readOnly) return 'bg-surface-muted text-fg placeholder:text-muted outline-line-muted'
  return 'bg-field text-fg placeholder:text-gray-400 outline-line'
}

/**
 * The classes of a text field's box: border, background, focus ring and the size's padding and
 * text. Shared by Input and the fields built like it (SelectBox, MobilePicker).
 */
export function buildInputClass(
  className?: string,
  {
    isFocusWithin = false,
    disabled = false,
    readOnly = false,
    hasError = false,
    size = 'md',
  }: {
    isFocusWithin?: boolean
    disabled?: boolean
    readOnly?: boolean
    hasError?: boolean
    size?: InputSize
  } = {},
) {
  const currentSize = sizeClasses[size] || sizeClasses.md

  return buildClassName(
    'transition-all duration-150',
    // A faint shadow lifts every field off the page the same way (Input, SelectBox, ...).
    'block w-full rounded-lg shadow-2xs',
    currentSize.input,
    'outline outline-1 -outline-offset-1',
    fieldStateClass({ disabled, readOnly }),
    hasError && '!outline-red-500 !ring-1 !ring-red-500/50 dark:!outline-red-500',
    isFocusWithin
      ? 'focus-within:outline-focus-ring focus-within:outline-2 focus-within:-outline-offset-2'
      : 'focus:outline-focus-ring focus:outline-2 focus:-outline-offset-2',
    className,
  )
}
