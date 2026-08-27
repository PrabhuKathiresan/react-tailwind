import type { JSX, ElementType, ComponentPropsWithoutRef, ReactNode } from 'react'
import type { PolymorphicRef } from '../common-type'

/**
 * Theme variants applied to the Button component.
 *
 * Controls the color scheme of the button.
 *
 * @default "primary"
 */
export type ButtonTheme = 'primary' | 'secondary' | 'danger' | 'success' | 'warning'

/**
 * Visual variant of the button.
 *
 * - **default**: Filled style (solid background)
 * - **outlined**: Transparent background + border
 * - **plain**: Text-only style
 *
 * @default "default"
 */
export type ButtonVariant = 'default' | 'outlined' | 'plain'

/**
 * Predefined Button sizes.
 *
 * Controls padding, font size, and spacing.
 *
 * @default "md"
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

/**
 * Mapping of theme + variant to Tailwind class strings.
 *
 * Internal use only.
 */
export type ThemedButtonClass = {
  [key in ButtonTheme]: {
    [key in ButtonVariant]: string
  }
}

export type PolymorphicButtonProps<C extends ElementType, Props = {}> = Props & {
  /**
   * The element or component to render.
   * @default "button"
   */
  as?: C
} & Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as' | 'type' | 'disabled'>

/**
 * Core props shared by all Button variants.
 */
export interface ButtonBaseProps {
  /**
   * Controls button theme (color palette).
   * @default "primary"
   */
  theme?: ButtonTheme

  /**
   * Controls the visual styling of the button.
   * @default "default"
   */
  variant?: ButtonVariant

  /**
   * Controls padding, font size, spacing.
   * @default "md"
   */
  size?: ButtonSize

  /**
   * Icon displayed on the left side of button text.
   */
  leftIcon?: ReactNode

  /**
   * Icon displayed on the right side of button text.
   */
  rightIcon?: ReactNode

  /**
   * Stretches button to share 100% of container width.
   * @default false
   */
  fullWidth?: boolean

  /**
   * If true, shows a Loader inside the button.
   */
  loading?: boolean

  /**
   * Optional text to display next to the loader.
   * @default ""
   */
  loadingText?: string

  /**
   * Applies 50% border radius, producing a pill-shaped button.
   * @default false
   */
  rounded?: boolean

  /**
   * Indicates that the button only contains an icon.
   * @default false
   */
  iconOnly?: boolean

  /**
   * Prevents outline styles on keyboard focus.
   * @default false
   */
  noOutlineOnFocus?: boolean

  /**
   * Indicates active toggle state (applies aria-pressed).
   * @default false
   */
  active?: boolean

  /**
   * Additional classNames merged with the computed classes.
   */
  className?: string

  /**
   * The HTML button type. Only valid when rendering as <button>.
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * Standard disabled attribute. Only applies when as="button".
   */
  disabled?: boolean
}

export type ButtonProps<C extends ElementType = 'button'> = PolymorphicButtonProps<
  C,
  ButtonBaseProps
>

export interface ButtonComponent {
  <C extends ElementType = 'button'>(
    props: ButtonProps<C> & { ref?: PolymorphicRef<C> },
  ): JSX.Element

  displayName?: string
}
