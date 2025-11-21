import React, { useCallback, useMemo, useRef } from 'react'
import { List } from 'react-window'
import { buildClassName } from '../../utils/build-classname'
import { TextContent } from '../TextContent'
import { VirtualizedRow } from './VirtualizedRow'
import { type DataTableColumn, getSortIcon } from '../DataTable'
import { VirtualizedDataTableProps } from './VirtualizedDataTable.types'

/* -------------------------------------------------------
 * Convert column definitions into CSS grid template
 * ------------------------------------------------------- */
const useGridTemplate = (columns: DataTableColumn[]) =>
  useMemo(() => columns.map((col) => (col.width ? `${col.width}px` : '1fr')).join(' '), [columns])

export const VirtualizedDataTable: React.FC<VirtualizedDataTableProps> = ({
  items,
  columns,
  sorting = {},
  onSort,
  loading = false,
  emptyMessage = 'No data available',

  containerClass = '',
  wrapperClass = '',

  rowHeight = 48,
  maxHeight = 400,
}) => {
  const scrollRef = useRef<any>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  const gridTemplate = useGridTemplate(columns)

  /** Sync body → header scroll */
  const handleScrollSync = (scrollOffset: number) => {
    if (headerRef.current) {
      headerRef.current.scrollLeft = scrollOffset
    }
  }

  const handleSort = useCallback(
    (column: DataTableColumn) => {
      if (column.sortable) onSort?.(column)
    },
    [onSort],
  )

  /* -------------------------------------------------------
   * RENDER: Header row (real DOM for accessibility)
   * ------------------------------------------------------- */
  const Header = (
    <div ref={headerRef} className="overflow-hidden w-full">
      <div
        className="grid bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        style={{
          gridTemplateColumns: gridTemplate,
          minWidth: 'fit-content',
        }}
      >
        {columns.map((col) => (
          <div
            key={col.name}
            role="columnheader"
            className={buildClassName(
              'px-3 py-3 font-semibold text-sm whitespace-nowrap flex items-center',
              'border-r last:border-r-0 border-gray-200 dark:border-gray-700',

              col.sticky === 'left' &&
                'sticky left-0 z-20 bg-gray-50 dark:bg-gray-800 shadow-[2px_0_4px_rgba(0,0,0,0.05)]',

              col.sticky === 'right' &&
                'sticky right-0 z-20 bg-gray-50 dark:bg-gray-800 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]',
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

  /* -------------------------------------------------------
   * LOADING STATE (non-virtualized placeholder)
   * ------------------------------------------------------- */
  if (loading) {
    return (
      <div className={buildClassName('w-full rounded-lg relative', containerClass)}>
        <div
          className={buildClassName(
            'rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden',
            wrapperClass,
          )}
        >
          {Header}

          <div style={{ height: maxHeight }} className="flex flex-col">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                data-testid="skeleton-row"
                className="grid animate-pulse bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
                style={{
                  gridTemplateColumns: gridTemplate,
                  height: rowHeight,
                }}
              >
                {columns.map((col) => (
                  <div key={col.name} className="px-3 py-3">
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
   * EMPTY STATE (non-virtualized → single row)
   * ------------------------------------------------------- */
  if (!loading && items.length === 0) {
    return (
      <div className={buildClassName('w-full rounded-lg relative', containerClass)}>
        <div
          className={buildClassName(
            'rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden',
            wrapperClass,
          )}
        >
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
   * MAIN (virtualized body)
   * ------------------------------------------------------- */
  return (
    <div className={buildClassName('w-full rounded-lg relative', containerClass)}>
      <div
        className={buildClassName(
          'rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden',
          wrapperClass,
        )}
      >
        {Header}

        <div
          style={{
            height: maxHeight,
            overflowY: 'auto',
            overflowX: 'auto',
          }}
        >
          <List
            listRef={scrollRef}
            rowComponent={VirtualizedRow}
            rowCount={items.length}
            rowHeight={rowHeight}
            rowProps={{ items, columns, gridTemplate }}
            onScroll={(e) => handleScrollSync(e.currentTarget.scrollLeft)}
          />
        </div>
      </div>
    </div>
  )
}
