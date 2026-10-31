import React from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import { Button } from '../Button'
import ChevronLeftIcon from '../Icons/ChevronLeft.svg'
import XIcon from '../Icons/X.svg'
import { useResponsiveValue } from '../../hooks/use-breakpoint'
import type { AlignmentMap, DrawerProps, SizeMap } from './Drawer.types'

const alignmentMap: AlignmentMap = {
  center: 'items-center justify-center h-full',
  start: 'justify-start h-full',
  end: 'justify-end h-full',
  top: 'items-start justify-center w-full',
  bottom: 'items-end justify-center h-full',
}

const panelAlignmentMap: AlignmentMap = {
  center: 'data-[closed]:scale-95 rounded-2xl',
  start: 'data-[closed]:-translate-x-1/2 rounded-r-2xl',
  end: 'data-[closed]:translate-x-1/2 rounded-l-2xl',
  top: 'data-[closed]:-translate-y-1/2 rounded-b-2xl',
  // Bottom sheets clear the home indicator on notched phones (0 elsewhere).
  bottom:
    'data-[closed]:translate-y-full rounded-t-2xl md:rounded-t-3xl max-h-[88vh] max-h-[88dvh] pb-[env(safe-area-inset-bottom,0px)]',
}

const panelSizeMap: SizeMap = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'w-full',
}

// How much shorter than the window the visual viewport must be before it's
// taken to be the on-screen keyboard rather than the URL bar (≈ 56px).
const KEYBOARD_THRESHOLD = 150
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose = () => {},
  closeOnOutsideClick = true,
  align: alignProp = 'end',
  size: sizeProp = 'md',
  backdrop = true,
  title,
  description,
  children,
  footer,
  footerSticky = false,
  panelClass = '',
  contentClass = '',
  titleClass = '',
  descriptionClass = '',
  titleSticky = false,
  showBackButton = false,
  showCloseButton = true,
  dragHandle,
}) => {
  const align = useResponsiveValue(alignProp)
  const size = useResponsiveValue(sizeProp)
  const showTitleSection = Boolean(title || description || showBackButton || showCloseButton)
  const shouldShowDragHandle = dragHandle ?? align === 'bottom'
  const [viewportHeight, setViewportHeight] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (!isOpen) {
      setViewportHeight(null)
      return
    }

    // Follow the visual viewport only while the on-screen keyboard takes space
    // (it's then much shorter than the window), so the drawer and its footer
    // stay above the keyboard. Otherwise it's pinned to the edges: tracking every resize and
    // scroll in state re-rendered the drawer on each frame as the browser's
    // URL bar moved, and its sticky header and footer jumped while scrolling.
    let frame = 0
    const measure = () => {
      frame = 0
      const vv = window.visualViewport
      if (!vv) return
      const keyboardOpen = window.innerHeight - vv.height > KEYBOARD_THRESHOLD
      const next = keyboardOpen ? Math.round(vv.height) : null
      // An unchanged value doesn't re-render.
      setViewportHeight(next)
    }
    const updateHeight = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    measure()
    const vv = typeof window !== 'undefined' ? window.visualViewport : null
    vv?.addEventListener('resize', updateHeight)
    vv?.addEventListener('scroll', updateHeight)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      vv?.removeEventListener('resize', updateHeight)
      vv?.removeEventListener('scroll', updateHeight)
    }
  }, [isOpen])

  const handleDialogClose = () => {
    if (closeOnOutsideClick) {
      onClose?.()
    }
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={handleDialogClose}
      transition
    >
      {backdrop && (
        <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200" />
      )}

      {/* Pinned to all four edges rather than given a height: mobile browsers
          move fixed edges with the URL bar on every frame, while 100dvh only
          updates once its animation ends (the drawer briefly came up short).
          With the keyboard open it takes the visual viewport's height. */}
      <div
        className="fixed inset-0"
        style={viewportHeight ? { height: `${viewportHeight}px`, bottom: 'auto' } : undefined}
        data-testid="drawer-viewport"
      >
        <div className={buildClassName('flex', alignmentMap[align])}>
          <DialogPanel
            transition
            className={buildClassName(
              'w-full max-w-full bg-white dark:bg-gray-800 shadow-xl flex flex-col min-w-0',
              'overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] duration-200 ease-out data-[closed]:opacity-0',
              panelAlignmentMap[align],
              panelSizeMap[size],
              panelClass,
            )}
          >
            {/* Top drag handle indicator for mobile bottom sheet */}
            {shouldShowDragHandle && (
              <div
                className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto my-2.5 shrink-0 cursor-grab"
                data-testid="drawer-drag-handle"
              />
            )}

            {/* Header Section */}
            {showTitleSection && (
              <div
                className={buildClassName(
                  'space-y-1 py-3 px-4 md:px-6 flex flex-col border-b border-[var(--ui-border)] shrink-0',
                  titleSticky && 'sticky top-0 bg-white dark:bg-gray-800 z-10',
                )}
              >
                <div className="flex items-center justify-between gap-3 min-w-0">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {showBackButton && (
                      <Button
                        iconOnly
                        aria-label="Back"
                        variant="plain"
                        theme="secondary"
                        size="xs"
                        onClick={onClose}
                      >
                        <ChevronLeftIcon className="size-4" />
                      </Button>
                    )}
                    {title && (
                      <DialogTitle
                        as="h3"
                        className={buildClassName(
                          'text-lg font-semibold text-gray-900 dark:text-white truncate tracking-tight min-w-0',
                          titleClass,
                        )}
                      >
                        {title}
                      </DialogTitle>
                    )}
                  </div>

                  {showCloseButton && (
                    <Button
                      iconOnly
                      aria-label="Close drawer"
                      variant="plain"
                      theme="secondary"
                      size="xs"
                      onClick={onClose}
                      className="rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0"
                    >
                      <XIcon className="size-4" />
                    </Button>
                  )}
                </div>

                {description && (
                  <p
                    className={buildClassName(
                      'text-sm text-gray-500 dark:text-gray-400 font-normal truncate',
                      descriptionClass,
                    )}
                  >
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Content Body */}
            <div className={buildClassName('flex-1 p-4 md:p-6 space-y-4 min-w-0', contentClass)}>
              {children}
            </div>

            {/* Footer Section */}
            {footer && (
              <div
                className={buildClassName(
                  'p-4 border-t border-[var(--ui-border-muted)] bg-white dark:bg-gray-800 shrink-0 min-w-0',
                  footerSticky && 'sticky bottom-0 z-10',
                )}
              >
                {footer}
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

Drawer.displayName = 'Drawer'
