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
  success: <CheckCircle className="size-5 text-[var(--ui-success)]" />,
  error: <AlertCircle className="size-5 text-[var(--ui-danger)]" />,
  info: <Info className="size-5 text-[var(--ui-info)]" />,
  warning: <AlertTriangle className="size-5 text-[var(--ui-warning)]" />,
}

const textColorMap = {
  success: 'text-[var(--ui-success-text)]',
  error: 'text-[var(--ui-danger-text)]',
  info: 'text-[var(--ui-info-text)]',
  warning: 'text-[var(--ui-warning-text)]',
}

const borderStyle = {
  success: 'border-t-4 border-[var(--ui-success)]',
  error: 'border-t-4 border-[var(--ui-danger)]',
  info: 'border-t-4 border-[var(--ui-info)]',
  warning: 'border-t-4 border-[var(--ui-warning)]',
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
