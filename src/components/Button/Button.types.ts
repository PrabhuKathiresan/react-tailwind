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
   * Applies a fully rounded border radius, producing a pill-shaped button
   * (or a circle when combined with `iconOnly`).
   * @default false
   */
  rounded?: boolean

  /**
   * Indicates that the button only contains an icon. Requires `aria-label`
   * or `aria-labelledby` so the button has an accessible name.
   * @default false
   */
  iconOnly?: boolean

  /**
   * Removes the focus ring shown on keyboard focus. Only use this when the
   * button gets another visible focus indicator, e.g. via `className`.
   * @default false
   */
  noOutlineOnFocus?: boolean

  /**
   * Turns the button into a toggle: when set to `true` or `false`,
   * `aria-pressed` reflects it and `true` shows a ring. Leave unset for a
   * regular (non-toggle) button.
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
   * Disables the button. Rendered as the native `disabled` attribute on
   * `<button>`, or as `aria-disabled` (with `tabIndex={-1}` and clicks
   * blocked) for any other element passed via `as`.
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
