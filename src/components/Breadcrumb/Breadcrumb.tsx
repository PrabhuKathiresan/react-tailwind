import { forwardRef, useState, type ReactNode } from 'react'
import { buildClassName } from '../../utils/build-classname'
import SlashIcon from '../Icons/Slash.svg'
import type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb.types'

const SIZE_CONTAINER_CLASS: Record<string, string> = {
  sm: 'text-xs gap-1.5',
  md: 'text-sm gap-2',
  lg: 'text-base gap-2.5',
}

const SIZE_ICON_CLASS: Record<string, string> = {
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
}

function RenderSeparator({
  separator,
  size,
  index,
  className,
}: {
  separator: BreadcrumbProps['separator']
  size: 'sm' | 'md' | 'lg'
  index: number
  className?: string
}) {
  const testId = `breadcrumb-divider-${index}`

  if (separator === 'slash' || !separator) {
    return (
      <SlashIcon
        data-testid={testId}
        className={buildClassName(
          SIZE_ICON_CLASS[size] || 'size-3.5',
          'text-gray-400 dark:text-gray-500 shrink-0 select-none',
          className,
        )}
      />
    )
  }

  if (separator === 'chevron') {
    return (
      <svg
        data-testid={testId}
        className={buildClassName(
          SIZE_ICON_CLASS[size] || 'size-3.5',
          'text-gray-400 dark:text-gray-500 shrink-0 select-none',
          className,
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    )
  }

  if (separator === 'dot') {
    return (
      <span
        data-testid={testId}
        className={buildClassName(
          'size-1 rounded-full bg-gray-400 dark:bg-gray-500 shrink-0 select-none mx-0.5',
          className,
        )}
      />
    )
  }

  return (
    <span data-testid={testId} className={buildClassName('shrink-0 select-none', className)}>
      {separator}
    </span>
  )
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>((props, ref) => {
  const {
    items = [],
    render,
    separator = 'slash',
    size = 'md',
    maxItems,
    className,
    itemClass,
    activeItemClass,
    separatorClass,
    ...navProps
  } = props

  const [expanded, setExpanded] = useState(false)
  const count = items.length
  const shouldTruncate = maxItems !== undefined && maxItems > 1 && count > maxItems && !expanded

  const getVisibleItems = () => {
    if (!shouldTruncate) return items
    // Always keep 1st item and last 1-2 items
    const firstItem = items[0]
    const lastItems = items.slice(count - (maxItems - 1))
    return [firstItem, ...lastItems]
  }

  const hiddenItems = shouldTruncate ? items.slice(1, count - (maxItems - 1)) : []
  const visibleItems = getVisibleItems()

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      data-testid="breadcrumb-container"
      className={buildClassName(
        'flex flex-wrap items-center text-gray-600 dark:text-gray-300 font-medium',
        SIZE_CONTAINER_CLASS[size] || SIZE_CONTAINER_CLASS.md,
        className,
      )}
      {...navProps}
    >
      {items.map((item, index) => {
        const isLast = index === count - 1
        const isCollapsedMiddle = shouldTruncate && index > 0 && index < count - (maxItems - 1)

        if (isCollapsedMiddle) {
          if (index === 1) {
            // Render the single '...' collapse pill
            return (
              <span
                key="breadcrumb-collapsed"
                className="inline-flex items-center gap-2 relative group/ellipsis"
              >
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="px-1.5 py-0.5 rounded-md text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
                  aria-label={`Expand ${hiddenItems.length} hidden breadcrumbs`}
                  title={`Show ${hiddenItems.length} hidden levels`}
                >
                  •••
                </button>
                <RenderSeparator
                  separator={separator}
                  size={size}
                  index={index}
                  className={separatorClass}
                />
              </span>
            )
          }
          return null
        }

        const defaultContent = isLast ? (
          <span
            className={buildClassName(
              'text-gray-900 dark:text-white font-semibold',
              activeItemClass,
              item.className,
            )}
          >
            {item.text}
          </span>
        ) : item.to ? (
          <a
            href={item.to}
            className={buildClassName(
              'hover:text-blue-600 dark:hover:text-blue-400 transition-colors',
              itemClass,
              item.className,
            )}
          >
            {item.text}
          </a>
        ) : (
          <span className={buildClassName(itemClass, item.className)}>{item.text}</span>
        )

        return (
          <span
            key={item.key}
            className="inline-flex items-center gap-2"
            data-testid={`breadcrumb-item-${item.key}`}
          >
            <span
              className="inline-flex items-center gap-1.5"
              {...(isLast ? { 'aria-current': 'page' as const } : {})}
            >
              {item.icon && <span className="shrink-0 text-gray-400">{item.icon}</span>}
              {isLast ? (
                defaultContent
              ) : render ? (
                <span className={buildClassName(itemClass, item.className)}>{render(item)}</span>
              ) : (
                defaultContent
              )}
            </span>
            {!isLast && (
              <RenderSeparator
                separator={separator}
                size={size}
                index={index}
                className={separatorClass}
              />
            )}
          </span>
        )
      })}
    </nav>
  )
})

Breadcrumb.displayName = 'Breadcrumb'
