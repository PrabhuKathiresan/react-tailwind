import type { ReactNode } from 'react'

export type DropdownAlignment = 'start' | 'end'
export type DropdownPlacement = 'top' | 'right' | 'bottom' | 'left'
export type DropdownAnchorTo = `${DropdownPlacement}` | `${DropdownPlacement} ${DropdownAlignment}`

/**
 * Configuration for advanced positioning when using object-based `anchor`.
 */
export type DropdownBaseAnchorProps = {
  /** Space between the trigger and the menu panel. */
  gap: number | string

  /** Nudges the menu panel from its natural anchor position. */
  offset: number | string

  /** Minimum distance between the menu panel and the viewport. */
  padding: number | string
}

/**
 * Render props passed to `renderTriggerButton`.
 * These reflect the trigger state.
 */
export type DropdownTriggerBtnProps = {
  /** Whether the trigger is active (pressed). */
  active: boolean

  /** Whether the dropdown is open. */
  open: boolean

  /** Whether the trigger button is disabled. */
  disabled: boolean

  /** Whether the trigger is hovered. */
  hover: boolean

  /** Whether the trigger is focused. */
  focus: boolean
}

/**
 * Individual item shown inside the dropdown menu.
 */
export type DropdownItem = {
  /** Unique ID for the item. */
  id: string

  /** Display label (optional if using custom render). */
  label?: string

  /** If true, renders a horizontal divider instead of an item. */
  divider?: boolean

  /** Optional: mark item as disabled. */
  disabled?: boolean

  /** Allow additional arbitrary metadata. */
  [key: string]: any
}

//
// -------------------------------------------------------------
// ENFORCE: Either triggerButton OR renderTriggerButton must exist
// -------------------------------------------------------------
//

/** Base props shared between both trigger modes. */
type DropdownBaseProps = {
  /** Additional classes for the menu container. */
  itemsContainerClass?: string

  /** Enables menu transition animations. Default: true */
  transition?: boolean

  /**
   * Controls dropdown placement.
   * Accepts:
   * - `"bottom start"`
   * - `"top end"`
   * - `"right"`
   * - or object configuration for advanced placement.
   */
  anchor?:
    | false
    | DropdownAnchorTo
    | Partial<
        DropdownBaseAnchorProps & {
          /** Placement descriptor for advanced mode. */
          to: DropdownAnchorTo
        }
      >

  /** List of dropdown menu items. */
  items: DropdownItem[]

  /**
   * Renderer for customizing how a menu item is displayed.
   * If omitted, the default item UI is used.
   */
  renderItem?: (item: DropdownItem) => ReactNode

  /** Custom CSS classes applied to each menu item. */
  menuItemClass?: string

  /**
   * Called when a menu item is clicked.
   * Receives: (item, index)
   */
  onMenuClick?: (item: DropdownItem, index: number) => void
}

/**
 * Mode 1: Using static JSX as trigger (`triggerButton`)
 */
export type DropdownWithStaticTrigger = DropdownBaseProps & {
  /** JSX element used as the trigger button. */
  triggerButton: ReactNode

  /** Must NOT be provided when using triggerButton. */
  renderTriggerButton?: never
}

/**
 * Mode 2: Using a render function for trigger (`renderTriggerButton`)
 */
export type DropdownWithRenderTrigger = DropdownBaseProps & {
  /**
   * Custom trigger renderer.
   * Receives trigger UI state (open, focus, hover, etc.)
   * Must return a valid element.
   */
  renderTriggerButton: (props: DropdownTriggerBtnProps) => ReactNode

  /** Must NOT be provided when using renderTriggerButton. */
  triggerButton?: never
}

/**
 * Final Dropdown Props:
 * Exactly ONE of the trigger modes must be used.
 */
export type DropdownProps = DropdownWithStaticTrigger | DropdownWithRenderTrigger
