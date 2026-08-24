import React, { useRef, useState, useEffect } from 'react'
import type { WheelPickerProps, WheelPickerColumn, WheelPickerOption } from './WheelPicker.types'
import { buildClassName } from '../../utils/build-classname'

interface SingleColumnProps {
  column: WheelPickerColumn
  itemHeight: number
  height: number
  disabled?: boolean
  onValueChange: (val: string | number) => void
}

function SingleWheelColumn({
  column,
  itemHeight,
  height,
  disabled,
  onValueChange,
}: SingleColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedValue, setSelectedValue] = useState<string | number>(
    column.value !== undefined
      ? column.value
      : column.defaultValue !== undefined
        ? column.defaultValue
        : column.options[0]?.value,
  )

  const isControlled = column.value !== undefined
  const currentValue = isControlled ? column.value : selectedValue

  const selectedIndex = Math.max(
    0,
    column.options.findIndex((opt) => opt.value === currentValue),
  )

  const paddingY = (height - itemHeight) / 2

  // Sync scroll position when active value changes externally
  useEffect(() => {
    if (containerRef.current) {
      const targetScrollTop = selectedIndex * itemHeight
      if (Math.abs(containerRef.current.scrollTop - targetScrollTop) > 2) {
        containerRef.current.scrollTop = targetScrollTop
      }
    }
  }, [selectedIndex, itemHeight])

  const handleScroll = () => {
    if (!containerRef.current || disabled) return
    const scrollTop = containerRef.current.scrollTop
    const index = Math.round(scrollTop / itemHeight)
    const targetOption = column.options[index]

    if (targetOption && targetOption.value !== currentValue && !targetOption.disabled) {
      if (!isControlled) {
        setSelectedValue(targetOption.value)
      }
      column.onChange?.(targetOption.value)
      onValueChange(targetOption.value)
    }
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={buildClassName(
        'flex-1 h-full overflow-y-auto no-scrollbar snap-y snap-mandatory relative z-10 select-none text-center',
        disabled && 'pointer-events-none opacity-40',
      )}
      style={{
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
        scrollSnapType: 'y mandatory',
      }}
      data-testid={`wheel-column-${column.id}`}
    >
      {column.options.map((opt: WheelPickerOption, index: number) => {
        const isSelected = opt.value === currentValue

        return (
          <div
            key={`${opt.value}-${index}`}
            onClick={() => {
              if (disabled || opt.disabled || !containerRef.current) return
              const targetTop = index * itemHeight
              if (typeof containerRef.current.scrollTo === 'function') {
                containerRef.current.scrollTo({
                  top: targetTop,
                  behavior: 'smooth',
                })
              } else {
                containerRef.current.scrollTop = targetTop
              }
            }}
            className={buildClassName(
              'flex items-center justify-center font-semibold snap-center transition-all duration-150 cursor-pointer',
              opt.disabled && 'opacity-30 cursor-not-allowed',
              isSelected
                ? 'text-blue-600 dark:text-blue-400 text-sm font-bold scale-105'
                : 'text-gray-500 dark:text-gray-400 text-xs hover:text-gray-800 dark:hover:text-gray-200',
            )}
            style={{ height: `${itemHeight}px` }}
            data-testid={`wheel-item-${column.id}-${opt.value}`}
          >
            {opt.label}
          </div>
        )
      })}
    </div>
  )
}

export function WheelPicker({
  columns,
  height = 200,
  itemHeight = 40,
  onChange,
  disabled = false,
  containerClass = '',
}: WheelPickerProps) {
  const valuesRef = useRef<Record<string, string | number>>({})

  const handleColumnChange = (columnId: string, value: string | number) => {
    valuesRef.current[columnId] = value
    onChange?.({ ...valuesRef.current })
  }

  const highlightTop = (height - itemHeight) / 2

  return (
    <div
      className={buildClassName(
        'w-full bg-white dark:bg-gray-900 border border-[var(--ui-border)] rounded-2xl relative overflow-hidden flex items-center shadow-xs select-none',
        containerClass,
      )}
      style={{ height: `${height}px` }}
      data-testid="wheel-picker"
    >
      {/* Center Highlight Selection Window */}
      <div
        className="absolute inset-x-2 rounded-xl bg-gray-100/90 dark:bg-gray-800/90 border border-blue-500/20 dark:border-blue-400/20 z-0 pointer-events-none"
        style={{
          height: `${itemHeight}px`,
          top: `${highlightTop}px`,
        }}
        data-testid="wheel-highlight-window"
      />

      {/* Top Gradient Blur Mask */}
      <div
        className="absolute top-0 inset-x-0 bg-gradient-to-b from-white via-white/80 dark:from-gray-900 dark:via-gray-900/80 to-transparent pointer-events-none z-20"
        style={{ height: `${highlightTop}px` }}
      />

      {/* Bottom Gradient Blur Mask */}
      <div
        className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white via-white/80 dark:from-gray-900 dark:via-gray-900/80 to-transparent pointer-events-none z-20"
        style={{ height: `${highlightTop}px` }}
      />

      {/* Wheel Columns Container */}
      <div className="w-full h-full flex items-center justify-around relative z-10 px-2">
        {columns.map((col) => (
          <SingleWheelColumn
            key={col.id}
            column={col}
            itemHeight={itemHeight}
            height={height}
            disabled={disabled}
            onValueChange={(val) => handleColumnChange(col.id, val)}
          />
        ))}
      </div>
    </div>
  )
}

WheelPicker.displayName = 'WheelPicker'
