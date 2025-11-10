import React from 'react'
import { DialogBackdrop, DialogPanel, DialogTitle, Dialog } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import { Button } from '../Button'
import ChevronLeftIcon from '../Icons/ChevronLeft.svg'
import { type AlignmentMap, type DrawerProps, type SizeMap } from './type'

const alignmentMap: AlignmentMap = {
  center: 'items-center justify-center h-full',
  start: 'justify-start h-full',
  end: 'justify-end h-full',
  top: 'items-start',
  bottom: 'items-end h-full',
  'top-center': 'items-center justify-center',
}
const panelAlignmentMap: AlignmentMap = {
  'top-center': 'data-[closed]:transform-[translateY(-50%)] rounded-b-lg',
  center: 'data-[closed]:transform-[scale(95%)] rounded-lg',
  start: 'data-[closed]:transform-[translateX(-50%)] rounded-r-lg',
  end: 'data-[closed]:transform-[translateX(50%)] rounded-l-lg',
  top: 'data-[closed]:transform-[translateY(-50%)] rounded-b-lg',
  bottom: 'data-[closed]:transform-[translateY(50%)] rounded-t-lg',
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
  description = null,
  children = null,
  panelClass = '',
  contentClass = '',
  titleClass = '',
  descriptionClass = '',
  titleSticky = false,
  showBackButton = false,
}) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-15 focus:outline-none" onClose={onClose}>
      {backdrop && <DialogBackdrop className="fixed inset-0 bg-black/20" />}
      <div className={buildClassName('fixed inset-0 z-15 w-screen h-screen h-dvh')}>
        <div className={buildClassName('flex', alignmentMap[align])}>
          <DialogPanel
            transition
            className={buildClassName(
              'w-full bg-white dark:bg-gray-800 backdrop-blur-2xl duration-200 ease-out data-[closed]:opacity-0 shadow-sm overflow-y-auto space-y-4',
              panelAlignmentMap[align],
              panelSizeMap[size],
              panelClass,
            )}
          >
            <div
              className={buildClassName(
                'space-y-2 pt-2 md:pt-4 px-4 md:px-6',
                titleSticky && 'sticky top-0 bg-white dark:bg-gray-800 z-10',
              )}
            >
              <DialogTitle
                as="h3"
                className={buildClassName(
                  'text-lg/7 font-medium dark:text-white flex items-center gap-2',
                  titleClass,
                )}
              >
                {showBackButton && (
                  <Button iconOnly variant="plain" theme="secondary" size="sm" onClick={onClose}>
                    <ChevronLeftIcon className="size-5" />
                  </Button>
                )}
                {title}
              </DialogTitle>
              {description && (
                <p className={buildClassName('text-sm/6 dark:text-white/50', descriptionClass)}>
                  {description}
                </p>
              )}
            </div>
            <div className={buildClassName(contentClass)}>{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
