import type { CSSProperties } from 'react'

/**
 * Shared class-name lookup tables for `Flex`/`Grid` (and their `.Item`/`.Col`
 * sub-components).
 *
 * These are intentionally plain object literals with fully spelled-out class
 * names (e.g. `'sm:col-span-6'`) rather than strings built with template
 * interpolation (e.g. `` `sm:col-span-${n}` ``). Tailwind's JIT compiler
 * discovers classes by statically scanning file text for literal substrings —
 * it does not execute this code — so any class name assembled at runtime
 * would never be generated into the final stylesheet. Keep every entry here
 * fully literal.
 */

export type ResponsiveGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type ResponsiveAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type ResponsiveJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type ResponsiveDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse'
export type ResponsiveWrap = 'wrap' | 'nowrap' | 'wrap-reverse'
export type ResponsiveOrder = 'first' | 'last' | number

export const GAP_MAP: Record<ResponsiveGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
}

export const GAP_X_MAP: Record<ResponsiveGap, string> = {
  none: 'gap-x-0',
  xs: 'gap-x-1',
  sm: 'gap-x-2',
  md: 'gap-x-4',
  lg: 'gap-x-6',
  xl: 'gap-x-8',
  '2xl': 'gap-x-12',
}

export const GAP_Y_MAP: Record<ResponsiveGap, string> = {
  none: 'gap-y-0',
  xs: 'gap-y-1',
  sm: 'gap-y-2',
  md: 'gap-y-4',
  lg: 'gap-y-6',
  xl: 'gap-y-8',
  '2xl': 'gap-y-12',
}

export const ALIGN_MAP: Record<ResponsiveAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

export const JUSTIFY_MAP: Record<ResponsiveJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

export const DIRECTION_MAP: Record<ResponsiveDirection, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse',
}

export const WRAP_MAP: Record<ResponsiveWrap, string> = {
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  'wrap-reverse': 'flex-wrap-reverse',
}

/**
 * Resolves the `order` prop to inline styles when it's a raw number.
 *
 * `'first'` / `'last'` map to the static `order-first`/`order-last` Tailwind
 * utilities (safe, since those exact class names are literal elsewhere).
 * Arbitrary numeric orders can't be expressed as a safe literal class (the
 * value is unbounded), so they're applied as an inline `order` style instead
 * — that works regardless of what the consuming app's Tailwind build scans.
 */
export const resolveOrderStyle = (order?: ResponsiveOrder): CSSProperties | undefined =>
  typeof order === 'number' ? { order } : undefined

export const resolveOrderClassName = (order?: ResponsiveOrder): string | undefined => {
  if (order === 'first') return '-order-1'
  if (order === 'last') return 'order-last'
  return undefined
}

/** Width-fraction span classes used by `Flex.Item` (unprefixed / base breakpoint). */
export const FLEX_SPAN_MAP: Record<string, string> = {
  1: 'w-1/12 flex-none',
  2: 'w-2/12 flex-none',
  3: 'w-3/12 flex-none',
  4: 'w-4/12 flex-none',
  5: 'w-5/12 flex-none',
  6: 'w-6/12 flex-none',
  7: 'w-7/12 flex-none',
  8: 'w-8/12 flex-none',
  9: 'w-9/12 flex-none',
  10: 'w-10/12 flex-none',
  11: 'w-11/12 flex-none',
  12: 'w-full flex-none',
  auto: 'w-auto flex-none',
  full: 'w-full flex-none',
}

export const FLEX_SM_SPAN_MAP: Record<string, string> = {
  1: 'sm:w-1/12',
  2: 'sm:w-2/12',
  3: 'sm:w-3/12',
  4: 'sm:w-4/12',
  5: 'sm:w-5/12',
  6: 'sm:w-6/12',
  7: 'sm:w-7/12',
  8: 'sm:w-8/12',
  9: 'sm:w-9/12',
  10: 'sm:w-10/12',
  11: 'sm:w-11/12',
  12: 'sm:w-full',
  auto: 'sm:w-auto',
  full: 'sm:w-full',
}

export const FLEX_MD_SPAN_MAP: Record<string, string> = {
  1: 'md:w-1/12',
  2: 'md:w-2/12',
  3: 'md:w-3/12',
  4: 'md:w-4/12',
  5: 'md:w-5/12',
  6: 'md:w-6/12',
  7: 'md:w-7/12',
  8: 'md:w-8/12',
  9: 'md:w-9/12',
  10: 'md:w-10/12',
  11: 'md:w-11/12',
  12: 'md:w-full',
  auto: 'md:w-auto',
  full: 'md:w-full',
}

