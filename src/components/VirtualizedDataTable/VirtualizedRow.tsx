import React from 'react'
import { ListChildComponentProps } from 'react-window'
import { buildClassName } from '../../utils/build-classname'
import { get } from '../../utils/get'
import type { DataTableColumn, DataTableDensity } from '../DataTable'
import { Checkbox } from '../Checkbox'
import type { VirtualizedRowProps } from './VirtualizedDataTable.types'

const DENSITY_CELL_CLASS: Record<DataTableDensity, string> = {
  compact: 'px-2 py-1.5',
  default: 'px-3 py-3',
  spacious: 'px-4 py-4',
}

export const VirtualizedRow = ({
  index,
  style,
  data,
}: ListChildComponentProps<VirtualizedRowProps>) => {
  const {
    items,
    columns,
    gridTemplate,
    onRowClick,
    rowClass,
    density = 'default',
    striped,
    selectable,
    getKey,
    isSelected,
    toggleRow,
    isRowSelectable,
  } = data
  const item = items[index]
  const isStriped = striped && index % 2 === 1
  const key = getKey?.(item, index) ?? index
  const rowSelectable = !isRowSelectable || isRowSelectable(item)

  const resolvedRowClass = !rowClass
    ? ''
    : typeof rowClass === 'function'
      ? rowClass(item, index)
      : rowClass

  const getCellClass = (col: DataTableColumn): string => {
    if (!col.cellClass) return ''
    if (typeof col.cellClass === 'function') return col.cellClass(item)
    return col.cellClass
  }

  const densityCellClass = DENSITY_CELL_CLASS[density]

  return (
    <div
      role="row"
      className={buildClassName(
        'grid border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 group',
        onRowClick && 'cursor-pointer',
        isStriped && 'bg-gray-50 dark:bg-gray-800/40',
        resolvedRowClass,
      )}
      style={{
        ...style,
        display: 'grid',
        gridTemplateColumns: gridTemplate,
        minWidth: 'fit-content',
      }}
      onClick={onRowClick ? () => onRowClick(item, index) : undefined}
    >
      {selectable && (
        <div
          role="cell"
          className={buildClassName(
            'flex items-center whitespace-nowrap border-r last:border-r-0 border-gray-200 dark:border-gray-700',
            densityCellClass,
            isStriped && 'bg-gray-50 dark:bg-gray-800/40',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            aria-label="Select row"
            checked={isSelected?.(key) ?? false}
            disabled={!rowSelectable}
            onChange={() => toggleRow?.(key)}
          />
        </div>
      )}
      {columns.map((col: DataTableColumn) => {
        const content = col.render ? col.render(item) : (get(item, col.name) ?? 'Not set')

        return (
          <div
            key={col.name}
            role="cell"
            className={buildClassName(
              'whitespace-nowrap border-r last:border-r-0 border-gray-200 dark:border-gray-700',
              densityCellClass,
              col.align === 'center' && 'text-center',
              col.align === 'right' && 'text-right',
              col.sticky === 'left' &&
                'sticky left-0 z-10 bg-white dark:bg-gray-900 shadow-[2px_0_4px_rgba(0,0,0,0.05)]',
              col.sticky === 'right' &&
                'sticky right-0 z-10 bg-white dark:bg-gray-900 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]',
              isStriped && 'bg-gray-50 dark:bg-gray-800/40',
              getCellClass(col),
            )}
          >
            {content}
          </div>
        )
      })}
    </div>
  )
}
