import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import { isEmpty } from '../../utils/is-empty'
import type { RangeSliderProps, RangeSliderSize } from './RangeSlider.types'
import { TextContent } from '../TextContent'

const sizeClasses: Record<
  RangeSliderSize,
  { track: string; thumb: string; thumbPx: number; text: string }
> = {
  sm: {
    track: 'h-1.5',
    thumb: 'h-4 w-4',
    thumbPx: 16,
    text: 'text-xs',
  },
  md: {
    track: 'h-2',
    thumb: 'h-5 w-5',
    thumbPx: 20,
    text: 'text-sm',
  },
  lg: {
    track: 'h-3',
    thumb: 'h-6 w-6',
    thumbPx: 24,
    text: 'text-base',
  },
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  labelHint,
  labelClass = '',
  containerClass = '',
  className = '',
  size = 'md',
  min,
  max,
  step = 1,
  valueMin,
  valueMax,
  onChange,
  valueSuffix = '',
  showTooltips = false,
  marks,
  error = null,
  helperText,
  showErrorMessage = true,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const activeThumbRef = useRef<'min' | 'max' | null>(null)
  const [activeThumbState, setActiveThumbState] = useState<'min' | 'max' | null>(null)
  const [hoveringThumb, setHoveringThumb] = useState<'min' | 'max' | null>(null)

  const valueMinRef = useRef(valueMin)
  const valueMaxRef = useRef(valueMax)
  const onChangeRef = useRef(onChange)
  valueMinRef.current = valueMin
  valueMaxRef.current = valueMax
  onChangeRef.current = onChange

  const hasError = !isEmpty(error)
  const currentSize = sizeClasses[size] || sizeClasses.md

  const clampValue = (val: number) => Math.min(Math.max(val, min), max)
  const snapToStep = (val: number) => {
    const clamped = clampValue(val)
    const steps = Math.round((clamped - min) / step)
    return Math.min(Math.max(min + steps * step, min), max)
  }

  const percent = (v: number) => ((clampValue(v) - min) / (max - min)) * 100

  const stablePointerMoveRef = useRef((e: PointerEvent) => {
    if (!trackRef.current || !activeThumbRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width)
    const rawVal = min + (x / rect.width) * (max - min)
    const snappedVal = snapToStep(rawVal)

    if (activeThumbRef.current === 'min') {
      const nextMin = Math.min(snappedVal, valueMaxRef.current - step)
      onChangeRef.current(nextMin, valueMaxRef.current)
    } else {
      const nextMax = Math.max(snappedVal, valueMinRef.current + step)
      onChangeRef.current(valueMinRef.current, nextMax)
    }
  })

  const stablePointerUpRef = useRef(() => {
    activeThumbRef.current = null
    setActiveThumbState(null)
    window.removeEventListener('pointermove', stablePointerMoveRef.current)
    window.removeEventListener('pointerup', stablePointerUpRef.current)
  })

  useEffect(() => {
    const move = stablePointerMoveRef.current
    const up = stablePointerUpRef.current
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  const startDrag = (thumb: 'min' | 'max') => (_e: React.PointerEvent) => {
    activeThumbRef.current = thumb
    setActiveThumbState(thumb)
    window.addEventListener('pointermove', stablePointerMoveRef.current)
    window.addEventListener('pointerup', stablePointerUpRef.current)
  }

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width)
    const rawVal = min + (x / rect.width) * (max - min)
    const snappedVal = snapToStep(rawVal)

    const pxMin = (percent(valueMin) / 100) * rect.width
    const pxMax = (percent(valueMax) / 100) * rect.width

    if (x <= pxMin) {
      onChange(Math.min(snappedVal, valueMax - step), valueMax)
      return
    }

    if (x >= pxMax) {
      onChange(valueMin, Math.max(snappedVal, valueMin + step))
      return
    }

    const distMin = Math.abs(snappedVal - valueMin)
    const distMax = Math.abs(snappedVal - valueMax)

    if (distMin < distMax) {
      onChange(Math.min(snappedVal, valueMax - step), valueMax)
    } else {
      onChange(valueMin, Math.max(snappedVal, valueMin + step))
    }
  }

  // Keyboard accessibility handler for thumbs
  const handleKeyDown = (thumb: 'min' | 'max') => (e: React.KeyboardEvent) => {
    let delta = 0
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -step
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = step
    else if (e.key === 'Home') {
      if (thumb === 'min') onChange(min, valueMax)
      else onChange(valueMin, valueMin + step)
      return
    } else if (e.key === 'End') {
      if (thumb === 'min') onChange(valueMax - step, valueMax)
      else onChange(valueMin, max)
      return
    }

    if (delta !== 0) {
      e.preventDefault()
      if (thumb === 'min') {
        const next = snapToStep(valueMin + delta)
        onChange(Math.min(next, valueMax - step), valueMax)
      } else {
        const next = snapToStep(valueMax + delta)
        onChange(valueMin, Math.max(next, valueMin + step))
      }
    }
  }

  const markEntries = marks
    ? Object.entries(marks).map(([k, v]) => ({ value: Number(k), label: v }))
    : null

  return (
    <div className={buildClassName('group space-y-2', hasError && 'has-error', containerClass)}>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <Label className={labelClass}>{label}</Label>
          {labelHint}
        </div>
      )}

      {/* TRACK CONTAINER */}
      <div
        ref={trackRef}
        onMouseDown={handleTrackClick}
        className="relative h-8 select-none w-full flex items-center cursor-pointer"
        data-testid="range-track"
      >
        {/* Track background */}
        <div
          className={buildClassName(
            'absolute top-1/2 left-0 right-0 rounded-full bg-gray-200 dark:bg-gray-700 -translate-y-1/2',
            currentSize.track,
          )}
        />

        {/* Highlight active range section */}
        <div
          className={buildClassName(
            'absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out',
            hasError ? 'bg-red-500' : 'bg-blue-600 dark:bg-blue-500',
            currentSize.track,
          )}
          style={{
            left: `${percent(valueMin)}%`,
            width: `${percent(valueMax) - percent(valueMin)}%`,
          }}
        />

        {/* MIN THUMB */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Minimum value"
          aria-valuenow={valueMin}
          aria-valuemin={min}
          aria-valuemax={valueMax - step}
          onPointerDown={startDrag('min')}
          onMouseEnter={() => setHoveringThumb('min')}
          onMouseLeave={() => setHoveringThumb(null)}
          onKeyDown={handleKeyDown('min')}
          className={buildClassName(
            'absolute top-1/2 -translate-y-1/2 rounded-full focus:outline-none',
            'bg-white border-2 shadow-md cursor-pointer touch-none',
            hasError ? 'border-red-600' : 'border-blue-600',
            'transition-all duration-150 ease-out',
            currentSize.thumb,
            (activeThumbState === 'min' || hoveringThumb === 'min') &&
              (hasError ? 'ring-4 ring-red-200' : 'ring-4 ring-blue-200'),
            className,
          )}
          style={{
            left: `calc(${percent(valueMin)}% - ${currentSize.thumbPx / 2}px)`,
            zIndex: activeThumbState === 'min' ? 50 : 30,
          }}
          data-testid="thumb-min"
        >
          {/* Floating Tooltip Min */}
          {showTooltips && (activeThumbState === 'min' || hoveringThumb === 'min') && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[11px] font-semibold shadow-md pointer-events-none z-50 whitespace-nowrap">
              {Math.round(valueMin)}
              {valueSuffix}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
            </div>
          )}
        </div>

        {/* MAX THUMB */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Maximum value"
          aria-valuenow={valueMax}
          aria-valuemin={valueMin + step}
          aria-valuemax={max}
          onPointerDown={startDrag('max')}
          onMouseEnter={() => setHoveringThumb('max')}
          onMouseLeave={() => setHoveringThumb(null)}
          onKeyDown={handleKeyDown('max')}
          className={buildClassName(
            'absolute top-1/2 -translate-y-1/2 rounded-full focus:outline-none',
            'bg-white border-2 shadow-md cursor-pointer touch-none',
            hasError ? 'border-red-600' : 'border-blue-600',
            'transition-all duration-150 ease-out',
            currentSize.thumb,
            (activeThumbState === 'max' || hoveringThumb === 'max') &&
              (hasError ? 'ring-4 ring-red-200' : 'ring-4 ring-blue-200'),
            className,
          )}
          style={{
            left: `calc(${percent(valueMax)}% - ${currentSize.thumbPx / 2}px)`,
            zIndex: activeThumbState === 'max' ? 50 : 40,
          }}
          data-testid="thumb-max"
        >
          {/* Floating Tooltip Max */}
          {showTooltips && (activeThumbState === 'max' || hoveringThumb === 'max') && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[11px] font-semibold shadow-md pointer-events-none z-50 whitespace-nowrap">
              {Math.round(valueMax)}
              {valueSuffix}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
            </div>
          )}
        </div>
      </div>

      {/* Step Marks & Labels */}
      {markEntries && (
        <div className="relative w-full h-4 mt-1">
          {markEntries.map((m) => {
            const markPercent = percent(m.value)
            return (
              <div
                key={m.value}
                className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${markPercent}%` }}
              >
                <span className="w-1 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 mt-0.5">
                  {m.label}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Number Range Indicators */}
      <div
        className={buildClassName(
          'flex justify-between font-medium text-gray-700 dark:text-gray-300',
          currentSize.text,
        )}
      >
        <span>
          {Math.round(valueMin)}
          {valueSuffix}
        </span>
        <span>
          {Math.round(valueMax)}
          {valueSuffix}
        </span>
      </div>

      {/* Footer Error or Helper Text */}
      {(showErrorMessage && hasError) || helperText ? (
        <div className="mt-1">
          {showErrorMessage && hasError ? (
            <TextContent error small>
              {error}
            </TextContent>
          ) : helperText ? (
            <TextContent muted small>
              {helperText}
            </TextContent>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

RangeSlider.displayName = 'RangeSlider'
