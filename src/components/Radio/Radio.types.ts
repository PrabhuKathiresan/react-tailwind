import type { InputHTMLAttributes, ReactNode } from 'react'
import type { InputCustomProps } from '../common-type'

export type RadioSize = 'sm' | 'md' | 'lg'
export type RadioTheme = 'primary' | 'success' | 'danger'

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    Omit<InputCustomProps, 'labelHint'> {
  /** Force type to radio only */
  type?: 'radio'

  /** Optional subtext description below radio label */
  description?: ReactNode

  /** Size variant ('sm' | 'md' | 'lg') @default "md" */
  size?: RadioSize

  /** Color accent theme ('primary' | 'success' | 'danger') @default "primary" */
  theme?: RadioTheme

  /** Extra class for outer wrapper */
  wrapperClass?: string

  /** Input container class */
  containerClass?: string

  /** Label class */
  labelClass?: string

  /** Description subtext class */
  descriptionClass?: string

  /** Error message */
  error?: string | ReactNode
}
