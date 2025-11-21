import type { ReactNode } from 'react'

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
   * Classname of the value content sections
   */
  contentClass?: string
  /**
   * Defines if the items should be hidden.
   */
  hidden?: boolean
}

export interface DetailedInformationProps {
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
   * List of details / information to be displayed
   */
  details: Detail[]
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
   * Classname for title element
   */
  titleClass?: string
  /**
   * Classname for details section
   */
  detailsClass?: string
}
