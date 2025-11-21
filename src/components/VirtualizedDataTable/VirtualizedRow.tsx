import { type RowComponentProps } from 'react-window'
import { buildClassName } from '../../utils/build-classname'
import { get } from '../../utils/get'
import { VirtualizedRowProps } from './VirtualizedDataTable.types'
import { DataTableColumn } from '../DataTable'

export const VirtualizedRow = ({
  index,
  style,
  items,
  columns,
  gridTemplate,
}: RowComponentProps<VirtualizedRowProps & { gridTemplate: string }>) => {
  const item = items[index]

  return (
    <div
      role="row"
      className="grid border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 group"
      style={{
        ...style,
        display: 'grid',
        gridTemplateColumns: gridTemplate,
        minWidth: 'fit-content',
      }}
    >
      {columns.map((col: DataTableColumn) => {
        const content = col.render ? col.render(item) : (get(item, col.name) ?? 'Not set')

        return (
          <div
            key={col.name}
            role="cell"
            className={buildClassName(
              'px-3 py-3 whitespace-nowrap border-r last:border-r-0 border-gray-200 dark:border-gray-700',
              col.align === 'center' && 'text-center',
              col.align === 'right' && 'text-right',
              col.sticky === 'left' &&
                'sticky left-0 z-10 bg-white dark:bg-gray-900 shadow-[2px_0_4px_rgba(0,0,0,0.05)]',
              col.sticky === 'right' &&
                'sticky right-0 z-10 bg-white dark:bg-gray-900 shadow-[-2px_0_4px_rgba(0,0,0,0.05)]',
            )}
          >
            {content}
          </div>
        )
      })}
    </div>
  )
}
