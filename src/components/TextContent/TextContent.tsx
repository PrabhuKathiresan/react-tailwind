import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { TextContentProps } from './TextContent.types'

export const TextContent = forwardRef<HTMLSpanElement, TextContentProps>((props, ref) => {
  const {
    xsmall = false,
    small = false,
    strong = false,
    muted = false,
    error = false,
    className,
    ...rest
  } = props
  return React.createElement('span', {
    ...rest,
    ref,
    className: buildClassName(
      xsmall && 'text-xs/5',
      small && 'text-sm/6',
      strong && 'font-semibold',
      muted && 'text-gray-500',
      error && 'text-red-500 dark:text-red-500',
      className,
    ),
  })
})

TextContent.displayName = 'TextContent'
