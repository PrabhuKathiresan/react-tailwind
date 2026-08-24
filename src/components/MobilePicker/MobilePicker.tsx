import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { buildClassName } from '../../utils/build-classname'
import { buildInputClass } from '../Input'
import { Badge } from '../Badge'
import { Button } from '../Button'
import { Label } from '../Label'
import { Loader } from '../Loader'
import { TextContent } from '../TextContent'
import { useDebounce } from '../../hooks/use-debounce'
import CheckIcon from '../Icons/Check.svg'
import ChevronDownIcon from '../Icons/ChevronDown.svg'
import CirclePlusIcon from '../Icons/CirclePlus.svg'
import SearchIcon from '../Icons/Search.svg'
import XIcon from '../Icons/X.svg'
import type { BaseOption, SelectBoxSize } from '../SelectBox/SelectBox.types'
import type { MobilePickerProps } from './MobilePicker.types'

const sizeConfigMap: Record<
  SelectBoxSize,
  {
    input: string
    icon: string
    badgeSize: 'sm' | 'md'
    group: string
  }
> = {
  sm: {
    input: 'h-8 text-xs px-2.5',
    icon: 'size-3.5',
    badgeSize: 'sm',
    group: 'w-8',
  },
  md: {
    input: 'h-10 text-sm px-3',
    icon: 'size-4',
    badgeSize: 'md',
    group: 'w-10',
  },
  lg: {
    input: 'h-12 text-base px-3.5',
    icon: 'size-5',
    badgeSize: 'md',
    group: 'w-12',
  },
}

