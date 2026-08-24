import React from 'react'
import type { ActionSheetProps } from './ActionSheet.types'
import { Drawer } from '../Drawer'
import { Button } from '../Button'
import { buildClassName } from '../../utils/build-classname'

export function ActionSheet({
  isOpen,
  onClose,
  title,
  description,
  actions,
  showCancelButton = true,
  cancelLabel = 'Cancel',
  onCancel,
  closeOnBackdropClick = true,
  dragHandle = true,
  panelClass = '',
  containerClass = '',
}: ActionSheetProps) {
  const handleItemClick = (action: (typeof actions)[0]) => {
    if (action.disabled) return
    action.onClick?.()
    onClose()
  }

  const handleCancelClick = () => {
    onCancel?.()
    onClose()
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      align="bottom"
      closeOnOutsideClick={closeOnBackdropClick}
      showCloseButton={false}
      dragHandle={dragHandle}
      panelClass={buildClassName('rounded-t-2xl max-h-[85vh] overflow-hidden', panelClass)}
      data-testid="action-sheet-drawer"
    >
      <div className={buildClassName('space-y-4 py-1', containerClass)} data-testid="action-sheet">
        {/* Header Title & Description */}
        {(title || description) && (
          <div className="text-center px-4 pb-2 border-b border-[var(--ui-border-muted)]">
            {title && (
              <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Action Items Group */}
        <div className="space-y-1 bg-gray-50 dark:bg-gray-800/60 p-1.5 rounded-2xl border border-[var(--ui-border-muted)]">
          {actions.map((action) => {
            const isDanger = action.theme === 'danger'
            const isPrimary = action.theme === 'primary'

            return (
              <button
                key={action.id}
                type="button"
                disabled={action.disabled}
                onClick={() => handleItemClick(action)}
                className={buildClassName(
                  'w-full flex items-center gap-3.5 p-3 rounded-xl text-left transition-all duration-150 group cursor-pointer',
                  action.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
                  !action.disabled &&
                    (isDanger
                      ? 'hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold'
                      : isPrimary
                        ? 'hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium'),
                )}
                data-testid={`action-sheet-item-${action.id}`}
              >
                {action.icon && (
                  <span
                    className={buildClassName(
                      'shrink-0 text-base transition-colors',
                      isDanger
                        ? 'text-red-500 dark:text-red-400'
                        : isPrimary
                          ? 'text-blue-500 dark:text-blue-400'
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200',
                    )}
                  >
                    {action.icon}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-sm truncate">{action.label}</div>
                  {action.description && (
                    <div className="text-xs text-gray-400 dark:text-gray-500 truncate font-normal mt-0.5">
                      {action.description}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Bottom Separate Cancel Button */}
        {showCancelButton && (
          <div className="pt-1">
            <Button
              theme="secondary"
              size="lg"
              fullWidth
              onClick={handleCancelClick}
              className="font-semibold text-sm rounded-xl py-3"
              data-testid="action-sheet-cancel-btn"
            >
              {cancelLabel}
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  )
}

ActionSheet.displayName = 'ActionSheet'
