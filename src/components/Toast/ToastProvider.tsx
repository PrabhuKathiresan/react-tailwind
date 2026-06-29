import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useRef,
  useCallback,
} from 'react'
import { Toast } from './Toast'
import type { IToast, ToastContextType, ToastOptions, ToastPlacement } from './Toast.types'
import { buildClassName } from '../../utils/build-classname'

const ToastContext = createContext<ToastContextType | undefined>(undefined)
let toastCounter = 0

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

// Maximum visible toasts at once
const MAX_TOASTS = 5

const placementClass: Record<ToastPlacement, string> = {
  'top-right': 'top-10 right-4 items-end',
  'top-left': 'top-10 left-4 items-start',
  'top-center': 'top-10 left-1/2 -translate-x-1/2 items-center',

  'bottom-right': 'bottom-10 right-4 items-end',
  'bottom-left': 'bottom-10 left-4 items-start',
  'bottom-center': 'bottom-10 left-1/2 -translate-x-1/2 items-center',
}

export const ToastProvider: React.FC<{
  children: ReactNode
  placement?: ToastPlacement
}> = ({ children, placement = 'top-center' }) => {
  const [toasts, setToasts] = useState<IToast[]>([])
  const timeoutRefs = useRef<Map<number, any>>(new Map())

  const clearTimer = (id: number) => {
    const timeout = timeoutRefs.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      timeoutRefs.current.delete(id)
    }
  }

  const closeToast = useCallback((id: number) => {
    clearTimer(id)
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const scheduleClose = useCallback(
    (toast: IToast) => {
      if (!toast.autoClose) return

      clearTimer(toast.id)

      const timeout = setTimeout(() => {
        closeToast(toast.id)
      }, toast.duration)

      timeoutRefs.current.set(toast.id, timeout)
    },
    [closeToast],
  )

  useEffect(() => {
    const refs = timeoutRefs.current
    return () => refs.forEach((id) => clearTimeout(id))
  }, [])

  const showToast = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = ++toastCounter

      const newToast: IToast = {
        id,
        message,
        type: options?.type ?? 'info',
        duration: options?.duration ?? 3000,
        autoClose: options?.autoClose ?? true,
        pauseOnHover: options?.pauseOnHover ?? true,
      }

      setToasts((prev) => {
        const updated = [...prev, newToast]
        if (updated.length > MAX_TOASTS) updated.shift()
        return updated
      })

      scheduleClose(newToast)
    },
    [scheduleClose],
  )

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}

      {/* Toast Container */}
      <div
        className={buildClassName(
          'fixed z-50 flex flex-col gap-3 pointer-events-none',
          placementClass[placement],
        )}
      >
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="pointer-events-auto"
            onMouseEnter={() => toast.pauseOnHover && clearTimer(toast.id)}
            onMouseLeave={() => toast.pauseOnHover && scheduleClose(toast)}
          >
            <Toast
              {...toast}
              isTop={placement.startsWith('top')}
              onClose={() => closeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
