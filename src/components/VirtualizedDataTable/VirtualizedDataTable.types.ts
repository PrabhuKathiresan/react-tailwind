import { DataTableColumn, DataTableProps } from '../DataTable'

/**
 * Props for VirtualizedDataTable
 */
export interface VirtualizedDataTableProps extends DataTableProps {
  /** Height of each row in pixels (required for virtualization) */
  rowHeight?: number
  /** Max height (px) the table body can take. AutoSizer will size to available space. */
  maxHeight?: number
}

/**
 * Row props passed to the custom rowComponent API of react-window.
 * react-window will also pass index, style, and aria attributes.
 */
export type VirtualizedRowProps = {
  items: any[]
  columns: DataTableColumn[]
}
