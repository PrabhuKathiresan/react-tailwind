import React, { forwardRef, type HTMLAttributes, type JSX, type JSXElementConstructor } from 'react'
import { buildClassName } from '../../utils/build-classname';

export interface BodyTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Add's `text-sm` class to the element
   */
  small?: boolean;
  /**
   * Add's `font-semibold` class to the element
   */
  strong?: boolean;
  /**
   * Add's `text-gray-500` class to the element
   */
  muted?: boolean;
  /**
   * Add's `text-red-500` class to the element
   */
  error?: boolean;
  /**
   * Add's `inline-flex items-center gap-2` class to the element
   */
  inline?: boolean;
  /**
   * JSX element to be render in place of `p`
   */
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
}

export const BodyText: React.FC<BodyTextProps> = forwardRef<HTMLParagraphElement, BodyTextProps>((props, ref) => {
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
