import React, { createContext, useContext, useState, type ReactNode } from 'react'
import Toast from './Toast'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastOptions {
  type?: ToastType
  duration?: number // in ms
  autoClose?: boolean
}

interface Toast {
  id: number
  message: string
  type: ToastType
  duration: number
  autoClose: boolean
}

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void
  closeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, options?: ToastOptions) => {
    const id = Date.now()
    const newToast: Toast = {
      id,
      message,
      type: options?.type ?? 'info',
      duration: options?.duration ?? 3000,
      autoClose: options?.autoClose ?? true,
    }

    setToasts(prev => [...prev, newToast])

    if (newToast.autoClose) {
      setTimeout(() => closeToast(id), newToast.duration)
    }
  }

  const closeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}

      {/* Toast Container */}
      <div className='fixed top-4 right-4 z-50 space-y-3'>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => closeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
