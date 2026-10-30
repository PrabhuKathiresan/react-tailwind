import type { ReactNode } from 'react'

export interface MobileHeaderAction {
  /** Unique action identifier */
  id: string
  /** Icon rendered in right actions area */
  icon: ReactNode
  /** Accessible title/label for action */
  label: string
  /** Click handler callback */
  onClick: () => void
  /** Optional notification badge text or number */
  badge?: string | number
  /** Badge color variant */
  badgeVariant?: 'danger' | 'info' | 'success'
  /** Disables action click */
  disabled?: boolean
}

export interface MobileHeaderProps {
  /** Main header title text or ReactNode */
  title?: ReactNode
  /** Secondary subtitle text or sub-heading */
  subtitle?: ReactNode
  /** Title text alignment ('center' | 'left', default: 'center') */
  titleAlign?: 'center' | 'left'
  /** Back button click handler */
  onBack?: () => void
  /** Back button accessible label (default: "Back") */
  backLabel?: string
  /** Custom leading element on left (e.g. Hamburger menu icon) */
  leading?: ReactNode
  /** Right side action items */
  actions?: MobileHeaderAction[]
  /**
   * Maximum icon buttons shown in the header. When `actions` has more, the
   * extras collapse into a "More actions" button that opens an `ActionSheet`.
   * Unset shows every action.
   */
  maxVisibleActions?: number
  /**
   * Accessible label of the overflow button.
   * @default 'More actions'
   */
  overflowLabel?: string
  /** Custom content after the actions, e.g. an avatar or a context switcher with its own state */
  trailing?: ReactNode
  /** Enables in-header search bar layout */
  searchable?: boolean
  /** Controlled search input value */
  searchValue?: string
  /** Search input change callback */
  onSearchChange?: (value: string) => void
  /** Search input placeholder text (default: "Search...") */
  searchPlaceholder?: string
  /** Sticky top positioning (default: true) */
  sticky?: boolean
  /** Transparent background with backdrop blur */
  transparent?: boolean
  /** Sub-header slot rendered below main header row (e.g. Filter tabs) */
  bottomSlot?: ReactNode
  /** Outer container class string */
  className?: string
}
