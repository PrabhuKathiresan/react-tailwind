import React, { ElementType, forwardRef, useEffect, useMemo } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { Loader } from '../Loader'
import { TextContent } from '../TextContent'
import type { ButtonComponent, ButtonProps, ButtonSize, ThemedButtonClass } from './Button.types'
import type { PolymorphicRef } from '../common-type'

/**
 * Tailwind CSS classes for theme + variant combinations.
 *
 * Only colours live here. Focus outline width/offset and disabled styling are
 * applied uniformly in the component so they can be toggled in one place.
 */
const THEMED_BTN_CLASS: ThemedButtonClass = {
  primary: {
    default:
      'text-white bg-[var(--ui-primary)] hover:bg-[var(--ui-primary-hover)] focus-visible:outline-[var(--ui-primary-ring)]',
    outlined:
      'text-[var(--ui-primary-text)] hover:text-white border border-[var(--ui-primary)] hover:bg-[var(--ui-primary)] focus-visible:outline-[var(--ui-primary-ring)]',
    plain:
      'text-[var(--ui-primary-text)] hover:bg-current/10 active:bg-current/15 focus-visible:outline-[var(--ui-primary-ring)]',
  },
  danger: {
    default:
      'text-white bg-[var(--ui-danger)] hover:bg-[var(--ui-danger-hover)] focus-visible:outline-[var(--ui-danger-ring)]',
    outlined:
      'text-[var(--ui-danger-text)] hover:text-white border border-[var(--ui-danger)] hover:bg-[var(--ui-danger)] focus-visible:outline-[var(--ui-danger-ring)]',
    plain:
      'text-[var(--ui-danger-text)] hover:bg-current/10 active:bg-current/15 focus-visible:outline-[var(--ui-danger-ring)]',
  },
  secondary: {
    default:
      'text-gray-700 bg-white border border-[var(--ui-border)] hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 focus-visible:outline-[var(--ui-focus-ring)]',
    outlined:
      'text-gray-700 hover:text-white border border-[var(--ui-border)] hover:bg-gray-700 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600 focus-visible:outline-[var(--ui-focus-ring)]',
    plain:
      'text-gray-700 hover:bg-current/10 active:bg-current/15 dark:text-gray-200 focus-visible:outline-[var(--ui-focus-ring)]',
  },
  success: {
    default: 'text-white bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-500',
    outlined:
      'text-emerald-700 hover:text-white border border-emerald-600 hover:bg-emerald-600 dark:text-emerald-400 dark:border-emerald-500 focus-visible:outline-emerald-500',
    plain:
      'text-emerald-700 hover:bg-current/10 active:bg-current/15 dark:text-emerald-400 focus-visible:outline-emerald-500',
  },
  warning: {
    default: 'text-white bg-amber-500 hover:bg-amber-600 focus-visible:outline-amber-500',
    outlined:
      'text-amber-700 hover:text-white border border-amber-500 hover:bg-amber-500 dark:text-amber-400 dark:border-amber-500 focus-visible:outline-amber-500',
    plain:
      'text-amber-700 hover:bg-current/10 active:bg-current/15 dark:text-amber-400 focus-visible:outline-amber-500',
  },
}

const SIZE_CLASSES: Record<ButtonSize, { normal: string; iconOnly: string }> = {
  xs: { normal: 'h-7 px-2.5 rounded-sm gap-1 text-xs', iconOnly: 'h-7 w-7 p-1 rounded-sm text-xs' },
  sm: { normal: 'h-8 px-3 rounded gap-1.5 text-sm', iconOnly: 'h-8 w-8 p-1.5 rounded text-sm' },
  md: { normal: 'h-9 px-4 rounded-md gap-2 text-sm', iconOnly: 'h-9 w-9 p-2 rounded-md text-sm' },
  lg: {
    normal: 'h-10 px-5 rounded-lg gap-2 text-base',
    iconOnly: 'h-10 w-10 p-2.5 rounded-lg text-base',
  },
}

const LOADER_SIZE: Record<ButtonSize, 'xs' | 'sm'> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
}

/**
 * Base shared tailwind classes.
 *
 * Disabled styling is keyed off both the native `disabled` attribute and
 * `aria-disabled`, so non-button elements rendered via `as` look disabled too.
 */
