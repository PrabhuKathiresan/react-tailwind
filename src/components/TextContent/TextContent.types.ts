import type { HTMLAttributes } from 'react'

export interface TextContentProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Render extra-small sized text (`text-xs/5`).
   */
  xsmall?: boolean

  /**
   * Render small sized text (`text-sm/6`).
   */
  small?: boolean

  /**
   * Render bold/semibold text (`font-semibold`).
   */
  strong?: boolean

  /**
   * Apply muted gray tone (commonly used for secondary text).
   */
  muted?: boolean

  /**
   * Apply error color styling (`text-red-500`).
   */
  error?: boolean
}
