import React, { ElementType, forwardRef, useMemo } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { Loader } from '../Loader'
import { TextContent } from '../TextContent'
import type {
  ButtonProps,
  ButtonSize,
  ThemedButtonClass,
  PolymorphicRef,
  ButtonComponent,
} from './Button.types'

/**
 * Tailwind CSS classes for theme + variant combinations.
 */
const THEMED_BTN_CLASS: ThemedButtonClass = {
  primary: {
    default:
      'text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-blue-600 disabled:bg-blue-400 dark:disabled:bg-blue-500',
    outlined:
      'text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 focus:outline-blue-600 disabled:text-blue-400 disabled:border-blue-400',
    plain:
      'text-blue-600 hover:bg-black/5 dark:text-blue-400 dark:hover:bg-gray-700 focus:outline-blue-600 disabled:text-blue-400',
  },
  danger: {
    default:
      'text-white bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-red-600 disabled:bg-red-400 dark:disabled:bg-red-500',
    outlined:
      'text-red-600 hover:text-white border border-red-600 hover:bg-red-600 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 focus:outline-red-600 disabled:text-red-400 disabled:border-red-400',
    plain:
      'text-red-600 hover:bg-black/5 dark:text-red-400 dark:hover:bg-gray-700 focus:outline-red-600 disabled:text-red-400',
  },
  secondary: {
    default:
      'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 focus:outline-blue-600 disabled:bg-gray-200 dark:disabled:bg-gray-700',
    outlined:
      'text-gray-700 hover:text-white border border-gray-500 hover:bg-gray-700 dark:border-gray-500 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600 focus:outline-blue-600 disabled:text-gray-400 disabled:border-gray-400',
    plain:
      'text-gray-700 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-gray-700 focus:outline-blue-600 disabled:text-gray-400',
  },
}

/**
 * Generate size classes.
 */
const getBtnSizeClasses = (size: ButtonSize, iconOnly = false) => {
  switch (size) {
    case 'xs':
      return iconOnly ? 'p-1 rounded-sm text-xs' : 'px-2 py-1 rounded-sm gap-1 text-xs'

    case 'sm':
      return iconOnly ? 'p-1.5 rounded text-sm' : 'px-3 py-1.5 rounded gap-1.5 text-sm'

    case 'md':
      return iconOnly ? 'p-2 rounded-md text-sm' : 'px-4 py-2 rounded-md gap-2 text-sm'

    case 'lg':
      return iconOnly ? 'p-2.5 rounded-lg text-base' : 'px-5 py-2.5 rounded-lg gap-2 text-base'
  }
}

/**
 * Base shared tailwind classes.
 */
const BASE_BTN_CLASS =
  'font-medium flex items-center justify-center shrink-0 cursor-pointer ' +
  'disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-75 ' +
  'transition duration-200 ease-in-out'

export const Button = forwardRef(
  <C extends ElementType = 'button'>(
    { as, type, ...props }: ButtonProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    const {
      className = '',
      children,
      theme = 'primary',
      variant = 'default',
      size = 'md',
      loading = false,
      loadingText = '',
      rounded = false,
      disabled,
      iconOnly = false,
      noOutlineOnFocus = false,
      ...restProps
    } = props

    const Component = as || 'button'

    // Accessibility guard for icon-only buttons
    if (iconOnly && !(restProps as Record<string, unknown>)['aria-label']) {
      console.warn('[ui] <Button iconOnly> requires aria-label for accessibility.')
    }

    // Disable interaction when loading
    const resolvedDisabled = disabled || loading

    // Clean invalid props when not rendering a real button
    const { type: _ignoreType, disabled: _ignoreDisabled, ...cleanRest } = restProps

    const buttonSpecificProps =
      Component === 'button'
        ? {
            type: type ?? 'button',
            disabled: resolvedDisabled,
          }
        : {}

    /**
     * Memoized className for perf & stability.
     */
    const classes = useMemo(
      () =>
        buildClassName(
          BASE_BTN_CLASS,
          THEMED_BTN_CLASS[theme][variant],
          getBtnSizeClasses(size, iconOnly),
          !noOutlineOnFocus && 'focus:outline focus:outline-2 focus:outline-offset-2',
          rounded && 'rounded-full',
          variant === 'default' && 'shadow-xs hover:shadow-none disabled:shadow-none',
          className,
        ),
      [theme, variant, size, iconOnly, rounded, noOutlineOnFocus, className],
    )

    /**
     * SPECIAL CASE:
     * iconOnly + loading → show spinner only
     */
    if (loading && iconOnly) {
      return (
        <Component ref={ref} className={classes} {...buttonSpecificProps} {...cleanRest}>
          <Loader data-testid="btn-loader-icon" size="xs" />
        </Component>
      )
    }

    return (
      <Component ref={ref} className={classes} {...buttonSpecificProps} {...cleanRest}>
        {loading ? (
          <span className="flex items-center gap-2" aria-live="polite">
            <Loader data-testid="btn-loader-icon" size="xs" />
            {loadingText && <TextContent>{loadingText}</TextContent>}
          </span>
        ) : (
          children
        )}
      </Component>
    )
  },
) as ButtonComponent

Button.displayName = 'Button'
