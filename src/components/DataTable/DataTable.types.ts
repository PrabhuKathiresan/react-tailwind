import type { ReactNode } from 'react'
import type { TPagination } from '../Pagination'

/**
 * Allowed column value data types.
 * Used only to influence sorting logic.
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
 * Cell padding preset.
 * @default 'default'
 */
export type DataTableDensity = 'compact' | 'default' | 'spacious'

/**
 * Column definition for DataTable.
 * @template T Shape of each data row
 */
export interface DataTableColumn<T = any> {
  /** Unique key used to extract column data (supports nested paths) */
  name: string

  /** Display label for the header */
  label: ReactNode

  /** Text alignment for header */
  headerAlign?: 'left' | 'center' | 'right'

  /** Text alignment for body cells */
  align?: 'left' | 'center' | 'right'

  /** Custom cell renderer (highest priority) */
  render?: (item: T) => ReactNode

  /** Optional fixed width (px, %, rem) */
  width?: string | number

  /** Enables sorting when true */
  sortable?: boolean

  /** Type of cell value — influences sort logic */
  type?: DataValueType

  /** Sticks cell to the given side on horizontal scroll */
  sticky?: 'left' | 'right'

  /** Extra classes applied to the header cell (`<th>`) for this column */
  headerClass?: string

  /**
   * Extra classes applied to each body cell (`<td>`) for this column.
   * Pass a function to vary styles per row value.
   * @example cellClass={(item) => item.status === 'error' ? 'text-red-600' : ''}
   */
  cellClass?: string | ((item: T) => string)
}

/**
 * DataTable props
 * @template T Shape of each data row
 */
export interface DataTableProps<T = any> {
  /** Array of data items */
  items: T[]

  /** Column definitions */
  columns: DataTableColumn<T>[]

  /** Sorting state, keyed by column name */
  sorting?: Record<string, Sorting>

  /** Loading state — shows skeleton rows instead of data */
  loading?: boolean

  /** Pagination config */
  pagination?: TPagination

  /** Message or node shown when the items array is empty */
  emptyMessage?: ReactNode

  /** External sorting handler. When omitted, DataTable auto-sorts internally. */
  onSort?: (column: DataTableColumn<T>) => void

  /** Pagination setter */
  setPagination?: (pagination: Partial<TPagination>) => void

  /** Table layout algorithm */
  layout?: 'fixed' | 'auto'

  /**
   * Determines the stable React key for each row.
   * Pass a field name string or a function returning a unique value.
   * @default 'id'
   */
  rowKey?: string | ((item: T) => string | number)

  /**
   * Callback fired when a row is clicked.
   * Rows become visually interactive (pointer cursor) when this is set.
   */
  onRowClick?: (item: T, index: number) => void

  /**
   * Extra class(es) applied to each `<tr>` in the body.
   * Pass a function to vary classes per row.
   * @example rowClass={(item, i) => item.active ? 'font-semibold' : ''}
   */
  rowClass?: string | ((item: T, index: number) => string)

  /**
   * Cell padding preset.
   * @default 'default'
   */
  density?: DataTableDensity

  /**
   * Applies an alternating background to odd-indexed rows.
   * @default false
   */
  striped?: boolean

  /**
   * Node(s) rendered inside `<tfoot><tr>` as a summary or totals row.
   * Should be a set of `<td>` elements matching the column count.
   */
  footerRow?: ReactNode

  /** Optional classes applied to the outer container div */
  containerClass?: string

  /** Optional classes applied to the scroll wrapper div */
  wrapperClass?: string

  /** Optional classes applied directly to the `<table>` element */
  tableClass?: string

  /** Optional classes applied to the `<thead>` element */
  headClass?: string
}
