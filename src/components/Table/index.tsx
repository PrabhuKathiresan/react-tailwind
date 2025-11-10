import React, {
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react'
import { BodyText } from '../BodyText'
import { buildClassName } from '../../utils/build-classname'

interface TableProps {
  layout?: 'fixed' | 'auto'
  wrapperClass?: string
  className?: string
  children: ReactNode
}

interface TableHeadProps {
  className?: string
  children: ReactNode
  onSort?: MouseEventHandler<HTMLElement>
}

interface TableBodyProps {
  className?: string
  loading?: boolean
  children: ReactNode
  colSize: number
  rowSize?: number
}

interface TableFootProps {
  children: ReactNode
}

interface EmptyTableRow {
  colSpan?: number
  children: ReactNode
}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  className?: string
  children: ReactNode
  align?: 'left' | 'center' | 'right'
}

interface TableRowProps extends ThHTMLAttributes<HTMLTableRowElement> {
  hoverable?: boolean
}

interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  className?: string
  children: ReactNode
  align?: 'left' | 'center' | 'right'
}

interface TableRowLoaderProps {
  colSize: number
  rowSize: number
}

const TEXT_ALIGN_CLASSES = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const TABLE_LAYOUT_CLASSES = {
  fixed: 'table-fixed',
  auto: 'table-auto',
}

const TableRowLoader: React.FC<TableRowLoaderProps> = ({ colSize, rowSize }) => (
  <>
    {[...Array(rowSize)].map((_, rowIndex) => (
      <TableRow key={rowIndex} className="animate-pulse">
        {[...Array(colSize)].map((_, colIndex) => (
          <TableCell key={colIndex}>
            <div className="flex items-center h-6">
              <div className="h-4 bg-gray-300 shimmer dark:bg-gray-700 rounded w-full" />
            </div>
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
)

export const Table: React.FC<TableProps> = ({ children, layout = 'auto', className = '' }) => (
  <table
    className={buildClassName(
      'border-collapse table-fixed w-full divide-y divide-gray-200',
      TABLE_LAYOUT_CLASSES[layout],
      className,
    )}
  >
    {children}
  </table>
)

export const TabelHead: React.FC<TableHeadProps> = ({ children, className = '', onSort }) => (
  <thead
    className={buildClassName(
      'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
      className,
    )}
  >
    <TableRow className="dark:hover:bg-gray-700" hoverable={false}>
      {React.Children.map(children, (child) => {
        // Check if child is a valid React element
        if (React.isValidElement(child)) {
          // Type the child explicitly to ReactElement so TypeScript knows it supports onClick
          return React.cloneElement(child as ReactElement<any>, { onClick: onSort })
        }
        // Return child as-is if it's not a React element
        return child
      })}
    </TableRow>
  </thead>
)

export const TabelBody: React.FC<TableBodyProps> = ({
  children,
  loading,
  colSize,
  rowSize = 5,
  className = '',
}) => (
  <tbody
    className={buildClassName(
      'text-sm text-gray-700 dark:text-white divide-y divide-gray-200 dark:divide-gray-700',
      className,
    )}
  >
    {loading ? (
      <TableRowLoader colSize={colSize} rowSize={rowSize} />
    ) : (
      <>
        {React.Children.map(children, (child) => {
          // Check if child is a valid React element
          if (React.isValidElement(child)) {
            // Type the child explicitly to ReactElement so TypeScript knows it supports onClick
            return React.cloneElement(child)
          }
          // Return child as-is if it's not a React element
          return child
        })}
      </>
    )}
  </tbody>
)

export const TabelFoot: React.FC<TableFootProps> = ({ children }) => (
  <tfoot>
    {React.Children.map(children, (child) => {
      // Check if child is a valid React element
      if (React.isValidElement(child)) {
        // Type the child explicitly to ReactElement so TypeScript knows it supports onClick
        return React.cloneElement(child)
      }
      // Return child as-is if it's not a React element
      return child
    })}
  </tfoot>
)

export const TableRow: React.FC<TableRowProps> = ({
  children,
  hoverable = true,
  className,
  ...props
}) => (
  <tr
    className={buildClassName(
      'last:border-b border-gray-200 dark:border-gray-700 group h-full',
      className,
    )}
    {...props}
  >
    {children}
  </tr>
)

export const TableCell: React.FC<TableCellProps> = ({
  children,
  align = 'left',
  className = '',
  ...props
}) => (
  <td
    className={buildClassName(
      'first:pl-4 last:pr-4 px-3 py-3 bg-white dark:bg-gray-800 group-hover:bg-gray-50 group-hover:dark:bg-gray-600 whitespace-normal',
      className,
      TEXT_ALIGN_CLASSES[align],
    )}
    {...props}
  >
    <div className="antialiased leading-normal">{children}</div>
  </td>
)

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  align = 'left',
  className = '',
  ...props
}) => (
  <th
    className={buildClassName(
      'first:pl-4 last:pr-4 px-3 py-3 tracking-wider whitespace-nowrap',
      'text-gray-800 dark:text-gray-400',
      TEXT_ALIGN_CLASSES[align],
      className,
    )}
    {...props}
  >
    <BodyText as="div" className="block antialiased leading-none">
      {children}
    </BodyText>
  </th>
)

export const EmptyTableRow: React.FC<EmptyTableRow> = ({ children, colSpan = 1 }) => (
  <tr>
    <TableCell colSpan={colSpan} align="center">
      <div className="p-8 space-y-3">{children}</div>
    </TableCell>
  </tr>
)
