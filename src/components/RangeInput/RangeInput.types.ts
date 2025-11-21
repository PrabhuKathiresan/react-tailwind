import type { InputHTMLAttributes, ReactNode } from 'react'
import type { InputCustomProps } from '../common-type'

export interface RangeInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>,
    InputCustomProps {
  /** Extra class for outer wrapper */
  wrapperClass?: string

  /** Input container class */
  containerClass?: string

  /** Label class */
  labelClass?: string

  /** Error message */
  error?: string | ReactNode

  showValue?: boolean

  valueSuffix?: string
}
