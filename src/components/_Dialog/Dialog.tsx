import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { DialogProps, DialogPosition } from './Dialog.types'
import { buildClassName } from '../../utils/build-classname'

import './dialog.css'

const portalRoot =
  typeof document !== 'undefined'
    ? (document.getElementById('dialog-root') ??
      (() => {
        const el = document.createElement('div')
        el.id = 'dialog-root'
        document.body.appendChild(el)
        return el
      })())
    : null

function getWrapperClass(position: DialogPosition) {
  switch (position) {
    case 'center':
      return 'fixed inset-0 flex items-center justify-center z-50'
    case 'top':
      return 'fixed inset-0 flex justify-center z-50'
    case 'bottom':
      return 'fixed inset-0 flex justify-center items-end z-50'
    case 'left':
      return 'fixed inset-0 flex items-stretch z-50'
    case 'right':
      return 'fixed inset-0 flex justify-end items-stretch z-50'
    default:
      return 'fixed inset-0 flex items-center justify-center z-50'
  }
}

function getAnimationClass(position: DialogPosition) {
  switch (position) {
    case 'center':
      return 'dialog-anim-center'
    case 'top':
      return 'dialog-anim-top'
    case 'bottom':
      return 'dialog-anim-bottom'
    case 'left':
      return 'dialog-anim-left'
    case 'right':
      return 'dialog-anim-right'
    default:
      return 'dialog-anim-center'
  }
}

function getPanelClass(position: DialogPosition, size: string, className?: string) {
  const sizeClass =
    {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'w-full h-full max-w-none rounded-none',
    }[size || 'md'] ?? 'max-w-md'

  switch (position) {
    case 'center':
      return buildClassName('bg-white rounded-xl shadow-xl w-full', sizeClass, className)

    case 'top':
      return buildClassName(
        'absolute top-0 left-1/2 -translate-x-1/2 w-full bg-white rounded-b-xl shadow-xl',
        sizeClass,
        className,
      )

    case 'bottom':
      return buildClassName(
        'absolute bottom-0 left-1/2 -translate-x-1/2 w-full bg-white rounded-t-xl shadow-xl',
        sizeClass,
        className,
      )

    case 'left':
      return buildClassName('h-full w-80 bg-white shadow-xl', className)

    case 'right':
      return buildClassName('h-full w-80 bg-white shadow-xl', className)

    default:
      return buildClassName('bg-white rounded-xl shadow-xl w-full', sizeClass, className)
  }
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  position = 'center',
  size = 'md',
  overlayClass,
  panelClass,
  children,
  backdrop = true,
  closeOnEscape = true,
}) => {
  const panelRef = useRef<HTMLDivElement>(null)

  // ESC key handler
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }

    if (closeOnEscape) {
      window.addEventListener('keydown', onKey)
    }
    return () => {
      if (closeOnEscape) {
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [open, onClose, closeOnEscape])

  // Prevent scroll bleed but DO NOT lock scrolling for entire page
  useEffect(() => {
    if (!open) return

    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  if (!open || !portalRoot) return null

  return createPortal(
    <div className={getWrapperClass(position)}>
      {/* Overlay */}
      {backdrop && (
        <div
          className={buildClassName('fixed inset-0 bg-black/20 transition-opacity', overlayClass)}
          onClick={() => onClose?.()}
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        className={buildClassName(
          'relative',
          getAnimationClass(position),
          getPanelClass(position, size, panelClass),
        )}
      >
        {children}
      </div>
    </div>,
    portalRoot,
  )
}
