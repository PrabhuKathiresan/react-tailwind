import type { ReactNode } from 'react'

export type BreadcrumbItem = {
  /**
   * Unique key for each breadcrumn item
   */
  key: string
  /**
   * Text content to display
   */
  text: string
  /**
   * Href Link to navigate using breadcrumb
   */
  to?: string
}

export interface BreadcrumbProps {
  /**
   * List of breadcrumb items
   */
  items: BreadcrumbItem[]
  /**
   * Rendered method for breadcrumbItem,
   * This method is called for all items except the last,
   * since, last item in breadcrumb will be the current page of user
   * @param item BreadcrumbItem
   * @returns ReactNode
   */
  render: (item: BreadcrumbItem) => ReactNode
}
