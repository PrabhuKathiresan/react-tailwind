import type { InputHTMLAttributes, ReactNode } from 'react'
import type { InputCustomProps } from '../common-type'

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>,
    Omit<InputCustomProps, 'labelHint'> {
  /** Force type to checkbox only */
  type?: 'radio'

  /** Extra class for outer wrapper */
  wrapperClass?: string

  /** Input container class */
  containerClass?: string

  /** Label class */
  labelClass?: string

  /** Error message */
  error?: string | ReactNode
}
