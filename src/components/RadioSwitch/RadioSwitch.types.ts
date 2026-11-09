export type RadioSwitchSize = 'sm' | 'md' | 'lg'
export type RadioSwitchTheme = 'primary' | 'secondary' | 'dark'

/** An option: its value alone (shown as the label), or with a label, a description and a disabled state. */
export type RadioSwitchItem<T extends string = string> =
  | T
  | {
      /** What the option shows. */
      label: string
      /** What `onChange` receives. */
      value: T
      /** A second, smaller line under the label. */
      description?: string
      /** The option can't be chosen. */
      disabled?: boolean
    }

export interface RadioSwitchProps<T extends string = string> {
  /** Names the group for screen readers, e.g. "Theme". Use `aria-labelledby` instead when a visible heading names it. */
  label?: string
  /** The id of a visible element that names the group. */
  'aria-labelledby'?: string
  /** The id of the group element. */
  id?: string
  /** The chosen option's value. With none matching, the first option takes the Tab stop. */
  selected: T
  /** Called with the chosen option's value, typed as the options' own values. */
  onChange: (value: T) => void
  /** The options, in order. */
  items: RadioSwitchItem<T>[]
  /**
   * Submits the chosen value with a surrounding form under this name.
   */
  name?: string
  /**
   * Option padding and text size.
   * @default 'md'
   */
  size?: RadioSwitchSize
  /**
   * The chosen option's highlight.
   * @default 'primary'
   */
  theme?: RadioSwitchTheme
  /**
   * Turns every option off.
   * @default false
   */
  disabled?: boolean
  /** Classes for the sliding highlight. */
  switchClass?: string
  /** Classes for the group container, e.g. `w-full`. */
  wrapperClass?: string
  /** Classes for each option's content. */
  contentClass?: string
  /** Classes for each option's description line. */
  descriptionClass?: string
}
