import type { InputHTMLAttributes, ReactNode } from 'react'
import type { InputCustomProps } from '../common-type'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    InputCustomProps {
  /**
   * Size scale of the input component.
   * - `sm` (compact 32px/text-xs)
   * - `md` (standard 40px/text-sm default)
   * - `lg` (prominent 48px/text-base)
   * Defaults to `"md"`.
   */
  size?: InputSize

  /**
   * Space for right icon / control. On a date, month, week or datetime-local
   * field, this replaces the built-in calendar icon.
   */
  rightGroup?: ReactNode

  /**
   * Space for left icon / control
   */
  leftGroup?: ReactNode

  /**
   * Static prefix addon text or element (e.g. `"https://"` or `"$"`).
   */
  prefix?: ReactNode

  /**
   * Static suffix addon text or element (e.g. `".com"` or `"USD"`).
   */
  suffix?: ReactNode

  /**
   * A control inside the field's border, at its end after a thin divider: a compact
   * RadioSwitch, say, choosing how the value is read ("Before GST | Incl. GST"). It sizes to
   * its content and the text stops short of it. Takes the place of `rightGroup` and the
   * clear button.
   */
  endAdornment?: ReactNode

  /**
   * Renders a 1-Click clear `✕` button when text is present.
   */
  clearable?: boolean

  /**
   * Callback fired when clear button is clicked.
   */
  onClear?: () => void

  /**
   * Renders a live character count (`12 / 50`) below the input field.
   */
  showCount?: boolean

  /**
   * Helper message rendered below the input field.
   */
  helperText?: ReactNode
}
