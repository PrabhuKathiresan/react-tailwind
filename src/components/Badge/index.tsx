import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import XIcon from '../Icons/X.svg'

export type BadgeTheme = 'success' | 'danger' | 'warning' | 'info' | 'secondary'

export interface BadgeProps {
  /**
   * Defines theme of the Badge
   * @default "info"
   */
  theme?: BadgeTheme
  className?: string
  children: any
  /**
   * Defines if badge is removable
   */
  removable?: boolean
  /**
   * Defines if corners are rounded
   */
  rounded?: boolean
  /**
   * Handler on removing badge
   */
  onRemove?: () => void
}

const ThemeClassMap = {
  success:
    'bg-green-50 ring-green-600/20 text-green-700 dark:bg-green-600 dark:text-green-50 dark:ring-green-400/20',
  danger:
    'bg-red-50 dark:bg-red-600 text-red-700 dark:text-red-50 ring-red-600/20 dark:ring-red-400/20',
  warning:
    'bg-yellow-50 dark:bg-yellow-600 text-yellow-700 dark:text-yellow-50 ring-yellow-600/20 dark:ring-yellow-400/20',
  info: 'bg-blue-50 dark:bg-blue-600 text-blue-700 dark:text-blue-50 ring-blue-600/20 dark:ring-blue-400/20',
  secondary:
    'bg-gray-50 dark:bg-gray-600 text-gray-700 dark:text-gray-50 ring-gray-600/20 dark:ring-gray-400/20',
}

export const Badge: React.FC<BadgeProps> = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    theme = 'info',
    className = '',
    children,
    removable = false,
    rounded = false,
    onRemove = () => {},
    ...restProps
  } = props

  return (
    <span
      ref={ref}
      className={buildClassName(
        className,
        'inline-flex items-center pl-3 py-1 text-xs font-medium ring-1 ring-inset',
        ThemeClassMap[theme],
        rounded ? 'rounded-full' : 'rounded-md',
      )}
      {...restProps}
    >
      <span className="pr-3 inline-flex items-center">{children}</span>
      {removable ? (
        <XIcon
          className="size-5 px-0.5 mr-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded-sm cursor-pointer"
          role="button"
          onClick={() => onRemove()}
        />
      ) : null}
    </span>
  )
})
