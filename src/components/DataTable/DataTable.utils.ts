import type { DataValueType, Sorting, SortQuery } from './DataTable.types'

/**
 * Compute the next sorting direction for a column.
 * - string: undefined → asc → desc → undefined
 * - number/date: undefined → 1 → -1 → undefined
 */
export const nextSortDirection = (
  prev: Sorting | undefined,
  type: 'string' | 'number' | 'date' = 'string',
): Sorting | undefined => {
  if (type === 'string') {
    if (!prev) return 'asc'
    if (prev === 'asc') return 'desc'
    return undefined
  }

  // number / date
  if (!prev) return '1'
  if (prev === '1') return '-1'
  return undefined
}

/**
 * Update the sort query object for a table column.
 * Toggles sort direction, removing key when reset.
 */
export const updateSortQuery = (
  sortQuery: SortQuery,
  name: string,
  type: DataValueType = 'string',
): SortQuery => {
  const next = nextSortDirection(sortQuery[name], type)

  // Shallow clone once
  const updated = { ...sortQuery }

  if (next == null) {
    delete updated[name]
  } else {
    updated[name] = next
  }

  return updated
}
