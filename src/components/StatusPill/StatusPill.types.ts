import type { HTMLAttributes, ReactNode } from 'react'

export type StatusPillTheme = 'success' | 'warning' | 'danger' | 'info' | 'secondary'
export type StatusPillSize = 'sm' | 'md'

export interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Status theme tone
   * @default "secondary"
   */
  theme?: StatusPillTheme
  /**
   * Size variant controlling padding and text size
   * @default "sm"
   */
  size?: StatusPillSize
  /**
   * Display indicator dot inside the status pill
   * @default true
   */
  dot?: boolean
  /**
   * Enable pulsing animation on indicator dot
   * @default false
   */
  pulse?: boolean
  /**
   * Label content of the status pill
   */
  children: ReactNode
}
