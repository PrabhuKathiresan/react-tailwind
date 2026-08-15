import type { HTMLAttributes, JSX, JSXElementConstructor, ReactNode } from 'react'

export type BodyTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BodyTextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
export type BodyTextAlign = 'left' | 'center' | 'right' | 'justify'

export interface BodyTextProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode

  /**
   * Font size variant (`xs`, `sm`, `md`, `lg`, `xl`).
   */
  size?: BodyTextSize

  /**
   * Font weight variant (`light`, `normal`, `medium`, `semibold`, `bold`).
   */
  weight?: BodyTextWeight

  /**
   * Shortcut prop adding `text-sm` class (retained for backward compatibility).
   */
  small?: boolean

  /**
   * Shortcut prop adding `font-semibold` class (retained for backward compatibility).
   */
  strong?: boolean

  /**
   * Muted secondary text color.
   */
  muted?: boolean

  /**
   * Error red text color.
   */
  error?: boolean

  /**
   * Success green text color.
   */
  success?: boolean

  /**
   * Warning amber text color.
   */
  warning?: boolean

  /**
   * Info blue text color.
   */
  info?: boolean

  /**
   * Renders `inline-flex items-center gap-2`.
   */
  inline?: boolean

  /**
   * Inverted text color for dark backgrounds.
   */
  invert?: boolean

  /**
   * Text alignment (`left`, `center`, `right`, `justify`).
   */
  align?: BodyTextAlign

  /**
   * Truncate single line with ellipsis.
   */
  truncate?: boolean

  /**
   * Multi-line line clamp count (`1`, `2`, `3`, `4`).
   */
  clamp?: 1 | 2 | 3 | 4

  /**
   * JSX element to render in place of `p` (e.g. `div`, `span`, `article`).
   */
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>
}
