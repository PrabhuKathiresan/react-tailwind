import { useCallback, useMemo, useState } from 'react'
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

/** Options for {@link useRowSelection}. */
export interface UseRowSelectionOptions<T> {
  items: T[]
  getKey: (item: T, idx: number) => string | number
  selectedRowKeys?: Array<string | number>
  defaultSelectedRowKeys?: Array<string | number>
  onSelectionChange?: (selectedRowKeys: Array<string | number>, selectedItems: T[]) => void
  isRowSelectable?: (item: T) => boolean
}

/**
 * Shared row-selection state/behaviour used by DataTable and VirtualizedDataTable.
 * Supports controlled (`selectedRowKeys`) and uncontrolled (`defaultSelectedRowKeys`) usage.
 */
export const useRowSelection = <T>({
  items,
  getKey,
  selectedRowKeys,
  defaultSelectedRowKeys = [],
  onSelectionChange,
  isRowSelectable,
}: UseRowSelectionOptions<T>) => {
  const [internalKeys, setInternalKeys] = useState<Array<string | number>>(defaultSelectedRowKeys)
  const isControlled = selectedRowKeys !== undefined
  const keys = isControlled ? selectedRowKeys : internalKeys
  const keySet = useMemo(() => new Set(keys), [keys])

  const selectableEntries = useMemo(
    () =>
      items
        .map((item, idx) => ({ item, key: getKey(item, idx) }))
        .filter(({ item }) => !isRowSelectable || isRowSelectable(item)),
    [items, getKey, isRowSelectable],
  )

  const emit = useCallback(
    (nextKeys: Array<string | number>) => {
      if (!isControlled) setInternalKeys(nextKeys)
      const nextKeySet = new Set(nextKeys)
      const nextItems = items.filter((item, idx) => nextKeySet.has(getKey(item, idx)))
      onSelectionChange?.(nextKeys, nextItems)
    },
    [isControlled, items, getKey, onSelectionChange],
  )

  const toggleRow = useCallback(
    (key: string | number) => {
      emit(keySet.has(key) ? keys.filter((k) => k !== key) : [...keys, key])
    },
    [keys, keySet, emit],
  )

  const allSelected =
    selectableEntries.length > 0 && selectableEntries.every(({ key }) => keySet.has(key))
  const someSelected = !allSelected && selectableEntries.some(({ key }) => keySet.has(key))

  const toggleAll = useCallback(() => {
    const selectableKeySet = new Set(selectableEntries.map(({ key }) => key))
    if (allSelected) {
      emit(keys.filter((k) => !selectableKeySet.has(k)))
    } else {
      emit(Array.from(new Set([...keys, ...selectableKeySet])))
    }
  }, [allSelected, selectableEntries, keys, emit])

  const isSelected = useCallback((key: string | number) => keySet.has(key), [keySet])

  return {
    selectedKeys: keys,
    isSelected,
    toggleRow,
    toggleAll,
    allSelected,
    someSelected,
  }
}
