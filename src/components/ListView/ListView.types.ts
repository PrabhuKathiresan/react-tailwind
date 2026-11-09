import type { ReactElement } from 'react'

export interface ListViewLoadMore {
  /** Records on screen. */
  shown: number
  /** Records matching the filters, as the server counts them. */
  total: number
  /** How many one more page adds, for "Show 25 more". */
  pageSize: number
  /** Whether there's another page to load. */
  hasMore: boolean
  /** While the next page loads. */
  isLoadingMore: boolean
  /** Loads the next page, added under the rows already shown. */
  onLoadMore: () => void
  /** Singular, e.g. "invoice", for "25 of 60 invoices". */
  noun: string
}

export interface ListViewProps<T> {
  /** The records to show, in order. */
  items: T[]
  /** While the first page loads: a spinner instead of rows. */
  isLoading: boolean
  /** Shown when there are no records, e.g. "No invoices yet" or "No invoices found". */
  emptyTitle: string
  /** What to do about it, e.g. "Create one to see it here." */
  emptyDescription?: string
  /** One row per record, usually a ListRow; it must carry its own `key`. */
  renderItem: (item: T) => ReactElement
  /**
   * Adds the next page under the rows already shown, with "25 of 60 invoices"
   * and a "Show 25 more" button at the end, then "End of list". With it, the
   * scroll position is also restored when the user comes back to the list.
   */
  loadMore?: ListViewLoadMore
  /**
   * The rows run edge to edge by cancelling the page's own side padding.
   * Turn off when the list sits in a container without it.
   * @default true
   */
  bleed?: boolean
}
