import type { ComponentPropsWithoutRef, ElementType, JSX } from 'react'
import { PolymorphicRef } from '../common-type'

export type CardBaseProps = {
  /**
   * Make card hoverable (adds background transitions)
   * @default false
   */
  hoverable?: boolean

  /**
   * Adds border around the card
   * @default true
   */
  bordered?: boolean

  /**
   * Make card compact
   * @default false
   */
  compact?: boolean
}

/**
 * Utility: Builds a polymorphic prop type.
 *
 * This allows the component to accept **any HTML element** or **any custom React component**
 * via the `as` prop while automatically inheriting the correct props.
 *
 * Example:
 * ```tsx
 * <Card as="a" href="/home" />
 * <Card as={MyLink} to="/home" customProp />
 * ```
 */
export type PolymorphicCardProps<C extends ElementType, Props = {}> = Props & {
  /**
   * The element or component to render.
   *
   * Supports:
   * - HTML elements (e.g., `"a"`, `"div"`)
   * - React components (e.g., `Link`, `NextLink`, `MyCustomCard`)
   *
   * @default "div"
   */
  as?: C
} & Omit<ComponentPropsWithoutRef<C>, keyof Props | 'as'>

/**
 * Complete Card props,
 * supporting **polymorphic rendering** via the `as` prop.
 *
 * Examples:
 *
 * Render as a native card:
 * ```tsx
 * <Card>Card content</Card>
 * ```
 *
 * Render as a link:
 * ```tsx
 * <Card as="a" href="/pricing" target="_blank">Learn More</Card>
 * ```
 *
 * Render as a custom component:
 * ```tsx
 * <Card as={MyCustomComponent} customProp="123">Custom card content</Card>
 * ```
 */
export type CardProps<C extends ElementType = 'div'> = PolymorphicCardProps<C, CardBaseProps>

export interface CardComponent {
  <C extends ElementType = 'div'>(props: CardProps<C> & { ref?: PolymorphicRef<C> }): JSX.Element

  displayName?: string
}
