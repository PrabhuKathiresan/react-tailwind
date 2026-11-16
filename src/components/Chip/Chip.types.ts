import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export type ChipSize = 'sm' | 'md'

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * Whether the chip is chosen. Announced as a pressed toggle (`aria-pressed`).
   * @default false
   */
  selected?: boolean
  /**
   * Size variant controlling height, padding and text size.
   * @default "sm"
   */
  size?: ChipSize
  /**
   * Optional icon rendered before the label.
   */
  icon?: ReactNode
}

export interface ChipGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Names the group for screen readers (or pass `aria-labelledby`).
   */
  label?: string
  /**
   * Lets the chips wrap onto more lines instead of staying on one.
   * @default false
   */
  wrap?: boolean
}
