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
      small && 'text-sm/6',
      strong && 'font-semibold',
      muted && 'text-gray-500',
      error && 'text-red-500',
      inline && 'inline-flex items-center gap-2',
      className,
    ),
    ...rest,
  })
})

BodyText.displayName = 'BodyText'
