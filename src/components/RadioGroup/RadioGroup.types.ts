import type { ChangeEvent, ReactNode } from 'react'

export type RadionGroupItem = {
  /**
   * The display label shown next to the radio button.
   */
  label: string

  /**
   * The underlying value associated with the option.
   * Can be any type, including string, number, or object.
   */
  value: any
}

export interface RadioGroupProps {
  /**
   * The name attribute shared by all radio buttons in the group.
   * Ensures only one option can be selected at a time.
   */
  name: string

  /**
   * Optional label displayed above the radio button group.
   * Can be a string or a custom ReactNode.
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
   * Useful for showing small guidance text.
   */
  labelHint?: ReactNode

  /**
   * Custom CSS classes applied to the outer container
   * that wraps the entire radio group.
   */
  containerClass?: string

  /**
   * The currently selected value.
   * When provided, the component becomes controlled.
   */
  value?: any

  /**
   * The list of options to render.
   * - Strings → converted to { label, value } internally
   * - Objects → must follow RadionButtonGroupItem structure
   */
  options: string[] | RadionGroupItem[]

  /**
   * Whether to display radio buttons horizontally in a row.
   * Defaults to vertical column layout.
   */
  row?: boolean

  /**
   * Change handler called when the selected radio button changes.
   * Receives the native ChangeEvent from the input element.
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void

  error?: string | null

  showErrorMessage?: boolean
}
