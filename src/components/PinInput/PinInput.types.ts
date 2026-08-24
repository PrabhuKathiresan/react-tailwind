import type { ReactNode } from 'react'

export type PinInputSize = 'sm' | 'md' | 'lg'
export type PinInputType = 'numeric' | 'alphanumeric'

export interface PinInputProps {
  /** Number of digit/character boxes (default: 4) */
  length?: number
  /** Controlled PIN input value string */
  value?: string
  /** Change callback fired when value updates */
  onChange?: (value: string) => void
  /** Callback fired when all digits are completely filled */
  onComplete?: (value: string) => void
  /** Masks typed characters with dots for security PINs */
  mask?: boolean
  /** Size scale of digit boxes ('sm' | 'md' | 'lg', default: 'md') */
  size?: PinInputSize
  /** Allowed character type ('numeric' | 'alphanumeric', default: 'numeric') */
  type?: PinInputType
  /** Error state or error message string */
  error?: boolean | ReactNode
  /** Disables input interaction */
  disabled?: boolean
  /** Auto-focuses the first digit input on mount */
  autoFocus?: boolean
  /** Custom container class string */
  containerClass?: string
  /** Custom individual digit input box class string */
  inputClass?: string
}
