import { forwardRef, useState } from 'react'
import { buildClassName } from '../../utils/build-classname'
import { Drawer } from '../Drawer'
import type { StickyActionBarProps } from './StickyActionBar.types'

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
)

export const StickyActionBar = forwardRef<HTMLDivElement, StickyActionBarProps>((props, ref) => {
  const {
    summaryContent,
    actionsContent,
    drawerContent,
    drawerTitle = 'Summary Details',
    position = 'fixed',
    containerMaxWidth = 'max-w-5xl',
    className,
    ...restProps
  } = props

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const positionClass =
    position === 'fixed'
      ? 'fixed bottom-0 left-0 right-0 z-30'
      : position === 'sticky'
        ? 'sticky bottom-0 z-30'
        : 'relative z-10'

  return (
    <>
      <div
        ref={ref}
        className={buildClassName(
          positionClass,
          'border-t border-gray-200/80 bg-white/90 p-3.5 backdrop-blur-md shadow-lg dark:border-gray-800 dark:bg-gray-900/90 transition-all',
          className,
        )}
        data-testid="sticky-action-bar"
        {...restProps}
      >
        <div
          className={buildClassName(
            'mx-auto flex items-center justify-between gap-3',
            containerMaxWidth,
          )}
        >
          {/* Summary Content Slot */}
          {summaryContent && (
            <div className="flex items-center gap-2">
              {drawerContent ? (
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center gap-2 text-left transition-opacity hover:opacity-80 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-primary-ring)] rounded-lg p-1 -m-1"
                  aria-label="Expand summary details"
                  data-testid="summary-trigger"
                >
                  <div>{summaryContent}</div>
                  <ChevronUpIcon className="size-4 text-[var(--ui-primary)] dark:text-blue-400 shrink-0" />
                </button>
              ) : (
                <div>{summaryContent}</div>
              )}
            </div>
          )}

          {/* Actions Stack Slot */}
          {actionsContent && (
            <div className="flex items-center gap-2 shrink-0 ml-auto" data-testid="actions-stack">
              {actionsContent}
            </div>
          )}
        </div>
      </div>

      {/* Optional Expandable Details Drawer */}
      {drawerContent && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          align="bottom"
          size="full"
          title={drawerTitle}
          showBackButton
          contentClass="px-4 pb-6 max-h-[calc(100svh-6rem)] overflow-y-auto"
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  )
})

StickyActionBar.displayName = 'StickyActionBar'
