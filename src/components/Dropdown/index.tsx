import React, { Fragment, type ReactNode } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname';

type Align = 'start' | 'end';
type Placement = 'top' | 'right' | 'bottom' | 'left';
type AnchorTo = `${Placement}` | `${Placement} ${Align}`;
type BaseAnchorProps = {
  /**
   * The `gap` is the space between the trigger and the panel.
   */
  gap: number | string;
  /**
   * The `offset` is the amount the panel should be nudged from its original position.
   */
  offset: number | string;
  /**
   * The `padding` is the minimum space between the panel and the viewport.
   */
  padding: number | string;
};

export type DropdownItem = Record<string, any> & {
  id: string;
  divider?: boolean
}

export type DropdownProps = {
  /**
   * Dropdown menu trigger button
   */
  triggerButton: ReactNode;
  /**
   * Dropdown menu item container class
   */
  itemsContainerClass?: string;
  /**
   * Controls animation of dropdown menu
   * @default true
   */
  transition?: boolean
  /**
   * Controls placement of the dropdown menu
   * @default "bottom start"
   */
  anchor?: false | AnchorTo | Partial<BaseAnchorProps & {
    /**
     * The `to` value defines which side of the trigger the panel should be placed on and its
     * alignment.
     */
    to: AnchorTo;
  }>;
  /**
   * List of dropdown menu items
   */
  items: DropdownItem[]
  /**
   * Renderer function that returns react element to render dropdown item
   * @param item DropdownItem
   * @returns ReactNode
   */
  renderItem: (item: DropdownItem, options: { className: string }) => ReactNode
}

const DROPDOWN_ITEM_CLASS = "flex w-full px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-lg"

export const Dropdown: React.FC<DropdownProps> = ({
  triggerButton,
  items,
  renderItem,
  itemsContainerClass,
  transition = true,
  anchor = "bottom start"
}) => {
  return (
    <Menu>
      <MenuButton as={Fragment}>
        {triggerButton}
      </MenuButton>

      <MenuItems
        transition={transition}
        anchor={anchor}
        className={
          buildClassName(
            'w-52 origin-top-right rounded-xl border border-gray-100 bg-white shadow-sm p-1 text-sm/6 text-gray-800 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0',
            itemsContainerClass
          )
        }
      >
        {
          items.map((item) => (
            <MenuItem key={item.id}>
              {item.divider ? <div className="my-1 h-px bg-gray-200 dark:bg-white/5" /> : renderItem(item, { className: DROPDOWN_ITEM_CLASS })}
            </MenuItem>
          ))
        }
      </MenuItems>
    </Menu>
  )
}
