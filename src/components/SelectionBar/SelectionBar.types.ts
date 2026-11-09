import type { ReactNode } from 'react'

export interface SelectionBarAction {
  /** Unique among the actions. */
  id: string
  /** Visible label, e.g. "Archive". */
  label: string
  /** Optional icon before the label. */
  icon?: ReactNode
  /** Runs the action on the selected records. */
  onClick: () => void
  /** Turns the action off, e.g. when it doesn't apply to what's selected. */
  disabled?: boolean
  /** Removes or destroys: a red button. */
  danger?: boolean
}

export interface SelectionBarProps {
  /** How many records are selected; the actions are off at 0. */
  count: number
  /** One labelled button each, in equal columns. */
  actions: SelectionBarAction[]
  /** Extra classes, e.g. a minimum height matching the bottom bar it replaces. */
  className?: string
}
