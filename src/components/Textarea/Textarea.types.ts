import type { TextareaHTMLAttributes, ReactNode } from 'react'
import type { InputCustomProps } from '../common-type'

export type TextareaSize = 'sm' | 'md' | 'lg'
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    InputCustomProps {
  /**
   * Space for right icon / control
   */
  rightGroup?: ReactNode

  /**
   * Space for left icon / control
   */
  leftGroup?: ReactNode

  /**
   * Size scale of the textarea.
   * - `sm` (compact padding/text-xs)
   * - `md` (standard padding/text-sm default)
   * - `lg` (prominent padding/text-base)
   * Defaults to `"md"`.
   */
  size?: TextareaSize

  /**
   * Automatically expands textarea height as text lines are typed.
   * Defaults to `false`.
   */
  autoSize?: boolean

  /**
   * Renders a live character count (`140 / 500`) below the textarea.
   */
  showCount?: boolean

  /**
   * Helper guidance text rendered below the textarea.
   */
  helperText?: ReactNode

  /**
   * CSS resize control behavior.
   * Defaults to `"vertical"`.
   */
  resize?: TextareaResize
}
