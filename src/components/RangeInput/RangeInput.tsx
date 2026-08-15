import { forwardRef, useState } from 'react'
import { Label } from '../Label'
import { buildClassName } from '../../utils/build-classname'
import { isEmpty } from '../../utils/is-empty'
import { TextContent } from '../TextContent'
import type { RangeInputProps, RangeInputSize } from './RangeInput.types'

const sizeClasses: Record<RangeInputSize, { track: string; thumb: string; text: string }> = {
  sm: {
    track: 'h-1.5',
    thumb:
      '[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5',
    text: 'text-xs',
  },
  md: {
    track: 'h-2',
    thumb:
      '[&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:w-4.5',
    text: 'text-sm',
  },
  lg: {
    track: 'h-3',
    thumb:
      '[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6',
    text: 'text-base',
  },
}

export const RangeInput = forwardRef<HTMLInputElement, RangeInputProps>((props, ref) => {
  const {
    label,
    labelClass = '',
    labelHint = null,
    containerClass = '',
    className = '',
    size = 'md',
    showValue = true,
    valueSuffix = '',
    showTooltip = false,
    marks,
    error = null,
    helperText,
    showErrorMessage = true,
    id,
    min = 0,
    max = 100,
    value,
    defaultValue,
    onChange,
    ...inputProps
  } = props

  const [hovering, setHovering] = useState(false)
  const [internalValue, setInternalValue] = useState<number>(Number(defaultValue ?? min))

  const isControlled = value !== undefined
  const currentVal = Number(isControlled ? value : internalValue)
  const numMin = Number(min)
  const numMax = Number(max)

  const percent = numMax > numMin ? ((currentVal - numMin) / (numMax - numMin)) * 100 : 0
  const currentSize = sizeClasses[size] || sizeClasses.md
  const hasError = !isEmpty(error)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(Number(e.target.value))
    }
    onChange?.(e)
  }

  // Parse custom marks if object provided
  const markEntries =
    typeof marks === 'object' && marks !== null
      ? Object.entries(marks).map(([k, v]) => ({ value: Number(k), label: v }))
      : typeof marks === 'boolean' && marks
        ? [
            { value: numMin, label: String(numMin) },
            { value: (numMin + numMax) / 2, label: String(Math.round((numMin + numMax) / 2)) },
            { value: numMax, label: String(numMax) },
          ]
        : null

  return (
    <div className={buildClassName('group space-y-2', containerClass)}>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor={id} className={labelClass}>
            {label}
          </Label>
          {labelHint}
        </div>
      )}

      <div className="relative flex items-center gap-3">
        <div className="relative flex-1 py-2">
          {/* Floating Tooltip Popup Badge */}
          {showTooltip && hovering && (
            <div
              className="absolute -top-7 transform -translate-x-1/2 px-2 py-0.5 rounded bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[11px] font-semibold shadow-md pointer-events-none transition-all z-20"
              style={{ left: `${percent}%` }}
            >
              {currentVal}
              {valueSuffix}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
            </div>
          )}

          <input
            ref={ref}
            type="range"
            id={id}
            min={min}
            max={max}
            value={currentVal}
            onChange={handleSliderChange}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            {...inputProps}
            style={{
              background: `linear-gradient(to right, ${hasError ? '#ef4444' : '#2563eb'} 0%, ${
                hasError ? '#ef4444' : '#2563eb'
              } ${percent}%, ${
                document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
              } ${percent}%, ${
                document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
              } 100%)`,
            }}
            className={buildClassName(
              'w-full rounded-lg appearance-none cursor-pointer transition-all',
              currentSize.track,
              currentSize.thumb,
              '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
              '[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:shadow-md',
              hasError
                ? '[&::-webkit-slider-thumb]:border-red-600 [&::-moz-range-thumb]:border-red-600'
                : '[&::-webkit-slider-thumb]:border-blue-600 [&::-moz-range-thumb]:border-blue-600',
              '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:shadow-md',
              className,
            )}
          />

          {/* Tick Marks & Labels */}
          {markEntries && (
            <div className="relative w-full h-4 mt-1">
              {markEntries.map((m) => {
                const markPercent = ((m.value - numMin) / (numMax - numMin)) * 100
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
        </div>

        {showValue && (
          <span
            className={buildClassName(
              'font-medium text-gray-700 dark:text-gray-300 min-w-[3rem] text-right shrink-0',
              currentSize.text,
            )}
          >
            {currentVal}
            {valueSuffix}
          </span>
        )}
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
})

RangeInput.displayName = 'RangeInput'
