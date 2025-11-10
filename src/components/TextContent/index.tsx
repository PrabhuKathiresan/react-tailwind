import React, { forwardRef, type HTMLAttributes, type JSX, type JSXElementConstructor } from 'react'
import { buildClassName } from '../../utils/build-classname'

export interface TextContentProps extends HTMLAttributes<HTMLSpanElement> {
  xsmall?: boolean
  small?: boolean
  strong?: boolean
  muted?: boolean
  error?: boolean
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>
}

export const TextContent: React.FC<TextContentProps> = forwardRef<
  HTMLSpanElement,
  TextContentProps
>((props, ref) => {
  const {
    as = 'span',
    xsmall = false,
    small = false,
    strong = false,
    muted = false,
    error = false,
    className,
    ...rest
  } = props
  return React.createElement(as, {
    ref,
    className: buildClassName(
      xsmall && 'text-xs/5',
      small && 'text-sm/6',
      strong && 'font-semibold',
      muted && 'text-gray-500',
      error && 'text-red-500',
      className,
    ),
    ...rest,
  })
})
