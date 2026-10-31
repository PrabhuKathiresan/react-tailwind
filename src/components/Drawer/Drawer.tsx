import React from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import { Button } from '../Button'
import ChevronLeftIcon from '../Icons/ChevronLeft.svg'
import XIcon from '../Icons/X.svg'
import { useBreakpoint, useResponsiveValue } from '../../hooks/use-breakpoint'
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
  phoneLayout = 'default',
  headerAction,
}) => {
  const align = useResponsiveValue(alignProp)
  const size = useResponsiveValue(sizeProp)
  const breakpoint = useBreakpoint()
  const fullscreen = phoneLayout === 'fullscreen' && breakpoint === 'compact'
  const showTitleSection = Boolean(title || description || showBackButton || showCloseButton)
  const shouldShowDragHandle = !fullscreen && (dragHandle ?? align === 'bottom')
  useCloseOnBack(fullscreen && isOpen, onClose)
  // The visible area while the on-screen keyboard is open; null otherwise.
  const [keyboardViewport, setKeyboardViewport] = React.useState<{
    top: number
    height: number
  } | null>(null)

  React.useEffect(() => {
    if (!isOpen) {
      setKeyboardViewport(null)
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
      const top = Math.round(vv.offsetTop)
      const height = Math.round(vv.height)
      // The browser scrolls the visible area to the focused field, so the
      // drawer follows its offset as well as its height. An unchanged value
      // doesn't re-render.
      setKeyboardViewport((current) =>
        !keyboardOpen
          ? null
          : current && current.top === top && current.height === height
            ? current
            : { top, height },
      )
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
          With the keyboard open it takes the visible area's offset and height. */}
      <div
        className="fixed inset-0"
        style={
          keyboardViewport
            ? {
                top: `${keyboardViewport.top}px`,
                height: `${keyboardViewport.height}px`,
                bottom: 'auto',
              }
            : undefined
        }
        data-testid="drawer-viewport"
      >
        <div className={buildClassName('flex', fullscreen ? 'h-full' : alignmentMap[align])}>
          <DialogPanel
            transition
            className={buildClassName(
              'w-full max-w-full bg-white dark:bg-gray-800 shadow-xl flex flex-col min-w-0',
              'overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] duration-200 ease-out data-[closed]:opacity-0',
              ...(fullscreen
                ? ['h-full data-[closed]:translate-y-4']
                : [panelAlignmentMap[align], panelSizeMap[size], panelClass]),
            )}
            data-layout={fullscreen ? 'fullscreen' : undefined}
          >
            {/* Top drag handle indicator for mobile bottom sheet */}
            {shouldShowDragHandle && (
              <div
                className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto my-2.5 shrink-0 cursor-grab"
                data-testid="drawer-drag-handle"
              />
            )}

            {/* Phone full-screen bar: the only fixed part, so the fields keep the room. */}
            {fullscreen && (
              <div className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-1 border-b border-[var(--ui-border)] bg-white pl-1 pr-3 pt-[env(safe-area-inset-top,0px)] box-content dark:bg-gray-800">
                <Button
                  iconOnly
                  aria-label="Close"
                  variant="plain"
                  theme="secondary"
                  onClick={onClose}
                  className="shrink-0"
                >
                  <XIcon className="size-5" />
                </Button>
                {title && (
                  <DialogTitle
                    as="h3"
                    className="min-w-0 flex-1 truncate text-base font-semibold text-gray-900 dark:text-white"
                  >
                    {title}
                  </DialogTitle>
                )}
                {headerAction && <div className="ml-auto shrink-0">{headerAction}</div>}
              </div>
            )}

            {/* Header Section */}
            {!fullscreen && showTitleSection && (
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
            <div
              className={buildClassName(
                'flex-1 p-4 md:p-6 space-y-4 min-w-0',
                contentClass,
                fullscreen && 'pb-[calc(1rem+env(safe-area-inset-bottom,0px))]',
              )}
            >
              {fullscreen && description && (
                <p
                  className={buildClassName(
                    'text-sm text-gray-500 dark:text-gray-400',
                    descriptionClass,
                  )}
                >
                  {description}
                </p>
              )}
              {children}
            </div>

            {/* Footer Section (the phone full-screen bar carries the action instead) */}
            {!fullscreen && footer && (
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

/**
 * While `active`, the browser's back button (and Android's back gesture)
 * closes the drawer instead of leaving the page: opening adds a history entry
 * (keeping the current state, so routers see the same location), and back
 * removes it. Closed any other way, the entry is removed too, but only if it's
 * still the latest one, so a form that saves and then navigates isn't undone.
 */
function useCloseOnBack(active: boolean, onClose: () => void) {
  const onCloseRef = React.useRef(onClose)
  React.useEffect(() => {
    onCloseRef.current = onClose
  })
  const token = React.useId()

  React.useEffect(() => {
    if (!active || typeof window === 'undefined') return
    const pushEntry = () =>
      window.history.pushState({ ...(window.history.state ?? {}), drawer: token }, '')
    pushEntry()
    let entryPresent = true
    let disposed = false
    const handlePop = () => {
      if (window.history.state?.drawer === token) return
      entryPresent = false
      onCloseRef.current()
      // onClose may step back within the drawer instead of closing it; if it's
      // still open afterwards, take back its entry so the next back works too.
      window.setTimeout(() => {
        if (disposed) return
        pushEntry()
        entryPresent = true
      }, 0)
    }
    window.addEventListener('popstate', handlePop)
    return () => {
      disposed = true
      window.removeEventListener('popstate', handlePop)
      if (entryPresent && window.history.state?.drawer === token) window.history.back()
    }
  }, [active, token])
}
