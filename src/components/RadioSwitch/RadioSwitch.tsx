import React, { useLayoutEffect, useRef, useState } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type {
  RadioSwitchItem,
  RadioSwitchProps,
  RadioSwitchSize,
  RadioSwitchTheme,
} from './RadioSwitch.types'

const SIZE_CONTAINER_CLASS: Record<RadioSwitchSize, string> = {
  sm: 'p-1.5 gap-1 rounded-lg text-xs',
  md: 'p-2 gap-1.5 rounded-xl text-sm',
  lg: 'p-2 gap-2 rounded-2xl text-base',
}

const SIZE_ITEM_CLASS: Record<RadioSwitchSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-md min-w-[64px]',
  md: 'px-5 py-2.5 text-sm rounded-lg min-w-[76px]',
  lg: 'px-7 py-3 text-base rounded-xl min-w-[92px]',
}

const SIZE_ITEM_DESC_CLASS: Record<RadioSwitchSize, string> = {
  sm: 'px-4 py-2.5 text-xs rounded-md min-w-[80px]',
  md: 'px-5 py-3 text-sm rounded-lg min-w-[96px]',
  lg: 'px-7 py-3.5 text-base rounded-xl min-w-[112px]',
}

const THEME_SWITCH_CLASS: Record<RadioSwitchTheme, string> = {
  primary: 'bg-[var(--ui-primary)] text-white shadow-xs',
  secondary: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-xs',
  dark: 'bg-gray-900 dark:bg-black text-white shadow-xs',
}

export const RadioSwitch: React.FC<RadioSwitchProps> = ({
  label,
  items,
  selected,
  size = 'md',
  theme = 'primary',
  disabled = false,
  onChange,
  wrapperClass,
  switchClass,
  contentClass,
  descriptionClass,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({ left: 0, top: 0, width: 0, height: 0, ready: false })

  const getLabel = (i: RadioSwitchItem) => (typeof i === 'string' ? i : i.label)
  const getValue = (i: RadioSwitchItem) => (typeof i === 'string' ? i : i.value)
  const getDescription = (i: RadioSwitchItem) =>
    typeof i === 'string' ? '' : (i.description ?? '')
  const isItemDisabled = (i: RadioSwitchItem) =>
    disabled || (typeof i === 'string' ? false : Boolean(i.disabled))

  const hasDescription = items.some((i) => typeof i !== 'string' && Boolean(i.description))

  // Position calculation for GPU sliding highlight
  useLayoutEffect(() => {
    if (!containerRef.current) return

    const updatePosition = () => {
      if (!containerRef.current) return

      const activeEl = containerRef.current.querySelector(
        '[data-selected="true"]',
      ) as HTMLElement | null

      if (!activeEl) return

      const parentRect = containerRef.current.getBoundingClientRect()
      const rect = activeEl.getBoundingClientRect()

      const left = activeEl.offsetLeft || rect.left - parentRect.left
      const top = activeEl.offsetTop || rect.top - parentRect.top
      const width = activeEl.offsetWidth || rect.width
      const height = activeEl.offsetHeight || rect.height

      setStyle({
        left,
        top,
        width,
        height,
        ready: true,
      })
    }

    updatePosition()

    const resizeObserver = new ResizeObserver(updatePosition)
    resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()
  }, [selected, items, size])

  // ARIA Keyboard navigation handler
  const handleGroupKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const enabledItems = items.filter((it) => !isItemDisabled(it))
    if (enabledItems.length === 0) return

    const currentVal = selected
    const currentEnabledIndex = enabledItems.findIndex((it) => getValue(it) === currentVal)

    let nextItem: RadioSwitchItem | null = null

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIdx = (currentEnabledIndex + 1) % enabledItems.length
      nextItem = enabledItems[nextIdx]
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIdx = (currentEnabledIndex - 1 + enabledItems.length) % enabledItems.length
      nextItem = enabledItems[prevIdx]
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextItem = enabledItems[0]
    } else if (e.key === 'End') {
      e.preventDefault()
      nextItem = enabledItems[enabledItems.length - 1]
    }

    if (nextItem) {
      onChange(getValue(nextItem))
    }
  }

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      tabIndex={0}
      aria-label={label}
      onKeyDown={handleGroupKeyDown}
      className={buildClassName(
        'relative inline-grid grid-flow-col auto-cols-fr items-stretch bg-gray-100 dark:bg-gray-800/80 border border-gray-200/80 dark:border-gray-700/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-primary-ring)]',
        SIZE_CONTAINER_CLASS[size],
        disabled && 'opacity-60 pointer-events-none',
        wrapperClass,
      )}
    >
      {/* GPU Sliding highlight background */}
      <div
        className={buildClassName(
          'absolute transition-all duration-200 ease-[cubic-bezier(.25,.8,.25,1)] pointer-events-none',
          THEME_SWITCH_CLASS[theme],
          size === 'sm' ? 'rounded-md' : 'rounded-lg',
          style.ready ? 'opacity-100' : 'opacity-0',
          switchClass,
        )}
        style={{
          transform: `translate(${style.left}px, ${style.top}px)`,
          width: style.width,
          height: style.height,
        }}
      />

      {/* Item Buttons */}
      {items.map((item) => {
        const itemVal = getValue(item)
        const isSelected = selected === itemVal
        const disabledState = isItemDisabled(item)

        return (
          <button
            key={itemVal}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={disabledState}
            tabIndex={isSelected && !disabledState ? 0 : -1}
            disabled={disabledState}
            data-radio-item
            data-value={itemVal}
            data-selected={isSelected ? 'true' : undefined}
            onClick={() => {
              if (!disabledState) {
                onChange(itemVal)
              }
            }}
            className={buildClassName(
              'relative z-10 appearance-none m-0 select-none group transition-colors flex flex-col items-center justify-center w-full text-center font-semibold focus:outline-none',
              hasDescription ? SIZE_ITEM_DESC_CLASS[size] : SIZE_ITEM_CLASS[size],
              disabledState ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              isSelected
                ? theme === 'secondary'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-white'
                : buildClassName(
                    'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
                    !disabledState && 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06]',
                  ),
            )}
          >
            {getDescription(item) ? (
              <div
                className={buildClassName(
                  'flex flex-col items-center justify-center gap-1',
                  contentClass,
                )}
              >
                <span className="font-semibold leading-tight text-center truncate">
                  {getLabel(item)}
                </span>
                <span
                  className={buildClassName(
                    'text-[12px] leading-tight opacity-80 font-normal text-center truncate',
                    descriptionClass,
                  )}
                >
                  {getDescription(item)}
                </span>
              </div>
            ) : (
              <span className={buildClassName('truncate leading-tight text-center', contentClass)}>
                {getLabel(item)}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

RadioSwitch.displayName = 'RadioSwitch'
