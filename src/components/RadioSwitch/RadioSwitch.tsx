import React, { useEffect, useRef, useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import type { RadioSwitchItem, RadioSwitchProps } from './RadioSwitch.types'
import { BodyText } from '../BodyText'

/**
 * GPU-accelerated Radio Switch with perfect highlight alignment.
 * Supports wrapping, icons, descriptions, and dark mode.
 */
export const RadioSwitch: React.FC<RadioSwitchProps> = ({
  label,
  items,
  selected,
  onChange,
  wrapperClass,
  switchClass,
  contentClass,
  descriptionClass,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({ left: 0, top: 0, width: 0, height: 0 })

  const getLabel = (i: RadioSwitchItem) => (typeof i === 'string' ? i : i.label)

  const getValue = (i: RadioSwitchItem) => (typeof i === 'string' ? i : i.value)

  const getDescription = (i: RadioSwitchItem) =>
    typeof i === 'string' ? '' : (i.description ?? '')

  /** ---------------------------------------------
   * Update highlight when selected changes
   * ----------------------------------------------*/
  useEffect(() => {
    if (!containerRef.current) return

    const buttons = Array.from(
      containerRef.current.querySelectorAll('[data-radio-item]'),
    ) as HTMLElement[]

    const el = buttons.find((b) => b.dataset.value === selected)
    if (!el) return

    const rect = el.getBoundingClientRect()
    const parentRect = containerRef.current.getBoundingClientRect()

    const left = rect.left - parentRect.left
    const top = rect.top - parentRect.top

    setStyle({
      left,
      top,
      width: rect.width,
      height: rect.height,
    })
  }, [selected, items])

  return (
    <RadioGroup
      value={selected}
      onChange={onChange}
      aria-label={label}
      ref={containerRef}
      className={buildClassName(
        'relative flex flex-wrap gap-1',
        'transition-colors duration-200 overflow-hidden',
        wrapperClass,
      )}
    >
      {/* Sliding highlight — GPU optimized */}
      <div
        className={buildClassName(
          'absolute rounded-md bg-blue-600 dark:bg-blue-500',
          'transition-transform transition-size duration-300 ease-[cubic-bezier(.25,.8,.25,1)]',
          switchClass,
        )}
        style={{
          transform: `translate(${style.left}px, ${style.top}px)`,
          width: style.width,
          height: style.height,
        }}
      />

      {/* Items */}
      {items.map((item) => (
        <Radio
          key={getValue(item)}
          value={getValue(item)}
          data-radio-item
          data-value={getValue(item)}
          className={buildClassName(
            'relative z-10 cursor-pointer select-none group',
            'px-4 py-2 rounded-md transition-colors',
            'text-gray-700 dark:text-gray-300 data-checked:text-white',
          )}
        >
          <div
            className={buildClassName(
              'flex flex-col items-center justify-center gap-1',
              contentClass,
            )}
          >
            <BodyText className="font-semibold">{getLabel(item)}</BodyText>

            {getDescription(item) && (
              <BodyText className={buildClassName('text-xs opacity-80', descriptionClass)}>
                {getDescription(item)}
              </BodyText>
            )}
          </div>
        </Radio>
      ))}
    </RadioGroup>
  )
}
