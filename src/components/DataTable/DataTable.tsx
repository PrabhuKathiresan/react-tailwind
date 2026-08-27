import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { Button } from '../Button'
import { get } from '../../utils/get'
import { updateSortQuery, useRowSelection } from './DataTable.utils'
import { getSortIcon } from './DataTable.icons'

const OVERFLOW_REGEX = /\boverflow-(x-|y-)?(auto|hidden|scroll|visible|clip)\b/
const NOOP = () => {}

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
  setPagination = NOOP,
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
  stickyHeader = true,
  stickyPagination = true,
  rowHoverActions,
  renderRowHoverActions,
  rowHoverActionHeader,
  rowHoverActionMode = 'overlay',
  rowHoverActionClass,
  paginationClass,
  paginationContainerClass,
  paginationProps,
  renderPagination,
}: DataTableProps<T>) {
  const [internalSortingState, setInternalSortingState] = useState<SortQuery>({})

  const handleSort = useCallback(
    (column: DataTableColumn<T>) => {
      if (!column.sortable) return
      if (onSort) {
        onSort(column)
      } else {
        setInternalSortingState((prev) => updateSortQuery(prev, column.name, column.type))
      }
    },
    [onSort],
  )

  const activeSorting = useMemo(
    () => ({ ...sorting, ...internalSortingState }),
    [sorting, internalSortingState],
  )

  const sortedItems: T[] = useMemo(() => {
    if (onSort) return items
    const activeSortKey = Object.keys(activeSorting)[0]
    if (!activeSortKey) return items
    const column = columns.find((c) => c.name === activeSortKey)
    if (!column) return items
    return autoSortItems(items, column, activeSorting[activeSortKey])
  }, [items, columns, onSort, activeSorting])

  const getKey = useCallback(
    (item: T, idx: number): string | number =>
      typeof rowKey === 'function' ? rowKey(item) : ((item as any)[rowKey] ?? idx),
    [rowKey],
  )

  const getRowClass = useCallback(
    (item: T, idx: number): string =>
      typeof rowClass === 'function' ? rowClass(item, idx) : rowClass || '',
    [rowClass],
  )

  const getCellClass = useCallback(
    (column: DataTableColumn<T>, item: T): string =>
      typeof column.cellClass === 'function' ? column.cellClass(item) : column.cellClass || '',
    [],
  )

  const { isSelected, toggleRow, toggleAll, allSelected, someSelected } = useRowSelection({
    items: sortedItems,
    getKey,
    selectedRowKeys,
    defaultSelectedRowKeys,
    onSelectionChange,
    isRowSelectable,
  })

  const hasRowHoverActions = Boolean(rowHoverActions || renderRowHoverActions)
  const isInlineMode = hasRowHoverActions && rowHoverActionMode === 'inline'
  const isOverlayMode = hasRowHoverActions && rowHoverActionMode !== 'inline'

  const densityCellClass = DENSITY_CELL_CLASS[density]
  const colSize = columns.length + (selectable ? 1 : 0) + (isInlineMode ? 1 : 0)
  const wrapperHasOverflow = OVERFLOW_REGEX.test(wrapperClass)

  const renderActionsContent = useCallback(
    (item: T, idx: number) => {
      if (renderRowHoverActions) return renderRowHoverActions(item, idx)
      if (!rowHoverActions) return null
      return rowHoverActions(item, idx).map((act) => {
        const isDisabled = typeof act.disabled === 'function' ? act.disabled(item) : act.disabled
        const isIconOnly = Boolean(act.icon && !act.label)

        return (
          <Button
            key={act.id}
            size="xs"
            theme={act.theme || 'secondary'}
            variant={act.variant || 'plain'}
            disabled={isDisabled}
            title={act.title || (typeof act.label === 'string' ? act.label : undefined)}
            className={buildClassName(
              isIconOnly
                ? 'p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10'
                : 'px-2 py-1',
              act.className,
            )}
            onClick={(e) => {
              e.stopPropagation()
              act.onClick(item, idx, e)
            }}
          >
            {act.icon && <span className="shrink-0">{act.icon}</span>}
            {act.label && <span>{act.label}</span>}
          </Button>
        )
      })
    },
    [renderRowHoverActions, rowHoverActions],
  )

  return (
    <div className={buildClassName('w-full rounded-lg relative', containerClass)}>
      <div
        className={buildClassName(
          !wrapperHasOverflow && 'overflow-x-auto',
          'rounded-lg border border-[var(--ui-border)]',
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
                className={buildClassName(
                  'bg-gray-50 dark:bg-gray-800 w-px',
                  densityCellClass,
                  stickyHeader && 'sticky top-0 z-20 shadow-[0_1px_2px_rgba(0,0,0,0.06)]',
                )}
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
            {columns.map((column) => {
              const sortState = activeSorting[column.name]
              const ariaSortValue = column.sortable
                ? sortState === 'asc' || sortState === '1'
                  ? 'ascending'
                  : sortState === 'desc' || sortState === '-1'
                    ? 'descending'
                    : 'none'
                : undefined

              return (
                <TableHeaderCell
                  key={column.name}
                  align={column.headerAlign}
                  style={{ width: column.width || 'auto' }}
                  aria-sort={ariaSortValue}
                  className={buildClassName(
                    'bg-gray-50 dark:bg-gray-800',
                    densityCellClass,
                    stickyHeader && 'sticky top-0 z-20 shadow-[0_1px_2px_rgba(0,0,0,0.06)]',
                    column.sticky === 'left' &&
                      'sticky left-0 z-30 shadow-[2px_0_6px_rgba(0,0,0,0.06)]',
                    column.sticky === 'right' &&
                      'sticky right-0 z-30 shadow-[-2px_0_6px_rgba(0,0,0,0.06)]',
                    column.headerClass,
                  )}
                >
                  <TextContent
                    role={column.sortable ? 'button' : undefined}
                    tabIndex={column.sortable ? 0 : undefined}
                    aria-label={column.sortable ? `Sort by ${column.label}` : undefined}
                    className={buildClassName(
                      'group',
                      column.sortable &&
                        'inline-flex items-center gap-2 cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded',
                    )}
                    onClick={() => handleSort(column)}
                    onKeyDown={(e) => {
                      if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault()
                        handleSort(column)
                      }
                    }}
                  >
                    <TextContent className="shrink-0">{column.label}</TextContent>
                    {column.sortable ? getSortIcon(activeSorting[column.name]) : null}
                  </TextContent>
                </TableHeaderCell>
              )
            })}
            {isInlineMode && (
              <TableHeaderCell
                align="right"
                className={buildClassName(
                  'bg-gray-50 dark:bg-gray-800 text-right w-px',
                  densityCellClass,
                  stickyHeader && 'sticky top-0 z-20 shadow-[0_1px_2px_rgba(0,0,0,0.06)]',
                )}
              >
                {rowHoverActionHeader ?? ''}
              </TableHeaderCell>
            )}
            {isOverlayMode && (
              <TableHeaderCell
                align="right"
                style={{ padding: 0, width: 0, minWidth: 0, maxWidth: 0 }}
                className={buildClassName(
                  'sticky right-0 z-20 !p-0 !pr-0 !pl-0 !py-0 w-0 max-w-0 min-w-0 border-0 bg-gray-50 dark:bg-gray-800',
                  stickyHeader && 'top-0',
                )}
              >
                {null}
              </TableHeaderCell>
            )}
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
                    {isInlineMode && (
                      <TableCell
                        align="right"
                        className={buildClassName(
                          densityCellClass,
                          striped && idx % 2 === 1 && 'bg-gray-50 dark:bg-gray-800/40',
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className={buildClassName(
                            'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 flex items-center justify-end gap-1.5',
                            rowHoverActionClass,
                          )}
                          data-testid={`row-hover-actions-${key}`}
                        >
                          {renderActionsContent(item, idx)}
                        </div>
                      </TableCell>
                    )}
                    {isOverlayMode && (
                      <TableCell
                        align="right"
                        style={{ padding: 0, width: 0, minWidth: 0, maxWidth: 0 }}
                        className="sticky right-0 z-20 !p-0 !pr-0 !pl-0 !py-0 w-0 max-w-0 min-w-0 border-0 overflow-visible text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className={buildClassName(
                            'absolute right-0 top-0 bottom-0 h-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 flex items-center justify-end gap-1 px-3 z-30 pointer-events-none group-hover:pointer-events-auto whitespace-nowrap',
                            striped && idx % 2 === 1
                              ? 'bg-gray-100 dark:bg-gray-800'
                              : 'bg-white group-hover:bg-gray-50 dark:bg-gray-900 dark:group-hover:bg-gray-800',
                            rowHoverActionClass,
                          )}
                          data-testid={`row-hover-actions-${key}`}
                        >
                          {renderActionsContent(item, idx)}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                )
              })
            )}
          </TableBody>

          {footerRow && <TableFoot>{footerRow}</TableFoot>}
        </Table>
      </div>

      {pagination && (
        <div
          className={buildClassName(
            stickyPagination && 'sticky bottom-0 z-20 bg-white dark:bg-gray-800',
            paginationClass,
            paginationContainerClass,
          )}
        >
          {renderPagination ? (
            renderPagination(pagination, setPagination)
          ) : (
            <Pagination
              {...pagination}
              {...paginationProps}
              className={buildClassName(
                'rounded-t-none rounded-b-lg border border-[var(--ui-border)]',
                stickyPagination && 'sticky bottom-0 z-20 bg-white dark:bg-gray-800',
                paginationProps?.className,
              )}
              onChange={setPagination}
            />
          )}
        </div>
      )}
    </div>
  )
}

DataTable.displayName = 'DataTable'
