import type { HTMLAttributes, ReactNode } from 'react'

export type BreadcrumbItem = {
  /**
   * Unique key for each breadcrumb item
   */
  key: string
  /**
   * Text content to display
   */
  text: string
  /**
   * Href link for navigation
   */
  to?: string
  /**
   * Optional icon displayed before the text label
   */
  icon?: ReactNode
  /**
   * Additional custom class for the item element
   */
  className?: string
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /**
   * List of breadcrumb items
   */
  items: BreadcrumbItem[]
  /**
   * Custom render method for breadcrumb items.
   * If omitted, defaults to standard <a href={item.to}>{item.text}</a>
   */
  render?: (item: BreadcrumbItem) => ReactNode
  /**
   * Separator icon or variant ('slash' | 'chevron' | 'dot' | ReactNode). Default is 'slash'
   */
  separator?: 'slash' | 'chevron' | 'dot' | ReactNode
  /**
   * Size variant ('sm' | 'md' | 'lg'). Default is 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Maximum number of items to display before collapsing middle items into a '...' dropdown menu
   */
  maxItems?: number
  /**
   * Additional container class name
   */
  className?: string
  /**
   * Custom class name applied to non-active ancestor links
   */
  itemClass?: string
  /**
   * Custom class name applied to the active current page item
   */
  activeItemClass?: string
  /**
   * Custom class name applied to separator elements
   */
  separatorClass?: string
}
