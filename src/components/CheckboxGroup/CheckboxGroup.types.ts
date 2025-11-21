import type { ChangeEvent, ReactNode } from 'react'

export type CheckboxGroupItem<T = any> = {
  /**
   * Checkbox item label
   */
  label: string
  /**
   * Checkbox item value
   */
  value: T
}

export interface CheckboxGroupProps<T = any> {
  /**
   * Group name applied to all checkboxes in the group
   */
  name?: string

  /**
   * Currently selected values
   */
  value?: T[]

  /**
   * Label displayed above the group
   */
  label?: ReactNode

  /**
   * Label CSS classes
   */
  labelClass?: string

  /**
   * Wrapper classes for the label row
   */
  labelWrapperClass?: string

  /**
   * Hint text shown next to the label
   */
  labelHint?: ReactNode

  /**
   * Container classes for the group wrapper
   */
  containerClass?: string

  /**
   * Callback fired whenever selection updates.
   */
  onChange?: (values: T[], e: ChangeEvent<HTMLInputElement>) => void

  /**
   * Options in the group — can be:
   *  - string[] → converted to {label, value}
   *  - CheckboxGroupItem<T>[]
   */
  options: string[] | CheckboxGroupItem<T>[]

  /**
   * Whether to arrange checkboxes inline
   */
  inline?: boolean
}
