import React, { ReactNode } from 'react'
import SlashIcon from '../Icons/Slash.svg'

export type BreadcrumbItem = {
  /**
   * Unique key for each breadcrumn item
   */
  key: string;
  /**
   * Text content to display
   */
  text: string;
  /**
   * Href Link to navigate using breadcrumb
   */
  to?: string;
}

export interface BreadcrumbProps {
  /**
   * List of breadcrumb items
   */
  items: BreadcrumbItem[];
  /**
   * Rendered method for breadcrumbItem,
   * This method is called for all items except the last,
   * since, last item in breadcrumb will be the current page of user
   * @param item BreadcrumbItem
   * @returns ReactNode
   */
  render: (item: BreadcrumbItem) => ReactNode
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, render }) => {
  const count = items.length;
  const isLast = (index: number) => index === count - 1

  return (
    <div className="flex flex-wrap items-center gap-2">
      {
        items.map((item, index) => (
          <span className="inline-flex gap-2 items-center dark:text-white" key={item.key}>
            {
              isLast(index) ? <span className="font-medium">{item.text}</span>: render(item)
            }
            {
              !isLast(index) && <SlashIcon className="size-4" />
            }
          </span>
        ))
      }
    </div>
  )
}
