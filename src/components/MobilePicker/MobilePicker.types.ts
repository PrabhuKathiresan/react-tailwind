import { type ReactNode } from 'react'
import type { BaseOption, OptionGroup, SelectBoxSize } from '../SelectBox/SelectBox.types'

export interface MobilePickerProps<T extends BaseOption | string = BaseOption> {
  /** List of options to display in the mobile sheet */
  options?: T[]

  /** List of option groups to display in the mobile sheet */
  groups?: OptionGroup<T>[]

  /** Currently selected option(s). Single: T | null, Multi: T[] */
  selected?: T | T[] | null

  /** Callback fired when selection changes */
  onChange?: (value: T | T[] | null) => void

  /** Size scale of the trigger field (`"sm"` | `"md"` | `"lg"`). Defaults to `"md"`. */
  size?: SelectBoxSize

  /** Field name for display label (default "label") */
  labelKey?: string

  /** Field name for unique value (default "value") */
  valueKey?: string

  /** Input element id */
  id?: string

  /** Input element name */
  name?: string

  /** Label text displayed above the component */
  label?: string

  /** Label wrapper custom class */
  labelWrapperClass?: string

  /** Label element custom class */
  labelClass?: string

  /** Hint element beside label */
  labelHint?: string

  /** Title shown in the top header of the mobile sheet */
  title?: string

  /** Description shown in the top header of the mobile sheet */
  description?: string

  /** Placeholder text shown when no value is selected */
  placeholder?: string

  /** Whether the field is disabled */
  disabled?: boolean

  /** Multi-select mode */
  multiple?: boolean

  /** Maximum selections allowed in multi-select mode */
  maxSelection?: number

  /** Shows a 1-click Select All / Deselect All header in multi-select mode */
  showSelectAll?: boolean

  /** Primary CTA button text for multi-select confirmation (default "Apply Selection") */
  confirmText?: string

  /** Enables search input bar inside the bottom sheet */
  searchable?: boolean

  /** Search input placeholder inside sheet */
  searchPlaceholder?: string

  /** Enables async search mode (server-side search) */
  async?: boolean

  /** Callback triggered when user types in async search mode */
  onSearch?: (query: string) => Promise<void> | void

  /** Loading state spinner inside search bar or option list */
  loading?: boolean

  /** Text displayed in async mode before typing query */
  typeToSearchText?: string

  /** Custom search filter predicate for client-side filtering */
  filterOption?: (option: T, query: string) => boolean

  /** Quick-access 1-tap option chips displayed above option list */
  quickOptions?: T[]

  /** Section header for quick-access chips (default "Quick Picks") */
  quickOptionsTitle?: string

  /** Enables clear (X) button on single-select trigger */
  allowClear?: boolean

  /** Enables typing custom freeform text inside the mobile search bar */
  allowFreeText?: boolean

  /** Enables "+ Create" option card when search query doesn't match existing options */
  allowAdd?: boolean

  /** Label prefix for creatable option action (default "Create") */
  addNewText?: string

  /** Callback when user clicks the creatable option */
  onAdd?: (value: string) => Promise<T | string | void> | T | string | void

  /** Icon or element displayed inside the trigger on the left */
  leftGroup?: ReactNode

  /** Shows error state border and message */
  error?: string | ReactNode

  /** Shows error message below field (default true) */
  showErrorMessage?: boolean

  /** Helper guidance message rendered below field */
  helperText?: ReactNode

  /** Message shown in the dropdown when options are empty */
  noOptionsText?: string

  /** Custom option renderer function */
  renderOption?: (option: T, isSelected: boolean) => ReactNode

  /** Outer container class */
  containerClass?: string

  /** Sheet panel custom class */
  sheetClass?: string
}
