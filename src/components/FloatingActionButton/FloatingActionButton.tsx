import React, { useState } from 'react'
import type { FloatingActionButtonProps, FABSpeedDialAction } from './FloatingActionButton.types'
import { buildClassName } from '../../utils/build-classname'

export function FloatingActionButton({
  icon,
  activeIcon,
  label,
  variant = 'primary',
  size = 'md',
  position = 'bottom-right',
  speedDialActions,
  isOpen: externalIsOpen,
  onToggle,
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  containerClass = '',
  className = '',
}: FloatingActionButtonProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  const isSpeedDial = Array.isArray(speedDialActions) && speedDialActions.length > 0
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen

  const toggleOpen = () => {
    const nextState = !isOpen
    setInternalIsOpen(nextState)
    onToggle?.(nextState)
  }

  const handleMainClick = () => {
    if (disabled) return
    if (isSpeedDial) {
      toggleOpen()
    } else {
      onClick?.()
    }
  }

  const handleSubActionClick = (action: FABSpeedDialAction) => {
    if (action.disabled) return
    action.onClick?.()
    setInternalIsOpen(false)
    onToggle?.(false)
  }

  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6 z-40',
    'bottom-left': 'fixed bottom-6 left-6 z-40',
    'bottom-center': 'fixed bottom-6 left-1/2 -translate-x-1/2 z-40',
    inline: 'relative inline-flex z-10',
  }[position]

  const variantClasses = {
    primary:
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg shadow-blue-600/30',
    secondary:
      'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 border border-[var(--ui-border)] shadow-lg',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-lg shadow-red-600/30',
    dark: 'bg-gray-900 hover:bg-black active:bg-black text-white shadow-lg shadow-gray-900/40',
  }[variant]

  const sizeClasses = {
    sm: label ? 'px-3.5 py-2 text-xs gap-2 rounded-full' : 'p-2.5 rounded-full',
    md: label ? 'px-5 py-3 text-sm gap-2.5 rounded-full' : 'p-3.5 rounded-full',
    lg: label ? 'px-6 py-4 text-base gap-3 rounded-full' : 'p-4 rounded-full',
  }[size]

  return (
    <div className={buildClassName(positionClasses, containerClass)} data-testid="fab-container">
      {/* Speed Dial Backdrop Overlay */}
      {isSpeedDial && isOpen && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-xs z-30 transition-opacity duration-200"
          onClick={() => toggleOpen()}
          data-testid="fab-backdrop"
        />
      )}

      {/* Speed Dial Sub-Actions List */}
      {isSpeedDial && (
        <div
          className={buildClassName(
            'absolute bottom-full mb-3 flex flex-col gap-2.5 z-40 transition-all duration-200 origin-bottom',
            position === 'bottom-left'
              ? 'items-start left-0'
              : position === 'bottom-center'
                ? 'items-center left-1/2 -translate-x-1/2'
                : 'items-end right-0',
            isOpen
              ? 'scale-100 opacity-100 pointer-events-auto'
              : 'scale-90 opacity-0 pointer-events-none',
          )}
          data-testid="fab-speed-dial-menu"
        >
          {speedDialActions.map((action) => {
            const isDanger = action.theme === 'danger'
            const isPrimary = action.theme === 'primary'

            return (
              <button
                key={action.id}
                type="button"
                disabled={action.disabled}
                onClick={() => handleSubActionClick(action)}
                className={buildClassName(
                  'flex items-center gap-2.5 py-2 px-3.5 rounded-full text-xs font-semibold shadow-md transition-all duration-150 cursor-pointer group',
                  action.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
                  !action.disabled &&
                    (isDanger
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : isPrimary
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 border border-[var(--ui-border)]'),
                )}
                data-testid={`fab-action-${action.id}`}
              >
                <span className="text-sm">{action.icon}</span>
                <span className="whitespace-nowrap">{action.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Primary Floating Action Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleMainClick}
        aria-label={ariaLabel || (typeof label === 'string' ? label : 'Floating action')}
        aria-expanded={isSpeedDial ? isOpen : undefined}
        className={buildClassName(
          'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer select-none z-40 active:scale-95',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none shadow-none',
          variantClasses,
          sizeClasses,
          className,
        )}
        data-testid="fab-button"
      >
        <span
          className={buildClassName('transition-transform duration-200', isOpen && 'rotate-45')}
        >
          {isOpen && activeIcon ? activeIcon : icon}
        </span>
        {label && <span className="whitespace-nowrap">{label}</span>}
      </button>
    </div>
  )
}

FloatingActionButton.displayName = 'FloatingActionButton'
