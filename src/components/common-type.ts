import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

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

/**
 * Utility: Extract the correct `ref` type for intrinsic elements
 * or custom React components.
 */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithoutRef<C>['ref']

export type PolymorphicProps<C extends ElementType, Props> = Props &
  Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as'>
