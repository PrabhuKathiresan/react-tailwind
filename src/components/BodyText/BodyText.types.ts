import type { HTMLAttributes, JSX, JSXElementConstructor } from 'react'

export interface BodyTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Add's `text-sm` class to the element
   */
  small?: boolean
  /**
   * Add's `font-semibold` class to the element
   */
  strong?: boolean
  /**
   * Add's `text-gray-500` class to the element
   */
  muted?: boolean
  /**
   * Add's `text-red-500` class to the element
   */
  error?: boolean
  /**
   * Add's `inline-flex items-center gap-2` class to the element
   */
  inline?: boolean
  /**
   * JSX element to be render in place of `p`
   */
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>

  invert?: boolean
}
