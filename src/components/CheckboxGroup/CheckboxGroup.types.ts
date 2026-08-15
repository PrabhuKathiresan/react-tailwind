import type { ChangeEvent, ReactNode } from 'react'
import type { CheckboxSize, CheckboxVariant } from '../Checkbox/Checkbox.types'

export type CheckboxGroupItem<T = any> = {
  /**
   * Checkbox item label
   */
  label: string
  /**
   * Checkbox item value
   */
  value: T
  /**
   * Optional subtext description beneath label
   */
  description?: ReactNode
  /**
   * Whether this individual option is disabled
   */
  disabled?: boolean
}

export interface CheckboxGroupProps<T = any> {
  /**
   * Group name applied to all checkboxes in the group
   */
  name?: string

  /**
   * Currently selected values (Controlled Mode).
   */
  value?: T[]

  /**
   * Default selected values (Uncontrolled Mode).
   */
  defaultValue?: T[]

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

  /**
   * Multi-column grid layout (1, 2, 3, or 4 columns).
   * Takes precedence over `inline`.
   */
  columns?: 1 | 2 | 3 | 4

  /**
   * Size scale passed to all checkboxes in the group.
   * Defaults to `"md"`.
   */
  size?: CheckboxSize

  /**
   * Visual variant passed to all checkboxes in the group.
   * - `default` — standard inline checkboxes
   * - `card` — enclosed interactive card containers
   * Defaults to `"default"`.
   */
  variant?: CheckboxVariant

  /**
   * Automatically renders a "Select All" parent checkbox header with indeterminate state!
   * Defaults to `false`.
   */
  showSelectAll?: boolean

  /**
   * Label for the "Select All" checkbox.
   * Defaults to `"Select All"`.
   */
  selectAllLabel?: string

  /**
   * Group-level error message.
   */
  error?: string | ReactNode

  /**
   * Group-level helper text.
   */
  helperText?: ReactNode

  /**
   * Disable all checkboxes in the group.
   */
  disabled?: boolean
}
