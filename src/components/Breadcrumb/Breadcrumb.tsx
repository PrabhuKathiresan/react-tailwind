import React from 'react'
import SlashIcon from '../Icons/Slash.svg'
import { BreadcrumbProps } from './Breadcrumb.types'

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, render }) => {
  const count = items.length
  const isLast = (index: number) => index === count - 1

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2"
      data-testid="breadcrumb-container"
    >
      {items.map((item, index) => (
        <span
          className="inline-flex gap-2 items-center dark:text-white"
          key={item.key}
          data-testid={`breadcrumb-item-${item.key}`}
        >
          <span
            className="font-medium"
            {...(isLast(index) ? { 'aria-current': 'page' as const } : {})}
          >
            {isLast(index) ? item.text : render(item)}
          </span>
          {!isLast(index) && (
            <SlashIcon data-testid={`breadcrumb-divider-${index}`} className="size-4" />
          )}
        </span>
      ))}
    </nav>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
