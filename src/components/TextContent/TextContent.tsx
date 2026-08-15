import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type { TextContentProps, TextContentSize, TextContentWeight } from './TextContent.types'

const sizeClassMap: Record<TextContentSize, string> = {
  xs: 'text-xs/5',
  sm: 'text-sm/6',
  md: 'text-base/7',
  lg: 'text-lg/8',
  xl: 'text-xl/9',
}

const weightClassMap: Record<TextContentWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

export const TextContent = forwardRef<HTMLElement, TextContentProps>((props, ref) => {
  const {
    as = 'span',
    size,
    weight,
    xsmall = false,
    small = false,
    strong = false,
    muted = false,
    error = false,
    success = false,
    warning = false,
    info = false,
    invert = false,
    monospace = false,
    truncate = false,
    className,
    children,
    ...rest
  } = props

  const textColorClass = error
    ? 'text-[var(--ui-text-danger)]'
    : success
      ? 'text-[var(--ui-success)]'
      : warning
        ? 'text-[var(--ui-warning)]'
        : info
          ? 'text-[var(--ui-info)]'
          : muted
            ? invert
              ? 'text-gray-300 dark:text-gray-600'
              : 'text-[var(--ui-text-muted)]'
            : invert
              ? 'text-white dark:text-black'
              : 'text-[var(--ui-text)]'

  return React.createElement(as, {
    ref,
    className: buildClassName(
      textColorClass,
      size ? sizeClassMap[size] : xsmall ? 'text-xs/5' : small ? 'text-sm/6' : undefined,
      weight ? weightClassMap[weight] : strong ? 'font-semibold' : undefined,
      monospace && 'font-mono',
      truncate && 'truncate inline-block max-w-full',
      className,
    ),
    ...rest,
    children,
  })
})

TextContent.displayName = 'TextContent'
