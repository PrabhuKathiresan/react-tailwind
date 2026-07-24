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
      'text-gray-900 dark:text-gray-100',
      xsmall && 'text-xs/5',
      small && 'text-sm/6',
      strong && 'font-semibold',
      muted && 'text-gray-500 dark:text-gray-400',
      error && 'text-red-500 dark:text-red-400',
      className,
    ),
  })
})

TextContent.displayName = 'TextContent'
