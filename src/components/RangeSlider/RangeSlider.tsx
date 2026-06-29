import React, { useEffect, useRef, useState } from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import { isEmpty } from '../../utils/is-empty'
import { RangeSliderProps } from './RangeSlider.types'
import { TextContent } from '../TextContent'

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  labelHint,
  labelClass = '',
  containerClass = '',
  className = '',
  min,
  max,
  valueMin,
  valueMax,
  onChange,
  valueSuffix = '',
  error = null,
  showErrorMessage = true,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null)

  // Refs for drag logic
  const activeThumbRef = useRef<'min' | 'max' | null>(null)

  // State for UI styling
  const [activeThumbState, setActiveThumbState] = useState<'min' | 'max' | null>(null)

  // Keep prop values in refs so drag handlers always use latest values (no stale closure)
  const valueMinRef = useRef(valueMin)
  const valueMaxRef = useRef(valueMax)
  const onChangeRef = useRef(onChange)
  valueMinRef.current = valueMin
  valueMaxRef.current = valueMax
  onChangeRef.current = onChange

  const hasError = !isEmpty(error)
  const percent = (v: number) => ((v - min) / (max - min)) * 100

  // Stable handler references registered on window — these never change identity
  // so removeEventListener always finds the right listener to remove.
  const stablePointerMoveRef = useRef((e: PointerEvent) => {
    if (!trackRef.current || !activeThumbRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width)
    const rawVal = min + (x / rect.width) * (max - min)
    if (activeThumbRef.current === 'min') {
      onChangeRef.current(Math.min(rawVal, valueMaxRef.current - 1), valueMaxRef.current)
    } else {
      onChangeRef.current(valueMinRef.current, Math.max(rawVal, valueMinRef.current + 1))
    }
  })

  const stablePointerUpRef = useRef(() => {
    activeThumbRef.current = null
    setActiveThumbState(null)
    window.removeEventListener('pointermove', stablePointerMoveRef.current)
    window.removeEventListener('pointerup', stablePointerUpRef.current)
  })

  // Remove listeners on unmount in case a drag is in progress
  useEffect(() => {
    const move = stablePointerMoveRef.current
    const up = stablePointerUpRef.current
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  // ---------------------------------------------
  // Pointer Move (drag)
  // ---------------------------------------------
  const startDrag = (thumb: 'min' | 'max') => (_e: React.PointerEvent) => {
    activeThumbRef.current = thumb
    setActiveThumbState(thumb)
    window.addEventListener('pointermove', stablePointerMoveRef.current)
    window.addEventListener('pointerup', stablePointerUpRef.current)
  }

  // ---------------------------------------------
  // Click Track to move closest thumb
  // ---------------------------------------------
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width)
    const rawVal = min + (x / rect.width) * (max - min)
    const pxMin = (percent(valueMin) / 100) * rect.width
    const pxMax = (percent(valueMax) / 100) * rect.width

    // If click is left of min thumb → move min thumb
    if (x <= pxMin) {
      onChange(rawVal, valueMax)
      return
    }

    // If click is right of max thumb → move max thumb
    if (x >= pxMax) {
      onChange(valueMin, rawVal)
      return
    }

    // Else click is between → move closest thumb
    const distMin = Math.abs(rawVal - valueMin)
    const distMax = Math.abs(rawVal - valueMax)

    if (distMin < distMax) {
      onChange(rawVal, valueMax)
    } else {
      onChange(valueMin, rawVal)
    }
  }

  return (
    <div className={buildClassName('group space-y-2', hasError && 'has-error', containerClass)}>
      {/* Label */}
      {label && (
        <div className="flex items-center justify-between mb-1">
          <Label className={labelClass}>{label}</Label>
          {labelHint}
        </div>
      )}

      {/* TRACK */}
      <div
        ref={trackRef}
        onMouseDown={handleTrackClick}
        className="relative h-8 select-none w-full"
        data-testid="range-track"
      >
        {/* Track background */}
        <div className="absolute top-1/2 left-0 right-0 h-2 rounded-full bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />

        {/* Highlight active section */}
        <div
          className="absolute top-1/2 h-2 bg-blue-600 dark:bg-blue-500 -translate-y-1/2 rounded-full 
          transition-all duration-150 ease-out"
          style={{
            left: `${percent(valueMin)}%`,
            width: `${percent(valueMax) - percent(valueMin)}%`,
          }}
        />

        {/* MIN THUMB */}
        <div
          onPointerDown={startDrag('min')}
          className={buildClassName(
            'absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full',
            'bg-white border-2 border-blue-600 shadow-md cursor-pointer touch-none',
            'transition-all duration-150 ease-out', // animation
            activeThumbState === 'min' && 'ring-4 ring-blue-200',
            className,
          )}
          style={{
            left: `calc(${percent(valueMin)}% - 10px)`,
            zIndex: activeThumbState === 'min' ? 50 : 30,
          }}
          data-testid="thumb-min"
        />

        {/* MAX THUMB */}
        <div
          onPointerDown={startDrag('max')}
          className={buildClassName(
            'absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full',
            'bg-white border-2 border-blue-600 shadow-md cursor-pointer touch-none',
            'transition-all duration-150 ease-out', // animation
            activeThumbState === 'max' && 'ring-4 ring-blue-200',
            className,
          )}
          style={{
            left: `calc(${percent(valueMax)}% - 10px)`,
            zIndex: activeThumbState === 'max' ? 50 : 40,
          }}
          data-testid="thumb-max"
        />
      </div>

      {/* Numbers */}
      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
        <span>
          {Math.round(valueMin)}
          {valueSuffix}
        </span>
        <span>
          {Math.round(valueMax)}
          {valueSuffix}
        </span>
      </div>

      {/* Error message */}
      {showErrorMessage && hasError && (
        <div className="mt-1">
          <TextContent error small>
            {error}
          </TextContent>
        </div>
      )}
    </div>
  )
}
