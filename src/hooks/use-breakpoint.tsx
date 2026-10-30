import { useCallback, useSyncExternalStore } from 'react'

/**
 * Layout ranges matching Tailwind's `md` (768px) and `lg` (1024px) tokens, so a
 * JS decision and an `md:`/`lg:` class always agree:
 * - `compact`: phones
 * - `medium`: tablets and narrow windows
 * - `expanded`: desktop
 *
 * Width only. Unlike `useIsMobile`, touch capability is never considered, so a
 * phone in landscape and a narrow desktop window get the layout for their size.
 */
export type Breakpoint = 'compact' | 'medium' | 'expanded'

export const BREAKPOINT_QUERIES = {
  medium: '(min-width: 768px)',
  expanded: '(min-width: 1024px)',
} as const

/** Live result of a CSS media query. `false` during server rendering. */
export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Current layout range; `compact` during server rendering. */
export const useBreakpoint = (): Breakpoint => {
  const isMedium = useMediaQuery(BREAKPOINT_QUERIES.medium)
  const isExpanded = useMediaQuery(BREAKPOINT_QUERIES.expanded)
  if (isExpanded) return 'expanded'
  return isMedium ? 'medium' : 'compact'
}

/** A value per breakpoint; missing ranges fall back to the next smaller one. */
export type ResponsiveValue<T> = T | { base: T; md?: T; lg?: T }

/** Resolves a `ResponsiveValue` for the current viewport. */
export const useResponsiveValue = <T,>(value: ResponsiveValue<T>): T => {
  const breakpoint = useBreakpoint()
  if (typeof value !== 'object' || value === null || !('base' in value)) return value as T
  if (breakpoint === 'expanded') return value.lg ?? value.md ?? value.base
  if (breakpoint === 'medium') return value.md ?? value.base
  return value.base
}
