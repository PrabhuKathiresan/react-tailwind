import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import { Toast } from './Toast'
import type {
  IToast,
  ToastContextType,
  ToastOptions,
  ToastPlacement,
  ToastProviderProps,
} from './Toast.types'
import { buildClassName } from '../../utils/build-classname'

const ToastContext = createContext<ToastContextType | undefined>(undefined)
let toastCounter = 0

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

const placementClass: Record<ToastPlacement, string> = {
  'top-right': 'top-20 right-6 items-end',
  'top-left': 'top-20 left-6 items-start',
  'top-center': 'top-20 left-1/2 -translate-x-1/2 items-center',

  'bottom-right': 'bottom-6 right-6 items-end',
  'bottom-left': 'bottom-6 left-6 items-start',
  'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2 items-center',
}

interface ToastMeta {
  timerId: any
  startTime: number
  remainingTime: number
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  placement = 'top-right',
  maxToasts = 5,
  className,
}) => {
  const [toasts, setToasts] = useState<IToast[]>([])
  const [pausedIds, setPausedIds] = useState<Set<number>>(new Set())
  const metaRefs = useRef<Map<number, ToastMeta>>(new Map())

  const clearTimer = (id: number) => {
    const meta = metaRefs.current.get(id)
    if (meta?.timerId) {
      clearTimeout(meta.timerId)
      meta.timerId = null
    }
  }

  const closeToast = useCallback((id: number) => {
    clearTimer(id)
    metaRefs.current.delete(id)
    setPausedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    metaRefs.current.forEach((meta) => {
      if (meta.timerId) clearTimeout(meta.timerId)
    })
    metaRefs.current.clear()
    setPausedIds(new Set())
    setToasts([])
  }, [])

  const startAutoClose = useCallback(
    (toastId: number, delay: number) => {
      clearTimer(toastId)

      const timerId = setTimeout(() => {
        closeToast(toastId)
      }, delay)

      const meta = metaRefs.current.get(toastId)
      if (meta) {
        meta.timerId = timerId
        meta.startTime = Date.now()
        meta.remainingTime = delay
      } else {
        metaRefs.current.set(toastId, {
          timerId,
          startTime: Date.now(),
          remainingTime: delay,
        })
      }
    },
    [closeToast],
  )

  useEffect(() => {
    const refs = metaRefs.current
    return () =>
      refs.forEach((meta) => {
        if (meta.timerId) clearTimeout(meta.timerId)
      })
  }, [])

  const showToast = useCallback(
    (message: ReactNode, options?: ToastOptions): number => {
      const id = ++toastCounter

      const newToast: IToast = {
        id,
        title: options?.title,
        message,
        type: options?.type ?? 'info',
        variant: options?.variant ?? 'accent',
        duration: options?.duration ?? 4000,
        autoClose: options?.autoClose ?? true,
        pauseOnHover: options?.pauseOnHover ?? true,
        showProgressBar: options?.showProgressBar ?? options?.autoClose !== false,
        action: options?.action,
        icon: options?.icon,
      }

      setToasts((prev) => {
        const updated = [...prev, newToast]
        if (updated.length > maxToasts) updated.shift()
        return updated
      })

      if (newToast.autoClose) {
        startAutoClose(id, newToast.duration)
      }

      return id
    },
    [maxToasts, startAutoClose],
  )

  // Hover pauses timer and tracks exact remaining milliseconds
  const handleMouseEnter = (toast: IToast) => {
    if (!toast.pauseOnHover || !toast.autoClose) return

    const meta = metaRefs.current.get(toast.id)
    if (meta) {
      const elapsed = Date.now() - meta.startTime
      meta.remainingTime = Math.max(0, meta.remainingTime - elapsed)
      clearTimer(toast.id)
      setPausedIds((prev) => new Set(prev).add(toast.id))
    }
  }

  // Mouse leave resumes timer with exact remaining milliseconds
  const handleMouseLeave = (toast: IToast) => {
    if (!toast.pauseOnHover || !toast.autoClose) return

    setPausedIds((prev) => {
      const next = new Set(prev)
      next.delete(toast.id)
      return next
    })

    const meta = metaRefs.current.get(toast.id)
    if (meta && meta.remainingTime > 0) {
      startAutoClose(toast.id, meta.remainingTime)
    } else if (meta && meta.remainingTime <= 0) {
      closeToast(toast.id)
    }
  }

  const toastHelpers = useMemo(
    () => ({
      show: (message: ReactNode, options?: ToastOptions) => showToast(message, options),
      success: (message: ReactNode, options?: ToastOptions) =>
        showToast(message, { ...options, type: 'success' }),
      error: (message: ReactNode, options?: ToastOptions) =>
        showToast(message, { ...options, type: 'error' }),
      info: (message: ReactNode, options?: ToastOptions) =>
        showToast(message, { ...options, type: 'info' }),
      warning: (message: ReactNode, options?: ToastOptions) =>
        showToast(message, { ...options, type: 'warning' }),
      dismiss: (id: number) => closeToast(id),
      dismissAll: () => dismissAll(),
    }),
    [showToast, closeToast, dismissAll],
  )

  return (
    <ToastContext.Provider value={{ showToast, closeToast, toast: toastHelpers }}>
      {children}

      {/* Toast Container */}
      <div
        className={buildClassName(
          'fixed z-[9999] flex flex-col gap-3 pointer-events-none',
          placementClass[placement],
          className,
        )}
      >
        {toasts.map((toastItem) => (
          <div
            key={toastItem.id}
            className="pointer-events-auto"
            onMouseEnter={() => handleMouseEnter(toastItem)}
            onMouseLeave={() => handleMouseLeave(toastItem)}
          >
            <Toast
              {...toastItem}
              isPaused={pausedIds.has(toastItem.id)}
              isTop={placement.startsWith('top')}
              onClose={() => closeToast(toastItem.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

ToastProvider.displayName = 'ToastProvider'
