import React from 'react'
import { Transition } from '@headlessui/react'

import XIcon from '../Icons/X.svg'

interface ToastProps {
  id?: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  onClose: () => void
}

const typeStyles: Record<ToastProps['type'], string> = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
  warning: 'bg-yellow-400 text-black',
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <Transition
      appear
      show
      enter='transform transition duration-300'
      enterFrom='opacity-0 translate-x-4'
      enterTo='opacity-100 translate-x-0'
      leave='transition duration-200 ease-in'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div
        className={`flex items-center justify-between rounded-lg px-4 py-3 shadow-lg min-w-[240px] ${typeStyles[type]}`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className='ml-3 text-xl leading-none hover:opacity-75'
          aria-label='Close toast'
        >
          <XIcon className="size-5" />
        </button>
      </div>
    </Transition>
  )
}

export default Toast