const BASE_BTN_CLASS =
  'font-medium inline-flex items-center justify-center shrink-0 cursor-pointer select-none ' +
  'transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-150 ease-out ' +
  'active:scale-[0.98] focus:outline-none ' +
  'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ' +
  'aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:shadow-none'

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
      active,
      onClick,
      ...restProps
    } = props

    const Component = as || 'button'
    const isNativeButton = Component === 'button'

    // Clean invalid props when not rendering a real button
    const {
      type: _ignoreType,
      disabled: _ignoreDisabled,
      role,
      tabIndex,
      onKeyDown,
      onKeyUp,
      ...domProps
    } = restProps as Record<string, any>

    const ariaLabel = domProps['aria-label']
    const ariaLabelledBy = domProps['aria-labelledby']

    // Accessibility guard for icon-only buttons
    useEffect(() => {
      if (iconOnly && !ariaLabel && !ariaLabelledBy) {
        console.warn(
          '[ui] <Button iconOnly> requires aria-label or aria-labelledby for accessibility.',
        )
      }
    }, [iconOnly, ariaLabel, ariaLabelledBy])

    const resolvedDisabled = Boolean(disabled || loading)

    // Links (`href`, or `to` for router Link components) keep their native semantics.
    const isLink = !isNativeButton && (domProps.href != null || domProps.to != null)

    const handleClick = (e: React.MouseEvent<any>) => {
      if (resolvedDisabled) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      onClick?.(e)
    }

    // Mirror native <button> keyboard activation for non-button elements:
    // Enter activates on keydown, Space on keyup (and must not scroll the page).
    const handleKeyDown = (e: React.KeyboardEvent<any>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented || e.target !== e.currentTarget) return
      if (e.key === 'Enter') {
        e.preventDefault()
        e.currentTarget.click()
      } else if (e.key === ' ') {
        e.preventDefault()
      }
    }

    const handleKeyUp = (e: React.KeyboardEvent<any>) => {
      onKeyUp?.(e)
      if (e.defaultPrevented || e.target !== e.currentTarget) return
      if (e.key === ' ') {
        e.preventDefault()
        e.currentTarget.click()
      }
    }

    const elementProps = isNativeButton
      ? {
          type: type ?? 'button',
          disabled: resolvedDisabled,
          role,
          tabIndex,
          onClick: handleClick,
          onKeyDown,
          onKeyUp,
        }
      : isLink
        ? {
            role,
            tabIndex: resolvedDisabled ? -1 : tabIndex,
            'aria-disabled': resolvedDisabled ? true : undefined,
            onClick: handleClick,
            onKeyDown,
            onKeyUp,
          }
        : {
            role: role ?? 'button',
            tabIndex: resolvedDisabled ? -1 : (tabIndex ?? 0),
            'aria-disabled': resolvedDisabled ? true : undefined,
            onClick: handleClick,
            onKeyDown: handleKeyDown,
            onKeyUp: handleKeyUp,
          }

    const sizeObj = SIZE_CLASSES[size] || SIZE_CLASSES.md

    const classes = useMemo(
      () =>
        buildClassName(
          BASE_BTN_CLASS,
          THEMED_BTN_CLASS[theme]?.[variant] || THEMED_BTN_CLASS.primary.default,
          iconOnly ? sizeObj.iconOnly : sizeObj.normal,
          // An outline (not a ring) so the offset gap stays transparent on any surface/mode.
          !noOutlineOnFocus &&
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid',
          rounded && 'rounded-full',
          fullWidth && 'w-full',
          variant === 'default' && 'shadow-xs hover:shadow-none',
          active && 'ring-2 ring-current',
          className,
        ),
      [theme, variant, sizeObj, iconOnly, noOutlineOnFocus, rounded, fullWidth, active, className],
    )

    // The spinner and loading text inherit the button's text colour.
    const loaderIcon = (
      <Loader
        data-testid="btn-loader-icon"
        size={LOADER_SIZE[size] || 'xs'}
        className="text-current"
      />
    )

    /**
     * SPECIAL CASE: iconOnly + loading → show spinner only
     */
    if (loading && iconOnly) {
      return (
        <Component
          ref={ref}
          className={classes}
          aria-busy="true"
          aria-pressed={active !== undefined ? active : undefined}
          {...domProps}
          {...elementProps}
        >
          {loaderIcon}
        </Component>
      )
    }

    return (
      <Component
        ref={ref}
        className={classes}
        aria-busy={loading ? 'true' : undefined}
        aria-pressed={active !== undefined ? active : undefined}
        {...domProps}
        {...elementProps}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2" aria-live="polite">
            {loaderIcon}
            {loadingText ? (
              <TextContent className="text-current">{loadingText}</TextContent>
            ) : (
              children
            )}
          </span>
        ) : (
          <>
            {leftIcon && <span className="shrink-0 inline-flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0 inline-flex items-center">{rightIcon}</span>}
          </>
        )}
      </Component>
    )
  },
) as ButtonComponent

Button.displayName = 'Button'
