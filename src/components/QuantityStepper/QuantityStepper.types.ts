import type { InputHTMLAttributes, ReactNode } from 'react'

export type QuantityStepperSize = 'sm' | 'md' | 'lg'

export interface QuantityStepperProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size' | 'prefix'> {
  /**
   * Numeric value of the stepper
   */
  value: number
  /**
   * Callback fired when value changes
   */
  onChange: (value: number) => void
  /**
   * Minimum allowable value
   * @default 0
   */
  min?: number
  /**
   * Maximum allowable value
   * @default 99999
   */
  max?: number
  /**
   * Increment/decrement step interval
   * @default 1
   */
  step?: number
  /**
   * Optional field label text
   */
  label?: string
  /**
   * Size variant controlling button and text dimensions
   * @default "md"
   */
  size?: QuantityStepperSize
  /**
   * Optional prefix icon or element
   */
  prefix?: ReactNode
  /**
   * Optional suffix element (e.g. unit label like "kg", "items")
   */
  suffix?: ReactNode
  /**
   * Disabled state for input and controls
   * @default false
   */
  disabled?: boolean
}
