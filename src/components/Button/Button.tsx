import React, { ElementType, forwardRef, useMemo } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { Loader } from '../Loader'
import { TextContent } from '../TextContent'
import type { ButtonComponent, ButtonProps, ButtonSize, ThemedButtonClass } from './Button.types'
import type { PolymorphicRef } from '../common-type'

/**
 * Tailwind CSS classes for theme + variant combinations.
 */
const THEMED_BTN_CLASS: ThemedButtonClass = {
  primary: {
    default:
      'text-white bg-[var(--ui-primary)] hover:bg-[var(--ui-primary-hover)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ui-primary-ring)] disabled:bg-[var(--ui-primary-disabled)]',
    outlined:
      'text-[var(--ui-primary-text)] hover:text-white border border-[var(--ui-primary)] hover:bg-[var(--ui-primary)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ui-primary-ring)] disabled:text-[var(--ui-primary-disabled)] disabled:border-[var(--ui-primary-disabled)]',
    plain:
      'text-[var(--ui-primary-text)] hover:bg-black/5 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ui-primary-ring)] disabled:text-[var(--ui-primary-disabled)]',
  },
  danger: {
    default:
      'text-white bg-[var(--ui-danger)] hover:bg-[var(--ui-danger-hover)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ui-danger-ring)] disabled:bg-[var(--ui-danger-disabled)]',
    outlined:
      'text-[var(--ui-danger-text)] hover:text-white border border-[var(--ui-danger)] hover:bg-[var(--ui-danger)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ui-danger-ring)] disabled:text-[var(--ui-danger-disabled)] disabled:border-[var(--ui-danger-disabled)]',
    plain:
      'text-[var(--ui-danger-text)] hover:bg-black/5 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ui-danger-ring)] disabled:text-[var(--ui-danger-disabled)]',
  },
  secondary: {
    default:
      'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ui-focus-ring)] disabled:bg-gray-200 dark:disabled:bg-gray-700',
    outlined:
      'text-gray-700 hover:text-white border border-gray-500 hover:bg-gray-700 dark:border-gray-500 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ui-focus-ring)] disabled:text-gray-400 disabled:border-gray-400',
    plain:
      'text-gray-700 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ui-focus-ring)] disabled:text-gray-400',
  },
  success: {
    default:
      'text-white bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 disabled:bg-emerald-300 dark:disabled:bg-emerald-900',
    outlined:
      'text-emerald-600 hover:text-white border border-emerald-600 hover:bg-emerald-600 dark:text-emerald-400 dark:border-emerald-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 disabled:opacity-50',
    plain:
      'text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 disabled:opacity-50',
  },
  warning: {
    default:
      'text-white bg-amber-500 hover:bg-amber-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 disabled:bg-amber-300 dark:disabled:bg-amber-900',
    outlined:
      'text-amber-600 hover:text-white border border-amber-500 hover:bg-amber-500 dark:text-amber-400 dark:border-amber-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 disabled:opacity-50',
    plain:
      'text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 disabled:opacity-50',
  },
}

const LOADER_TEXT_CLASS: ThemedButtonClass = {
  primary: {
    default: 'text-white',
    outlined: 'text-[var(--ui-primary-text)]',
    plain: 'text-[var(--ui-primary-text)]',
  },
  danger: {
    default: 'text-white',
    outlined: 'text-[var(--ui-danger-text)]',
    plain: 'text-[var(--ui-danger-text)]',
  },
  secondary: {
    default: 'text-gray-700 dark:text-white',
    outlined: 'text-gray-700 dark:text-gray-200',
    plain: 'text-gray-700 dark:text-gray-200',
  },
  success: {
    default: 'text-white',
    outlined: 'text-emerald-600 dark:text-emerald-400',
    plain: 'text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    default: 'text-white',
    outlined: 'text-amber-600 dark:text-amber-400',
    plain: 'text-amber-600 dark:text-amber-400',
  },
}

/**
 * Generate size classes.
 */
const getBtnSizeClasses = (size: ButtonSize, iconOnly = false) => {
  switch (size) {
    case 'xs':
      return iconOnly ? 'h-7 w-7 p-1 rounded-sm text-xs' : 'h-7 px-2.5 rounded-sm gap-1 text-xs'

    case 'sm':
      return iconOnly ? 'h-8 w-8 p-1.5 rounded text-sm' : 'h-8 px-3 rounded gap-1.5 text-sm'

    case 'md':
      return iconOnly ? 'h-9 w-9 p-2 rounded-md text-sm' : 'h-9 px-4 rounded-md gap-2 text-sm'

    case 'lg':
      return iconOnly
        ? 'h-10 w-10 p-2.5 rounded-lg text-base'
        : 'h-10 px-5 rounded-lg gap-2 text-base'
  }
}

/**
 * Base shared tailwind classes.
 */
const BASE_BTN_CLASS =
  'font-medium flex items-center justify-center shrink-0 cursor-pointer ' +
  'disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-75 ' +
  'active:scale-[0.98] transition-all duration-150 ease-out focus:outline-none'

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
      leftIcon,
      rightIcon,
      fullWidth = false,
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

    const classes = useMemo(
      () =>
        buildClassName(
          BASE_BTN_CLASS,
          THEMED_BTN_CLASS[theme][variant],
          getBtnSizeClasses(size, iconOnly),
          !noOutlineOnFocus && 'focus:outline focus:outline-2 focus:outline-offset-2',
          rounded && 'rounded-full',
          fullWidth && 'w-full',
          variant === 'default' && 'shadow-xs hover:shadow-none disabled:shadow-none',
          className,
        ),
      [theme, variant, size, iconOnly, rounded, fullWidth, noOutlineOnFocus, className],
    )

    /**
     * SPECIAL CASE: iconOnly + loading → show spinner only
     */
    if (loading && iconOnly) {
      return (
        <Component ref={ref} className={classes} {...buttonSpecificProps} {...cleanRest}>
          <Loader
            data-testid="btn-loader-icon"
            size="xs"
            className={buildClassName(LOADER_TEXT_CLASS[theme][variant])}
          />
        </Component>
      )
    }

    const loaderIcon = (
      <Loader
        data-testid="btn-loader-icon"
        size="xs"
        className={buildClassName(LOADER_TEXT_CLASS[theme][variant])}
      />
    )

    return (
      <Component ref={ref} className={classes} {...buttonSpecificProps} {...cleanRest}>
        {loading && !loadingText ? (
          <span className="flex items-center gap-2" aria-live="polite">
            {loaderIcon}
            {children}
          </span>
        ) : loading && loadingText ? (
          <span className="flex items-center gap-2" aria-live="polite">
            {loaderIcon}
            <TextContent className={buildClassName(LOADER_TEXT_CLASS[theme][variant])}>
              {loadingText}
            </TextContent>
          </span>
        ) : (
          <>
            {leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
          </>
        )}
      </Component>
    )
  },
) as ButtonComponent

Button.displayName = 'Button'
