import React, { Fragment, cloneElement, isValidElement } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import type { DropdownItem, DropdownProps } from './Dropdown.types'

const WIDTH_CLASS: Record<string, string> = {
  auto: 'w-auto min-w-[120px]',
  sm: 'w-44',
  md: 'w-56',
  lg: 'w-64',
  xl: 'w-72',
}

export const Dropdown: React.FC<DropdownProps> = ({
  triggerButton,
  renderTriggerButton,
  className,
  items,
  renderItem,
  itemsContainerClass,
  transition = true,
  anchor = 'bottom start',
  width = 'md',
  menuItemClass,
  onMenuClick,
  ...restProps
}: DropdownProps & Record<string, any>) => {
  const widthClass = WIDTH_CLASS[width] || width || WIDTH_CLASS.md
  const { theme, variant, size, disabled } = restProps

  return (
    <Menu as="div" className="relative inline-block">
      {/* Trigger */}
      {renderTriggerButton ? (
        <MenuButton as={Fragment}>
          {(state) => {
            const rendered = renderTriggerButton(state)
            if (isValidElement(rendered) && className) {
              return cloneElement(rendered as React.ReactElement<any>, {
                className: buildClassName((rendered.props as any).className, className),
              })
            }
            return rendered as React.ReactElement
          }}
        </MenuButton>
      ) : isValidElement(triggerButton) ? (
        <MenuButton as={Fragment}>
          {cloneElement(triggerButton as React.ReactElement<any>, {
            className: buildClassName((triggerButton.props as any).className, className),
            theme: (triggerButton.props as any).theme ?? theme,
            variant: (triggerButton.props as any).variant ?? variant,
            size: (triggerButton.props as any).size ?? size,
            disabled: (triggerButton.props as any).disabled ?? disabled,
          })}
        </MenuButton>
      ) : (
        <MenuButton as={Fragment}>{triggerButton}</MenuButton>
      )}

      {/* Dropdown Panel */}
      <MenuItems
        transition={transition}
        anchor={anchor}
        className={buildClassName(
          'origin-top-right rounded-xl shadow-lg p-1.5 text-sm transition duration-100 ease-out z-50',
          'border border-[var(--ui-border)] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200',
          'focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0',
          '[--anchor-gap:--spacing(1)]',
          widthClass,
          itemsContainerClass,
        )}
        data-testid="dropdown-items"
        as="ul"
      >
        {items.map((item: DropdownItem, idx: number) => (
          <Fragment key={item.id}>
            {item.groupTitle && (
              <li
                key={`group-${item.id}`}
                className="px-2.5 pt-2 pb-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider select-none"
                data-testid={`dropdown-group-${item.id}`}
              >
                {item.groupTitle}
              </li>
            )}
            {!item.divider && (
              <MenuItem as="li" disabled={item.disabled}>
                {({ disabled, active }) => (
                  <div
                    onClick={() => {
                      if (!disabled) {
                        item.onClick?.(item)
                        onMenuClick?.(item, idx)
                      }
                    }}
                    className={buildClassName(
                      'flex items-center justify-between gap-3 w-full px-2.5 py-1.5 rounded-lg text-sm transition-colors cursor-pointer select-none',
                      item.danger
                        ? buildClassName(
                            'text-rose-600 dark:text-rose-400',
                            active
                              ? 'bg-rose-50 dark:bg-rose-950/40'
                              : 'hover:bg-rose-50 dark:hover:bg-rose-950/40',
                          )
                        : buildClassName(
                            'text-gray-700 dark:text-gray-200',
                            active
                              ? 'bg-gray-100 dark:bg-gray-700/80'
                              : 'hover:bg-gray-100/80 dark:hover:bg-gray-700/80',
                          ),
                      disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                      menuItemClass,
                    )}
                    data-testid={`dropdown-item-${item.id}`}
                  >
                    {renderItem ? (
                      renderItem(item)
                    ) : (
                      <>
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          {item.icon && (
                            <span
                              className={buildClassName(
                                'shrink-0',
                                item.danger ? 'text-rose-500' : 'text-gray-400 dark:text-gray-500',
                              )}
                            >
                              {item.icon}
                            </span>
                          )}
                          <div className="flex flex-col min-w-0">
                            {item.label && (
                              <span className="font-medium truncate">{item.label}</span>
                            )}
                            {item.description && (
                              <span className="text-xs text-gray-400 dark:text-gray-500 font-normal truncate">
                                {item.description}
                              </span>
                            )}
                          </div>
                        </div>
                        {item.shortcut && (
                          <kbd className="shrink-0 text-[10px] font-medium font-mono px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700/80 border border-[var(--ui-border-muted)] text-gray-400 dark:text-gray-400">
                            {item.shortcut}
                          </kbd>
                        )}
                      </>
                    )}
                  </div>
                )}
              </MenuItem>
            )}
            {item.divider && idx < items.length - 1 && (
              <li
                key={`divider-${item.id}`}
                className="my-1 h-px bg-gray-200/80 dark:bg-gray-700/80"
                data-testid="dropdown-divider"
              />
            )}
          </Fragment>
        ))}
      </MenuItems>
    </Menu>
  )
}

Dropdown.displayName = 'Dropdown'
