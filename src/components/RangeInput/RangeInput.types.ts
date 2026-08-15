import type { InputHTMLAttributes, ReactNode } from 'react'
import type { InputCustomProps } from '../common-type'

export type RangeInputSize = 'sm' | 'md' | 'lg'

export interface RangeInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    InputCustomProps {
  /**
   * Size scale of the slider (`"sm"` | `"md"` | `"lg"`). Defaults to `"md"`.
   */
  size?: RangeInputSize

  /** Extra class for outer wrapper */
  wrapperClass?: string

  /** Input container class */
  containerClass?: string

  /** Label class */
  labelClass?: string

  /** Error message */
  error?: string | ReactNode

  /** Helper guidance message rendered below the slider */
  helperText?: ReactNode

  /** Whether to display current value on the right side of the slider. Defaults to `true`. */
  showValue?: boolean

  /** String suffix appended to value display (e.g. `"%"`, `"px"`, `"₹"`) */
  valueSuffix?: string

  /** Floating value tooltip popup badge displayed above the thumb on hover or drag */
  showTooltip?: boolean

  /** Step tick marks displayed along slider track (boolean or map of values to labels) */
  marks?: boolean | Record<number, string>
}
