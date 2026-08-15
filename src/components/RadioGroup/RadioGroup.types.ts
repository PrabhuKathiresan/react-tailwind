import type { ChangeEvent, ReactNode } from 'react'
import type { RadioSize, RadioTheme } from '../Radio/Radio.types'

export type RadioGroupVariant = 'default' | 'cards'
export type RadioGroupColumns = 1 | 2 | 3 | 4

export type RadionGroupItem = {
  /**
   * The display label shown next to the radio button.
   */
  label: string

  /**
   * The underlying value associated with the option.
   */
  value: any

  /**
   * Optional subtext description for rich option items.
   */
  description?: ReactNode

  /**
   * Optional icon displayed next to the item label.
   */
  icon?: ReactNode

  /**
   * Disable individual option item
   */
  disabled?: boolean
}

export interface RadioGroupProps {
  /**
   * The name attribute shared by all radio buttons in the group.
   */
  name: string

  /**
   * Visual variant mode: 'default' or 'cards' (rich selectable card tiles)
   * @default "default"
   */
  variant?: RadioGroupVariant

  /**
   * Size variant for all radios in the group ('sm' | 'md' | 'lg')
   * @default "md"
   */
  size?: RadioSize

  /**
   * Theme accent color ('primary' | 'success' | 'danger')
   * @default "primary"
   */
  theme?: RadioTheme

  /**
   * Optional label displayed above the radio group.
   */
  label?: ReactNode

  /**
   * Custom CSS classes applied to the label element.
   */
  labelClass?: string

  /**
   * Custom CSS classes applied to the label wrapper container.
   */
  labelWrapperClass?: string

  /**
   * Optional hint content displayed beside the label.
   */
  labelHint?: ReactNode

  /**
   * Custom CSS classes applied to the outer container.
   */
  containerClass?: string

  /**
   * The currently selected value.
   */
  value?: any

  /**
   * The list of options to render.
   */
  options: string[] | RadionGroupItem[]

  /**
   * Grid column layout when variant="cards" or row=true (1 | 2 | 3 | 4)
   */
  columns?: RadioGroupColumns

  /**
   * Disables all options in the radio group.
   */
  disabled?: boolean

  /**
   * Whether to display radio buttons horizontally in a row.
   */
  row?: boolean

  /**
   * Change handler called when selected value changes.
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void

  error?: string | null

  showErrorMessage?: boolean
}
