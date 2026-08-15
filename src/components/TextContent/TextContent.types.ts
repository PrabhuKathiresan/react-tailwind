import type { HTMLAttributes, JSX, ReactNode } from 'react'

export type TextContentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TextContentWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

export interface TextContentProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode

  /**
   * HTML element to render (e.g. `span`, `code`, `mark`, `label`, `b`, `i`, `div`, `time`).
   * Defaults to `span`.
   */
  as?: keyof JSX.IntrinsicElements

  /**
   * Font size variant (`xs`, `sm`, `md`, `lg`, `xl`).
   */
  size?: TextContentSize

  /**
   * Font weight variant (`light`, `normal`, `medium`, `semibold`, `bold`).
   */
  weight?: TextContentWeight

  /**
   * Shortcut for extra-small text (`text-xs/5`). Retained for backward compatibility.
   */
  xsmall?: boolean

  /**
   * Shortcut for small text (`text-sm/6`). Retained for backward compatibility.
   */
  small?: boolean

  /**
   * Shortcut for semibold text (`font-semibold`). Retained for backward compatibility.
   */
  strong?: boolean

  /**
   * Apply muted gray tone.
   */
  muted?: boolean

  /**
   * Apply error red text color.
   */
  error?: boolean

  /**
   * Apply success green text color.
   */
  success?: boolean

  /**
   * Apply warning amber text color.
   */
  warning?: boolean

  /**
   * Apply info blue text color.
   */
  info?: boolean

  /**
   * Inverted text color for dark background contexts.
   */
  invert?: boolean

  /**
   * Monospace font family (`font-mono`) for code snippets or numbers.
   */
  monospace?: boolean

  /**
   * Truncate single line text with ellipsis.
   */
  truncate?: boolean
}
