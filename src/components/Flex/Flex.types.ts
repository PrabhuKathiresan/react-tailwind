import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import type { ResponsiveOrder } from '../common-responsive'

export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type FlexAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse'
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse'
export type FlexSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | 'full'

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Render element tag override
   * @default 'div'
   */
  as?: ElementType
  /**
   * Spacing gap between flex items (applies to both axes unless `gapX`/`gapY` are set)
   * @default undefined
   */
  gap?: FlexGap
  /**
   * Horizontal gap between flex items, overrides `gap` on the x-axis
   * @default undefined
   */
  gapX?: FlexGap
  /**
   * Vertical gap between flex items, overrides `gap` on the y-axis
   * @default undefined
   */
  gapY?: FlexGap
  /**
   * Vertical cross-axis alignment
   * @default 'stretch'
   */
  align?: FlexAlign
  /**
   * Horizontal main-axis distribution
   * @default 'start'
   */
  justify?: FlexJustify
  /**
   * Flex direction (row, row-reverse, col, col-reverse)
   * @default 'row'
   */
  direction?: FlexDirection
  /**
   * Flex wrapping behavior (wrap, nowrap, wrap-reverse)
   * @default 'wrap'
   */
  wrap?: FlexWrap
  /**
   * Renders container as inline-flex
   * @default false
   */
  inline?: boolean
  children?: ReactNode
}

export interface FlexItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Render element tag override
   * @default 'div'
   */
  as?: ElementType
  /**
   * Width fraction (1-12, 'auto', 'full')
   */
  span?: FlexSpan
  /** Responsive width fraction at sm breakpoint (>= 640px) */
  sm?: FlexSpan
  /** Responsive width fraction at md breakpoint (>= 768px) */
  md?: FlexSpan
  /** Responsive width fraction at lg breakpoint (>= 1024px) */
  lg?: FlexSpan
  /** Responsive width fraction at xl breakpoint (>= 1280px) */
  xl?: FlexSpan
  /** Responsive width fraction at 2xl breakpoint (>= 1536px) */
  xxl?: FlexSpan
  /** Allows flex item to grow and fill available space */
  grow?: boolean
  /** Controls flex item shrinking behavior */
  shrink?: boolean
  /**
   * Visual order of the flex item. `'first'`/`'last'` map to Tailwind's
   * `order-first`/`order-last` utilities; a numeric value is applied via an
   * inline `order` style so any value is supported.
   */
  order?: ResponsiveOrder
  children?: ReactNode
}

export interface FlexComponent
  extends React.ForwardRefExoticComponent<FlexProps & React.RefAttributes<HTMLDivElement>> {
  Item: React.ForwardRefExoticComponent<FlexItemProps & React.RefAttributes<HTMLDivElement>>
  Col: React.ForwardRefExoticComponent<FlexItemProps & React.RefAttributes<HTMLDivElement>>
}
