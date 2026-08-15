import type { HTMLAttributes, ReactNode } from 'react'

export type Detail = {
  /**
   * Label of the information to be displayed
   */
  label: string
  /**
   * Information to be displayed
   */
  value?: ReactNode
  /**
   * Optional icon displayed next to the label
   */
  icon?: ReactNode
  /**
   * Classname of the value content sections
   */
  contentClass?: string
  /**
   * Classname of the label section
   */
  labelClass?: string
  /**
   * Enables hover-to-copy button next to the value
   */
  copyable?: boolean
  /**
   * Custom tooltip / help text to display next to the label
   */
  helpText?: string
  /**
   * Custom fallback value when value is empty or undefined
   */
  emptyValue?: ReactNode
  /**
   * Defines if the item should be hidden.
   */
  hidden?: boolean
}

export interface DetailedInformationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  className?: string
  /**
   * Title for the information section
   */
  title?: ReactNode
  /**
   * Subtitle for the information section
   */
  subTitle?: ReactNode
  /**
   * Action element rendered at the top-right of the header area
   */
  action?: ReactNode
  /**
   * List of details / information to be displayed
   */
  details: Detail[]
  /**
   * Number of grid columns for details layout (1, 2, 3, or 4). Default is 1
   */
  columns?: 1 | 2 | 3 | 4
  /**
   * Direction of label vs value. 'horizontal' (side-by-side) or 'vertical' (stacked). Default is 'horizontal'
   */
  layout?: 'horizontal' | 'vertical'
  /**
   * Visual presentation variant. Default is 'flat'
   */
  variant?: 'flat' | 'bordered' | 'card'
  /**
   * Defines if the layout should be compact
   */
  compact?: boolean
  /**
   * Defines if the section should have borders
   */
  bordered?: boolean
  /**
   * Defines if each item in section should have divider
   */
  divider?: boolean
  /**
   * Default fallback when value is missing or empty. Default is '- -'
   */
  emptyValue?: ReactNode
  /**
   * Classname for title element
   */
  titleClass?: string
  /**
   * Classname for details section
   */
  detailsClass?: string
  /**
   * Classname for label elements
   */
  labelClass?: string
}
