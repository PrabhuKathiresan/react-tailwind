import { useRef } from 'react'
import {
  EmptyTableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../Table'
import { buildClassName } from '../../utils/build-classname'
import type { DataTableProps, DataTableColumn, Sorting, SortQuery } from './DataTable.types'
import { TextContent } from '../TextContent'
import { Pagination } from '../Pagination'
import { get } from '../../utils/get'
import { updateSortQuery } from './DataTable.utils'
import { getSortIcon } from './DataTable.icons'

/**
 * Smart auto-sort helper (optional usage)
 */
const autoSortItems = (items: any[], column: DataTableColumn, sort: Sorting) => {
  const path = column.name
  return [...items].sort((a, b) => {
    const valueA = get(a, path)
    const valueB = get(b, path)

    if (column.type === 'number') {
      const nA = Number(valueA)
      const nB = Number(valueB)
      return sort === 'asc' || sort === '1' ? nA - nB : nB - nA
    }

    if (column.type === 'date') {
      const dA = new Date(valueA).getTime()
      const dB = new Date(valueB).getTime()
      return sort === 'asc' || sort === '1' ? dA - dB : dB - dA
    }

    // String fallback
    const sA = String(valueA).toLowerCase()
    const sB = String(valueB).toLowerCase()
    if (sA < sB) return sort === 'asc' || sort === '1' ? -1 : 1
    if (sA > sB) return sort === 'asc' || sort === '1' ? 1 : -1
    return 0
  })
}

export const DataTable: React.FC<DataTableProps> = ({
  items,
  columns,
  sorting = {},
  onSort,
  loading,
  pagination = null,
  setPagination = () => {},
  emptyMessage = 'No data found',
  containerClass = '',
  wrapperClass = '',
  layout = 'auto',
}) => {
  const internalSorting = useRef<SortQuery>({})

  const doAutoSort = (column: DataTableColumn) => {
    internalSorting.current = updateSortQuery(internalSorting.current, column.name, column.type)
    autoSortItems(items, column, internalSorting.current[column.name])
  }

  const handleSort = (column: DataTableColumn) => {
    if (!column.sortable) return
    onSort ? onSort(column) : doAutoSort(column)
  }

  return (
    <div className={buildClassName('w-full rounded-lg relative', containerClass)}>
      <div
        className={buildClassName(
          'overflow-x-auto overflow-y-hidden rounded-lg border border-gray-200 dark:border-gray-800',
          wrapperClass,
          pagination && 'rounded-b-none border-b-0',
        )}
      >
        <Table className="relative w-full max-w-full h-fit" layout={layout}>
          {/* Header */}
          <TableHead>
            {columns.map((column) => (
              <TableHeaderCell
                key={column.name}
                align={column.headerAlign}
                style={{ width: column.width || 'auto' }}
                className={buildClassName(
                  'bg-gray-50 dark:bg-gray-800',
                  column.sticky === 'left' &&
                    'sticky left-0 z-10 shadow-[2px_0_6px_rgba(0,0,0,0.06)]',
                  column.sticky === 'right' &&
                    'sticky right-0 z-10 shadow-[-2px_0_6px_rgba(0,0,0,0.06)]',
                )}
              >
                <TextContent
                  role={column.sortable ? 'button' : undefined}
                  className={buildClassName(
                    'group',
                    column.sortable && 'inline-flex items-center gap-2 cursor-pointer select-none',
                  )}
                  onClick={() => handleSort(column)}
                >
                  <TextContent className="shrink-0">{column.label}</TextContent>
                  {column.sortable ? getSortIcon(sorting[column.name]) : null}
                </TextContent>
              </TableHeaderCell>
            ))}
          </TableHead>

          {/* Body */}
          <TableBody loading={loading} colSize={columns.length} rowSize={pagination?.limit || 5}>
            {!loading && items.length === 0 ? (
              <EmptyTableRow colSpan={columns.length}>{emptyMessage}</EmptyTableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} className="group">
                  {columns.map((column) => (
                    <TableCell
                      key={column.name}
                      align={column.align}
                      className={buildClassName(
                        column.sticky === 'left' &&
                          'sticky left-0 z-10 shadow-[2px_0_6px_rgba(0,0,0,0.06)]',
                        column.sticky === 'right' &&
                          'sticky right-0 z-10 shadow-[-2px_0_6px_rgba(0,0,0,0.06)]',
                      )}
                    >
                      {column.render
                        ? column.render(item)
                        : ((get(item, column.name) as any) ?? 'Not set')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          {...pagination}
          className="rounded-b-lg border border-t-0 border-gray-200 dark:border-gray-800"
          onChange={setPagination}
        />
      )}
    </div>
  )
}

DataTable.displayName = 'DataTable'
