import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { SwipeableRowProps, SwipeableAction, SwipeableActionTheme } from './SwipeableRow.types'
import { buildClassName } from '../../utils/build-classname'

const themeClasses: Record<SwipeableActionTheme, string> = {
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800',
  warning: 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700',
  info: 'bg-cyan-600 text-white hover:bg-cyan-700 active:bg-cyan-800',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
  gray: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700',
}

export const SwipeableRow: React.FC<SwipeableRowProps> = ({
  children,
  leftActions = [],
  rightActions = [],
  actionWidth = 76,
  threshold = 40,
  fullSwipeToExecute = false,
  fullSwipeThreshold = 180,
  disabled = false,
  className = '',
  contentClassName = '',
  onOpen,
  onClose,
}) => {
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const initialOffsetRef = useRef(0)
  const isHorizontalSwipeRef = useRef<boolean | null>(null)

  const maxLeftWidth = useMemo(() => leftActions.length * actionWidth, [leftActions, actionWidth])
  const maxRightWidth = useMemo(
    () => rightActions.length * actionWidth,
    [rightActions, actionWidth],
  )

  const handleClose = useCallback(() => {
    setOffset(0)
    onClose?.()
  }, [onClose])

  const handleOpenLeft = useCallback(() => {
    if (maxLeftWidth > 0) {
      setOffset(maxLeftWidth)
      onOpen?.('left')
    } else {
      handleClose()
    }
  }, [maxLeftWidth, onOpen, handleClose])

  const handleOpenRight = useCallback(() => {
    if (maxRightWidth > 0) {
      setOffset(-maxRightWidth)
      onOpen?.('right')
    } else {
      handleClose()
    }
  }, [maxRightWidth, onOpen, handleClose])

  const handleDragStart = (clientX: number, clientY: number) => {
    if (disabled) return
    setIsDragging(true)
    startXRef.current = clientX
    startYRef.current = clientY
    initialOffsetRef.current = offset
    isHorizontalSwipeRef.current = null
  }

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging || disabled) return

    const deltaX = clientX - startXRef.current
    const deltaY = clientY - startYRef.current

    // Lock direction once initial movement surpasses 5px
    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        isHorizontalSwipeRef.current = Math.abs(deltaX) > Math.abs(deltaY)
      }
    }

    if (isHorizontalSwipeRef.current === false) {
      return
    }

    let nextOffset = initialOffsetRef.current + deltaX

    // Limit drag range with resistance overscroll
    if (nextOffset > 0) {
      if (!leftActions.length) {
        nextOffset = 0
      } else if (nextOffset > maxLeftWidth && !fullSwipeToExecute) {
        const overflow = nextOffset - maxLeftWidth
        nextOffset = maxLeftWidth + overflow * 0.2
      }
    } else if (nextOffset < 0) {
      if (!rightActions.length) {
        nextOffset = 0
      } else if (Math.abs(nextOffset) > maxRightWidth && !fullSwipeToExecute) {
        const overflow = Math.abs(nextOffset) - maxRightWidth
        nextOffset = -(maxRightWidth + overflow * 0.2)
      }
    }

    setOffset(nextOffset)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (isHorizontalSwipeRef.current === false) {
      return
    }

    // Check full swipe auto-execution
    if (fullSwipeToExecute) {
      if (offset > fullSwipeThreshold && leftActions.length > 0) {
        leftActions[0].onClick()
        handleClose()
        return
      }
      if (offset < -fullSwipeThreshold && rightActions.length > 0) {
        rightActions[0].onClick()
        handleClose()
        return
      }
    }

    // Snap logic
    if (offset > 0) {
      if (offset > threshold) {
        handleOpenLeft()
      } else {
        handleClose()
      }
    } else if (offset < 0) {
      if (Math.abs(offset) > threshold) {
        handleOpenRight()
      } else {
        handleClose()
      }
    }
  }

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragMove(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  // Pointer/Mouse Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    handleDragStart(e.clientX, e.clientY)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    handleDragMove(e.clientX, e.clientY)
  }

  const handlePointerUp = () => {
    handleDragEnd()
  }

  // Close row on click outside if swiped open
  useEffect(() => {
    if (offset === 0) return

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [offset, handleClose])

  const renderActionButton = (action: SwipeableAction) => {
    const themeStyle = themeClasses[action.theme || 'primary']
    return (
      <button
        key={action.id}
        type="button"
        style={{ width: `${actionWidth}px` }}
        onClick={(e) => {
          e.stopPropagation()
          action.onClick()
          handleClose()
        }}
        className={buildClassName(
          'h-full flex flex-col items-center justify-center gap-1 text-xs font-semibold shrink-0 cursor-pointer transition-colors px-2 select-none',
          themeStyle,
          action.className,
        )}
        data-testid={`swipe-action-${action.id}`}
      >
        {action.icon && <span className="shrink-0">{action.icon}</span>}
        {action.label && <span className="truncate max-w-full">{action.label}</span>}
      </button>
    )
  }

  return (
    <div
      ref={containerRef}
      className={buildClassName(
        'relative overflow-hidden rounded-xl border border-[var(--ui-border-muted)] bg-white dark:bg-gray-800 select-none touch-pan-y',
        className,
      )}
      data-testid="swipeable-row"
    >
      {/* Left Actions Revealed on Right Swipe */}
      {leftActions.length > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 flex items-center h-full z-0"
          style={{ width: `${maxLeftWidth}px` }}
          data-testid="swipe-left-actions"
        >
          {leftActions.map(renderActionButton)}
        </div>
      )}

      {/* Right Actions Revealed on Left Swipe */}
      {rightActions.length > 0 && (
        <div
          className="absolute right-0 top-0 bottom-0 flex items-center justify-end h-full z-0"
          style={{ width: `${maxRightWidth}px` }}
          data-testid="swipe-right-actions"
        >
          {rightActions.map(renderActionButton)}
        </div>
      )}

      {/* Main Content Surface */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translateX(${offset}px)`,
          transition: isDragging ? 'none' : 'transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className={buildClassName(
          'relative z-10 w-full bg-white dark:bg-gray-800 shadow-xs cursor-grab active:cursor-grabbing',
          contentClassName,
        )}
        data-testid="swipeable-row-content"
      >
        {children}
      </div>
    </div>
  )
}

SwipeableRow.displayName = 'SwipeableRow'
