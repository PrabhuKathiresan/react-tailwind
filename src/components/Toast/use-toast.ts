import { createContext, useContext } from 'react'
import type { ToastContextType } from './Toast.types'

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

/** Shows toasts from anywhere inside a `ToastProvider`. */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
