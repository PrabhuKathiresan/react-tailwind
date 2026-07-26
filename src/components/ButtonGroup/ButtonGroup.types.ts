import type { ReactNode } from 'react'
import type { ButtonSize, ButtonTheme, ButtonVariant } from '../Button/Button.types'

/**
 * Layout direction of a ButtonGroup.
 *
 * @default "horizontal"
 */
export type ButtonGroupOrientation = 'horizontal' | 'vertical'

/**
 * ButtonGroup component props.
 */
export interface ButtonGroupProps {
  /**
   * `Button` elements to render as a single joined control.
   *
   * Each child may still set its own `theme`/`variant`/`size`/`className`
   * to override the group's fallback styling (e.g. a colored icon).
   */
  children: ReactNode

  /**
   * Layout direction of the group.
   *
   * - **horizontal** (default): buttons sit side by side, divided by a vertical hairline.
   * - **vertical**: buttons stack top to bottom, divided by a horizontal hairline.
   *
   * @default "horizontal"
   */
  orientation?: ButtonGroupOrientation

  /**
   * Fallback theme applied to child buttons that don't set their own `theme`.
   *
   * @default "secondary"
   */
  theme?: ButtonTheme

  /**
   * Fallback variant applied to child buttons that don't set their own `variant`.
   *
   * @default "default"
   */
  variant?: ButtonVariant

  /**
   * Fallback size applied to child buttons that don't set their own `size`.
   *
   * @default "md"
   */
  size?: ButtonSize

  /**
   * Rounds the group's outer corners into a full pill shape instead of the
   * size-matched corner radius.
   *
   * @default false
   */
  rounded?: boolean

  /**
   * Stretches child buttons to share the group's width (horizontal) or
   * height (vertical) equally.
   *
   * @default false
   */
  fullWidth?: boolean

  /**
   * Accessible label describing the purpose of the group.
   * Rendered as `aria-label` on the `role="group"` container.
   */
  label?: string

  /**
   * Additional classNames merged onto the outer container.
   */
  className?: string
}
