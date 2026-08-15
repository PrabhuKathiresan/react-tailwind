import type { HTMLAttributes, ReactNode } from 'react'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
export type HeadingAlign = 'left' | 'center' | 'right'

export interface HeadingTextProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode
  /**
   * Heading HTML element level: 1 (h1), 2 (h2), 3 (h3), 4 (h4), 5 (h5), 6 (h6).
   * Defaults to `1`.
   */
  level?: HeadingLevel

  /**
   * Visual font size override.
   */
  size?: HeadingSize

  /**
   * Font weight override.
   */
  weight?: HeadingWeight

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
   * Inverted text color for dark backgrounds.
   */
  invert?: boolean

  /**
   * Text alignment (`left`, `center`, `right`).
   */
  align?: HeadingAlign

  /**
   * Letter spacing / tracking (`tighter`, `tight`, `normal`, `wide`).
   */
  tracking?: 'tighter' | 'tight' | 'normal' | 'wide'

  /**
   * Truncate text with ellipsis.
   */
  truncate?: boolean

  className?: string
}
