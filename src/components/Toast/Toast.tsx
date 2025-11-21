import React from 'react'
import { Transition } from '@headlessui/react'
import XIcon from '../Icons/X.svg'
import CheckCircle from '../Icons/CircleCheck.svg'
import AlertCircle from '../Icons/CircleAlert.svg'
import Info from '../Icons/Info.svg'
import AlertTriangle from '../Icons/TriangleAlert.svg'

import { Button } from '../Button'
import { TextContent } from '../TextContent'
import { buildClassName } from '../../utils/build-classname'

import { ToastProps } from './Toast.types'

/**
 * Icons for each toast type
 */
const iconMap = {
  success: <CheckCircle className="size-5 text-green-600 dark:text-green-400" />,
  error: <AlertCircle className="size-5 text-red-600 dark:text-red-400" />,
  info: <Info className="size-5 text-blue-600 dark:text-blue-400" />,
  warning: <AlertTriangle className="size-5 text-yellow-600 dark:text-yellow-400" />,
}

/**
 * Subtle icon + text color adjustments
 */
const textColorMap = {
  success: 'text-green-900 dark:text-green-200',
  error: 'text-red-900 dark:text-red-200',
  info: 'text-blue-900 dark:text-blue-200',
  warning: 'text-yellow-900 dark:text-yellow-200',
}

/**
 * Pleasant colored *top border only*
 * No background color — soft neutral surface
 */
const borderStyle = {
  success: 'border-t-4 border-green-600 dark:border-green-400',
  error: 'border-t-4 border-red-600 dark:border-red-400',
  info: 'border-t-4 border-blue-600 dark:border-blue-400',
  warning: 'border-t-4 border-yellow-600 dark:border-yellow-400',
}

export const Toast: React.FC<ToastProps & { isTop?: boolean }> = ({
  message,
  type,
  onClose,
  className,
  id,
  isTop = true,
}) => {
  const enterFrom = isTop ? 'opacity-0 -translate-y-3 scale-95' : 'opacity-0 translate-y-3 scale-95'
  const leaveTo = isTop ? 'opacity-0 -translate-y-2 scale-95' : 'opacity-0 translate-y-2 scale-95'
  return (
    <Transition
      appear
      show
      enter="transform transition duration-300"
      enterFrom={enterFrom}
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition duration-200"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo={leaveTo}
    >
      <div
        role="status"
        className={buildClassName(
          'flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg min-w-[260px] max-w-sm',
          'bg-white dark:bg-gray-900 dark:border-gray-700',
          borderStyle[type],
          className,
        )}
        id={id.toString()}
      >
        {/* Icon */}
        <TextContent className={buildClassName(textColorMap[type])}>{iconMap[type]}</TextContent>

        {/* Message */}
        <TextContent className="flex-1 text-sm font-medium">{message}</TextContent>

        {/* Close button */}
        <Button
          onClick={onClose}
          aria-label="Close toast"
          className="opacity-60 hover:opacity-100 transition"
          iconOnly
          size="xs"
          variant="plain"
          theme="secondary"
          noOutlineOnFocus
        >
          <XIcon className="size-4" />
        </Button>
      </div>
    </Transition>
  )
}
