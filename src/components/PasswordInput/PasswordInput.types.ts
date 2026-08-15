import type { InputProps } from '../Input'

export interface PasswordInputProps extends Omit<InputProps, 'rightGroup' | 'type'> {
  /**
   * Automatically evaluates and renders a visual password strength indicator bar
   * (Weak, Fair, Good, Strong) based on length, digits, symbols, and uppercase letters.
   */
  showStrength?: boolean
}
