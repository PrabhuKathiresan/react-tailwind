import type { ReactNode } from 'react'

export type FABVariant = 'primary' | 'secondary' | 'danger' | 'dark'
export type FABSize = 'sm' | 'md' | 'lg'
export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center' | 'inline'

export interface FABSpeedDialAction {
  /** Unique sub-action identifier */
  id: string
  /** Display label text */
  label: ReactNode
  /** Icon rendered next to label */
  icon: ReactNode
  /** Visual color theme ('default' | 'danger' | 'primary') */
  theme?: 'default' | 'danger' | 'primary'
  /** Disables sub-action click */
  disabled?: boolean
  /** Click handler callback */
  onClick?: () => void
}

export interface FloatingActionButtonProps {
  /** Primary button icon */
  icon: ReactNode
  /** Optional active icon when speed dial menu is expanded (e.g. X close icon) */
  activeIcon?: ReactNode
  /** Label text for Extended FAB (Icon + Text layout) */
  label?: ReactNode
  /** Color theme variant (default: 'primary') */
  variant?: FABVariant
  /** Button size scale (default: 'md') */
  size?: FABSize
  /** Screen positioning (default: 'bottom-right') */
  position?: FABPosition
  /** List of expandable speed dial sub-actions */
  speedDialActions?: FABSpeedDialAction[]
  /** Controlled open state for speed dial */
  isOpen?: boolean
  /** Handler called when speed dial open state changes */
  onToggle?: (open: boolean) => void
  /** Disables click interaction */
  disabled?: boolean
  /** Primary click handler (when speedDialActions is empty) */
  onClick?: () => void
  /** Accessible label */
  'aria-label'?: string
  /** Outer container class string */
  containerClass?: string
  /** Button element class string */
  className?: string
}
