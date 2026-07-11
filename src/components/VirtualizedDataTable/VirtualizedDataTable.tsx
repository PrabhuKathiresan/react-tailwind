import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { FixedSizeList as List } from 'react-window'
import { buildClassName } from '../../utils/build-classname'
import { TextContent } from '../TextContent'
import { VirtualizedRow } from './VirtualizedRow'
import { type DataTableColumn, type DataTableDensity, getSortIcon } from '../DataTable'
import type { VirtualizedDataTableProps } from './VirtualizedDataTable.types'

const DENSITY_CELL_CLASS: Record<DataTableDensity, string> = {
  compact: 'px-2 py-1.5',
  default: 'px-3 py-3',
  spacious: 'px-4 py-4',
}

const columnWidth = (col: DataTableColumn): string => {
  if (!col.width) return '1fr'
  if (typeof col.width === 'number') return `${col.width}px`
  return col.width
}

export function VirtualizedDataTable<T extends Record<string, any> = Record<string, any>>({
  items,
  columns,
  sorting = {},
  onSort,
  loading = false,
  emptyMessage = 'No data available',
  containerClass = '',
  wrapperClass = '',
  onRowClick,
  rowClass,
  density = 'default',
  striped = false,
  rowHeight = 48,
  maxHeight = 400,
  overscanCount = 3,
}: VirtualizedDataTableProps<T>) {
  const scrollRef = useRef<any>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  const gridTemplate = useMemo(() => columns.map((col) => columnWidth(col)).join(' '), [columns])

  const densityCellClass = DENSITY_CELL_CLASS[density]

  const skeletonRows = Math.max(1, Math.floor(maxHeight / rowHeight))

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const handler = () => {
      if (headerRef.current) headerRef.current.scrollLeft = el.scrollLeft
    }
    el.addEventListener('scroll', handler)
    return () => el.removeEventListener('scroll', handler)
  }, [])

  const handleSort = useCallback(
    (column: DataTableColumn) => {
      if (column.sortable) onSort?.(column as DataTableColumn<T>)
    },
    [onSort],
  )

  const itemData = useMemo(
    () => ({ items, columns, gridTemplate, onRowClick, rowClass, density, striped }),
    [items, columns, gridTemplate, onRowClick, rowClass, density, striped],
  )

  /* -------------------------------------------------------
   * Header
   * ------------------------------------------------------- */
  const Header = (
    <div ref={headerRef} className="overflow-hidden w-full">
      <div
        className="grid bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        style={{ gridTemplateColumns: gridTemplate, minWidth: 'fit-content' }}
      >
        {columns.map((col) => (
          <div
            key={col.name}
            role="columnheader"
            className={buildClassName(
              'font-semibold text-sm whitespace-nowrap flex items-center',
              densityCellClass,
              'border-r last:border-r-0 border-gray-200 dark:border-gray-700',
              col.sticky === 'left' &&
                'sticky left-0 z-20 bg-gray-50 dark:bg-gray-800 shadow-[2px_0_4px_rgba(0,0,0,0.05)]',
              col.sticky === 'right' &&
                'sticky right-0 z-20 bg-gray-50 dark:bg-gray-800 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]',
              col.headerClass,
            )}
          >
            <TextContent
              role={col.sortable ? 'button' : undefined}
              className={buildClassName(
                col.sortable && 'inline-flex items-center gap-2 cursor-pointer select-none',
              )}
              onClick={() => handleSort(col)}
            >
              {col.label}
              {col.sortable ? getSortIcon(sorting[col.name]) : null}
            </TextContent>
          </div>
        ))}
      </div>
    </div>
  )

  const wrapperCls = buildClassName(
    'rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden',
    wrapperClass,
  )

  /* -------------------------------------------------------
   * Loading state
   * ------------------------------------------------------- */
  if (loading) {
    return (
      <div className={buildClassName('w-full rounded-lg relative', containerClass)}>
        <div className={wrapperCls}>
          {Header}
          <div style={{ height: maxHeight }} className="flex flex-col">
            {Array.from({ length: skeletonRows }).map((_, idx) => (
              <div
                key={idx}
                data-testid="skeleton-row"
                className="grid animate-pulse bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
                style={{ gridTemplateColumns: gridTemplate, height: rowHeight }}
              >
                {columns.map((col) => (
                  <div key={col.name} className={densityCellClass}>
                    <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* -------------------------------------------------------
   * Empty state
   * ------------------------------------------------------- */
  if (items.length === 0) {
    return (
      <div className={buildClassName('w-full rounded-lg relative', containerClass)}>
        <div className={wrapperCls}>
          {Header}
          <div
            className="flex items-center justify-center text-gray-500 dark:text-gray-300"
            style={{ height: maxHeight }}
          >
            {emptyMessage}
          </div>
        </div>
      </div>
    )
  }

  /* -------------------------------------------------------
   * Virtualized body
   * ------------------------------------------------------- */
  return (
    <div className={buildClassName('w-full rounded-lg relative', containerClass)}>
      <div className={wrapperCls}>
        {Header}
        <List
          ref={scrollRef}
          outerRef={outerRef}
          height={maxHeight}
          width="100%"
          itemCount={items.length}
          itemSize={rowHeight}
          itemData={itemData}
          overscanCount={overscanCount}
        >
          {VirtualizedRow}
        </List>
      </div>
    </div>
  )
}
