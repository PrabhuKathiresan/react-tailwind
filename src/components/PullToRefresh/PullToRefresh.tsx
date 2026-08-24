import React, { useRef, useState, useCallback } from 'react'
import type { PullToRefreshProps } from './PullToRefresh.types'
import { Loader } from '../Loader'
import { buildClassName } from '../../utils/build-classname'

function PullArrowIcon({ progress }: { progress: number }) {
  const rotation = Math.min(180, progress * 180)
  return (
    <svg
      className="size-4 text-blue-600 dark:text-blue-400 transition-transform duration-150"
      style={{ transform: `rotate(${rotation}deg)` }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  )
}

export function PullToRefresh({
  onRefresh,
  pullThreshold = 70,
  maxPullDistance = 120,
  disabled = false,
  refreshing: externalRefreshing,
  pullingContent,
  refreshingContent,
  children,
  className = '',
  contentClass = '',
}: PullToRefreshProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef<number>(0)
  const isPullingRef = useRef<boolean>(false)

  const [pullDistance, setPullDistance] = useState<number>(0)
  const [internalRefreshing, setInternalRefreshing] = useState<boolean>(false)

  const isRefreshing = externalRefreshing !== undefined ? externalRefreshing : internalRefreshing

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (disabled || isRefreshing) return
      const container = containerRef.current
      if (container && container.scrollTop === 0) {
        startYRef.current = e.touches[0].clientY
        isPullingRef.current = true
      }
    },
    [disabled, isRefreshing],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isPullingRef.current || disabled || isRefreshing) return
      const container = containerRef.current
      if (!container || container.scrollTop > 0) return

      const currentY = e.touches[0].clientY
      const rawDistance = currentY - startYRef.current

      if (rawDistance > 0) {
        // Rubber-band resistance formula
        const dampened = Math.min(maxPullDistance, rawDistance * 0.45)
        setPullDistance(dampened)
        if (e.cancelable) {
          e.preventDefault()
        }
      } else {
        setPullDistance(0)
      }
    },
    [disabled, isRefreshing, maxPullDistance],
  )

  const handleTouchEnd = useCallback(async () => {
    if (!isPullingRef.current || disabled || isRefreshing) return
    isPullingRef.current = false

    if (pullDistance >= pullThreshold) {
      setPullDistance(pullThreshold)
      setInternalRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setInternalRefreshing(false)
        setPullDistance(0)
      }
    } else {
      setPullDistance(0)
    }
  }, [disabled, isRefreshing, onRefresh, pullDistance, pullThreshold])

  const progress = Math.min(1, pullDistance / pullThreshold)
  const isReady = pullDistance >= pullThreshold

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={buildClassName('relative overflow-y-auto overscroll-none', className)}
      data-testid="pull-to-refresh-container"
    >
      {/* Pull / Refresh Indicator Header */}
      <div
        className="left-0 right-0 top-0 flex items-center justify-center pointer-events-none transition-all duration-150 z-20"
        style={{
          height: isRefreshing ? `${pullThreshold}px` : `${pullDistance}px`,
          opacity: pullDistance > 0 || isRefreshing ? 1 : 0,
        }}
        data-testid="pull-to-refresh-indicator"
      >
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-[var(--ui-border)] shadow-md text-xs font-semibold text-gray-700 dark:text-gray-200">
          {isRefreshing ? (
            refreshingContent || (
              <>
                <Loader size="sm" />
                <span>Refreshing...</span>
              </>
            )
          ) : pullingContent ? (
            pullingContent
          ) : (
            <>
              <PullArrowIcon progress={progress} />
              <span>{isReady ? 'Release to refresh' : 'Pull down to refresh'}</span>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className={buildClassName('transition-transform duration-150', contentClass)}
        style={{
          transform: isRefreshing
            ? `translateY(${pullThreshold}px)`
            : pullDistance > 0
              ? `translateY(${pullDistance}px)`
              : 'translateY(0px)',
        }}
        data-testid="pull-to-refresh-content"
      >
        {children}
      </div>
    </div>
  )
}

PullToRefresh.displayName = 'PullToRefresh'
