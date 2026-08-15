import { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import type { StatusPillProps } from './StatusPill.types'

const THEME_PILL_CLASS: Record<string, { bg: string; dot: string }> = {
  success: {
    bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 dark:border-emerald-500/30',
    dot: 'bg-emerald-500',
  },
  warning: {
    bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20 dark:border-amber-500/30',
    dot: 'bg-amber-500',
  },
  danger: {
    bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20 dark:border-rose-500/30',
    dot: 'bg-rose-500',
  },
  info: {
    bg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20 dark:border-blue-500/30',
    dot: 'bg-blue-500',
  },
  secondary: {
    bg: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20 dark:border-gray-500/30',
    dot: 'bg-gray-400',
  },
}

const SIZE_CLASS: Record<string, string> = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

const DOT_SIZE_CLASS: Record<string, string> = {
  sm: 'size-1.5',
  md: 'size-2',
}

export const StatusPill = forwardRef<HTMLSpanElement, StatusPillProps>((props, ref) => {
  const {
    theme = 'secondary',
    size = 'sm',
    dot = true,
    pulse = false,
    className,
    children,
    ...restProps
  } = props

  const style = THEME_PILL_CLASS[theme] ?? THEME_PILL_CLASS.secondary

  return (
    <span
      ref={ref}
      className={buildClassName(
        'inline-flex items-center gap-1.5 rounded-full border font-semibold whitespace-nowrap transition-colors',
        SIZE_CLASS[size],
        style.bg,
        className,
      )}
      data-testid={`status-pill-${theme}`}
      {...restProps}
    >
      {dot && (
        <span
          className={buildClassName(
            'shrink-0 rounded-full',
            DOT_SIZE_CLASS[size],
            style.dot,
            pulse ? 'animate-pulse' : '',
          )}
          data-testid="status-pill-dot"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  )
})

StatusPill.displayName = 'StatusPill'
