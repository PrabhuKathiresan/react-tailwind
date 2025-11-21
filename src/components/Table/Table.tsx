import React from 'react'
import { BodyText } from '../BodyText'
import { buildClassName } from '../../utils/build-classname'
import type {
  EmptyTableRowProps,
  TableProps,
  TableBodyProps,
  TableCellProps,
  TableFootProps,
  TableHeaderCellProps,
  TableHeadProps,
  TableRowLoaderProps,
  TableRowProps,
} from './Table.types'

const TEXT_ALIGN = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const TABLE_LAYOUT = {
  fixed: 'table-fixed',
  auto: 'table-auto',
}

/* ----------------------------------------------
 * Loader Rows
 * ---------------------------------------------- */
const TableRowLoader: React.FC<TableRowLoaderProps> = ({ colSize, rowSize }) => (
  <>
    {Array.from({ length: rowSize }).map((_, rowIdx) => (
      <TableRow key={rowIdx} className="animate-pulse">
        {Array.from({ length: colSize }).map((_, colIdx) => (
          <TableCell key={colIdx}>
            <div className="flex items-center h-6">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 shimmer rounded w-full" />
            </div>
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
)

/* ----------------------------------------------
 * Table
 * ---------------------------------------------- */
export const Table: React.FC<TableProps> = ({ children, layout = 'auto', className = '' }) => {
  return (
    <table
      className={buildClassName(
        'border-collapse w-full divide-y divide-gray-200 dark:divide-gray-700',
        TABLE_LAYOUT[layout],
        className,
      )}
    >
      {children}
    </table>
  )
}

/* ----------------------------------------------
 * Head
 * ---------------------------------------------- */
export const TableHead: React.FC<TableHeadProps> = ({ children, className = '' }) => (
  <thead
    className={buildClassName(
      'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300',
      className,
    )}
  >
    <tr>{children}</tr>
  </thead>
)

/* ----------------------------------------------
 * Body
 * ---------------------------------------------- */
export const TableBody: React.FC<TableBodyProps> = ({
  children,
  loading,
  colSize,
  rowSize = 5,
  className,
}) => (
  <tbody
    className={buildClassName(
      'text-sm text-gray-700 dark:text-white divide-y divide-gray-200 dark:divide-gray-700',
      className,
    )}
  >
    {loading ? <TableRowLoader colSize={colSize} rowSize={rowSize} /> : children}
  </tbody>
)

/* ----------------------------------------------
 * Foot
 * ---------------------------------------------- */
export const TableFoot: React.FC<TableFootProps> = ({ children }) => (
  <tfoot>
    <tr>{children}</tr>
  </tfoot>
)

/* ----------------------------------------------
 * Rows
 * ---------------------------------------------- */
export const TableRow: React.FC<TableRowProps> = ({
  children,
  hoverable = false,
  className,
  ...props
}) => (
  <tr
    {...props}
    className={buildClassName(
      'last:border-b border-gray-200 dark:border-gray-700',
      hoverable && 'group',
      className,
    )}
  >
    {children}
  </tr>
)

/* ----------------------------------------------
 * Cells
 * ---------------------------------------------- */
export const TableCell: React.FC<TableCellProps> = ({
  children,
  align = 'left',
  className,
  ...props
}) => (
  <td
    {...props}
    className={buildClassName(
      'px-3 py-3 first:pl-4 last:pr-4 bg-white dark:bg-gray-900 group-hover:bg-gray-50 group-hover:dark:bg-gray-800',
      TEXT_ALIGN[align],
      className,
    )}
  >
    <div className="leading-normal">{children}</div>
  </td>
)

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  align = 'left',
  className,
  ...props
}) => (
  <th
    {...props}
    className={buildClassName(
      'px-3 py-3 first:pl-4 last:pr-4 tracking-wider whitespace-nowrap text-gray-800 dark:text-gray-300',
      TEXT_ALIGN[align],
      className,
    )}
  >
    <BodyText as="span" className="leading-none">
      {children}
    </BodyText>
  </th>
)

/* ----------------------------------------------
 * Empty Row
 * ---------------------------------------------- */
export const EmptyTableRow: React.FC<EmptyTableRowProps> = ({
  children,
  colSpan = 1,
  contentClass,
}) => (
  <tr>
    <td colSpan={colSpan} className="px-4 py-8">
      <div
        className={buildClassName(
          'p-6 text-center space-y-3 flex flex-col items-center justify-center',
          contentClass,
        )}
      >
        {children}
      </div>
    </td>
  </tr>
)
