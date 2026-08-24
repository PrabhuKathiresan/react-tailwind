import React, { useState, useRef } from 'react'
import type { SwipeableTabsProps, SwipeableTabItem } from './SwipeableTabs.types'
import { buildClassName } from '../../utils/build-classname'

export function SwipeableTabs({
  items,
  activeId: externalActiveId,
  defaultActiveId,
  onChange,
  swipeable = true,
  threshold = 50,
  headerVariant = 'default',
  containerClass = '',
  headerClass = '',
  contentClass = '',
}: SwipeableTabsProps) {
  const [internalActiveId, setInternalActiveId] = useState<string>(
    defaultActiveId || items[0]?.id || '',
  )

  const activeId = externalActiveId !== undefined ? externalActiveId : internalActiveId
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  )

  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const touchDeltaX = useRef<number>(0)
  const isSwipingHorizontal = useRef<boolean | null>(null)

  const handleTabChange = (item: SwipeableTabItem) => {
    if (item.disabled) return
    setInternalActiveId(item.id)
    onChange?.(item.id)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!swipeable) return
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    touchDeltaX.current = 0
    isSwipingHorizontal.current = null
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!swipeable) return
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    const deltaX = currentX - touchStartX.current
    const deltaY = currentY - touchStartY.current

    if (isSwipingHorizontal.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isSwipingHorizontal.current = Math.abs(deltaX) > Math.abs(deltaY)
      }
    }

    if (isSwipingHorizontal.current) {
      touchDeltaX.current = deltaX
    }
  }

  const handleTouchEnd = () => {
    if (!swipeable || !isSwipingHorizontal.current) return

    const deltaX = touchDeltaX.current
    if (Math.abs(deltaX) >= threshold) {
      if (deltaX < 0 && activeIndex < items.length - 1) {
        // Swiped Left -> Go to Next Tab
        const nextItem = items[activeIndex + 1]
        if (nextItem && !nextItem.disabled) {
          handleTabChange(nextItem)
        }
      } else if (deltaX > 0 && activeIndex > 0) {
        // Swiped Right -> Go to Previous Tab
        const prevItem = items[activeIndex - 1]
        if (prevItem && !prevItem.disabled) {
          handleTabChange(prevItem)
        }
      }
    }

    touchDeltaX.current = 0
    isSwipingHorizontal.current = null
  }

  return (
    <div
      className={buildClassName('w-full flex flex-col', containerClass)}
      data-testid="swipeable-tabs"
    >
      {/* Header Tabs Navigation Bar */}
      <div
        className={buildClassName(
          'w-full flex items-center gap-1 border-b border-[var(--ui-border)] overflow-x-auto no-scrollbar select-none',
          headerVariant === 'segmented' &&
            'p-1 bg-gray-100 dark:bg-gray-800/80 rounded-2xl border-none gap-0',
          headerClass,
        )}
        data-testid="swipeable-tabs-header"
      >
        {items.map((item) => {
          const isActive = item.id === activeId

          if (headerVariant === 'segmented') {
            return (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={() => handleTabChange(item)}
                className={buildClassName(
                  'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer',
                  item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                  isActive
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                )}
                data-testid={`swipeable-tab-btn-${item.id}`}
              >
                {item.icon && <span className="text-sm">{item.icon}</span>}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          }

          if (headerVariant === 'pills') {
            return (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onClick={() => handleTabChange(item)}
                className={buildClassName(
                  'flex items-center justify-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap',
                  item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
                )}
                data-testid={`swipeable-tab-btn-${item.id}`}
              >
                {item.icon && <span className="text-sm">{item.icon}</span>}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-white/20 text-current font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          }

          // Default Underline Tab Header
          return (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={() => handleTabChange(item)}
              className={buildClassName(
                'flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold transition-all duration-150 cursor-pointer relative whitespace-nowrap border-b-2 -mb-px',
                item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                isActive
                  ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
              )}
              data-testid={`swipeable-tab-btn-${item.id}`}
            >
              {item.icon && <span className="text-sm">{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Swipeable Viewport Content Area */}
      <div
        className={buildClassName('w-full overflow-hidden relative touch-pan-y', contentClass)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        data-testid="swipeable-tabs-viewport"
      >
        <div
          className="flex w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          data-testid="swipeable-tabs-track"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full shrink-0 min-w-full"
              data-testid={`swipeable-tab-panel-${item.id}`}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

SwipeableTabs.displayName = 'SwipeableTabs'
