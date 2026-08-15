import type { RadioGroupProps } from '@headlessui/react'

export type RadioSwitchSize = 'sm' | 'md' | 'lg'
export type RadioSwitchTheme = 'primary' | 'secondary' | 'dark'

export type RadioSwitchItem =
  | string
  | {
      label: string
      value: string
      description?: string
      disabled?: boolean
    }

export type RadioSwitchProps = RadioGroupProps & {
  label?: string
  selected: string
  onChange: (value: string) => void
  items: RadioSwitchItem[]
  size?: RadioSwitchSize
  theme?: RadioSwitchTheme
  disabled?: boolean
  switchClass?: string
  wrapperClass?: string
  contentClass?: string
  descriptionClass?: string
}
