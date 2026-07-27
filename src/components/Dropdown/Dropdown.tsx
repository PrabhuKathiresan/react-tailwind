import React, { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import type { DropdownProps, DropdownItem } from './Dropdown.types'

const BASE_ITEM_CLASS =
  'flex w-full px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg'

export const Dropdown: React.FC<DropdownProps> = ({
  triggerButton,
  renderTriggerButton,
  items,
  renderItem,
  itemsContainerClass,
  transition = true,
  anchor = 'bottom start',
  menuItemClass,
  onMenuClick,
}) => {
  return (
    <Menu as="div" className="relative inline-block">
      {/* Trigger */}
      {renderTriggerButton ? (
        <MenuButton as={Fragment}>
          {(state) => renderTriggerButton(state) as React.ReactElement}
        </MenuButton>
      ) : (
        <MenuButton as={Fragment}>{triggerButton}</MenuButton>
      )}

      {/* Dropdown Panel */}
      <MenuItems
        transition={transition}
        anchor={anchor}
        className={buildClassName(
          'w-52 origin-top-right rounded-xl shadow-sm p-1 text-sm transition duration-100 ease-out',
          'border border-[var(--ui-border-muted)] bg-white text-gray-800',
          'dark:bg-gray-800 dark:text-gray-200',
          'focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0',
          '[--anchor-gap:--spacing(1)]',
          itemsContainerClass,
        )}
        data-testid="dropdown-items"
        as="ul"
      >
        {items.map((item: DropdownItem, idx: number) => (
          <Fragment key={item.id}>
            <MenuItem as="li" disabled={item.disabled}>
              {({ disabled }) => (
                <div
                  onClick={() => !disabled && onMenuClick?.(item, idx)}
                  className={buildClassName(
                    BASE_ITEM_CLASS,
                    menuItemClass,
                    disabled && 'cursor-not-allowed opacity-70',
                  )}
                  data-testid={`dropdown-item-${item.id}`}
                >
                  {renderItem ? renderItem(item) : item.label}
                </div>
              )}
            </MenuItem>
            {item.divider && (
              <li
                key={item.id}
                className="my-1 h-px bg-gray-200 dark:bg-white/5"
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
