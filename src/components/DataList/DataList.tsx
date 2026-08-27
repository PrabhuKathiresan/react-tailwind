import React, { useMemo, useState } from 'react'
import type { DataListProps, DataListSortDirection } from './DataList.types'
import { SwipeableRow } from '../SwipeableRow'
import { Checkbox } from '../Checkbox'
import { Pagination } from '../Pagination'
import { Input } from '../Input'
import { Drawer } from '../Drawer'
import { Button } from '../Button'
import { get } from '../../utils/get'
import { buildClassName } from '../../utils/build-classname'

function SearchIcon() {
  return (
    <svg className="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  )
}

function SortIcon() {
  return (
    <svg className="size-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      className="size-4 text-blue-600 dark:text-blue-400 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

const parseNumericValue = (val: any): number => {
  if (typeof val === 'number') return val
  if (val === null || val === undefined) return NaN
  const cleaned = String(val).replace(/[^0-9.-]/g, '')
  return cleaned !== '' ? Number(cleaned) : NaN
}

export function DataList<T extends Record<string, any> = Record<string, any>>({
  items,
  columns,
  renderItem,
  searchable = false,
  searchQuery: externalSearchQuery,
  onSearchChange,
  searchFields,
  filterFields,
  selectedFilters: externalFilters,
  onFilterChange,
  sorting: externalSorting,
  onSortChange,
  swipeableActions,
  rowKey = 'id',
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  onItemClick,
  loading = false,
  emptyMessage = 'No items found',
  pagination,
  setPagination,
  paginationClass,
  paginationContainerClass,
  paginationProps,
  renderPagination,
  containerClass = '',
  itemClass = '',
}: DataListProps<T>) {
  // Internal Search State
  const [internalSearchQuery, setInternalSearchQuery] = useState('')
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery

  const handleSearchInput = (query: string) => {
    onSearchChange ? onSearchChange(query) : setInternalSearchQuery(query)
  }

  // Internal Filter State
  const [internalFilters, setInternalFilters] = useState<
    Record<string, Array<string | number> | string | number>
  >({})
  const selectedFilters = externalFilters !== undefined ? externalFilters : internalFilters

  // Mobile Bottom Sheet Filter Drawer State
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const [draftFilters, setDraftFilters] = useState<
    Record<string, Array<string | number> | string | number>
  >({})

  // Mobile Bottom Sheet Sort Drawer State
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false)

  // Active Filter Count Calculation
  const activeFilterCount = useMemo(() => {
    let count = 0
    Object.values(selectedFilters).forEach((val) => {
      if (Array.isArray(val)) {
        count += val.length
      } else if (val !== '' && val !== null && val !== undefined && val !== 'all') {
        count += 1
      }
    })
    return count
  }, [selectedFilters])

  // Internal Sort State
  const [internalSort, setInternalSort] = useState<{
    field: string
    dir: DataListSortDirection
  } | null>(() => {
    if (externalSorting && Object.keys(externalSorting).length > 0) {
      const field = Object.keys(externalSorting)[0]
      return { field, dir: externalSorting[field] }
    }
    return null
  })

  React.useEffect(() => {
    if (externalSorting !== undefined) {
      if (Object.keys(externalSorting).length > 0) {
        const field = Object.keys(externalSorting)[0]
        setInternalSort({ field, dir: externalSorting[field] })
      } else {
        setInternalSort(null)
      }
    }
  }, [externalSorting])

  const activeSort = internalSort

  const sortableColumns = useMemo(() => columns?.filter((c) => c.sortable) || [], [columns])

  const sortOptions = useMemo(() => {
    const opts: Array<{ label: string; value: string }> = [{ label: 'Default Order', value: '' }]
    sortableColumns.forEach((col) => {
      const isNum = col.type === 'number'
      const isDate = col.type === 'date'
      const lowHigh = isNum
        ? `${col.label} (Low to High)`
        : isDate
          ? `${col.label} (Oldest First)`
          : `${col.label} (A to Z)`
      const highLow = isNum
        ? `${col.label} (High to Low)`
        : isDate
          ? `${col.label} (Newest First)`
          : `${col.label} (Z to A)`

      opts.push({ label: lowHigh, value: `${col.name}:asc` })
      opts.push({ label: highLow, value: `${col.name}:desc` })
    })
    return opts
  }, [sortableColumns])

  const handleSortSelect = (val: string) => {
    if (!val) {
      setInternalSort(null)
      onSortChange?.({})
      return
    }
    const [field, dir] = val.split(':')
    const sortObj = { [field]: dir as DataListSortDirection }
    setInternalSort({ field, dir: dir as DataListSortDirection })
    onSortChange?.(sortObj)
  }

  const activeSortLabel = useMemo(() => {
    if (!activeSort) return 'Sort'
    const currVal = `${activeSort.field}:${activeSort.dir}`
    const match = sortOptions.find((o) => o.value === currVal)
    if (!match || !match.value) return 'Sort'
    return `Sort: ${match.label}`
  }, [activeSort, sortOptions])

  // Processed Items (Filter + Search + Sort)
  const processedItems = useMemo(() => {
    let result = [...items]

    // 1. Apply Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const fieldsToSearch = searchFields || columns?.map((c) => c.name) || ['id', 'name', 'title']
      result = result.filter((item) =>
        fieldsToSearch.some((field) => {
          const val = get(item, field)
          return val !== null && val !== undefined && String(val).toLowerCase().includes(q)
        }),
      )
    }

    // 2. Apply Filters (supporting array checkboxes or single values)
    const filterKeys = Object.keys(selectedFilters)
    if (filterKeys.length > 0) {
      result = result.filter((item) =>
        filterKeys.every((key) => {
          const filterVal = selectedFilters[key]
          if (filterVal === undefined || filterVal === null || filterVal === '') return true
          const actual = String(get(item, key))
          if (Array.isArray(filterVal)) {
            if (filterVal.length === 0) return true
            return filterVal.map(String).includes(actual)
          }
          return actual === String(filterVal)
        }),
      )
    }

    // 3. Apply Auto Sorting
    if (activeSort) {
      const { field, dir } = activeSort
      const colDef = columns?.find((c) => c.name === field)
      const isAsc = dir === 'asc' || dir === '1'

      result.sort((a, b) => {
        const valA = get(a, field)
        const valB = get(b, field)

        const numA = parseNumericValue(valA)
        const numB = parseNumericValue(valB)

        if (colDef?.type === 'number' || (!isNaN(numA) && !isNaN(numB))) {
          return isAsc ? numA - numB : numB - numA
        }

        if (colDef?.type === 'date') {
          const dA = new Date(valA).getTime()
          const dB = new Date(valB).getTime()
          if (!isNaN(dA) && !isNaN(dB)) {
            return isAsc ? dA - dB : dB - dA
          }
        }

        const strA = String(valA ?? '')
        const strB = String(valB ?? '')
        return isAsc
          ? strA.localeCompare(strB, undefined, { numeric: true })
          : strB.localeCompare(strA, undefined, { numeric: true })
      })
    }

    return result
  }, [items, searchQuery, searchFields, columns, selectedFilters, activeSort])

  // Draft Filters Matching Count
  const draftMatchingCount = useMemo(() => {
    let result = [...items]
    const filterKeys = Object.keys(draftFilters)
    if (filterKeys.length > 0) {
      result = result.filter((item) =>
        filterKeys.every((key) => {
          const filterVal = draftFilters[key]
          if (filterVal === undefined || filterVal === null || filterVal === '') return true
          const actual = String(get(item, key))
          if (Array.isArray(filterVal)) {
            if (filterVal.length === 0) return true
            return filterVal.map(String).includes(actual)
          }
          return actual === String(filterVal)
        }),
      )
    }
    return result.length
  }, [items, draftFilters])

  const getKey = (item: T, idx: number): string | number => {
    if (typeof rowKey === 'function') return rowKey(item)
    return (item as any)[rowKey] ?? idx
  }

  const isSelected = (key: string | number) => selectedKeys.includes(key)

  const toggleSelectAll = () => {
    if (selectedKeys.length === processedItems.length) {
      onSelectionChange?.([], [])
    } else {
      const allKeys = processedItems.map(getKey)
      onSelectionChange?.(allKeys, processedItems)
    }
  }

  const toggleItemSelect = (key: string | number, item: T) => {
    const nextKeys = isSelected(key)
      ? selectedKeys.filter((k) => k !== key)
      : [...selectedKeys, key]
    const nextItems = processedItems.filter((it, idx) => nextKeys.includes(getKey(it, idx)))
    onSelectionChange?.(nextKeys, nextItems)
  }

  const getItemClassStr = (item: T, idx: number): string => {
    if (typeof itemClass === 'function') return itemClass(item, idx)
    return itemClass
  }

  return (
    <div className={buildClassName('w-full space-y-3', containerClass)} data-testid="data-list">
      {/* Top Search, Filter, Sort Toolbar */}
      {(searchable || (filterFields && filterFields.length > 0) || sortableColumns.length > 0) && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-xl border border-[var(--ui-border)] space-y-3">
          {searchable && (
            <Input
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search items..."
              leftGroup={<SearchIcon />}
              clearable
              onClear={() => handleSearchInput('')}
              className="w-full text-xs"
              size="sm"
            />
          )}

          {((filterFields && filterFields.length > 0) || sortableColumns.length > 0) && (
            <div className="flex items-center gap-2">
              {filterFields && filterFields.length > 0 && (
                <Button
                  theme="secondary"
                  size="sm"
                  onClick={() => {
                    setDraftFilters(selectedFilters)
                    setIsFilterSheetOpen(true)
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold flex-1 justify-center"
                  data-testid="data-list-filter-btn"
                >
                  <FilterIcon />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="ml-1 size-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              )}

              {sortableColumns.length > 0 && (
                <Button
                  theme="secondary"
                  size="sm"
                  onClick={() => setIsSortSheetOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold flex-1 justify-center"
                  data-testid="data-list-sort-btn"
                >
                  <SortIcon />
                  <span>{activeSortLabel}</span>
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Bottom Sheet Filter Drawer */}
      {filterFields && filterFields.length > 0 && (
        <Drawer
          isOpen={isFilterSheetOpen}
          onClose={() => setIsFilterSheetOpen(false)}
          align="bottom"
          title="Filter Items"
          dragHandle
          panelClass="max-h-[85vh] rounded-t-2xl"
          footer={
            <div className="flex items-center gap-3 w-full">
              <Button
                theme="secondary"
                size="md"
                onClick={() => setDraftFilters({})}
                className="flex-1 text-xs"
              >
                Clear All
              </Button>
              <Button
                theme="primary"
                size="md"
                onClick={() => {
                  onFilterChange ? onFilterChange(draftFilters) : setInternalFilters(draftFilters)
                  setIsFilterSheetOpen(false)
                }}
                className="flex-1 text-xs font-semibold"
                data-testid="data-list-apply-filters-btn"
              >
                Apply Filters ({draftMatchingCount})
              </Button>
            </div>
          }
          footerSticky
        >
          <div className="space-y-6 py-2">
            {filterFields.map((field) => {
              const selectedArray = Array.isArray(draftFilters[field.name])
                ? (draftFilters[field.name] as Array<string | number>)
                : draftFilters[field.name] !== undefined && draftFilters[field.name] !== ''
                  ? [draftFilters[field.name] as string | number]
                  : []

              return (
                <div key={field.name} className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1">
                    {field.label}
                  </h4>
                  <div className="space-y-1.5 bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-[var(--ui-border-muted)]">
                    {field.options.map((opt) => {
                      const checked = selectedArray.includes(opt.value)
                      return (
                        <label
                          key={String(opt.value)}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {opt.label}
                          </span>
                          <Checkbox
                            checked={checked}
                            onChange={() => {
                              const next = checked
                                ? selectedArray.filter((v) => v !== opt.value)
                                : [...selectedArray, opt.value]
                              setDraftFilters((prev) => ({
                                ...prev,
                                [field.name]: next,
                              }))
                            }}
                          />
                        </label>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </Drawer>
      )}

      {/* Mobile Bottom Sheet Sort Drawer */}
      {sortableColumns.length > 0 && (
        <Drawer
          isOpen={isSortSheetOpen}
          onClose={() => setIsSortSheetOpen(false)}
          align="bottom"
          title="Sort Items By"
          dragHandle
          panelClass="max-h-[70vh] rounded-t-2xl"
        >
          <div className="space-y-1 py-2">
            {sortOptions.map((opt) => {
              const isSelected =
                (activeSort ? `${activeSort.field}:${activeSort.dir}` : '') === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    handleSortSelect(opt.value)
                    setIsSortSheetOpen(false)
                  }}
                  className={buildClassName(
                    'w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-colors cursor-pointer',
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium',
                  )}
                  data-testid={`data-list-sort-opt-${opt.value || 'default'}`}
                >
                  <span className="text-sm">{opt.label}</span>
                  {isSelected && <CheckIcon />}
                </button>
              )
            })}
          </div>
        </Drawer>
      )}

      {/* Select All Toolbar */}
      {selectable && processedItems.length > 0 && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800/80 rounded-xl border border-[var(--ui-border)] flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            <Checkbox
              checked={processedItems.length > 0 && selectedKeys.length === processedItems.length}
              onChange={toggleSelectAll}
            />
            <span>Select All Items</span>
          </label>
          <span className="text-gray-400 font-semibold">
            {selectedKeys.length} of {processedItems.length}
          </span>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500 bg-white dark:bg-gray-800 rounded-xl border border-[var(--ui-border)]">
            Loading items...
          </div>
        ) : processedItems.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500 bg-white dark:bg-gray-800 rounded-xl border border-[var(--ui-border)]">
            {emptyMessage}
          </div>
        ) : (
          processedItems.map((item, idx) => {
            const key = getKey(item, idx)
            const selected = isSelected(key)
            const actions = swipeableActions?.(item)
            const customClass = getItemClassStr(item, idx)

            const contentNode = renderItem ? (
              renderItem(item, idx)
            ) : (
              <div
                onClick={() => onItemClick?.(item, idx)}
                className={buildClassName(
                  'p-4 bg-white dark:bg-gray-800 rounded-xl border border-[var(--ui-border)] shadow-xs space-y-3 transition-colors',
                  onItemClick && 'cursor-pointer hover:border-blue-500/50',
                  selected && 'ring-2 ring-blue-500/50 bg-blue-50/20 dark:bg-blue-950/20',
                  customClass,
                )}
                data-testid={`data-list-item-${key}`}
              >
                {/* Card Header Row */}
                <div className="flex items-center justify-between gap-3 border-b border-[var(--ui-border-muted)] pb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {selectable ? (
                      <Checkbox
                        checked={selected}
                        onChange={() => toggleItemSelect(key, item)}
                        aria-label={`Select item ${key}`}
                        label={
                          <span className="font-bold text-sm text-gray-900 dark:text-white truncate block">
                            {columns && columns[0]?.render
                              ? columns[0].render(item)
                              : String(get(item, columns?.[0]?.name ?? 'title') ?? '')}
                          </span>
                        }
                      />
                    ) : (
                      <div className="font-bold text-sm text-gray-900 dark:text-white truncate">
                        {columns && columns[0]?.render
                          ? columns[0].render(item)
                          : String(get(item, columns?.[0]?.name ?? 'title') ?? '')}
                      </div>
                    )}
                  </div>
                  {columns && columns[1] && (
                    <div className="shrink-0 text-xs">
                      {columns[1].render
                        ? columns[1].render(item)
                        : String(get(item, columns[1].name) ?? '')}
                    </div>
                  )}
                </div>

                {/* Key-Value Details Grid */}
                {columns && columns.length > 2 && (
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    {columns.slice(2).map((col) => {
                      const val = col.render ? col.render(item) : get(item, col.name)
                      if (val === null || val === undefined || val === '') return null
                      return (
                        <div key={String(col.name)} className="min-w-0">
                          <span className="text-gray-400 dark:text-gray-500 font-medium block truncate">
                            {col.label}
                          </span>
                          <span className="text-gray-800 dark:text-gray-200 font-semibold block truncate mt-0.5">
                            {val}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )

            if (actions && (actions.leftActions?.length || actions.rightActions?.length)) {
              return (
                <SwipeableRow
                  key={key}
                  leftActions={actions.leftActions}
                  rightActions={actions.rightActions}
                >
                  {contentNode}
                </SwipeableRow>
              )
            }

            return <div key={key}>{contentNode}</div>
          })
        )}
      </div>

      {/* Pagination Footer */}
      {pagination && pagination.total > 0 && (
        <div
          className={buildClassName(
            'pt-2 flex justify-center w-full',
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
              onChange={(newPag) => setPagination?.(newPag)}
            />
          )}
        </div>
      )}
    </div>
  )
}

DataList.displayName = 'DataList'
