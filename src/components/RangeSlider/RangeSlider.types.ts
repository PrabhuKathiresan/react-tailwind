/**
 * Props for the RangeSlider component.
 * A dual-thumb, draggable range selector with support for labels,
 * error display, and smooth animated thumb movement.
 */
export interface RangeSliderProps {
  /**
   * Top label displayed above the slider.
   * Useful for identifying the field in forms.
   */
  label?: string

  /**
   * Optional hint displayed to the right of the label.
   * Often used for contextual help or inline descriptions.
   */
  labelHint?: React.ReactNode

  /**
   * Custom Tailwind classes applied to the label element.
   */
  labelClass?: string

  /**
   * Custom Tailwind classes applied to the outer container
   * that wraps the entire slider component.
   */
  containerClass?: string

  /**
   * Custom Tailwind classes applied to the slider thumbs.
   */
  className?: string

  /**
   * The minimum allowed numeric value of the slider.
   */
  min: number

  /**
   * The maximum allowed numeric value of the slider.
   */
  max: number

  /**
   * The current selected minimum value (left thumb).
   * This makes the component fully controlled.
   */
  valueMin: number

  /**
   * The current selected maximum value (right thumb).
   * This makes the component fully controlled.
   */
  valueMax: number

  /**
   * Callback triggered whenever either thumb moves.
   * Receives the updated min and max values.
   */
  onChange: (min: number, max: number) => void

  /**
   * Optional string appended to displayed values.
   * Example: "kg", "₹", "cm", "hrs", "%".
   */
  valueSuffix?: string

  /**
   * Error message to display below the slider.
   * If provided, the slider is styled with an error state.
   */
  error?: string | null

  /**
   * Whether the error message should be shown.
   * Defaults to true.
   */
  showErrorMessage?: boolean
}
