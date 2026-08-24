import React from 'react'

export type SwipeableActionTheme =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'info'
  | 'success'
  | 'gray'

export interface SwipeableAction {
  /** Unique identifier for the action */
  id: string
  /** Text label displayed on the action button */
  label?: string
  /** Icon component or node */
  icon?: React.ReactNode
  /** Color theme for the action button */
  theme?: SwipeableActionTheme
  /** Custom class overrides for the action button */
  className?: string
  /** Click handler triggered when action button is tapped */
  onClick: () => void
}

export interface SwipeableRowProps {
  /** The main content node rendered inside the swipeable row */
  children: React.ReactNode
  /** Action buttons revealed when swiping right (from left edge) */
  leftActions?: SwipeableAction[]
  /** Action buttons revealed when swiping left (from right edge) */
  rightActions?: SwipeableAction[]
  /** Action button width in pixels (defaults to 76px per action button) */
  actionWidth?: number
  /** Minimum drag threshold in pixels to trigger row expansion (defaults to 40px) */
  threshold?: number
  /** Execute the primary action automatically when full swipe threshold is reached */
  fullSwipeToExecute?: boolean
  /** Full swipe threshold in pixels or percentage of width (defaults to 180px) */
  fullSwipeThreshold?: number
  /** Disabled state to lock swipe interactions */
  disabled?: boolean
  /** Outer container wrapper class */
  className?: string
  /** Inner content wrapper class */
  contentClassName?: string
  /** Callback fired when row snaps open */
  onOpen?: (direction: 'left' | 'right') => void
  /** Callback fired when row returns to closed state */
  onClose?: () => void
}
