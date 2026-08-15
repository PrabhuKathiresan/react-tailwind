import type { InputHTMLAttributes, ReactNode } from 'react'
import type { InputCustomProps } from '../common-type'

export type CheckboxSize = 'sm' | 'md' | 'lg'
export type CheckboxVariant = 'default' | 'card'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    Omit<InputCustomProps, 'labelHint'> {
  /** Force type to checkbox only */
  type?: 'checkbox'

  /**
   * Indeterminate (partially checked) state.
   * Useful for "Select All" parent checkboxes.
   */
  indeterminate?: boolean

  /**
   * Size scale of the checkbox.
   * Defaults to `"md"`.
   */
  size?: CheckboxSize

  /**
   * Container style variant.
   * - `default` — standard inline checkbox
   * - `card` — enclosed interactive card container
   * Defaults to `"default"`.
   */
  variant?: CheckboxVariant

  /**
   * Optional subtext description displayed beneath label.
   */
  description?: ReactNode

  /**
   * Optional helper message displayed below checkbox.
   */
  helperText?: ReactNode

  /** Extra class for outer wrapper */
  wrapperClass?: string

  /** Input container class */
  containerClass?: string

  /** Label class */
  labelClass?: string

  /** Error message */
  error?: string | ReactNode
}
