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
 * The classes of a text field's box: border, background, focus ring and the size's padding and
 * text. Shared by Input and the fields built like it (SelectBox, MobilePicker).
 */
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
