import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import type { ResponsiveOrder } from '../common-responsive'

export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type GridAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type GridDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse'
export type GridWrap = 'wrap' | 'nowrap' | 'wrap-reverse'

export type GridColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | 'full'
export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * HTML element type to render
   * @default "div"
   */
  as?: ElementType
  /**
   * Preset column grid layout (1-12, auto). Ignored when `minColWidth` is set.
   */
  cols?: GridCols
  /**
   * Renders a breakpoint-free responsive grid: columns are computed with
   * `repeat(auto-fit|auto-fill, minmax(minColWidth, 1fr))`, so the item count
   * per row adapts continuously to the container width instead of jumping at
   * fixed breakpoints. Accepts any CSS length (e.g. `'12rem'`, `'240px'`).
   * Takes precedence over `cols` when set.
   */
  minColWidth?: string
  /**
   * When `minColWidth` is set, controls whether trailing empty tracks are
   * collapsed (`autoFit: true`, columns stretch to fill the row) or kept as
   * empty tracks (`autoFit: false`, uses `auto-fill`).
   * @default true
   */
  autoFit?: boolean
  /**
   * Gap spacing between grid items (applies to both axes unless `gapX`/`gapY` are set)
   * @default "md"
   */
  gap?: GridGap
  /**
   * Horizontal gap between grid items, overrides `gap` on the x-axis
   * @default undefined
   */
  gapX?: GridGap
  /**
   * Vertical gap between grid items, overrides `gap` on the y-axis
   * @default undefined
   */
  gapY?: GridGap
  /**
   * Alignment along the cross axis (align-items)
   * @default "stretch"
   */
  align?: GridAlign
  /**
   * Distribution along the main axis (justify-content)
   * @default "start"
   */
  justify?: GridJustify
  /**
   * Flex direction, only applies when `flex` is true
   * @default "row"
   */
  direction?: GridDirection
  /**
   * Flex wrap behavior, only applies when `flex` is true
   * @default "wrap"
   */
  wrap?: GridWrap
  /**
   * Renders as a flex/inline-flex container instead of CSS grid, reusing the
   * same `gap`/`align`/`justify` props (plus `direction`/`wrap`). Useful when
   * a layout needs to switch between grid and flex without swapping
   * components. Note that `Grid.Col`'s `span`/`sm`/`md`/`lg`/`xl`/`xxl` props
   * are CSS Grid-only and have no effect here — use `grow`/`shrink`/`order`
   * instead, or reach for `Flex`/`Flex.Item` directly.
   * @default false
   */
  flex?: boolean
  /**
   * Renders as an inline container (inline-grid / inline-flex) instead of block
   * @default false
   */
  inline?: boolean
  children?: ReactNode
}

export interface GridColProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * HTML element type to render
   * @default "div"
   */
  as?: ElementType
  /**
   * Column span (1-12, 'auto', 'full')
   */
  span?: GridColSpan
  /**
   * Responsive span on sm viewports (>= 640px)
   */
  sm?: GridColSpan
  /**
   * Responsive span on md viewports (>= 768px)
   */
  md?: GridColSpan
  /**
   * Responsive span on lg viewports (>= 1024px)
   */
  lg?: GridColSpan
  /**
   * Responsive span on xl viewports (>= 1280px)
   */
  xl?: GridColSpan
  /**
   * Responsive span on 2xl viewports (>= 1536px)
   */
  xxl?: GridColSpan
  /**
   * Flex grow factor (applies when the parent `Grid` is rendered with `flex`)
   */
  grow?: boolean
  /**
   * Flex shrink factor (applies when the parent `Grid` is rendered with `flex`)
   */
  shrink?: boolean
  /**
   * Order priority. `'first'`/`'last'` map to Tailwind's
   * `order-first`/`order-last` utilities; a numeric value is applied via an
   * inline `order` style so any value is supported.
   */
  order?: ResponsiveOrder
  children?: ReactNode
}

export interface GridComponent
  extends React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>> {
  Col: React.ForwardRefExoticComponent<GridColProps & React.RefAttributes<HTMLDivElement>>
  Item: React.ForwardRefExoticComponent<GridColProps & React.RefAttributes<HTMLDivElement>>
}
