import { type ReactNode } from 'react'

export type BaseOption = {
  /** Unique value for the option (used for selection comparison) */
  value: string

  /** Display label for the option (optional; if omitted, value may be used) */
  label?: string

  /** Whether the option is disabled and non-selectable */
  disabled?: boolean

  /** Additional metadata fields allowed on the option */
  [k: string]: any
}

export interface SelectBoxProps<T extends BaseOption | string = BaseOption> {
  /** List of options to display in the dropdown */
  options: T[]

  /**
   * Currently selected option(s).
   * - For single select: a single T or null
   * - For multi-select: T[]
   */
  selected?: T | T[] | null

  /** Name of the field inside option objects to use as the label (defaults to "label") */
  labelKey?: string

  /** Name of the field inside option objects to use as the value (defaults to "value") */
  valueKey?: string

  /** Input ID attribute; defaults to the name field */
  id?: string

  /** Input name attribute */
  name?: string

  /** Text label displayed above the component */
  label?: string

  /** Additional CSS classes for the label wrapper */
  labelWrapperClass?: string

  /** Additional CSS classes for the label element */
  labelClass?: string

  /** Optional hint element (string or JSX) displayed beside the label */
  labelHint?: string

  /**
   * Callback fired when selection changes.
   * - Single select → value is T or null
   * - Multi-select → value is T[]
   */
  onChange?: (value: T | T[] | null) => void

  /** Whether the entire SelectBox is disabled */
  disabled?: boolean

  /** Additional CSS classes for the outer container */
  containerClass?: string

  /** Placeholder text displayed when no value is selected */
  placeholder?: string

  /** CSS classes applied to the dropdown options container */
  dropdownContainerClass?: string

  /**
   * Whether the open dropdown traps focus and makes the rest of the page
   * inert (Headless UI's default Combobox behavior). Disabled by default so
   * elements rendered inside the control itself — like the `allowClear`
   * button — and the rest of the page stay interactive while the dropdown
   * is open, matching common combobox libraries (e.g. react-select). Set to
   * `true` to restore Headless UI's modal focus-trapping behavior.
   *
   * @default false
   */
  modalDropdown?: boolean

  /** Enable multiple selection mode */
  multiple?: boolean

  /** Maximum number of selections allowed in multi-select mode */
  maxSelection?: number

  /**
   * Whether to commit value selection immediately when clicking options.
   * Headless UI uses "immediate" to control Combobox selection behavior.
   */
  immediate?: boolean

  /** Whether to show an error message below the field */
  showErrorMessage?: boolean

  /** Error message displayed below the component */
  error?: string | ReactNode

  /**
   * Enables async search mode:
   * - Component will not filter options locally
   * - Calls onSearch(query) when user types
   */
  async?: boolean

  /**
   * Async search callback.
   * Should update the `options` prop externally after fetching.
   */
  onSearch?: (query: string) => Promise<void>

  /** Whether the user can type inside the input (false = readOnly mode) */
  searchable?: boolean

  /** Mark input as required (used for accessibility) */
  required?: boolean

  /** Whether to show an “Add new” option when no results match */
  allowAdd?: boolean

  /** Label prefix for the “Add new” action (e.g., "Create") */
  addNewText?: string

  /**
   * Callback when the user chooses the "create/add" option.
   *
   * It may:
   *  - return void (do nothing automatically)
   *  - return a string or BaseOption → the component will auto-add/select it
   *  - return a Promise resolving to the above
   */
  onAdd?: (value: string) => Promise<T | string | void> | T | string | void

  /** Show a clear (X) button for single-select mode */
  allowClear?: boolean
}
