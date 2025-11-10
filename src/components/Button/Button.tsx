import React, { forwardRef } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { Loader } from '../Loader'
import { type ButtonProps, type ButtonSize, type ThemedButtonClass } from './type'
import { TextContent } from '../TextContent'

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

const getBtnSizeClasses = (size: ButtonSize, iconOnly: boolean = false) => {
  switch (size) {
    case 'xs':
      return `text-xs h-6 ${iconOnly ? 'p-1 rounded-sm' : 'px-2 py-1 rounded-sm gap-1'}`
    case 'sm':
      return `text-sm h-8 ${iconOnly ? 'p-1.5 rounded' : ' px-3 py-1.5 rounded gap-1.5'}`
    case 'md':
      return `text-sm h-10 ${iconOnly ? 'p-2 rounded-md' : 'px-4 py-2 rounded-md gap-2'}`
    case 'lg':
      return `text-base h-12 ${iconOnly ? 'p-2.5 rounded-lg' : 'px-5 py-2.5 rounded-lg gap-2'}`
  }
}

export const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className = '',
      children,
      theme = 'primary',
      variant = 'default',
      size = 'md',
      as: Element = 'button',
      loading = false,
      loadingText = '',
      type = 'button',
      rounded = false,
      disabled,
      iconOnly = false,
      ...buttonProps
    } = props

    return (
      <Element
        ref={ref}
        className={buildClassName(
          THEMED_BTN_CLASS[theme][variant],
          getBtnSizeClasses(size, iconOnly),
          'focus:outline focus:outline-2 focus:outline-offset-2',
          'font-medium flex items-center justify-center shrink-0',
          'cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-75',
          'transition duration-200 ease-in-out',
          rounded && 'rounded-full',
          variant === 'default' && 'shadow-xs hover:shadow-none disabled:shadow-none',
          className,
        )}
        type={type}
        disabled={disabled || loading}
        {...buttonProps}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader className="text-white" size="xs" />
            {loadingText && <TextContent>{loadingText}</TextContent>}
          </span>
        ) : (
          children
        )}
      </Element>
    )
  },
)
