import type { ReactNode } from 'react'
import type { TPagination } from '../Pagination'
import type { ButtonTheme, ButtonVariant } from '../Button'

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
 * Single row hover action item definition.
 */
export interface DataTableRowAction<T = any> {
  /** Unique action identifier */
  id: string
  /** Display text or React node */
  label?: ReactNode
  /** Icon rendered inside or before action button */
  icon?: ReactNode
  /** Button color theme palette (@default "secondary") */
  theme?: ButtonTheme
  /** Button visual variant style (@default "plain") */
  variant?: ButtonVariant
  /** Action click callback handler */
  onClick: (item: T, index: number, event: React.MouseEvent) => void
  /** Disables the action button */
  disabled?: boolean | ((item: T) => boolean)
  /** Tooltip or title text attribute */
  title?: string
  /** Custom CSS classes for the action button */
  className?: string
}

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
   * Pins the table header to the top when scrolling.
   * @default true
   */
  stickyHeader?: boolean

  /**
   * Pins the pagination footer to the bottom when scrolling.
   * @default true
   */
  stickyPagination?: boolean

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

  /**
   * Renders a leading checkbox column so rows can be selected.
   * @default false
   */
  selectable?: boolean

  /** Controlled selected row keys — pair with `onSelectionChange`. */
  selectedRowKeys?: Array<string | number>

  /** Initially selected row keys (uncontrolled). */
  defaultSelectedRowKeys?: Array<string | number>

  /** Called with the new selected row keys and their matching items whenever selection changes. */
  onSelectionChange?: (selectedRowKeys: Array<string | number>, selectedItems: T[]) => void

  /**
   * Marks specific rows as ineligible for selection — their checkbox is
   * disabled and they're excluded from "select all".
   */
  isRowSelectable?: (item: T) => boolean

  /** Action definitions rendered on row hover */
  rowHoverActions?: (item: T, index: number) => DataTableRowAction<T>[]

  /** Custom renderer function for row hover actions */
  renderRowHoverActions?: (item: T, index: number) => ReactNode

  /** Optional header title label for the row hover actions column (when rowHoverActionMode="inline") */
  rowHoverActionHeader?: ReactNode

  /**
   * Rendering mode for row hover actions.
   * - **overlay** (default): Floating overlay positioned over the right side of the row on hover without adding extra table columns.
   * - **inline**: Renders as a dedicated rightmost table column.
   * @default "overlay"
   */
  rowHoverActionMode?: 'overlay' | 'inline'

  /** Extra CSS classes applied to the row hover action container element */
  rowHoverActionClass?: string

  /** Extra CSS classes applied to the pagination container wrapper */
  paginationClass?: string

  /** Extra CSS classes applied to the pagination container wrapper (alias for paginationClass) */
  paginationContainerClass?: string

  /** Additional props passed directly to internal Pagination component */
  paginationProps?: Record<string, any>

  /** Custom renderer function for pagination */
  renderPagination?: (
    pagination: TPagination,
    setPagination?: (pagination: Partial<TPagination>) => void,
  ) => ReactNode
}
