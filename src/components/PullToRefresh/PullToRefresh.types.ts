import type { ReactNode } from 'react'

export interface PullToRefreshProps {
  /** Async callback function triggered when user pulls to refresh */
  onRefresh: () => Promise<void> | void
  /** Pull distance threshold in px to trigger refresh (default: 70) */
  pullThreshold?: number
  /** Maximum pull distance in px (default: 120) */
  maxPullDistance?: number
  /** Disables the pull-to-refresh touch gesture */
  disabled?: boolean
  /** Controlled refreshing state */
  refreshing?: boolean
  /** Custom content rendered while pulling down */
  pullingContent?: ReactNode
  /** Custom content rendered while refreshing */
  refreshingContent?: ReactNode
  /** Main scrollable content node */
  children: ReactNode
  /** Container class string */
  className?: string
  /** Content wrapper class string */
  contentClass?: string
}
