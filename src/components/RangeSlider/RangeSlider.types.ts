import type { ReactNode } from 'react'

export type RangeSliderSize = 'sm' | 'md' | 'lg'

/**
 * Props for the RangeSlider component.
 * A dual-thumb, draggable range selector with support for labels,
 * step increments, marks, tooltips, keyboard navigation, and error display.
 */
export interface RangeSliderProps {
  /**
   * Top label displayed above the slider.
   */
  label?: string

  /**
   * Optional hint displayed to the right of the label.
   */
  labelHint?: ReactNode

  /**
   * Custom Tailwind classes applied to the label element.
   */
  labelClass?: string

  /**
   * Custom Tailwind classes applied to the outer container.
   */
  containerClass?: string

  /**
   * Custom Tailwind classes applied to the slider thumbs.
   */
  className?: string

  /**
   * Size scale of the range slider (`"sm"` | `"md"` | `"lg"`). Defaults to `"md"`.
   */
  size?: RangeSliderSize

  /**
   * The minimum allowed numeric value of the slider.
   */
  min: number

  /**
   * The maximum allowed numeric value of the slider.
   */
  max: number

  /**
   * Step increment precision for thumbs (e.g. `1`, `5`, `10`, `0.5`).
   * Defaults to `1`.
   */
  step?: number

  /**
   * The current selected minimum value (left thumb).
   */
  valueMin: number

  /**
   * The current selected maximum value (right thumb).
   */
  valueMax: number

  /**
   * Callback triggered whenever either thumb moves.
   */
  onChange: (min: number, max: number) => void

  /**
   * Optional string appended to displayed values (e.g. `"kg"`, `"₹"`, `"%"`, `"hrs"`).
   */
  valueSuffix?: string

  /**
   * Floating value tooltip popups displayed above active thumbs on drag or hover.
   */
  showTooltips?: boolean

  /**
   * Custom tick marks and labels displayed along slider track (e.g. `{ 0: '$0', 50: '$50', 100: '$100' }`).
   */
  marks?: Record<number, string>

  /**
   * Error message to display below the slider.
   */
  error?: string | ReactNode

  /**
   * Guidance helper text rendered below the slider.
   */
  helperText?: ReactNode

  /**
   * Whether the error message should be shown.
   * Defaults to true.
   */
  showErrorMessage?: boolean
}
