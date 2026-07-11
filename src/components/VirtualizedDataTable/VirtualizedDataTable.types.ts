import type { DataTableColumn, DataTableDensity, DataTableProps } from '../DataTable'

/**
 * Props shared with DataTable but not applicable to virtualized tables are omitted:
 * pagination, setPagination, layout, footerRow, rowKey, tableClass, headClass.
 */
type VirtualizedBase<T = any> = Omit<
  DataTableProps<T>,
  'pagination' | 'setPagination' | 'layout' | 'footerRow' | 'rowKey' | 'tableClass' | 'headClass'
>

/**
 * Props for VirtualizedDataTable.
 * @template T Shape of each data row
 */
export interface VirtualizedDataTableProps<T = any> extends VirtualizedBase<T> {
  /** Height of each row in pixels. Required for react-window's fixed-size virtualization.
   * @default 48
   */
  rowHeight?: number

  /** Maximum height of the scrollable body in pixels.
   * @default 400
   */
  maxHeight?: number

  /**
   * Number of extra rows rendered outside the visible area.
   * Higher values reduce blank flicker during fast scrolling at the cost of more DOM nodes.
   * Maps directly to react-window's overscanCount.
   * @default 3
   */
  overscanCount?: number
}

/**
 * Data object passed to each virtualized row via react-window's itemData.
 * Items and columns use any internally because react-window's generic inference
 * does not flow through to ComponentType children.
 */
export type VirtualizedRowProps = {
  items: any[]
  columns: DataTableColumn[]
  gridTemplate: string
  onRowClick?: (item: any, index: number) => void
  rowClass?: string | ((item: any, index: number) => string)
  density?: DataTableDensity
  striped?: boolean
}