export function MobilePicker<T extends BaseOption | string = BaseOption>(
  props: MobilePickerProps<T>,
) {
  const {
    options = [],
    groups,
    selected = null,
    onChange = () => {},
    size = 'md',
    labelKey = 'label',
    valueKey = 'value',
    id,
    name,
    label,
    labelWrapperClass,
    labelClass,
    labelHint,
    title,
    description,
    placeholder = 'Choose an option...',
    disabled = false,
    multiple = false,
    maxSelection,
    showSelectAll = false,
    confirmText = 'Apply Selection',
    searchable = true,
    searchPlaceholder = 'Search options...',
    async = false,
    onSearch,
    loading = false,
    typeToSearchText = 'Type to search options...',
    filterOption,
    quickOptions,
    quickOptionsTitle = 'Quick Picks',
    allowClear = false,
    allowFreeText = false,
    allowAdd = false,
    addNewText = 'Create',
    onAdd = () => {},
    leftGroup,
    error,
    showErrorMessage = true,
    helperText,
    noOptionsText = 'No options available',
    renderOption,
    containerClass,
    sheetClass,
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)
  const [optionsLoading, setOptionsLoading] = useState(false)
  const [draftSelected, setDraftSelected] = useState<T | T[] | null>(selected)
  const [viewportHeight, setViewportHeight] = useState<number | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setViewportHeight(null)
      return
    }

    const updateHeight = () => {
      if (typeof window !== 'undefined' && window.visualViewport) {
        setViewportHeight(window.visualViewport.height)
      }
    }

    updateHeight()
    const vv = typeof window !== 'undefined' ? window.visualViewport : null
    vv?.addEventListener('resize', updateHeight)
    vv?.addEventListener('scroll', updateHeight)

    return () => {
      vv?.removeEventListener('resize', updateHeight)
      vv?.removeEventListener('scroll', updateHeight)
    }
  }, [isOpen])

  const currentSize = sizeConfigMap[size] || sizeConfigMap.md
  const hasError = Boolean(error)
  const isAsyncLoading = loading || optionsLoading

  const baseInputClass = useMemo(
    () => buildInputClass('', { disabled, hasError, size }),
    [disabled, hasError, size],
  )

  const onSearchRef = useRef(onSearch)
  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  const handleAsyncSearch = useCallback(async (searchString: string) => {
    try {
      setOptionsLoading(true)
      await onSearchRef.current?.(searchString)
    } catch (err) {
      console.error('Error loading options:', err)
    } finally {
      setOptionsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen && async) {
      handleAsyncSearch(debouncedQuery)
    }
  }, [isOpen, async, debouncedQuery, handleAsyncSearch])

  const getDisplayValue = useCallback(
    (opt: T) => {
      if (typeof opt === 'string') return opt
      return opt?.[labelKey] ?? opt?.[valueKey] ?? String(opt)
    },
    [labelKey, valueKey],
  )

  const getValue = useCallback(
    (opt: T) => {
      if (typeof opt === 'string') return opt
      return opt?.[valueKey] ?? opt?.[labelKey] ?? String(opt)
    },
    [valueKey, labelKey],
  )

  const normalizedSelected = useMemo(() => {
    if (multiple) {
      if (Array.isArray(selected)) return selected
      if (selected !== null && selected !== undefined) return [selected as T]
      return [] as T[]
    } else {
      if (Array.isArray(selected)) return selected.length > 0 ? selected[0] : null
      return selected ?? null
    }
  }, [multiple, selected])

  const normalizedDraft = useMemo(() => {
    if (multiple) {
      if (Array.isArray(draftSelected)) return draftSelected
      if (draftSelected !== null && draftSelected !== undefined) return [draftSelected as T]
      return [] as T[]
    } else {
      if (Array.isArray(draftSelected)) return draftSelected.length > 0 ? draftSelected[0] : null
      return draftSelected ?? null
    }
  }, [multiple, draftSelected])

  const rawAllOptions = useMemo(() => {
    if (groups?.length) {
      return groups.flatMap((g) => g.options)
    }
    return options ?? []
  }, [groups, options])

  const allOptions = useMemo(() => {
    const list = [...rawAllOptions]
    const selectedList = Array.isArray(normalizedDraft)
      ? normalizedDraft
      : normalizedDraft
        ? [normalizedDraft as T]
        : []

    for (const sel of selectedList) {
      if (sel !== null && sel !== undefined) {
        const selVal = getValue(sel)
        const exists = list.some((item) => getValue(item) === selVal)
        if (!exists) {
          list.unshift(sel)
        }
      }
    }
    return list
  }, [rawAllOptions, normalizedDraft, getValue])

  useEffect(() => {
    if (isOpen) {
      setDraftSelected(normalizedSelected)
      setQuery('')
    }
  }, [isOpen, normalizedSelected])

  const defaultFilter = useCallback(
    (opt: T, q: string) => {
      if (!q.trim()) return true
      const searchTarget = getDisplayValue(opt)?.toLowerCase() || ''
      return searchTarget.includes(q.trim().toLowerCase())
    },
    [getDisplayValue],
  )

  const activeFilter = filterOption || defaultFilter

  const filteredOptions = useMemo(() => {
    if (async) return allOptions
    if (!query.trim()) return allOptions
    return allOptions.filter((opt) => activeFilter(opt, query))
  }, [allOptions, query, async, activeFilter])

  const filteredGroups = useMemo(() => {
    if (!groups?.length) return null
    if (async) return groups
    if (!query.trim()) return groups

    return groups
      .map((g) => ({
        ...g,
        options: g.options.filter((opt) => activeFilter(opt, query)),
      }))
      .filter((g) => g.options.length > 0)
  }, [groups, query, async, activeFilter])

  const createFreeTextOption = useCallback(
    (text: string): T => {
      const sample = allOptions[0] || (Array.isArray(selected) ? selected[0] : selected)
      if (
        typeof sample === 'string' ||
        (!sample && typeof labelKey === 'string' && labelKey === 'label')
      ) {
        return text as unknown as T
      }
      return {
        [labelKey]: text,
        [valueKey]: text,
      } as unknown as T
    },
    [allOptions, selected, labelKey, valueKey],
  )

  const handleToggleOption = (option: T) => {
    const optVal = getValue(option)
    if (multiple) {
      const current = Array.isArray(normalizedDraft) ? [...normalizedDraft] : []
      const index = current.findIndex((item) => getValue(item) === optVal)
      if (index > -1) {
        current.splice(index, 1)
        setDraftSelected(current as T[])
      } else {
        if (maxSelection && current.length >= maxSelection) return
        current.push(option)
        setDraftSelected(current as T[])
      }
    } else {
      setDraftSelected(option)
      onChange(option)
      setIsOpen(false)
    }
  }

  const handleCommitFreeText = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const existing = allOptions.find(
      (opt) => getDisplayValue(opt).toLowerCase() === trimmed.toLowerCase(),
    )
    const optionToCommit = existing || createFreeTextOption(trimmed)

    if (multiple) {
      const current = Array.isArray(normalizedDraft) ? [...normalizedDraft] : []
      const already = current.some(
        (item) => getDisplayValue(item).toLowerCase() === trimmed.toLowerCase(),
      )
      if (!already) {
        if (maxSelection && current.length >= maxSelection) return
        current.push(optionToCommit)
        setDraftSelected(current as T[])
      }
      setQuery('')
    } else {
      setDraftSelected(optionToCommit)
      onChange(optionToCommit)
      setIsOpen(false)
    }
  }

  const handleAddAndSelect = async (valueToAdd: string) => {
    try {
      const result = await onAdd(valueToAdd)
      const optionToCommit = (result || valueToAdd) as unknown as T
      if (multiple) {
        const current = Array.isArray(normalizedDraft) ? [...normalizedDraft] : []
        current.push(optionToCommit)
        setDraftSelected(current as T[])
        setQuery('')
      } else {
        setDraftSelected(optionToCommit)
        onChange(optionToCommit)
        setIsOpen(false)
      }
    } catch (err) {
      console.error('MobilePicker onAdd error:', err)
    }
  }

  const isAllSelected = useMemo(() => {
    if (!multiple || !Array.isArray(normalizedDraft) || !allOptions.length) return false
    return allOptions.length === normalizedDraft.length
  }, [multiple, normalizedDraft, allOptions])

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setDraftSelected([] as T[])
    } else {
      setDraftSelected(allOptions as T[])
    }
  }

  const handleConfirmMultiSelect = () => {
    onChange(normalizedDraft)
    setIsOpen(false)
  }

  const handleClearSingleSelect = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDraftSelected(multiple ? ([] as T[]) : null)
    onChange(multiple ? ([] as T[]) : null)
  }

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (disabled) return
    const isClearClick = (e.target as HTMLElement).closest(
      '[data-testid="mobile-picker-clear-button"]',
    )
    if (isClearClick) return
    setIsOpen(true)
  }

  const isOptionSelected = (option: T) => {
    const optVal = getValue(option)
    if (multiple) {
      return (
        Array.isArray(normalizedDraft) && normalizedDraft.some((item) => getValue(item) === optVal)
      )
    } else {
      return Boolean(normalizedDraft && getValue(normalizedDraft as T) === optVal)
    }
  }

  const shouldShowTypeToSearch = async && !query && !isAsyncLoading && allOptions.length === 0
  const hasLeftGroup = leftGroup != null && leftGroup !== undefined

  return (
    <div className={buildClassName('group space-y-2 w-full', containerClass)}>
      {label && (
        <div className={buildClassName('flex items-center justify-between', labelWrapperClass)}>
          <Label className={labelClass} htmlFor={id}>
            {label}
          </Label>
          {labelHint && <TextContent xsmall>{labelHint}</TextContent>}
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        onClick={handleTriggerClick}
        className={buildClassName(
          baseInputClass,
          'w-full flex items-center justify-between gap-2 cursor-pointer relative text-left',
          hasLeftGroup ? (size === 'lg' ? 'ps-12' : size === 'sm' ? 'ps-8' : 'ps-10') : '',
        )}
        data-testid="mobile-picker-trigger"
      >
        {hasLeftGroup && (
          <span
            className={buildClassName(
              'absolute left-0 top-0 h-full flex items-center justify-center text-gray-400 dark:text-gray-500',
              currentSize.group,
            )}
          >
            {leftGroup}
          </span>
        )}

        <div className="flex-1 flex flex-wrap items-center gap-1.5 min-w-0 overflow-hidden">
          {multiple ? (
            Array.isArray(normalizedSelected) && normalizedSelected.length > 0 ? (
              normalizedSelected.map((item, idx) => (
                <Badge
                  key={`${getValue(item)}-${idx}`}
                  theme="secondary"
                  size={currentSize.badgeSize}
                >
                  {getDisplayValue(item)}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
            )
          ) : normalizedSelected ? (
            <span className="text-gray-900 dark:text-white font-normal truncate">
              {getDisplayValue(normalizedSelected as T)}
            </span>
          ) : (
            <span className="text-gray-400 dark:text-gray-500">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {allowClear && !multiple && normalizedSelected && (
            <span
              role="button"
              aria-label="Clear selection"
              tabIndex={0}
              onClick={handleClearSingleSelect}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full cursor-pointer z-10"
              data-testid="mobile-picker-clear-button"
            >
              <XIcon className="size-3.5 stroke-gray-500 dark:stroke-gray-400" />
            </span>
          )}

          <ChevronDownIcon
            className={buildClassName(currentSize.icon, 'stroke-gray-500 shrink-0')}
          />
        </div>
      </button>

      {showErrorMessage && error && (
        <div className="mt-1">
          <TextContent error small>
            {error}
          </TextContent>
        </div>
      )}

      {!error && helperText && (
        <div className="mt-1">
          <TextContent muted small>
            {helperText}
          </TextContent>
        </div>
      )}

      {/* Mobile Bottom Sheet Drawer */}
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => setIsOpen(false)}
        transition
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-200" />

        <div
          className="fixed left-0 top-0 w-full flex items-end justify-center pointer-events-none z-50"
          style={{
            height: viewportHeight ? `${viewportHeight}px` : '100dvh',
          }}
        >
          <DialogPanel
            transition
            className={buildClassName(
              'w-full max-w-full md:max-w-lg bg-white dark:bg-gray-900 shadow-2xl rounded-t-3xl max-h-[85vh] max-h-[85dvh] flex flex-col pointer-events-auto overscroll-contain touch-pan-y',
              'duration-200 ease-out data-[closed]:translate-y-full data-[closed]:opacity-0',
              sheetClass,
            )}
            style={{
              maxHeight: viewportHeight ? `${Math.floor(viewportHeight * 0.9)}px` : undefined,
            }}
            data-testid="mobile-picker-sheet"
          >
            {/* Top drag handle indicator */}
            <div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mx-auto my-2.5 shrink-0" />

            {/* Sheet Header */}
            <div className="px-4 pb-3 border-b border-[var(--ui-border-muted)] flex items-center justify-between gap-3 shrink-0">
              <div className="min-w-0 flex-1">
                <DialogTitle
                  as="h3"
                  className="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate"
                >
                  {title || label || 'Select Option'}
                </DialogTitle>
                {description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                    {description}
                  </p>
                )}
              </div>

              <Button
                iconOnly
                aria-label="Close picker"
                variant="plain"
                theme="secondary"
                size="xs"
                onClick={() => setIsOpen(false)}
                className="rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0"
              >
                <XIcon className="size-4" />
              </Button>
            </div>

            {/* Optional Search Bar */}
            {searchable && (
              <div className="p-3 border-b border-[var(--ui-border-muted)] bg-gray-50 dark:bg-gray-800/50 shrink-0">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (allowFreeText && e.key === 'Enter' && query.trim()) {
                        e.preventDefault()
                        handleCommitFreeText(query)
                      }
                    }}
                    placeholder={searchPlaceholder}
                    className="w-full pl-9 pr-10 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-testid="mobile-picker-search-input"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {isAsyncLoading ? (
                      <Loader size="xs" />
                    ) : (
                      query && (
                        <button
                          type="button"
                          onClick={() => setQuery('')}
                          className="p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                          <XIcon className="size-3.5" />
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Choice Chips Row */}
            {quickOptions && quickOptions.length > 0 && (
              <div className="px-3 py-2 bg-gray-50/60 dark:bg-gray-800/40 border-b border-[var(--ui-border-muted)] shrink-0">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 px-1">
                  {quickOptionsTitle}
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  {quickOptions.map((chip, cIdx) => {
                    const isSelected = isOptionSelected(chip)
                    return (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => handleToggleOption(chip)}
                        className={buildClassName(
                          'px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer border',
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700',
                        )}
                      >
                        {getDisplayValue(chip)}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Multi-Select Select All Toolbar */}
            {multiple && showSelectAll && allOptions.length > 0 && (
              <div className="px-4 py-2 bg-gray-50/80 dark:bg-gray-800/80 border-b border-[var(--ui-border-muted)] flex items-center justify-between text-xs shrink-0">
                <button
                  type="button"
                  onClick={handleToggleSelectAll}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {isAllSelected ? 'Deselect All' : 'Select All'}
                </button>
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  {Array.isArray(normalizedDraft) ? normalizedDraft.length : 0} of{' '}
                  {allOptions.length}
                </span>
              </div>
            )}

            {/* Sheet Scrollable Option List */}
            <div
              onScroll={(e) => {
                const el = e.currentTarget
                if (el.scrollTop === 0) {
                  el.scrollTop = 1
                } else if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
                  el.scrollTop = el.scrollHeight - el.clientHeight - 1
                }
              }}
              className="flex-1 overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] p-2 space-y-1 divide-y divide-gray-100 dark:divide-gray-800/60"
            >
              {/* Free-Text Action Item */}
              {allowFreeText &&
                query.trim() &&
                !allOptions.some(
                  (opt) => getDisplayValue(opt).toLowerCase() === query.trim().toLowerCase(),
                ) && (
                  <button
                    type="button"
                    onClick={() => handleCommitFreeText(query)}
                    className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-100/80 cursor-pointer"
                    data-testid="mobile-picker-freetext-item"
                  >
                    <span className="text-sm font-medium">Use "{query.trim()}"</span>
                    <ChevronDownIcon className="size-4 rotate-[-90deg]" />
                  </button>
                )}

              {/* Loading State Body */}
              {isAsyncLoading && allOptions.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 select-none">
                  <Loader size="md" />
                  <span>Loading options...</span>
                </div>
              ) : shouldShowTypeToSearch ? (
                <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400 select-none">
                  {typeToSearchText}
                </div>
              ) : filteredGroups ? (
                filteredGroups.map((grp, gIdx) => (
                  <div key={gIdx} className="pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 py-1.5 select-none">
                      {grp.group}
                    </div>
                    <div className="space-y-1">
                      {grp.options.map((option) => {
                        const optVal = getValue(option)
                        const isSelected = isOptionSelected(option)
                        const optDisabled = (option as BaseOption).disabled
                        const optDesc =
                          typeof option === 'object'
                            ? option?.description || option?.subtitle
                            : null

                        return (
                          <div
                            key={optVal}
                            onClick={() => !optDisabled && handleToggleOption(option)}
                            className={buildClassName(
                              'w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors cursor-pointer select-none',
                              isSelected
                                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                                : 'text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/70',
                              optDisabled && 'opacity-50 pointer-events-none',
                            )}
                          >
                            <div className="flex-1 min-w-0 pr-3">
                              <div className="text-sm/6 truncate">
                                {renderOption
                                  ? renderOption(option, isSelected)
                                  : getDisplayValue(option)}
                              </div>
                              {optDesc && (
                                <div className="text-xs text-gray-400 font-normal truncate mt-0.5">
                                  {optDesc}
                                </div>
                              )}
                            </div>
                            {isSelected && (
                              <CheckIcon className="size-5 stroke-blue-600 dark:stroke-blue-400 shrink-0" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              ) : filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const optVal = getValue(option)
                  const isSelected = isOptionSelected(option)
                  const optDisabled = (option as BaseOption).disabled
                  const optDesc =
                    typeof option === 'object' ? option?.description || option?.subtitle : null

                  return (
                    <div
                      key={optVal}
                      onClick={() => !optDisabled && handleToggleOption(option)}
                      className={buildClassName(
                        'w-full flex items-center justify-between p-3.5 rounded-2xl transition-colors cursor-pointer select-none',
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/70',
                        optDisabled && 'opacity-50 pointer-events-none',
                      )}
                    >
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="text-sm/6 truncate">
                          {renderOption
                            ? renderOption(option, isSelected)
                            : getDisplayValue(option)}
                        </div>
                        {optDesc && (
                          <div className="text-xs text-gray-400 font-normal truncate mt-0.5">
                            {optDesc}
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <CheckIcon className="size-5 stroke-blue-600 dark:stroke-blue-400 shrink-0" />
                      )}
                    </div>
                  )
                })
              ) : (
                !allowFreeText &&
                !(allowAdd && query.trim()) && (
                  <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 select-none">
                    {query
                      ? noOptionsText !== 'No options available'
                        ? noOptionsText
                        : `No results found for "${query}"`
                      : noOptionsText}
                  </div>
                )
              )}

              {/* Creatable option card */}
              {!allowFreeText && allowAdd && Boolean(query.trim()) && (
                <button
                  type="button"
                  onClick={() => handleAddAndSelect(query.trim())}
                  className="w-full flex items-center gap-2.5 p-3.5 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <CirclePlusIcon className="size-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium">
                    {addNewText} "{query.trim()}"
                  </span>
                </button>
              )}
            </div>

            {/* Sticky Footer for Multi-Select Confirmation */}
            {multiple && (
              <div className="p-4 border-t border-[var(--ui-border-muted)] bg-white dark:bg-gray-900 shrink-0">
                <Button
                  fullWidth
                  theme="primary"
                  size="md"
                  onClick={handleConfirmMultiSelect}
                  data-testid="mobile-picker-confirm-button"
                >
                  {confirmText}{' '}
                  {Array.isArray(normalizedDraft) && normalizedDraft.length > 0
                    ? `(${normalizedDraft.length})`
                    : ''}
                </Button>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

MobilePicker.displayName = 'MobilePicker'
