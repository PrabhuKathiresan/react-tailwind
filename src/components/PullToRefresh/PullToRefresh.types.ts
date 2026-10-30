import type { ReactNode } from 'react'

/**
 * - `push`: a labelled pill opens above the content, which moves down with the pull.
 * - `overlay`: the content stays still; a round badge slides down over it (e.g. from
 *   behind a sticky app header) and parks at the threshold while refreshing.
 */
export type PullToRefreshVariant = 'push' | 'overlay'

export interface PullToRefreshProps {
  /** Callback triggered when the user pulls past the threshold; return a promise to keep the indicator until it settles */
  onRefresh: () => Promise<unknown> | void
  /** Called when `onRefresh` throws or rejects, so the failure can be shown instead of lost */
  onError?: (error: unknown) => void
  /**
   * Indicator style
   * @default 'push'
   */
  variant?: PullToRefreshVariant
  /**
   * Pull distance in px (after resistance) that triggers a refresh
   * @default 70
   */
  pullThreshold?: number
  /**
   * Maximum pull distance in px
   * @default 120
   */
  maxPullDistance?: number
  /** Disables the pull-to-refresh touch gesture */
  disabled?: boolean
  /** Controlled refreshing state */
  refreshing?: boolean
  /** Custom content rendered while pulling down (replaces the default indicator content) */
  pullingContent?: ReactNode
  /** Custom content rendered while refreshing (replaces the default indicator content) */
  refreshingContent?: ReactNode
  /**
   * Indicator text before the threshold is reached (`push` variant)
   * @default 'Pull down to refresh'
   */
  pullLabel?: string
  /**
   * Indicator text once releasing will refresh (`push` variant)
   * @default 'Release to refresh'
   */
  releaseLabel?: string
  /**
   * Indicator text and screen-reader announcement while refreshing
   * @default 'Refreshing...'
   */
  refreshingLabel?: string
  /**
   * Screen-reader announcement once a refresh finishes
   * @default 'Content refreshed'
   */
  refreshedLabel?: string
  /** Main scrollable content node */
  children: ReactNode
  /** Container class string */
  className?: string
  /** Content wrapper class string */
  contentClass?: string
}
