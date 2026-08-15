import type { ReactNode } from 'react'

/**
 * Visual style variant of the toast container.
 * - `accent` — default clean container with top/left accent bar
 * - `filled` — solid vibrant color tile with high contrast
 * - `outlined` — subtle border with badge icon
 * - `glass` — modern glassmorphism with backdrop blur
 */
export type ToastVariant = 'accent' | 'filled' | 'outlined' | 'glass'

/**
 * Utility type mapping the 4 possible toast types.
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning'

/**
 * Props passed to the Toast UI component.
 * Managed internally by ToastProvider.
 */
export interface ToastProps {
  /**
   * Unique identifier of the toast instance.
   */
  id: number

  /**
   * Optional headline title displayed above message.
   */
  title?: ReactNode

  /**
   * Main text message displayed inside the toast.
   */
  message: ReactNode

  /**
   * Visual intent style of the toast.
   */
  type: ToastType

  /**
   * Container variant style.
   * Defaults to `"accent"`.
   */
  variant?: ToastVariant

  /**
   * Optional action button.
   */
  action?: {
    label: string
    onClick: () => void
  }

  /**
   * Optional custom icon override slot.
   */
  icon?: ReactNode

  /**
   * Controls whether an animated auto-close progress bar is displayed.
   * Defaults to `true` when autoClose is enabled.
   */
  showProgressBar?: boolean

  /**
   * Total duration in milliseconds for progress bar countdown.
   */
  duration?: number

  /**
   * State indicating whether auto-close countdown is paused (e.g. on hover).
   */
  isPaused?: boolean

  /**
   * Triggers removal of the toast.
   */
  onClose: () => void

  /**
   * Optional additional class names.
   */
  className?: string
}

/**
 * Options passed when calling `showToast()` or `toast.success()`.
 */
export interface ToastOptions {
  /**
   * Optional headline title above message.
   */
  title?: ReactNode

  /**
   * The toast visual intent type.
   * Defaults to `"info"`.
   */
  type?: ToastType

  /**
   * Container variant style (`accent`, `filled`, `outlined`, `glass`).
   * Defaults to `"accent"`.
   */
  variant?: ToastVariant

  /**
   * Duration the toast stays visible (in milliseconds).
   * Defaults to 4000 ms.
   */
  duration?: number

  /**
   * Should the toast automatically close after duration?
   * Defaults to `true`.
   */
  autoClose?: boolean

  /**
   * If true, hovering over the toast pauses auto-close timer.
   * Defaults to `true`.
   */
  pauseOnHover?: boolean

  /**
   * Controls whether the auto-close progress bar is shown.
   * Defaults to `true`.
   */
  showProgressBar?: boolean

  /**
   * Optional action button inside toast (e.g. `{ label: "Undo", onClick: ... }`).
   */
  action?: {
    label: string
    onClick: () => void
  }

  /**
   * Optional custom icon element.
   */
  icon?: ReactNode
}

/**
 * Internal structure stored inside the ToastProvider state.
 */
export interface IToast {
  id: number
  title?: ReactNode
  message: ReactNode
  type: ToastType
  variant: ToastVariant
  duration: number
  autoClose: boolean
  pauseOnHover: boolean
  showProgressBar: boolean
  action?: {
    label: string
    onClick: () => void
  }
  icon?: ReactNode
}

/**
 * The methods exposed by the ToastProvider context.
 * Accessible through the `useToast()` hook.
 */
export interface ToastContextType {
  /**
   * Imperatively show a toast notification.
   */
  showToast: (message: ReactNode, options?: ToastOptions) => number

  /**
   * Manually closes a toast by ID.
   */
  closeToast: (id: number) => void

  /**
   * Shorthand object providing `toast.success()`, `toast.error()`, `toast.info()`, `toast.warning()`, `toast.dismiss()`, `toast.dismissAll()`.
   */
  toast: {
    show: (message: ReactNode, options?: ToastOptions) => number
    success: (message: ReactNode, options?: ToastOptions) => number
    error: (message: ReactNode, options?: ToastOptions) => number
    info: (message: ReactNode, options?: ToastOptions) => number
    warning: (message: ReactNode, options?: ToastOptions) => number
    dismiss: (id: number) => void
    dismissAll: () => void
  }
}

/**
 * All supported toast placements on screen.
 */
export type ToastPlacement =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'

/**
 * Props for the ToastProvider.
 */
export interface ToastProviderProps {
  children: ReactNode
  /**
   * Position on screen where toasts appear.
   * Defaults to `"top-right"`.
   */
  placement?: ToastPlacement

  /**
   * Maximum number of toasts visible simultaneously.
   * Defaults to `5`.
   */
  maxToasts?: number

  /**
   * Optional extra container class name override.
   */
  className?: string
}
