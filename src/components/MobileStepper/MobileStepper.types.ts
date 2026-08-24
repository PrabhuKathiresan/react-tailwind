import type { ReactNode } from 'react'

export type MobileStepperVariant = 'dots' | 'progress' | 'text'

export interface MobileStepperProps {
  /** Total number of steps (e.g. 4) */
  steps: number
  /** Active step index (0-indexed) */
  activeStep: number
  /** Progress layout variant ('dots' | 'progress' | 'text', default: 'dots') */
  variant?: MobileStepperVariant
  /** Back button click handler */
  onBack?: () => void
  /** Next button click handler */
  onNext?: () => void
  /** Custom Back button label (default: "Back") */
  backLabel?: ReactNode
  /** Custom Next button label (default: "Next") */
  nextLabel?: ReactNode
  /** Current step title text (e.g. "Payment Details") */
  stepTitle?: ReactNode
  /** Disables Next button */
  nextDisabled?: boolean
  /** Disables Back button */
  backDisabled?: boolean
  /** Loading spinner on Next button */
  nextLoading?: boolean
  /** Outer container class string */
  className?: string
}
