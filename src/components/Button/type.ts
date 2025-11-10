import {
  type ButtonHTMLAttributes,
  type HTMLAttributeAnchorTarget,
  type JSX,
  type JSXElementConstructor,
} from 'react'

export type ButtonTheme = 'primary' | 'secondary' | 'danger'
export type ButtonVariant = 'outlined' | 'default' | 'plain'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ThemedButtonClass = {
  [key in ButtonTheme]: {
    [key in ButtonVariant]: string
  }
}
export type SizeButtonClass = {
  [key in ButtonSize]: string
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Controls button theme
   * @default "primary"
   */
  theme?: ButtonTheme
  /**
   * Controls button variant
   * @default "default"
   */
  variant?: ButtonVariant
  /**
   * Controls button size
   * @default "md"
   */
  size?: ButtonSize
  /**
   * When treating button as Link, use "to"
   */
  to?: string
  /**
   * When treating button as Link, "target" for href behaviour
   */
  target?: HTMLAttributeAnchorTarget
  /**
   * When render button as some other JSX Element
   */
  as?: keyof JSX.IntrinsicElements | JSXElementConstructor<any>
  /**
   * Controls the loading state of the button
   */
  loading?: boolean
  /**
   * Text to appear when button is in loading state
   * @default ""
   */
  loadingText?: string
  /**
   * 50% border radius for button
   */
  rounded?: boolean
  /**
   * Renders icon only buttons with unique padding on X axis
   */
  iconOnly?: boolean
}