export const FLEX_LG_SPAN_MAP: Record<string, string> = {
  1: 'lg:w-1/12',
  2: 'lg:w-2/12',
  3: 'lg:w-3/12',
  4: 'lg:w-4/12',
  5: 'lg:w-5/12',
  6: 'lg:w-6/12',
  7: 'lg:w-7/12',
  8: 'lg:w-8/12',
  9: 'lg:w-9/12',
  10: 'lg:w-10/12',
  11: 'lg:w-11/12',
  12: 'lg:w-full',
  auto: 'lg:w-auto',
  full: 'lg:w-full',
}

export const FLEX_XL_SPAN_MAP: Record<string, string> = {
  1: 'xl:w-1/12',
  2: 'xl:w-2/12',
  3: 'xl:w-3/12',
  4: 'xl:w-4/12',
  5: 'xl:w-5/12',
  6: 'xl:w-6/12',
  7: 'xl:w-7/12',
  8: 'xl:w-8/12',
  9: 'xl:w-9/12',
  10: 'xl:w-10/12',
  11: 'xl:w-11/12',
  12: 'xl:w-full',
  auto: 'xl:w-auto',
  full: 'xl:w-full',
}

export const FLEX_XXL_SPAN_MAP: Record<string, string> = {
  1: '2xl:w-1/12',
  2: '2xl:w-2/12',
  3: '2xl:w-3/12',
  4: '2xl:w-4/12',
  5: '2xl:w-5/12',
  6: '2xl:w-6/12',
  7: '2xl:w-7/12',
  8: '2xl:w-8/12',
  9: '2xl:w-9/12',
  10: '2xl:w-10/12',
  11: '2xl:w-11/12',
  12: '2xl:w-full',
  auto: '2xl:w-auto',
  full: '2xl:w-full',
}

/** `col-span-*` classes used by `Grid.Col` (unprefixed / base breakpoint). */
export const GRID_SPAN_MAP: Record<string, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
  auto: 'col-auto',
  full: 'col-span-full',
}

export const GRID_SM_SPAN_MAP: Record<string, string> = {
  1: 'sm:col-span-1',
  2: 'sm:col-span-2',
  3: 'sm:col-span-3',
  4: 'sm:col-span-4',
  5: 'sm:col-span-5',
  6: 'sm:col-span-6',
  7: 'sm:col-span-7',
  8: 'sm:col-span-8',
  9: 'sm:col-span-9',
  10: 'sm:col-span-10',
  11: 'sm:col-span-11',
  12: 'sm:col-span-12',
  auto: 'sm:col-auto',
  full: 'sm:col-span-full',
}

export const GRID_MD_SPAN_MAP: Record<string, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
  auto: 'md:col-auto',
  full: 'md:col-span-full',
}

export const GRID_LG_SPAN_MAP: Record<string, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
  auto: 'lg:col-auto',
  full: 'lg:col-span-full',
}

export const GRID_XL_SPAN_MAP: Record<string, string> = {
  1: 'xl:col-span-1',
  2: 'xl:col-span-2',
  3: 'xl:col-span-3',
  4: 'xl:col-span-4',
  5: 'xl:col-span-5',
  6: 'xl:col-span-6',
  7: 'xl:col-span-7',
  8: 'xl:col-span-8',
  9: 'xl:col-span-9',
  10: 'xl:col-span-10',
  11: 'xl:col-span-11',
  12: 'xl:col-span-12',
  auto: 'xl:col-auto',
  full: 'xl:col-span-full',
}

export const GRID_XXL_SPAN_MAP: Record<string, string> = {
  1: '2xl:col-span-1',
  2: '2xl:col-span-2',
  3: '2xl:col-span-3',
  4: '2xl:col-span-4',
  5: '2xl:col-span-5',
  6: '2xl:col-span-6',
  7: '2xl:col-span-7',
  8: '2xl:col-span-8',
  9: '2xl:col-span-9',
  10: '2xl:col-span-10',
  11: '2xl:col-span-11',
  12: '2xl:col-span-12',
  auto: '2xl:col-auto',
  full: '2xl:col-span-full',
}

/**
 * Preset track-count classes for `Grid`'s `cols` prop. Each preset
 * progressively reveals more columns at wider breakpoints so a grid is
 * responsive out of the box without the caller specifying per-item spans.
 */
export const GRID_COLS_MAP: Record<string, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  7: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7',
  8: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8',
  9: 'grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9',
  10: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10',
  11: 'grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11',
  12: 'grid-cols-12',
  auto: 'grid-cols-none auto-cols-auto',
}
