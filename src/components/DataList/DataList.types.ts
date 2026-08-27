import type { ReactNode } from 'react'
import type { TPagination } from '../Pagination'
import type { SwipeableAction } from '../SwipeableRow'

export type DataListSortDirection = 'asc' | 'desc' | '1' | '-1'

export interface DataListColumn<T = any> {
  /** Unique key or property path */
  name: string
  /** Display label text */
  label: ReactNode
  /** Enables sorting on this field */
  sortable?: boolean
  /** Data type for sorting logic */
  type?: 'string' | 'number' | 'date'
  /** Custom renderer for item card */
  render?: (item: T) => ReactNode
}

export interface DataListFilterOption {
  label: string
  value: string | number
}

export interface DataListFilterField {
  /** Field name string */
  name: string
  /** Filter display label */
  label: string
  /** Selectable filter options */
  options: DataListFilterOption[]
}

export interface DataListProps<T = any> {
  /** Array of data items */
  items: T[]
  /** Column definitions used for card grid rendering and auto-sorting/filtering */
  columns?: DataListColumn<T>[]
  /** Custom item card renderer */
  renderItem?: (item: T, index: number) => ReactNode
  /** Enables top search input */
  searchable?: boolean
  /** Controlled search query */
  searchQuery?: string
  /** Search query change handler */
  onSearchChange?: (query: string) => void
  /** Fields to search across (defaults to string/number column names) */
  searchFields?: string[]
  /** Available filter fields */
  filterFields?: DataListFilterField[]
  /** Controlled filter values keyed by filter field name (supports string, number, or array of selected values) */
  selectedFilters?: Record<string, Array<string | number> | string | number>
  /** Filter values change handler */
  onFilterChange?: (filters: Record<string, Array<string | number> | string | number>) => void
  /** Controlled sort state, e.g. `{ status: 'asc' }` */
  sorting?: Record<string, DataListSortDirection>
  /** Sort change callback handler */
  onSortChange?: (sorting: Record<string, DataListSortDirection>) => void
  /** Swipe actions callback for card rows */
  swipeableActions?: (item: T) => {
    leftActions?: SwipeableAction[]
    rightActions?: SwipeableAction[]
  }
  /** Unique row key field or function */
  rowKey?: string | ((item: T) => string | number)
  /** Enables touch selection checkboxes */
  selectable?: boolean
  /** Controlled selected item keys */
  selectedKeys?: Array<string | number>
  /** Selection change callback */
  onSelectionChange?: (selectedKeys: Array<string | number>, selectedItems: T[]) => void
  /** Item click callback */
  onItemClick?: (item: T, index: number) => void
  /** Loading state */
  loading?: boolean
  /** Empty state message */
  emptyMessage?: ReactNode
  /** Pagination config */
  pagination?: TPagination
  /** Pagination setter */
  setPagination?: (pagination: Partial<TPagination>) => void
  /** Extra CSS classes for the pagination container wrapper */
  paginationClass?: string
  /** Extra CSS classes for the pagination container wrapper (alias for paginationClass) */
  paginationContainerClass?: string
  /** Additional props passed directly to the internal Pagination component */
  paginationProps?: Record<string, any>
  /** Custom renderer function for pagination */
  renderPagination?: (
    pagination: TPagination,
    setPagination?: (pagination: Partial<TPagination>) => void,
  ) => ReactNode
  /** Outer container class */
  containerClass?: string
  /** Item card wrapper class */
  itemClass?: string | ((item: T, index: number) => string)
}
