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
    ...rest
  } = props
  return React.createElement(as, {
    ref: ref,
    className: buildClassName(
      'text-gray-900 dark:text-gray-100',
      small && 'text-sm/6',
      strong && 'font-semibold',
      muted && 'text-gray-500 dark:text-gray-400',
      error && 'text-red-500 dark:text-red-400',
      inline && 'inline-flex items-center gap-2',
      className,
    ),
    ...rest,
  })
})

BodyText.displayName = 'BodyText'
