export interface TPagination {
  /**
   * Defines current page number
   */
  page: number
  /**
   * Defines page limit
   */
  limit: number
  /**
   * Defines totol items in the list to be paginated.
   */
  total: number
}

export type PaginationProps = TPagination & {
  /**
   * Pagination component classname
   */
  className?: string
  /**
   * Handler for page change
   * @param pagination Partial<TPagination>
   * @returns void
   */
  onChange: (pagination: Partial<TPagination>) => void
  /**
   * Whether to show ellipsis for large page numbers
   * @default true
   */
  ellipsis?: boolean
}

export type UsePaginationProps = {
  totalPages: number
  currentPage: number
  siblingCount?: number
}
