import React, { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import XIcon from '../Icons/X.svg'
import CheckCircle from '../Icons/CircleCheck.svg'
import AlertCircle from '../Icons/CircleAlert.svg'
import Info from '../Icons/Info.svg'
import AlertTriangle from '../Icons/TriangleAlert.svg'

import { Button } from '../Button'
import { TextContent } from '../TextContent'
import { buildClassName } from '../../utils/build-classname'

import type { ToastProps, ToastType, ToastVariant } from './Toast.types'

/**
 * Icons for each toast type
 */
const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="size-5 text-[var(--ui-success)]" />,
  error: <AlertCircle className="size-5 text-[var(--ui-danger)]" />,
  info: <Info className="size-5 text-[var(--ui-info)]" />,
  warning: <AlertTriangle className="size-5 text-[var(--ui-warning)]" />,
}

const filledIconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="size-5 text-white" />,
  error: <AlertCircle className="size-5 text-white" />,
  info: <Info className="size-5 text-white" />,
  warning: <AlertTriangle className="size-5 text-white" />,
}

const textColorMap: Record<ToastType, string> = {
  success: 'text-[var(--ui-success-text)]',
  error: 'text-[var(--ui-danger-text)]',
  info: 'text-[var(--ui-info-text)]',
  warning: 'text-[var(--ui-warning-text)]',
}

const progressBarColorMap: Record<ToastType, string> = {
  success: 'bg-[var(--ui-success)]',
  error: 'bg-[var(--ui-danger)]',
  info: 'bg-[var(--ui-info)]',
  warning: 'bg-[var(--ui-warning)]',
}

const variantStyleMap: Record<ToastVariant, Record<ToastType, string>> = {
  accent: {
    success:
      'bg-white dark:bg-gray-900 border-l-4 border-[var(--ui-success)] text-gray-900 dark:text-gray-100 shadow-lg border-y border-r border-gray-200/80 dark:border-gray-800/80',
    error:
      'bg-white dark:bg-gray-900 border-l-4 border-[var(--ui-danger)] text-gray-900 dark:text-gray-100 shadow-lg border-y border-r border-gray-200/80 dark:border-gray-800/80',
    info: 'bg-white dark:bg-gray-900 border-l-4 border-[var(--ui-info)] text-gray-900 dark:text-gray-100 shadow-lg border-y border-r border-gray-200/80 dark:border-gray-800/80',
    warning:
      'bg-white dark:bg-gray-900 border-l-4 border-[var(--ui-warning)] text-gray-900 dark:text-gray-100 shadow-lg border-y border-r border-gray-200/80 dark:border-gray-800/80',
  },
  filled: {
    success: 'bg-[var(--ui-success)] text-white shadow-lg',
    error: 'bg-[var(--ui-danger)] text-white shadow-lg',
    info: 'bg-[var(--ui-info)] text-white shadow-lg',
    warning: 'bg-[var(--ui-warning)] text-white shadow-lg',
  },
  outlined: {
    success:
      'bg-white dark:bg-gray-900 border-2 border-[var(--ui-success)] text-gray-900 dark:text-gray-100 shadow-md',
    error:
      'bg-white dark:bg-gray-900 border-2 border-[var(--ui-danger)] text-gray-900 dark:text-gray-100 shadow-md',
    info: 'bg-white dark:bg-gray-900 border-2 border-[var(--ui-info)] text-gray-900 dark:text-gray-100 shadow-md',
    warning:
      'bg-white dark:bg-gray-900 border-2 border-[var(--ui-warning)] text-gray-900 dark:text-gray-100 shadow-md',
  },
  glass: {
    success:
      'backdrop-blur-md bg-white/85 dark:bg-gray-900/85 border border-emerald-500/30 text-gray-900 dark:text-gray-100 shadow-xl',
    error:
      'backdrop-blur-md bg-white/85 dark:bg-gray-900/85 border border-rose-500/30 text-gray-900 dark:text-gray-100 shadow-xl',
    info: 'backdrop-blur-md bg-white/85 dark:bg-gray-900/85 border border-blue-500/30 text-gray-900 dark:text-gray-100 shadow-xl',
    warning:
      'backdrop-blur-md bg-white/85 dark:bg-gray-900/85 border border-amber-500/30 text-gray-900 dark:text-gray-100 shadow-xl',
  },
}

