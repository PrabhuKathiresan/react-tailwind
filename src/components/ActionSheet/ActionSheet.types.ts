import type { ReactNode } from 'react'

export type ActionSheetItemTheme = 'default' | 'primary' | 'danger'

export interface ActionSheetItem {
  /** Unique action identifier */
  id: string
  /** Display label text */
  label: ReactNode
  /** Optional icon rendered on the left */
  icon?: ReactNode
  /** Optional secondary description text */
  description?: ReactNode
  /** Visual color theme variant ('default' | 'primary' | 'danger') */
  theme?: ActionSheetItemTheme
  /** Disables click interaction */
  disabled?: boolean
  /** Click handler callback */
  onClick?: () => void
}

export interface ActionSheetProps {
  /** Controls if the action sheet is open */
  isOpen: boolean
  /** Handler called when sheet backdrop is clicked or closed */
  onClose: () => void
  /** Optional header title */
  title?: ReactNode
  /** Optional header description/subtext */
  description?: ReactNode
  /** List of action items */
  actions: ActionSheetItem[]
  /** Displays a separate bottom Cancel button (default: true) */
  showCancelButton?: boolean
  /** Custom text for Cancel button (default: "Cancel") */
  cancelLabel?: string
  /** Callback when Cancel button is clicked */
  onCancel?: () => void
  /** Controls whether clicking backdrop overlay closes the sheet (default: true) */
  closeOnBackdropClick?: boolean
  /** Shows top drag handle pill (default: true) */
  dragHandle?: boolean
  /** Custom class for panel */
  panelClass?: string
  /** Custom class for action items container */
  containerClass?: string
}
