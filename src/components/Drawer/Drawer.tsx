import React from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import { Button } from '../Button'
import ChevronLeftIcon from '../Icons/ChevronLeft.svg'
import XIcon from '../Icons/X.svg'
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
  bottom: 'data-[closed]:translate-y-1/2 rounded-t-2xl md:rounded-t-3xl max-h-[92svh]',
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

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose = () => {},
  closeOnOutsideClick = true,
  align = 'end',
  size = 'md',
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
  const showTitleSection = Boolean(title || description || showBackButton || showCloseButton)
  const shouldShowDragHandle = dragHandle ?? align === 'bottom'

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

      <div className="fixed inset-0 w-screen h-[100svh]">
        <div className={buildClassName('flex', alignmentMap[align])}>
          <DialogPanel
            transition
            className={buildClassName(
              'w-full max-w-full bg-white dark:bg-gray-800 shadow-xl flex flex-col min-w-0',
              'overflow-y-auto overflow-x-hidden duration-200 ease-out data-[closed]:opacity-0',
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
                  'space-y-1 py-3 px-4 md:px-6 flex flex-col border-b border-gray-100 dark:border-gray-700/60 shrink-0',
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
                  'p-4 border-t border-gray-100 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/80 shrink-0 min-w-0',
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
