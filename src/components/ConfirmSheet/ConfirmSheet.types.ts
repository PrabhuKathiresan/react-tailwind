import type { ReactNode } from 'react'

export interface ConfirmSheetProps {
  /** Whether it's open. */
  isOpen: boolean
  /** The question, e.g. "Delete Sharma Traders?". */
  title: string
  /** What happens, in plain words, e.g. what's lost or kept. */
  description: ReactNode
  /** The confirming action, named for what it does, e.g. "Delete". */
  confirmLabel: string
  /**
   * The way out.
   * @default 'Cancel'
   */
  cancelLabel?: string
  /**
   * The confirming action destroys or removes something: a red button.
   * @default false
   */
  danger?: boolean
  /**
   * While the action runs: buttons off, and tapping outside doesn't close it.
   * @default false
   */
  isPending?: boolean
  /** An optional third choice, shown before the confirming button. */
  secondaryAction?: { label: string; onClick: () => void }
  /** Confirms. */
  onConfirm: () => void
  /** Cancels (the button, tapping outside or Escape). */
  onCancel: () => void
}
