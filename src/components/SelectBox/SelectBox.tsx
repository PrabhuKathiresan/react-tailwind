import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'

import { Label } from '../Label'
import { Badge } from '../Badge'
import { Loader } from '../Loader'
import { TextContent } from '../TextContent'
import { Button } from '../Button'
import { MobilePicker } from '../MobilePicker'

import { isArray } from '../../utils/is-array'
import { buildClassName } from '../../utils/build-classname'
import { isEmpty } from '../../utils/is-empty'
import { useDebounce } from '../../hooks/use-debounce'

import CheckIcon from '../Icons/Check.svg'
import ChevronDownIcon from '../Icons/ChevronDown.svg'
import XIcon from '../Icons/X.svg'
import CirclePlusIcon from '../Icons/CirclePlus.svg'
import type { BaseOption, SelectBoxProps, SelectBoxSize } from './SelectBox.types'
import { buildInputClass } from '../Input'
import { BodyText } from '../BodyText'

const sizeClasses: Record<
  SelectBoxSize,
  { input: string; group: string; icon: string; badgeSize: 'sm' | 'md' }
> = {
  sm: {
    input: 'px-2.5 py-1.5 text-xs leading-5 min-h-[32px]',
    group: 'w-8 text-xs',
    icon: 'size-3.5',
    badgeSize: 'sm',
  },
  md: {
    input: 'px-3.5 py-2 text-sm leading-6 min-h-[38px]',
    group: 'w-10 text-sm',
    icon: 'size-4',
    badgeSize: 'md',
  },
  lg: {
    input: 'px-4 py-2.5 text-base leading-7 min-h-[46px]',
    group: 'w-12 text-base',
    icon: 'size-5',
    badgeSize: 'md',
  },
}

