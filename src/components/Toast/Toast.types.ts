/**
 * Props passed to the Toast UI component.
 * This component is rendered internally by the ToastProvider.
 */
export interface ToastProps {
  /**
   * Unique identifier of the toast instance.
   * Generated internally by ToastProvider.
   */
  id: number

  /**
   * The message text displayed inside the toast.
   */
  message: string

  /**
   * Visual style of the toast based on its purpose.
   * - `success` — positive confirmations
   * - `error` — failures or critical issues
   * - `info` — general helpful information
   * - `warning` — caution or attention required
   */
  type: 'success' | 'error' | 'info' | 'warning'

  /**
   * Triggers removal of the toast.
   * Managed internally by the ToastProvider.
   */
  onClose: () => void

  /**
   * Optional additional class names to customize the toast container.
   */
  className?: string
}

/**
 * Utility type mapping the 4 possible toast types.
 */
export type ToastType = ToastProps['type']

/**
 * Options passed when calling `showToast()`.
 */
export interface ToastOptions {
  /**
   * The toast visual style.
   * Defaults to `"info"` if not provided.
   */
  type?: ToastType

  /**
   * Duration the toast stays visible (in milliseconds).
   * Defaults to 3000 ms.
   */
  duration?: number

  /**
   * Should the toast automatically close after its duration?
   * Defaults to `true`.
   */
  autoClose?: boolean

  /**
   * If true, hovering over the toast pauses auto-close timer.
   * Defaults to `true`.
   */
  pauseOnHover?: boolean
}

/**
 * Internal structure stored inside the ToastProvider state.
 * This is NOT exposed publicly.
 */
export interface IToast {
  /** Unique toast ID */
  id: number

  /** Toast message */
  message: string

  /** Toast type variant */
  type: ToastType

  /** Toast lifetime in milliseconds */
  duration: number

  /** Whether the toast will auto-close */
  autoClose: boolean

  /** Whether hover pauses auto closing */
  pauseOnHover: boolean
}

/**
 * The methods exposed by the ToastProvider context.
 * Accessible through the `useToast()` hook.
 */
export interface ToastContextType {
  /**
   * Imperatively show a toast message.
   *
   * @example
   * showToast("Saved!", { type: "success" })
   */
  showToast: (message: string, options?: ToastOptions) => void

  /**
   * Manually closes a toast by ID.
   * Normally handled internally.
   */
  closeToast: (id: number) => void
}

/**
 * All supported toast placements.
 * Used by `<ToastProvider placement=\"...\"/>`
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
 * Wrap your application with this provider to enable toast notifications.
 */
export interface ToastProviderProps {
  /**
   * Your application or subtree where toast notifications should be available.
   */
  children: React.ReactNode

  /**
   * Controls where toasts appear on the screen.
   * Defaults to `"top-right"`.
   */
  placement?: ToastPlacement
}
