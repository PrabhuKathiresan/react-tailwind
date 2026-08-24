import React, { useRef, useState, useEffect } from 'react'
import type { PinInputProps } from './PinInput.types'
import { buildClassName } from '../../utils/build-classname'

export function PinInput({
  length = 4,
  value: externalValue,
  onChange,
  onComplete,
  mask = false,
  size = 'md',
  type = 'numeric',
  error,
  disabled = false,
  autoFocus = false,
  containerClass = '',
  inputClass = '',
}: PinInputProps) {
  const [internalValue, setInternalValue] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const pinValue = externalValue !== undefined ? externalValue : internalValue
  const digits = Array.from({ length }, (_, i) => pinValue[i] || '')

  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus, disabled])

  const updatePin = (newDigits: string[]) => {
    const newPin = newDigits.join('').slice(0, length)
    setInternalValue(newPin)
    onChange?.(newPin)

    if (newPin.length === length) {
      onComplete?.(newPin)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const char = e.target.value.slice(-1)
    if (!char) return

    const isValid = type === 'numeric' ? /^[0-9]$/.test(char) : /^[a-zA-Z0-9]$/.test(char)

    if (!isValid) return

    const nextDigits = [...digits]
    nextDigits[index] = char
    updatePin(nextDigits)

    if (index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0 && inputRefs.current[index - 1]) {
        const nextDigits = [...digits]
        nextDigits[index - 1] = ''
        updatePin(nextDigits)
        inputRefs.current[index - 1]?.focus()
      } else if (digits[index]) {
        const nextDigits = [...digits]
        nextDigits[index] = ''
        updatePin(nextDigits)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (disabled) return

    const pastedData = e.clipboardData.getData('text').trim()
    const regex = type === 'numeric' ? /[0-9]/g : /[a-zA-Z0-9]/g
    const matchedChars = pastedData.match(regex) || []

    if (matchedChars.length === 0) return

    const nextDigits = Array.from({ length }, (_, i) => matchedChars[i] || '')
    updatePin(nextDigits)

    const focusIndex = Math.min(matchedChars.length, length) - 1
    const targetRef = inputRefs.current[focusIndex >= 0 ? focusIndex : 0]
    targetRef?.focus()
  }

  const sizeClasses = {
    sm: 'size-9 text-sm rounded-lg',
    md: 'size-11 text-base rounded-xl',
    lg: 'size-14 text-lg rounded-2xl',
  }[size]

  return (
    <div
      className={buildClassName('space-y-1.5', containerClass)}
      data-testid="pin-input-container"
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        {digits.map((digit, index) => {
          const isFilled = Boolean(digit)

          return (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type={mask ? 'password' : 'text'}
              inputMode={type === 'numeric' ? 'numeric' : 'text'}
              pattern={type === 'numeric' ? '[0-9]*' : undefined}
              maxLength={1}
              value={digit}
              disabled={disabled}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className={buildClassName(
                'text-center font-bold transition-all duration-150 outline outline-1 -outline-offset-1 select-none',
                sizeClasses,
                disabled
                  ? 'pointer-events-none bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 outline-[var(--ui-border-muted)]'
                  : error
                    ? 'bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 outline-red-500 focus:outline-red-500 focus:outline-2 focus:-outline-offset-2'
                    : isFilled
                      ? 'bg-blue-50/30 dark:bg-blue-950/30 text-gray-900 dark:text-white outline-blue-500 dark:outline-blue-400 focus:outline-[var(--ui-focus-ring)] focus:outline-2 focus:-outline-offset-2'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-[var(--ui-border)] focus:outline-[var(--ui-focus-ring)] focus:outline-2 focus:-outline-offset-2',
                inputClass,
              )}
              data-testid={`pin-input-box-${index}`}
            />
          )
        })}
      </div>

      {typeof error === 'string' && (
        <div
          className="text-xs text-red-500 dark:text-red-400 font-medium pt-0.5"
          data-testid="pin-input-error"
        >
          {error}
        </div>
      )}
    </div>
  )
}

PinInput.displayName = 'PinInput'