export const SelectBox = forwardRef(
  <T extends BaseOption | string = BaseOption>(
    props: SelectBoxProps<T>,
    forwardedRef: React.Ref<HTMLInputElement | HTMLDivElement | null>,
  ) => {
    const {
      labelKey = 'label',
      valueKey = 'value',
      name,
      id = name,
      options = [],
      groups,
      selected,
      size = 'md',
      label = null,
      labelWrapperClass = '',
      labelClass = '',
      labelHint = null,
      disabled = false,
      containerClass = '',
      onChange = () => {},
      placeholder,
      dropdownContainerClass = 'z-20',
      multiple = false,
      maxSelection,
      showSelectAll = false,
      immediate = true,
      showErrorMessage = true,
      error = null,
      helperText,
      leftGroup,
      renderOption,
      async = false,
      searchable = true,
      required = false,
      allowAdd = false,
      addNewText = 'Create',
      onAdd = () => {},
      allowClear = false,
      allowFreeText = false,
      modalDropdown = false,
      noOptionsText = 'No options available',
    } = props

    if (props.asBottomSheet || props.mobileMode === 'sheet') {
      return <MobilePicker {...(props as any)} />
    }

    const hasError = Boolean(error)
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 500)
    const [optionsLoading, setOptionsLoading] = useState(false)

    // Normalize options from options prop or groups prop
    const allOptions = useMemo(() => {
      if (groups?.length) {
        return groups.flatMap((g) => g.options)
      }
      return options
    }, [groups, options])

    const shouldShowTypeToSearch = async && !query && !optionsLoading && allOptions.length === 0
    const currentSize = sizeClasses[size] || sizeClasses.md

    const baseInputClass = useMemo(
      () => buildInputClass('', { disabled, hasError, size }),
      [disabled, hasError, size],
    )

    const chevronIconClass = buildClassName(
      currentSize.icon,
      'stroke-gray-500 group-data-[hover]:stroke-gray-800',
      'dark:stroke-gray-300 dark:group-data-[hover]:stroke-gray-100',
      disabled && 'dark:stroke-gray-600 stroke-gray-400',
    )

    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(forwardedRef, () => inputRef.current!, [inputRef])

    const filteredOptions = useMemo(() => {
      if (query === '' || async) return allOptions
      return allOptions.filter((opt) => {
        const lbl = typeof opt === 'string' ? opt : (opt as BaseOption)[labelKey]
        return lbl?.toLowerCase().includes(query.toLowerCase())
      })
    }, [allOptions, query, async, labelKey])

    const filteredGroups = useMemo(() => {
      if (!groups?.length) return null
      if (query === '' || async) return groups

      return groups
        .map((g) => ({
          ...g,
          options: g.options.filter((opt) => {
            const lbl = typeof opt === 'string' ? opt : (opt as BaseOption)[labelKey]
            return lbl?.toLowerCase().includes(query.toLowerCase())
          }),
        }))
        .filter((g) => g.options.length > 0)
    }, [groups, query, async, labelKey])

    const getDisplayValue = useCallback(
      (opt: T) => {
        return typeof opt === 'string' ? opt : opt[labelKey]
      },
      [labelKey],
    )

    const getValue = useCallback(
      (opt: T) => {
        return typeof opt === 'string' ? opt : opt[valueKey]
      },
      [valueKey],
    )

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

    const handleFreeTextCommit = useCallback(
      (queryText: string) => {
        const trimmed = queryText.trim()
        if (!trimmed) return

        const existing = allOptions.find((opt) => {
          const display = getDisplayValue(opt)
          return display?.toLowerCase() === trimmed.toLowerCase()
        })

        const valueToCommit = existing || createFreeTextOption(trimmed)

        if (multiple) {
          const current = isArray(selected) ? selected : []
          const alreadySelected = current.some(
            (item) => getDisplayValue(item)?.toLowerCase() === trimmed.toLowerCase(),
          )
          if (!alreadySelected) {
            if (maxSelection && current.length >= maxSelection) return
            onChange([...current, valueToCommit] as unknown as T[])
          }
          setQuery('')
        } else {
          onChange(valueToCommit)
          setQuery('')
        }
      },
      [
        allOptions,
        getDisplayValue,
        createFreeTextOption,
        multiple,
        selected,
        maxSelection,
        onChange,
      ],
    )

    const removeSelection = (idx: number) => {
      if (!isArray(selected)) return
      const next = [...selected]
      next.splice(idx, 1)
      onChange(next)
      inputRef.current?.focus()
    }

    const handleOnChangeInternal = useCallback(
      (value: T | T[] | null) => {
        if (value === null) {
          onChange(multiple ? ([] as T[]) : null)
          setQuery('')
          return
        }

        if (multiple && Array.isArray(value) && maxSelection && value.length > maxSelection) {
          return
        }

        onChange(value as T | T[])
        setQuery('')
      },
      [onChange, multiple, maxSelection],
    )

    const comboboxOnChangeWrapper = useCallback(
      (raw: unknown) => {
        if (raw === null || raw === undefined) {
          handleOnChangeInternal(null)
          return
        }

        if (Array.isArray(raw)) {
          const allNulls = raw.length > 0 && raw.every((v) => v === null)
          if (allNulls) {
            handleOnChangeInternal([] as unknown as T[])
            return
          }
          handleOnChangeInternal(raw as unknown as T[])
          return
        }

        handleOnChangeInternal(raw as unknown as T)
      },
      [handleOnChangeInternal],
    )

    const handleAddAndSelect = useCallback(
      async (valueToAdd: string) => {
        try {
          const result = await onAdd(valueToAdd)
          if (result) {
            handleOnChangeInternal(result as unknown as T)
          } else {
            handleOnChangeInternal(valueToAdd as unknown as T)
          }
        } catch (err) {
          console.error('onAdd handler error', err)
        }
      },
      [onAdd, handleOnChangeInternal],
    )

    const onSearchRef = useRef(props.onSearch)
    useEffect(() => {
      onSearchRef.current = props.onSearch
    }, [props.onSearch])

    const handleSearch = useCallback(async (searchString: string) => {
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
      if (async && debouncedQuery) handleSearch(debouncedQuery)
    }, [debouncedQuery, async, handleSearch])

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

    const isAllSelected = useMemo(() => {
      if (!multiple || !Array.isArray(normalizedSelected) || !allOptions.length) return false
      return allOptions.length === normalizedSelected.length
    }, [multiple, normalizedSelected, allOptions])

    const handleToggleSelectAll = () => {
      if (isAllSelected) {
        onChange([] as unknown as T[])
      } else {
        onChange(allOptions as unknown as T[])
      }
    }

    const hasLeftGroup = leftGroup != null && leftGroup !== undefined

    const hasFreeTextOption = Boolean(
      allowFreeText &&
        query.trim() &&
        !allOptions.some(
          (opt) => getDisplayValue(opt)?.toLowerCase() === query.trim().toLowerCase(),
        ),
    )

    const hasAddOption = Boolean(!allowFreeText && allowAdd && query.trim())
    const hasGroupOptions = Boolean(filteredGroups && filteredGroups.length > 0)
    const hasFlatOptions = filteredOptions.length > 0

    const hasAnyOptionsToDisplay =
      hasFlatOptions || hasGroupOptions || hasFreeTextOption || hasAddOption

    return (
      <div
        className={buildClassName('group space-y-2', hasError && 'has-error', containerClass)}
        ref={containerRef}
      >
        {label && (
          <div className={buildClassName('flex items-center justify-between', labelWrapperClass)}>
            <Label className={labelClass} htmlFor={id} aria-required={required}>
              {label}
            </Label>
            {labelHint && <TextContent xsmall>{labelHint}</TextContent>}
          </div>
        )}

        <Combobox
          multiple={multiple}
          immediate={immediate}
          name={name}
          value={normalizedSelected as any}
          onChange={comboboxOnChangeWrapper as any}
          onClose={() => setQuery('')}
          disabled={disabled}
          by={(a: any, b: any) => (a && b ? getValue(a) === getValue(b) : a === b)}
        >
          {multiple ? (
            <div
              className={buildClassName(
                baseInputClass,
                'flex flex-wrap gap-2 peer relative',
                hasLeftGroup ? (size === 'lg' ? 'ps-12' : size === 'sm' ? 'ps-8' : 'ps-10') : '',
              )}
              ref={forwardedRef as any}
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

              {isArray(normalizedSelected) &&
                normalizedSelected?.length > 0 &&
                normalizedSelected.map((option, idx) => (
                  <Badge
                    key={`${getValue(option)}-${idx}`}
                    theme="secondary"
                    size={currentSize.badgeSize}
                    removable={!disabled}
                    onRemove={() => removeSelection(idx)}
                  >
                    {getDisplayValue(option)}
                  </Badge>
                ))}

              <ComboboxInput
                className="outline-none flex-1 dark:placeholder-gray-400 placeholder-gray-400 bg-transparent"
                aria-label={name}
                value={query}
                autoComplete="off"
                placeholder={normalizedSelected?.length ? '' : placeholder}
                onChange={(e) => {
                  const val = e.target.value
                  if (allowFreeText && multiple && val.includes(',')) {
                    const parts = val.split(',')
                    parts.forEach((p) => {
                      if (p.trim()) handleFreeTextCommit(p.trim())
                    })
                    setQuery('')
                  } else {
                    setQuery(val)
                  }
                }}
                id={id}
                ref={inputRef}
                onKeyDown={(e) => {
                  if (allowFreeText && (e.key === 'Enter' || e.key === ',') && query.trim()) {
                    e.preventDefault()
                    handleFreeTextCommit(query.replace(/,/g, ''))
                  } else if (multiple && e.key === 'Backspace' && !query) {
                    if (Array.isArray(normalizedSelected) && normalizedSelected.length > 0) {
                      removeSelection(normalizedSelected.length - 1)
                    }
                  }
                }}
                onBlur={() => {
                  if (allowFreeText && query.trim()) {
                    handleFreeTextCommit(query.replace(/,/g, ''))
                  }
                }}
                data-testid="combobox-input"
              />

              <ComboboxButton
                className="group absolute inset-y-0 right-0 px-2.5 flex items-center justify-center"
                data-testid="combobox-button"
              >
                <ChevronDownIcon className={chevronIconClass} />
              </ComboboxButton>
            </div>
          ) : (
            <div className="relative" ref={forwardedRef as any}>
              {hasLeftGroup && (
                <span
                  className={buildClassName(
                    'absolute left-0 top-0 h-full flex items-center justify-center text-gray-400 dark:text-gray-500 z-10',
                    currentSize.group,
                  )}
                >
                  {leftGroup}
                </span>
              )}

              <ComboboxInput
                aria-label={name}
                displayValue={(option: any) => (option ? getDisplayValue(option) : null)}
                autoComplete="off"
                placeholder={placeholder}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(e) => {
                  if (allowFreeText && e.key === 'Enter' && query.trim()) {
                    e.preventDefault()
                    handleFreeTextCommit(query)
                  }
                }}
                onBlur={() => {
                  if (allowFreeText && query.trim()) {
                    handleFreeTextCommit(query)
                  }
                }}
                onFocus={() => {
                  setQuery('')
                }}
                className={buildClassName(
                  baseInputClass,
                  hasLeftGroup ? (size === 'lg' ? 'ps-12' : size === 'sm' ? 'ps-8' : 'ps-10') : '',
                )}
                disabled={disabled}
                id={id}
                readOnly={!searchable}
                ref={inputRef}
                data-testid="combobox-input"
              />

              {allowClear && !isEmpty(normalizedSelected) && (
                <Button
                  size="xs"
                  iconOnly
                  aria-label="Clear selection"
                  theme="secondary"
                  variant="plain"
                  className="group absolute inset-y-0 right-8 h-6 top-2"
                  onClick={() => handleOnChangeInternal(multiple ? ([] as T[]) : null)}
                  disabled={disabled}
                  data-testid="combobox-clear-button"
                  noOutlineOnFocus
                >
                  <XIcon className="size-4 stroke-gray-500 dark:stroke-gray-300" />
                </Button>
              )}

              <ComboboxButton
                className="group absolute inset-y-0 right-0 px-2.5 flex items-center justify-center"
                data-testid="combobox-button"
              >
                <ChevronDownIcon className={chevronIconClass} />
              </ComboboxButton>
            </div>
          )}

          <ComboboxOptions
            anchor={{ to: 'bottom', gap: 5 }}
            as="div"
            modal={modalDropdown}
            className={buildClassName(
              'w-[var(--input-width)] rounded-lg border border-[var(--ui-border)] bg-white dark:bg-gray-800 p-1 shadow-lg max-h-80 overflow-y-auto z-50 [--anchor-gap:var(--spacing-1)]',
              '[--anchor-max-height:20rem]',
              'origin-top border transition duration-200 ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] data-[closed]:translate-y-[-15%] data-[closed]:opacity-0',
              dropdownContainerClass,
            )}
            transition
            data-testid="combobox-options"
          >
            {/* Multi-Select "Select All" Action Bar */}
            {multiple && showSelectAll && allOptions.length > 0 && (
              <div className="pb-1 mb-1 border-b border-[var(--ui-border-muted)] px-3 pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleToggleSelectAll}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {isAllSelected ? 'Deselect All' : 'Select All'}
                </button>
                <span className="text-[11px] font-medium text-gray-400">
                  {Array.isArray(normalizedSelected) ? normalizedSelected.length : 0} of{' '}
                  {allOptions.length}
                </span>
              </div>
            )}

            {optionsLoading ? (
              <BodyText
                data-testid="options-loading"
                className="flex items-center justify-center py-2 px-3 select-none"
              >
                <Loader size="sm" />
              </BodyText>
            ) : shouldShowTypeToSearch ? (
              <BodyText className="flex items-center justify-between py-2 px-3 select-none">
                Type to search...
              </BodyText>
            ) : (
              <div>
                {/* Render Free-Text Option if query does not match an option exactly */}
                {allowFreeText &&
                  query.trim() &&
                  !allOptions.some(
                    (opt) => getDisplayValue(opt)?.toLowerCase() === query.trim().toLowerCase(),
                  ) && (
                    <ComboboxOption
                      key={`freetext-${query.trim()}`}
                      value={createFreeTextOption(query.trim()) as any}
                      className="group flex items-center gap-2 rounded-lg py-1.5 px-3 select-none text-sm data-[focus]:bg-blue-50 dark:data-[focus]:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium cursor-pointer w-full"
                      data-testid="freetext-option"
                    >
                      <span>Use "{query.trim()}"</span>
                    </ComboboxOption>
                  )}

                {/* Render Grouped Options */}
                {filteredGroups
                  ? filteredGroups.map((grp, gIdx) => (
                      <div key={gIdx}>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 py-1 select-none">
                          {grp.group}
                        </div>
                        {grp.options.map((option) => {
                          const optVal = getValue(option)
                          const isOptSelected = multiple
                            ? isArray(normalizedSelected) &&
                              normalizedSelected.some((s) => getValue(s) === optVal)
                            : normalizedSelected && getValue(normalizedSelected as T) === optVal

                          return (
                            <ComboboxOption
                              key={optVal}
                              disabled={(option as BaseOption).disabled}
                              value={option}
                              className="group rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/10 data-disabled:opacity-50 cursor-pointer data-disabled:pointer-events-none"
                            >
                              {renderOption ? (
                                renderOption(option, Boolean(isOptSelected))
                              ) : (
                                <div className="flex items-center justify-between gap-2 text-gray-900 dark:text-white group-data-[selected]:text-blue-600">
                                  <span className="text-sm/6">{getDisplayValue(option)}</span>
                                  <CheckIcon className="invisible size-5 dark:stroke-gray-300 group-data-[selected]:visible" />
                                </div>
                              )}
                            </ComboboxOption>
                          )
                        })}
                      </div>
                    ))
                  : /* Render Standard Flat Options */
                    filteredOptions.map((option) => {
                      const optVal = getValue(option)
                      const isOptSelected = multiple
                        ? isArray(normalizedSelected) &&
                          normalizedSelected.some((s) => getValue(s) === optVal)
                        : normalizedSelected && getValue(normalizedSelected as T) === optVal

                      return (
                        <ComboboxOption
                          key={optVal}
                          disabled={(option as BaseOption).disabled}
                          value={option}
                          className="group rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/10 data-disabled:opacity-50 cursor-pointer data-disabled:pointer-events-none"
                        >
                          {renderOption ? (
                            renderOption(option, Boolean(isOptSelected))
                          ) : (
                            <div className="flex items-center justify-between gap-2 text-gray-900 dark:text-white group-data-[selected]:text-blue-600">
                              <span className="text-sm/6">{getDisplayValue(option)}</span>
                              <CheckIcon className="invisible size-5 dark:stroke-gray-300 group-data-[selected]:visible" />
                            </div>
                          )}
                        </ComboboxOption>
                      )
                    })}

                {!hasAnyOptionsToDisplay && Boolean(noOptionsText) && (
                  <div
                    data-testid="no-result-found"
                    className="flex items-center gap-2 py-1.5 px-3 select-none"
                  >
                    <TextContent muted small>
                      {noOptionsText}
                    </TextContent>
                    {Boolean(query.trim()) && (
                      <TextContent strong small>
                        "{query.trim()}"
                      </TextContent>
                    )}
                  </div>
                )}

                {/* Creatable option (allowAdd) - suppressed when allowFreeText is true */}
                {!allowFreeText && allowAdd && Boolean(query.trim()) && (
                  <ComboboxOption
                    key={`add-${query.trim()}`}
                    value={query}
                    className="group rounded-lg py-1.5 px-3 cursor-pointer text-gray-700 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700"
                    onClick={() => void handleAddAndSelect(query)}
                  >
                    <div className="flex items-center gap-2">
                      <CirclePlusIcon className="size-4.5" />
                      <TextContent>
                        {addNewText} "{query}"
                      </TextContent>
                    </div>
                  </ComboboxOption>
                )}
              </div>
            )}
          </ComboboxOptions>
        </Combobox>

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
      </div>
    )
  },
)

SelectBox.displayName = 'SelectBox'
