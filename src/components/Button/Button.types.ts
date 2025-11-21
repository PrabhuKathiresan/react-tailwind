import type { JSX, ElementType, ComponentPropsWithoutRef } from 'react'

/**
 * Theme variants applied to the Button component.
 *
 * Controls the color scheme of the button.
 *
 * @default "primary"
 */
export type ButtonTheme = 'primary' | 'secondary' | 'danger'

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

/**
 * Utility: Extract the correct `ref` type for intrinsic elements
 * or custom React components.
 */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithoutRef<C>['ref']

/**
 * Utility: Builds a polymorphic prop type.
 *
 * This allows the component to accept **any HTML element** or **any custom React component**
 * via the `as` prop while automatically inheriting the correct props.
 *
 * Example:
 * ```tsx
 * <Button as="a" href="/home" />
 * <Button as={MyLink} to="/home" customProp />
 * ```
 */
export type PolymorphicButtonProps<C extends ElementType, Props = {}> = Props & {
  /**
   * The element or component to render.
   *
   * Supports:
   * - HTML elements (e.g., `"button"`, `"a"`, `"div"`)
   * - React components (e.g., `Link`, `NextLink`, `MyCustomButton`)
   *
   * @default "button"
   */
  as?: C
} & Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as' | 'type' | 'disabled'>

/**
 * Core props shared by all Button variants.
 *
 * These do **not** include any HTML attributes — those come from the polymorphic type.
 */
export interface ButtonBaseProps {
  /**
   * Controls button theme (color palette).
   *
   * @default "primary"
   */
  theme?: ButtonTheme

  /**
   * Controls the visual styling of the button.
   *
   * @default "default"
   */
  variant?: ButtonVariant

  /**
   * Controls padding, font size, spacing.
   *
   * @default "md"
   */
  size?: ButtonSize

  /**
   * If true, shows a Loader inside the button.
   *
   * While loading:
   * - children are replaced
   * - button typically becomes disabled
   */
  loading?: boolean

  /**
   * Optional text to display next to the loader.
   *
   * Only shown when `loading=true`.
   *
   * @default ""
   */
  loadingText?: string

  /**
   * Applies 50% border radius, producing a pill-shaped button.
   *
   * @default false
   */
  rounded?: boolean

  /**
   * Indicates that the button only contains an icon.
   *
   * Adjusts padding to match icon-only UX.
   *
   * @default false
   */
  iconOnly?: boolean

  /**
   * Prevents outline styles on keyboard focus.
   *
   * Useful for icon buttons or custom focus handling.
   *
   * @default false
   */
  noOutlineOnFocus?: boolean

  /**
   * Additional classNames merged with the computed classes.
   */
  className?: string

  /**
   * The HTML button type.
   * Only valid when rendering as <button>.
   */
  type?: 'button' | 'submit' | 'reset'

  /**
   * Standard disabled attribute.
   * Only applies when as="button".
   */
  disabled?: boolean
}

/**
 * Complete Button props,
 * supporting **polymorphic rendering** via the `as` prop.
 *
 * Examples:
 *
 * Render as a native button:
 * ```tsx
 * <Button type="submit">Save</Button>
 * ```
 *
 * Render as a link:
 * ```tsx
 * <Button as="a" href="/pricing" target="_blank">Learn More</Button>
 * ```
 *
 * Render as a custom component:
 * ```tsx
 * <Button as={MyCustomComponent} customProp="123">Custom</Button>
 * ```
 */
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
