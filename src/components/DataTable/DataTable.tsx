import { useEffect, useRef, useState } from 'react'
import {
  EmptyTableRow,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../Table'
import { buildClassName } from '../../utils/build-classname'
import type {
  DataTableProps,
  DataTableColumn,
  DataTableDensity,
  Sorting,
  SortQuery,
} from './DataTable.types'
import { TextContent } from '../TextContent'
import { Pagination } from '../Pagination'
import { Checkbox } from '../Checkbox'
import { get } from '../../utils/get'
import { updateSortQuery, useRowSelection } from './DataTable.utils'
import { getSortIcon } from './DataTable.icons'

const DENSITY_CELL_CLASS: Record<DataTableDensity, string> = {
  compact: 'px-2 py-1.5',
  default: '',
  spacious: 'px-4 py-4',
}

const autoSortItems = <T,>(items: T[], column: DataTableColumn<T>, sort: Sorting): T[] => {
  const path = column.name
  return [...items].sort((a, b) => {
    const valueA = get(a as Record<string, any>, path)
    const valueB = get(b as Record<string, any>, path)

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

    const sA = String(valueA).toLowerCase()
    const sB = String(valueB).toLowerCase()
    if (sA < sB) return sort === 'asc' || sort === '1' ? -1 : 1
    if (sA > sB) return sort === 'asc' || sort === '1' ? 1 : -1
    return 0
  })
}

export function DataTable<T extends Record<string, any> = Record<string, any>>({
  items,
  columns,
  sorting = {},
  onSort,
  loading,
  pagination,
  setPagination = () => {},
  emptyMessage = 'No data found',
  containerClass = '',
  wrapperClass = '',
  tableClass = '',
  headClass = '',
  footerRow,
  rowKey = 'id',
  onRowClick,
  rowClass,
  density = 'default',
  striped = false,
  layout = 'auto',
  selectable = false,
  selectedRowKeys,
  defaultSelectedRowKeys,
  onSelectionChange,
  isRowSelectable,
  paginationContainerClass,
}: DataTableProps<T>) {
  const internalSorting = useRef<SortQuery>({})
  const [sortedItems, setSortedItems] = useState(items)

  useEffect(() => {
    setSortedItems(items)
  }, [items])

  const doAutoSort = (column: DataTableColumn<T>) => {
    internalSorting.current = updateSortQuery(internalSorting.current, column.name, column.type)
    setSortedItems(autoSortItems(items, column, internalSorting.current[column.name]))
  }

  const handleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) return
    onSort ? onSort(column) : doAutoSort(column)
  }

  const getKey = (item: T, idx: number): string | number => {
    if (typeof rowKey === 'function') return rowKey(item)
    return (item as any)[rowKey] ?? idx
  }

  const getRowClass = (item: T, idx: number): string => {
    if (!rowClass) return ''
    if (typeof rowClass === 'function') return rowClass(item, idx)
    return rowClass
  }

  const getCellClass = (column: DataTableColumn<T>, item: T): string => {
    if (!column.cellClass) return ''
    if (typeof column.cellClass === 'function') return column.cellClass(item)
    return column.cellClass
  }

  const { isSelected, toggleRow, toggleAll, allSelected, someSelected } = useRowSelection({
    items: sortedItems,
    getKey,
    selectedRowKeys,
    defaultSelectedRowKeys,
    onSelectionChange,
    isRowSelectable,
  })

  const densityCellClass = DENSITY_CELL_CLASS[density]
  const colSize = columns.length + (selectable ? 1 : 0)

  return (
    <div className={buildClassName('w-full rounded-lg relative', containerClass)}>
      <div
        className={buildClassName(
          'overflow-x-auto overflow-y-hidden rounded-lg border border-[var(--ui-border)]',
          wrapperClass,
          pagination && 'rounded-b-none border-b-0',
        )}
      >
        <Table
          className={buildClassName('relative w-full max-w-full h-fit', tableClass)}
          layout={layout}
        >
          <TableHead className={headClass}>
            {selectable && (
              <TableHeaderCell
                className={buildClassName('bg-gray-50 dark:bg-gray-800 w-px', densityCellClass)}
              >
                <Checkbox
                  aria-label="Select all rows"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected
                  }}
                  onChange={toggleAll}
                />
              </TableHeaderCell>
            )}
            {columns.map((column) => (
              <TableHeaderCell
                key={column.name}
                align={column.headerAlign}
                style={{ width: column.width || 'auto' }}
                className={buildClassName(
                  'bg-gray-50 dark:bg-gray-800',
                  densityCellClass,
                  column.sticky === 'left' &&
                    'sticky left-0 z-10 shadow-[2px_0_6px_rgba(0,0,0,0.06)]',
                  column.sticky === 'right' &&
                    'sticky right-0 z-10 shadow-[-2px_0_6px_rgba(0,0,0,0.06)]',
                  column.headerClass,
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

          <TableBody loading={loading} colSize={colSize} rowSize={pagination?.limit || 5}>
            {!loading && sortedItems.length === 0 ? (
              <EmptyTableRow colSpan={colSize}>{emptyMessage}</EmptyTableRow>
            ) : (
              sortedItems.map((item, idx) => {
                const key = getKey(item, idx)
                const rowSelectable = !isRowSelectable || isRowSelectable(item)

                return (
                  <TableRow
                    key={key}
                    className={buildClassName(
                      'group',
                      onRowClick && 'cursor-pointer',
                      striped && idx % 2 === 1 && 'bg-gray-50 dark:bg-gray-800/40',
                      getRowClass(item, idx),
                    )}
                    onClick={onRowClick ? () => onRowClick(item, idx) : undefined}
                  >
                    {selectable && (
                      <TableCell
                        className={buildClassName(
                          densityCellClass,
                          striped && idx % 2 === 1 && 'bg-gray-50 dark:bg-gray-800/40',
                        )}
                      >
                        <span onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            aria-label="Select row"
                            checked={isSelected(key)}
                            disabled={!rowSelectable}
                            onChange={() => toggleRow(key)}
                          />
                        </span>
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        key={column.name}
                        align={column.align}
                        className={buildClassName(
                          densityCellClass,
                          striped && idx % 2 === 1 && 'bg-gray-50 dark:bg-gray-800/40',
                          column.sticky === 'left' &&
                            'sticky left-0 z-10 shadow-[2px_0_6px_rgba(0,0,0,0.06)]',
                          column.sticky === 'right' &&
                            'sticky right-0 z-10 shadow-[-2px_0_6px_rgba(0,0,0,0.06)]',
                          getCellClass(column, item),
                        )}
                      >
                        {column.render
                          ? column.render(item)
                          : ((get(item, column.name) as any) ?? 'Not set')}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            )}
          </TableBody>

          {footerRow && <TableFoot>{footerRow}</TableFoot>}
        </Table>
      </div>

      {pagination && (
        <Pagination
          {...pagination}
          className={buildClassName(
            'rounded-b-lg border-t border-[var(--ui-border)]',
            paginationContainerClass,
          )}
          onChange={setPagination}
        />
      )}
    </div>
  )
}

DataTable.displayName = 'DataTable'
