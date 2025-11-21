import type { ReactNode } from 'react'
import type { TPagination } from '../Pagination'

/**
 * Allowed column value data types
 * Used only to influence sorting logic
 */
export type DataValueType = 'string' | 'number' | 'date'

/**
 * Sorting direction
 */
export type Sorting = 'asc' | 'desc' | '1' | '-1'

/** Allowed sort icon types */
export type SortIconKey = Extract<Sorting, 'asc' | 'desc' | '1' | '-1'>
export type SortQuery = Record<string, Sorting>

/**
 * Column definition for DataTable
 */
export interface DataTableColumn {
  /** Unique key used to extract column data (supports nested paths) */
  name: string

  /** Display label for the header */
  label: ReactNode

  /** Text alignment for header */
  headerAlign?: 'left' | 'center' | 'right'

  /** Text alignment for body cells */
  align?: 'left' | 'center' | 'right'

  /** Custom cell renderer (highest priority) */
  render?: (item: any) => ReactNode

  /** Optional fixed width (px, %, rem) */
  width?: string | number

  /** Enables sorting when true */
  sortable?: boolean

  /** Type of cell value helps sorting logic */
  type?: DataValueType

  /** Sticks cell to right side */
  sticky?: 'left' | 'right'
}

/**
 * DataTable props
 */
export interface DataTableProps {
  /** Array of data items */
  items: any[]

  /** Column definitions */
  columns: DataTableColumn[]

  /** Sorting state, keyed by column name */
  sorting?: Record<string, Sorting>

  /** Loading state (shows skeleton rows) */
  loading?: boolean

  /** Pagination config */
  pagination?: TPagination

  /** Empty message to show when no results */
  emptyMessage?: ReactNode

  /** External sorting handler */
  onSort?: (column: DataTableColumn) => void

  /** Pagination setter */
  setPagination?: (pagination: Partial<TPagination>) => void

  /** Layout of table cells */
  layout?: 'fixed' | 'auto'

  /** Optional wrapper styles */
  containerClass?: string

  wrapperClass?: string
}
