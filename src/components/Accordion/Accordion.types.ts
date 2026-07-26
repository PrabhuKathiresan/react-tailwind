import type { ReactNode } from 'react'

/**
 * Single accordion item.
 */
export type AccordionItem = {
  /** Header content for this item */
  title: ReactNode
  /** Content rendered in the collapsible panel when this item is open */
  content: ReactNode
  /** Optional icon rendered before the title */
  icon?: ReactNode
  /** Unique key for this item; falls back to index when omitted */
  id?: string | number
  /** Prevents this item from being opened/closed */
  disabled?: boolean
  /** Extra classes applied to this specific item's header button */
  titleClass?: string
  /** Extra classes applied to this specific item's panel content */
  panelClass?: string
}

/**
 * Whether one or multiple items can be open at the same time.
 *
 * @default "single"
 */
export type AccordionType = 'single' | 'multiple'

/**
 * Visual style of the accordion.
 *
 * - **bordered** (default): items share a single bordered container, divided by hairlines
 * - **separated**: each item renders as its own bordered card with spacing between items
 * - **plain**: no borders, just a divided list
 *
 * @default "bordered"
 */
export type AccordionVariant = 'bordered' | 'separated' | 'plain'

/**
 * Accordion component props.
 */
export interface AccordionProps {
  /** Item data array. Order defines visual order. */
  items: AccordionItem[]

  /**
   * Whether one or multiple items can be open at the same time.
   *
   * @default "single"
   */
  type?: AccordionType

  /**
   * Visual style of the accordion.
   *
   * @default "bordered"
   */
  variant?: AccordionVariant

  /**
   * When `type="single"`, whether clicking the currently open item's header
   * closes it. Has no effect when `type="multiple"`.
   *
   * @default true
   */
  collapsible?: boolean

  /** Initially open item id(s) (uncontrolled) */
  defaultOpenIds?: Array<string | number>

  /** Controlled open item id(s) — pair with onChange */
  openIds?: Array<string | number>

  /** Called with the new open id(s) whenever an item is toggled */
  onChange?: (openIds: Array<string | number>) => void

  /**
   * Custom trailing indicator icon rendered in place of the default chevron.
   *
   * - Pass a `ReactNode` to swap the icon while keeping the default
   *   rotate-180°-on-open behavior.
   * - Pass a function of the item's open state for full control (e.g.
   *   swapping between plus/minus icons instead of rotating).
   *
   * @default undefined (renders the built-in chevron)
   */
  expandIcon?: ReactNode | ((isOpen: boolean) => ReactNode)

  /** Extra classes for the outer container */
  className?: string

  /** Extra classes applied to every item's header button */
  titleClass?: string

  /** Extra classes applied to every item's panel content */
  panelClass?: string
}
