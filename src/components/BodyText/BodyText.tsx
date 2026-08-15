import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type { BodyTextAlign, BodyTextProps, BodyTextSize, BodyTextWeight } from './BodyText.types'

const sizeClassMap: Record<BodyTextSize, string> = {
  xs: 'text-xs/5',
  sm: 'text-sm/6',
  md: 'text-base/7',
  lg: 'text-lg/8',
  xl: 'text-xl/9',
}

const weightClassMap: Record<BodyTextWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const alignClassMap: Record<BodyTextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

const clampClassMap = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
}

export const BodyText = forwardRef<HTMLParagraphElement, BodyTextProps>((props, ref) => {
  const {
    as = 'p',
    size,
    weight,
    small = false,
    strong = false,
    muted = false,
    error = false,
    success = false,
    warning = false,
    info = false,
    inline = false,
    invert = false,
    align,
    truncate = false,
    clamp,
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
      size ? sizeClassMap[size] : small && 'text-sm/6',
      weight ? weightClassMap[weight] : strong && 'font-semibold',
      align && alignClassMap[align],
      inline && 'inline-flex items-center gap-2',
      truncate && 'truncate',
      clamp && clampClassMap[clamp],
      className,
    ),
    ...rest,
    children,
  })
})

BodyText.displayName = 'BodyText'
