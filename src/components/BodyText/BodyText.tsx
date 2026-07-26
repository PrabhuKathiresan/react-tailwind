import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { BodyTextProps } from './BodyText.types'

export const BodyText = forwardRef<HTMLParagraphElement, BodyTextProps>((props, ref) => {
  const {
    as = 'p',
    small = false,
    strong = false,
    muted = false,
    error = false,
    inline = false,
    className,
    invert,
    ...rest
  } = props
  const textColorClass = error
    ? 'text-[var(--ui-text-danger)]'
    : muted
      ? invert
        ? 'text-gray-300 dark:text-gray-600'
        : 'text-[var(--ui-text-muted)]'
      : invert
        ? 'text-white dark:text-black'
        : 'text-[var(--ui-text)]'
  return React.createElement(as, {
    ref: ref,
    className: buildClassName(
      textColorClass,
      small && 'text-sm/6',
      strong && 'font-semibold',
      inline && 'inline-flex items-center gap-2',
      className,
    ),
    ...rest,
  })
})

BodyText.displayName = 'BodyText'
