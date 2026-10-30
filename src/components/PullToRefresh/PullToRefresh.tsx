import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { PullToRefreshProps } from './PullToRefresh.types'
import { Loader } from '../Loader'
import { buildClassName } from '../../utils/build-classname'

// Resistance applied to the finger's travel, so the pull feels elastic.
const RESISTANCE = 0.45
// Finger travel (px) before deciding whether a gesture is a pull or a sideways swipe.
const AXIS_LOCK_SLOP = 8
// Overlay badge size and the gap it rests at below the container's top edge.
const BADGE_SIZE = 40
const BADGE_TOP_GAP = 10

function PullArrowIcon({ progress, className }: { progress: number; className?: string }) {
  return (
    <svg
      className={className}
      style={{ transform: `rotate(${Math.min(180, progress * 180)}deg)` }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
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

type Axis = 'pending' | 'vertical' | 'horizontal'

export function PullToRefresh({
  onRefresh,
  onError,
  variant = 'push',
  pullThreshold = 70,
  maxPullDistance = 120,
  disabled = false,
  refreshing: externalRefreshing,
  pullingContent,
  refreshingContent,
  pullLabel = 'Pull down to refresh',
  releaseLabel = 'Release to refresh',
  refreshingLabel = 'Refreshing...',
  refreshedLabel = 'Content refreshed',
  children,
  className = '',
  contentClass = '',
}: PullToRefreshProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pullDistance, setPullDistance] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [internalRefreshing, setInternalRefreshing] = useState(false)
  const [announcement, setAnnouncement] = useState('')

  const isRefreshing = externalRefreshing !== undefined ? externalRefreshing : internalRefreshing

  // The touch listeners are attached once, natively (see below), so they read
  // the latest props and state through this ref instead of stale closures.
  const latest = useRef({
    disabled,
    isRefreshing,
    pullThreshold,
    maxPullDistance,
    onRefresh,
    onError,
    refreshedLabel,
  })
  useLayoutEffect(() => {
    latest.current = {
      disabled,
      isRefreshing,
      pullThreshold,
      maxPullDistance,
      onRefresh,
      onError,
      refreshedLabel,
    }
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let mounted = true
    let pulling = false
    let axis: Axis = 'pending'
    let startX = 0
    let startY = 0
    let distance = 0

    const setDistance = (next: number) => {
      distance = next
      setPullDistance(next)
    }

    // Ends a gesture without refreshing: a cancelled touch, a sideways swipe,
    // or content that scrolled away from the top.
    const reset = () => {
      pulling = false
      setIsDragging(false)
      setDistance(0)
    }

    const refresh = async () => {
      const { pullThreshold: threshold, onRefresh: run, onError: report } = latest.current
      setDistance(threshold)
      setInternalRefreshing(true)
      try {
        await run()
        if (mounted) setAnnouncement(latest.current.refreshedLabel)
      } catch (error) {
        report?.(error)
      } finally {
        if (mounted) {
          setInternalRefreshing(false)
          setDistance(0)
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      const { disabled: isDisabled, isRefreshing: busy } = latest.current
      if (isDisabled || busy || container.scrollTop > 0 || e.touches.length !== 1) return
      startX = e.touches[0].clientX ?? 0
      startY = e.touches[0].clientY ?? 0
      axis = 'pending'
      pulling = true
      setAnnouncement('')
      setIsDragging(true)
      setDistance(0)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!pulling) return
      if (latest.current.disabled || latest.current.isRefreshing || container.scrollTop > 0) {
        reset()
        return
      }

      const dx = (e.touches[0]?.clientX ?? 0) - startX
      const dy = (e.touches[0]?.clientY ?? 0) - startY

      if (axis === 'pending') {
        if (Math.abs(dx) < AXIS_LOCK_SLOP && Math.abs(dy) < AXIS_LOCK_SLOP) return
        axis = dy > 0 && Math.abs(dy) > Math.abs(dx) ? 'vertical' : 'horizontal'
        // A sideways swipe or an upward scroll belongs to the content, not to us.
        if (axis === 'horizontal') {
          reset()
          return
        }
      }

      const next = Math.min(latest.current.maxPullDistance, Math.max(0, dy) * RESISTANCE)
      setDistance(next)
      // Needs the non-passive listener: stops the browser's own pull-to-refresh/overscroll.
      if (next > 0 && e.cancelable) e.preventDefault()
    }

    const handleTouchEnd = () => {
      if (!pulling) return
      pulling = false
      setIsDragging(false)
      if (distance >= latest.current.pullThreshold) void refresh()
      else setDistance(0)
    }

    // React registers touch listeners as passive, where preventDefault() is
    // ignored, so these are attached natively with touchmove non-passive.
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)
    container.addEventListener('touchcancel', reset)

    return () => {
      mounted = false
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('touchcancel', reset)
    }
  }, [])

  const progress = Math.min(1, pullDistance / pullThreshold)
  const isReady = pullDistance >= pullThreshold
  const offset = isRefreshing ? pullThreshold : pullDistance
  // Follow the finger exactly while dragging; animate only the settle afterwards.
  const motionClass = isDragging
    ? 'transition-none'
    : 'transition-transform duration-200 ease-out motion-reduce:transition-none'

  return (
    <div
      ref={containerRef}
      className={buildClassName('relative overflow-y-auto overscroll-none', className)}
      data-testid="pull-to-refresh-container"
    >
      <span role="status" aria-live="polite" className="sr-only">
        {isRefreshing ? refreshingLabel : announcement}
      </span>

      {variant === 'overlay' ? (
        <div
          className={buildClassName(
            'pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center',
            motionClass,
          )}
          style={{
            transform: `translateY(${offset - BADGE_SIZE + BADGE_TOP_GAP}px)`,
            opacity: offset > 0 ? 1 : 0,
          }}
          aria-hidden="true"
          data-testid="pull-to-refresh-indicator"
        >
          <div className="grid size-10 place-items-center rounded-full bg-[var(--ui-primary)] text-white shadow-lg">
            {isRefreshing
              ? (refreshingContent ?? <Loader size="xs" className="text-white" />)
              : (pullingContent ?? <PullArrowIcon progress={progress} className="size-4" />)}
          </div>
        </div>
      ) : (
        // Absolutely positioned, so the content's own translate is the only shift.
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-center overflow-hidden"
          style={{ height: `${offset}px`, opacity: offset > 0 ? 1 : 0 }}
          aria-hidden="true"
          data-testid="pull-to-refresh-indicator"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-[var(--ui-border)] shadow-md text-xs font-semibold text-gray-700 dark:text-gray-200">
            {isRefreshing
              ? (refreshingContent ?? (
                  <>
                    <Loader size="sm" />
                    <span>{refreshingLabel}</span>
                  </>
                ))
              : (pullingContent ?? (
                  <>
                    <PullArrowIcon
                      progress={progress}
                      className="size-4 text-[var(--ui-primary)] dark:text-blue-400"
                    />
                    <span>{isReady ? releaseLabel : pullLabel}</span>
                  </>
                ))}
          </div>
        </div>
      )}

      <div
        className={buildClassName(variant === 'push' && motionClass, contentClass)}
        style={variant === 'push' ? { transform: `translateY(${offset}px)` } : undefined}
        data-testid="pull-to-refresh-content"
      >
        {children}
      </div>
    </div>
  )
}

PullToRefresh.displayName = 'PullToRefresh'
