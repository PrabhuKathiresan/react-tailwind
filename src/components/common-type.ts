import { type ReactNode } from 'react'

export interface InputCustomProps {
  /**
   * Input field label
   */
  label?: string | ReactNode
  /**
   * Any label hint for the input field
   */
  labelHint?: string | ReactNode
  /**
   * Label classes
   */
  labelClass?: string
  /**
   * Input field container class
   */
  containerClass?: string
  /**
   * Input label wrapper class
   */
  labelWrapperClass?: string
  /**
   * Input field error
   */
  error?: string | ReactNode
  /**
   * Controls weather to show error message or not.
   */
  showErrorMessage?: boolean
}