export const Toast: React.FC<ToastProps & { isTop?: boolean }> = ({
  id,
  title,
  message,
  type,
  variant = 'accent',
  action,
  icon,
  showProgressBar = true,
  duration = 4000,
  isPaused = false,
  onClose,
  className,
  isTop = true,
}) => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (!showProgressBar || !duration || isPaused) return

    const intervalTime = 50
    const step = (intervalTime / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - step
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [showProgressBar, duration, isPaused])

  const enterFrom = isTop ? 'opacity-0 -translate-y-3 scale-95' : 'opacity-0 translate-y-3 scale-95'
  const leaveTo = isTop ? 'opacity-0 -translate-y-2 scale-95' : 'opacity-0 translate-y-2 scale-95'

  const renderedIcon = icon ?? (variant === 'filled' ? filledIconMap[type] : iconMap[type])

  return (
    <Transition
      appear
      show
      enter="transform transition duration-300 ease-out"
      enterFrom={enterFrom}
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition duration-200 ease-in"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo={leaveTo}
    >
      <div
        role="status"
        id={id.toString()}
        className={buildClassName(
          'relative overflow-hidden flex items-start gap-3 rounded-xl px-4 py-3.5 min-w-[280px] max-w-md transition-all',
          variantStyleMap[variant][type],
          className,
        )}
      >
        {/* Icon */}
        <div className="shrink-0 mt-0.5">
          {variant === 'filled' ? (
            renderedIcon
          ) : (
            <TextContent className={buildClassName(textColorMap[type])}>{renderedIcon}</TextContent>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col gap-0.5">
          {title && (
            <div
              className={buildClassName(
                'font-semibold text-sm leading-snug',
                variant === 'filled' ? 'text-white' : 'text-gray-900 dark:text-gray-100',
              )}
            >
              {title}
            </div>
          )}
          <div
            className={buildClassName(
              'text-sm font-medium leading-relaxed',
              variant === 'filled' ? 'text-white/95' : 'text-gray-700 dark:text-gray-300',
            )}
          >
            {message}
          </div>

          {/* Action Button */}
          {action && (
            <div className="mt-1.5">
              <button
                type="button"
                onClick={action.onClick}
                className={buildClassName(
                  'text-xs font-semibold underline underline-offset-2 transition-opacity focus:outline-none',
                  variant === 'filled'
                    ? 'text-white hover:opacity-85'
                    : 'text-[var(--ui-primary)] hover:opacity-80',
                )}
              >
                {action.label}
              </button>
            </div>
          )}
        </div>

        {/* Close button */}
        <Button
          onClick={onClose}
          aria-label="Close toast"
          className={buildClassName(
            'shrink-0 mt-0.5 opacity-60 hover:opacity-100 transition',
            variant === 'filled' && 'text-white hover:text-white',
          )}
          iconOnly
          size="xs"
          variant="plain"
          theme={variant === 'filled' ? 'primary' : 'secondary'}
          noOutlineOnFocus
        >
          <XIcon className="size-4" />
        </Button>

        {/* Progress Bar Countdown */}
        {showProgressBar && duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 overflow-hidden">
            <div
              className={buildClassName(
                'h-full transition-all duration-75 ease-linear',
                variant === 'filled' ? 'bg-white/70' : progressBarColorMap[type],
              )}
              style={{ width: `${Math.max(0, progress)}%` }}
            />
          </div>
        )}
      </div>
    </Transition>
  )
}

Toast.displayName = 'Toast'
