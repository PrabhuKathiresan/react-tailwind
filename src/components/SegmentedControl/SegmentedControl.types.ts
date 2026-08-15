import type { HTMLAttributes, ReactNode } from 'react'

export interface SegmentedControlOption<T extends string = string> {
  /**
   * Visible label or element for the segment option
   */
  label: ReactNode
  /**
   * Unique value associated with the option
   */
  value: T
  /**
   * Optional tooltip or title text
   */
  title?: string
  /**
   * Optional icon rendered before the label
   */
  icon?: ReactNode
  /**
   * Defines if option is disabled
   */
  disabled?: boolean
}

export type SegmentedControlSize = 'sm' | 'md' | 'lg'

export interface SegmentedControlProps<T extends string = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
  /**
   * Options list to display in the control
   */
  options: SegmentedControlOption<T>[]
  /**
   * Currently selected value
   */
  value: T
  /**
   * Callback triggered when selection changes
   */
  onChange: (value: T) => void
  /**
   * Global disabled state for the entire control
   * @default false
   */
  disabled?: boolean
  /**
   * Size variant controlling padding and text size
   * @default "md"
   */
  size?: SegmentedControlSize
  /**
   * Expand control to span full container width
   * @default false
   */
  fullWidth?: boolean
}
