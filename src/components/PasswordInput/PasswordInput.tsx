import { forwardRef, useState, type ChangeEvent } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import type { PasswordInputProps } from './PasswordInput.types'

export const PASSWORD_TYPE = 'password'
export const PASSWORD_PLACEHOLDER = '••••••••••'

export function evaluatePasswordStrength(val: string): {
  score: number
  label: 'Weak' | 'Fair' | 'Good' | 'Strong'
  colorClass: string
  percent: number
} {
  if (!val)
    return { score: 0, label: 'Weak', colorClass: 'bg-gray-200 dark:bg-gray-700', percent: 0 }

  let score = 0
  if (val.length >= 8) score += 1
  if (val.length >= 12) score += 1
  if (/[0-9]/.test(val)) score += 1
  if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score += 1
  if (/[^A-Za-z0-9]/.test(val)) score += 1

  if (score <= 1) {
    return { score: 1, label: 'Weak', colorClass: 'bg-red-500', percent: 25 }
  }
  if (score === 2) {
    return { score: 2, label: 'Fair', colorClass: 'bg-amber-500', percent: 50 }
  }
  if (score === 3) {
    return { score: 3, label: 'Good', colorClass: 'bg-blue-500', percent: 75 }
  }
  return { score: 4, label: 'Strong', colorClass: 'bg-emerald-500', percent: 100 }
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const {
    showStrength = false,
    placeholder = PASSWORD_PLACEHOLDER,
    onChange,
    value,
    defaultValue,
    ...inputProps
  } = props

  const [showPassword, setShowPassword] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(String(defaultValue ?? ''))

  const isControlled = value !== undefined
  const currentVal = isControlled ? String(value ?? '') : uncontrolledValue

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.value)
    }
    onChange?.(e)
  }

  const strength = evaluatePasswordStrength(currentVal)

  return (
    <div className="space-y-1.5">
      <Input
        ref={ref}
        {...inputProps}
        value={value}
        defaultValue={defaultValue}
        onChange={handleInputChange}
        type={showPassword ? 'text' : PASSWORD_TYPE}
        placeholder={placeholder}
        rightGroup={
          <Button
            theme="secondary"
            variant="plain"
            size="xs"
            className="px-1.5 mr-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </Button>
        }
      />

      {/* Visual Password Strength Indicator */}
      {showStrength && currentVal.length > 0 && (
        <div className="pt-0.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-medium text-gray-500 dark:text-gray-400">
            <span>Password Strength</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{strength.label}</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden flex gap-1 p-0.5">
            <div
              className={`h-full transition-all duration-300 rounded-full ${strength.colorClass}`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'
