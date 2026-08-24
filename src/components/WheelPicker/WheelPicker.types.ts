import type { ReactNode } from 'react'

export interface WheelPickerOption {
  /** Value identifier */
  value: string | number
  /** Display label or element */
  label: ReactNode
  /** Disables option selection */
  disabled?: boolean
}

export interface WheelPickerColumn {
  /** Unique column identifier */
  id: string
  /** Column options list */
  options: WheelPickerOption[]
  /** Controlled active value for column */
  value?: string | number
  /** Default active value for column */
  defaultValue?: string | number
  /** Callback fired when column value changes */
  onChange?: (val: string | number) => void
}

export interface WheelPickerProps {
  /** Array of column configurations */
  columns: WheelPickerColumn[]
  /** Height of wheel container in px (default: 200) */
  height?: number
  /** Height of each item row in px (default: 40) */
  itemHeight?: number
  /** Combined change callback fired when any column updates */
  onChange?: (values: Record<string, string | number>) => void
  /** Disables interaction across all columns */
  disabled?: boolean
  /** Custom container class string */
  containerClass?: string
}
