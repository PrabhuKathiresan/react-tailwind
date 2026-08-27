export interface TPagination {
  /** Defines current page number */
  page?: number
  /** Alias for page */
  current?: number
  /** Defines page limit / page size */
  limit?: number
  /** Alias for limit */
  pageSize?: number
  /** Defines total items in the list to be paginated */
  total: number
}

export type PaginationProps = Partial<TPagination> & {
  /** Total number of items */
  total: number
  /** Pagination component classname */
  className?: string
  /** Handler for page change */
  onChange: (pagination: Partial<TPagination>) => void
  /** Whether to show ellipsis for large page numbers (@default true) */
  ellipsis?: boolean
  /** Whether to force mobile UX layout (`Previous` `Page X of Y` `Next`) regardless of screen size */
  isMobile?: boolean
  /** Whether to show summary text ("Showing X to Y of Z results") (@default true) */
  showSummary?: boolean
  /** Whether to show page number navigation buttons (@default true) */
  showPageNumbers?: boolean
}

export type UsePaginationProps = {
  totalPages: number
  currentPage: number
  siblingCount?: number
}
