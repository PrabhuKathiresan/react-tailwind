import type { RadioGroupProps } from '@headlessui/react'

/**
 * A single item in the RadioSwitch component.
 * Can be:
 * - a string → used as both label & value
 * - an object → allows custom label, value, and an optional description
 */
export type RadioSwitchItem =
  | string
  | {
      /** Text shown inside the switch option */
      label: string

      /** The underlying value for this option */
      value: string

      /** Optional description shown below the label (small text) */
      description?: string
    }

/**
 * Props for the RadioSwitch component.
 * Extends HeadlessUI's RadioGroupProps.
 */
export type RadioSwitchProps = RadioGroupProps & {
  /**
   * Accessible label for the group.
   * Used internally for aria-label.
   */
  label?: string

  /**
   * The currently selected value.
   * Makes this a controlled component.
   */
  selected: string

  /**
   * Callback fired when selection changes.
   * Receives the selected string value.
   */
  onChange: (value: string) => void

  /**
   * List of switch options.
   * Can be:
   * - an array of strings
   * - an array of objects with label/value/description
   */
  items: RadioSwitchItem[]

  switchClass?: string

  wrapperClass?: string

  contentClass?: string

  descriptionClass?: string
}
