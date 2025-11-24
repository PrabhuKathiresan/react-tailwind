import React from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import { Button } from '../Button'
import ChevronLeftIcon from '../Icons/ChevronLeft.svg'
import type { DrawerProps, AlignmentMap, SizeMap } from './Drawer.types'

const alignmentMap: AlignmentMap = {
  center: 'items-center justify-center h-full',
  start: 'justify-start h-full',
  end: 'justify-end h-full',
  top: 'items-center justify-center',
  bottom: 'items-end justify-center h-full',
}

const panelAlignmentMap: AlignmentMap = {
  center: 'data-[closed]:scale-95 rounded-lg',
  start: 'data-[closed]:-translate-x-1/2 rounded-r-lg',
  end: 'data-[closed]:translate-x-1/2 rounded-l-lg',
  top: 'data-[closed]:-translate-y-1/2 rounded-b-lg',
  bottom: 'data-[closed]:translate-y-1/2 rounded-t-lg',
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
  align = 'end',
  size = 'md',
  backdrop = true,
  title,
  description,
  children,
  panelClass = '',
  contentClass = '',
  titleClass = '',
  descriptionClass = '',
  titleSticky = false,
  showBackButton = false,
}) => {
  const showTitleSection = Boolean(title || description)

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={onClose}
      transition
    >
      {backdrop && <DialogBackdrop className="fixed inset-0 bg-black/20 transition-opacity" />}

      <div className="fixed inset-0 w-screen h-screen">
        <div className={buildClassName('flex', alignmentMap[align])}>
          <DialogPanel
            transition
            className={buildClassName(
              'w-full bg-white dark:bg-gray-800 backdrop-blur-2xl shadow-sm',
              'overflow-y-auto space-y-4 duration-200 ease-out data-[closed]:opacity-0',
              panelAlignmentMap[align],
              panelSizeMap[size],
              panelClass,
            )}
          >
            {showTitleSection && (
              <div
                className={buildClassName(
                  'space-y-2 pt-2 md:pt-4 px-4 md:px-6',
                  titleSticky && 'sticky top-0 bg-white dark:bg-gray-800 z-10',
                )}
              >
                <DialogTitle
                  as="h3"
                  className={buildClassName(
                    'text-lg font-medium dark:text-white flex items-center gap-2',
                    titleClass,
                  )}
                >
                  {showBackButton && (
                    <Button
                      iconOnly
                      aria-label="Close drawer"
                      variant="plain"
                      theme="secondary"
                      size="sm"
                      onClick={onClose}
                    >
                      <ChevronLeftIcon className="size-5" />
                    </Button>
                  )}
                  {title}
                </DialogTitle>

                {description && (
                  <p className={buildClassName('text-sm dark:text-white/60', descriptionClass)}>
                    {description}
                  </p>
                )}
              </div>
            )}

            <div className={contentClass}>{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

Drawer.displayName = 'Drawer'
