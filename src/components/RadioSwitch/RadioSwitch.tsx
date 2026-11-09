import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

/**
 * A small set of mutually exclusive options as one pill, with a highlight that
 * slides to the chosen one. A radio group for assistive tech: one Tab stop,
 * the arrow keys (and Home/End) choose and move focus together, and disabled
 * options are skipped.
 */
export const RadioSwitch = <T extends string = string>({
  label,
  'aria-labelledby': labelledBy,
  id,
  items,
  selected,
  name,
  size = 'md',
  theme = 'primary',
  disabled = false,
  onChange,
  wrapperClass,
  switchClass,
  contentClass,
  descriptionClass,
}: RadioSwitchProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ready: false,
    animate: false,
  })
  // The highlight slides only when the choice changes; placing it the first
  // time, or after a resize, is instant rather than sweeping in from a corner.
  const placedFor = useRef<T | null>(null)
  // Set by an arrow key, so focus follows the choice once it re-renders.
  const focusChosen = useRef(false)

  const getLabel = (i: RadioSwitchItem<T>) => (typeof i === 'string' ? i : i.label)
  const getValue = (i: RadioSwitchItem<T>): T => (typeof i === 'string' ? i : i.value)
  const getDescription = (i: RadioSwitchItem<T>) =>
    typeof i === 'string' ? '' : (i.description ?? '')
  const isItemDisabled = (i: RadioSwitchItem<T>) =>
    disabled || (typeof i === 'string' ? false : Boolean(i.disabled))

  const hasDescription = items.some((i) => typeof i !== 'string' && Boolean(i.description))
  const enabledItems = items.filter((it) => !isItemDisabled(it))
  // The one Tab stop: the chosen option, or the first that can be chosen.
  const chosenEnabled = enabledItems.some((it) => getValue(it) === selected)
  const tabStop = chosenEnabled
    ? selected
    : enabledItems[0] !== undefined
      ? getValue(enabledItems[0])
      : undefined

  // Position calculation for GPU sliding highlight
  useLayoutEffect(() => {
    if (!containerRef.current) return

    const updatePosition = () => {
      if (!containerRef.current) return
      const activeEl = containerRef.current.querySelector(
        '[data-selected="true"]',
      ) as HTMLElement | null
      if (!activeEl) {
        placedFor.current = null
        setStyle((current) => (current.ready ? { ...current, ready: false } : current))
        return
      }
      const parentRect = containerRef.current.getBoundingClientRect()
      const rect = activeEl.getBoundingClientRect()
      const animate = placedFor.current !== null && placedFor.current !== selected
      placedFor.current = selected
      setStyle({
        left: activeEl.offsetLeft || rect.left - parentRect.left,
        top: activeEl.offsetTop || rect.top - parentRect.top,
        width: activeEl.offsetWidth || rect.width,
        height: activeEl.offsetHeight || rect.height,
        ready: true,
        animate,
      })
    }

    updatePosition()
    const resizeObserver = new ResizeObserver(() => {
      // A resize re-places the highlight under the same choice, without a slide.
      placedFor.current = selected
      updatePosition()
    })
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [selected, items, size])

  useEffect(() => {
    if (!focusChosen.current) return
    focusChosen.current = false
    containerRef.current?.querySelector<HTMLButtonElement>('[data-selected="true"]')?.focus()
  }, [selected])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (enabledItems.length === 0) return
    const currentIndex = enabledItems.findIndex((it) => getValue(it) === selected)
    let next: RadioSwitchItem<T> | undefined

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = enabledItems[(currentIndex + 1) % enabledItems.length]
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next =
        enabledItems[(Math.max(currentIndex, 0) - 1 + enabledItems.length) % enabledItems.length]
    } else if (e.key === 'Home') {
      next = enabledItems[0]
    } else if (e.key === 'End') {
      next = enabledItems[enabledItems.length - 1]
    }
    if (next === undefined) return

    e.preventDefault()
    const value = getValue(next)
    if (value === selected) return
    focusChosen.current = true
    onChange(value)
  }

  return (
    <div
      ref={containerRef}
      id={id}
      role="radiogroup"
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      aria-disabled={disabled || undefined}
      onKeyDown={handleKeyDown}
      className={buildClassName(
        'relative inline-grid grid-flow-col auto-cols-fr items-stretch bg-gray-100 dark:bg-gray-800/80 border border-[var(--ui-border)]',
        SIZE_CONTAINER_CLASS[size],
        disabled && 'opacity-60',
        wrapperClass,
      )}
    >
      {name && <input type="hidden" name={name} value={selected} />}

      {/* GPU Sliding highlight background */}
      <div
        aria-hidden="true"
        className={buildClassName(
          'absolute left-0 top-0 pointer-events-none will-change-transform',
          // One curve and length for the highlight and the labels' colour, so
          // a label turns light as the highlight arrives under it, not before.
          style.animate &&
            'transition-[transform,width,height] duration-300 ease-[cubic-bezier(.32,.72,0,1)] motion-reduce:transition-none',
          THEME_SWITCH_CLASS[theme],
          size === 'sm' ? 'rounded-md' : 'rounded-lg',
          style.ready ? 'opacity-100' : 'opacity-0',
          switchClass,
        )}
        style={{
          transform: `translate3d(${style.left}px, ${style.top}px, 0)`,
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
            tabIndex={itemVal === tabStop ? 0 : -1}
            disabled={disabledState}
            data-radio-item
            data-value={itemVal}
            data-selected={isSelected ? 'true' : undefined}
            onClick={() => {
              if (!disabledState && !isSelected) onChange(itemVal)
            }}
            className={buildClassName(
              'relative z-10 appearance-none m-0 select-none group flex flex-col items-center justify-center w-full text-center font-semibold',
              'transition-[color,background-color,transform] duration-300 ease-[cubic-bezier(.32,.72,0,1)] motion-reduce:transition-none',
              // A light press, so a tap registers before the highlight lands.
              !disabledState && 'active:scale-[0.97]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-primary-ring)]',
              size === 'sm' ? 'rounded-md' : 'rounded-lg',
              hasDescription ? SIZE_ITEM_DESC_CLASS[size] : SIZE_ITEM_CLASS[size],
              disabledState ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              // Until the highlight has measured itself (first paint, or no
              // layout), the chosen option carries its colour, so its text
              // never sits unreadable on the track.
              isSelected && !style.ready && THEME_SWITCH_CLASS[theme],
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
