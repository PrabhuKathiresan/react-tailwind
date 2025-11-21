import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'

/**
 * Root <Table /> props.
 */
export interface TableProps {
  /** Table layout mode ("auto" or "fixed"). Default = "auto" */
  layout?: 'fixed' | 'auto'

  /** Additional classes applied to the table wrapper */
  wrapperClass?: string

  /** Additional classes applied to the <table> element */
  className?: string

  /** Table content (Head + Body + Foot) */
  children: ReactNode
}

/**
 * <TableHead /> — table header section
 */
export interface TableHeadProps {
  /** Additional classes applied to <thead> */
  className?: string

  /** Header cells (TableHeaderCell components) */
  children: ReactNode
}

/**
 * <TableBody /> — table body section
 */
export interface TableBodyProps {
  /** Additional classes applied to <tbody> */
  className?: string

  /** Show loading shimmer (overrides children) */
  loading?: boolean

  /** Number of columns — needed for shimmer loader layout */
  colSize: number

  /** Number of shimmer rows to show when loading */
  rowSize?: number

  /** Actual table rows */
  children: ReactNode
}

/**
 * <TableFoot /> — table footer
 */
export interface TableFootProps {
  children: ReactNode
}

/**
 * <EmptyTableRow /> — rendered when no data is available
 */
export interface EmptyTableRowProps {
  /** Column span for empty row */
  colSpan?: number

  /** Content shown in empty state */
  children: ReactNode

  /** Optional custom styling */
  contentClass?: string
}

/**
 * <TableCell /> — regular table cell
 */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Horizontal alignment */
  align?: 'left' | 'center' | 'right'

  /** Cell content */
  children: ReactNode

  /** Additional classes */
  className?: string
}

/**
 * <TableRow /> — regular row
 */
export interface TableRowProps extends ThHTMLAttributes<HTMLTableRowElement> {
  /** Whether the row highlights on hover */
  hoverable?: boolean
}

/**
 * <TableHeaderCell /> — header cell
 */
export interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  /** Horizontal alignment */
  align?: 'left' | 'center' | 'right'

  /** Additional classes */
  className?: string

  /** Label */
  children: ReactNode
}

/**
 * <TableRowLoader /> shimmer-loader row
 */
export interface TableRowLoaderProps {
  colSize: number
  rowSize: number
}
