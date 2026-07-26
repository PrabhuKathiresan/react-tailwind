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

import { isArray } from '../../utils/is-array'
import { buildClassName } from '../../utils/build-classname'
import { isEmpty } from '../../utils/is-empty'
import { useDebounce } from '../../hooks/use-debounce'

import CheckIcon from '../Icons/Check.svg'
import ChevronDownIcon from '../Icons/ChevronDown.svg'
import XIcon from '../Icons/X.svg'
import CirclePlusIcon from '../Icons/CirclePlus.svg'
import type { BaseOption, SelectBoxProps } from './SelectBox.types'
import { buildInputClass } from '../Input'
import { BodyText } from '../BodyText'

const constructInputClass = (disabled: boolean) => buildInputClass('', { disabled })

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
      options,
      selected,
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
      immediate = true,
      showErrorMessage = true,
      error = null,
      async = false,
      searchable = true,
      required = false,
      allowAdd = false,
      addNewText = 'Create',
      onAdd = () => {},
      allowClear = false,
      modalDropdown = false,
      noOptionsText = 'No options available',
    } = props

    const hasError = Boolean(error)
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 500)
    const [optionsLoading, setOptionsLoading] = useState(false)
    const shouldShowTypeToSearch = async && !query && !optionsLoading && options.length === 0
    const inputClass = useMemo(() => constructInputClass(disabled), [disabled])
    const chevronIconClass = buildClassName(
      'size-4',
      'stroke-gray-500 group-data-[hover]:stroke-gray-800',
      'dark:stroke-gray-300 dark:group-data-[hover]:stroke-gray-100',
      disabled && 'dark:stroke-gray-600 stroke-gray-400',
    )

    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Expose the input element to parent
    useImperativeHandle(forwardedRef, () => inputRef.current!, [inputRef])

    const filteredOptions = useMemo(() => {
      if (query === '' || async) return options
      return options.filter((opt) => {
        const label = typeof opt === 'string' ? opt : (opt as BaseOption)[labelKey]
        return label?.toLowerCase().includes(query.toLowerCase())
      })
    }, [options, query, async, labelKey])

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

    const removeSelection = (idx: number) => {
      if (!isArray(selected)) return
      const next = [...selected]
      next.splice(idx, 1)
      onChange(next)
      inputRef.current?.focus()
    }

    // A strongly-typed internal handler (what you expect callers to receive)
    const handleOnChangeInternal = useCallback(
      (value: T | T[] | null) => {
        // normal empty value
        if (value === null) {
          onChange(multiple ? ([] as T[]) : null)
          setQuery('')
          return
        }

        // enforce maxSelection
        if (multiple && Array.isArray(value) && maxSelection && value.length > maxSelection) {
          // ignore the change
          return
        }

        onChange(value as T | T[])
        setQuery('')
      },
      [onChange, multiple, maxSelection],
    )

    /**
     * Headless UI typings are overly broad (they include null[] and EnsureArray<T> etc).
     * We therefore pass a wrapper to the Combobox with a cast (only at the call site),
     * while keeping our internal logic strongly typed.
     */
    const comboboxOnChangeWrapper = useCallback(
      (raw: unknown) => {
        // normalize actual runtime shapes Headless UI uses: T | T[] | null
        if (raw === null || raw === undefined) {
          handleOnChangeInternal(null)
          return
        }

        if (Array.isArray(raw)) {
          // sometimes union typing suggests arrays of nulls — guard it
          const allNulls = raw.length > 0 && raw.every((v) => v === null)
          if (allNulls) {
            handleOnChangeInternal([] as unknown as T[])
            return
          }
          // cast array to T[]
          handleOnChangeInternal(raw as unknown as T[])
          return
        }

        // single value
        handleOnChangeInternal(raw as unknown as T)
      },
      [handleOnChangeInternal],
    )

    // support create (allowAdd) as a real ComboboxOption
    const handleAddAndSelect = useCallback(
      async (valueToAdd: string) => {
        try {
          const result = await onAdd(valueToAdd)
          // if the parent returned a new option (string or object), select it
          if (result) {
            // If parent returned raw string or object, call onChange with that
            handleOnChangeInternal(result as unknown as T)
          } else {
            // if parent didn't return anything, select the raw string value
            handleOnChangeInternal(valueToAdd as unknown as T)
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('onAdd handler error', err)
        }
      },
      [onAdd, handleOnChangeInternal],
    )

    // Kept in a ref so `handleSearch` stays referentially stable even when the
    // caller passes a non-memoized `onSearch` — otherwise the effect below would
    // re-fire (and re-search) on every render instead of only on query changes.
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
            {labelHint}
          </div>
        )}

        <Combobox
          multiple={multiple}
          immediate={immediate}
          name={name}
          value={selected}
          onChange={comboboxOnChangeWrapper as any}
          onClose={() => setQuery('')}
          disabled={disabled}
        >
          {multiple ? (
            <div
              className={buildClassName(inputClass, 'flex flex-wrap gap-2 peer relative')}
              ref={forwardedRef as any} // ensure parent ref hits a real DOM node
            >
              {isArray(selected) &&
                selected?.length > 0 &&
                selected.map((option, idx) => (
                  <Badge
                    key={`${getValue(option)}-${idx}`}
                    theme="secondary"
                    removable={!disabled}
                    onRemove={() => removeSelection(idx)}
                  >
                    {getDisplayValue(option)}
                  </Badge>
                ))}

              <ComboboxInput
                className="outline-none flex-1 dark:placeholder-gray-400 placeholder-gray-400"
                aria-label={name}
                value={query}
                autoComplete="off"
                placeholder={selected?.length ? '' : placeholder}
                onChange={(e) => setQuery(e.target.value)}
                id={id}
                ref={inputRef}
                onKeyDown={(e) => {
                  if (multiple && e.key === 'Backspace' && !query) {
                    if (Array.isArray(selected) && selected.length > 0) {
                      removeSelection(selected.length - 1)
                    }
                  }
                }}
                data-testid="combobox-input"
              />

              <ComboboxButton
                className="group absolute inset-y-0 right-0 px-2.5"
                data-testid="combobox-button"
              >
                <ChevronDownIcon className={chevronIconClass} />
              </ComboboxButton>
            </div>
          ) : (
            <div className="relative" ref={forwardedRef as any}>
              <ComboboxInput
                aria-label={name}
                displayValue={(option: any) => (option ? getDisplayValue(option) : null)}
                autoComplete="off"
                placeholder={placeholder}
                onChange={(event) => setQuery(event.target.value)}
                className={inputClass}
                disabled={disabled}
                id={id}
                readOnly={!searchable}
                ref={inputRef}
                data-testid="combobox-input"
              />

              {allowClear && !isEmpty(selected) && (
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
                className="group absolute inset-y-0 right-0 px-2.5"
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
              'w-[var(--input-width)] rounded-lg border border-gray-200 dark:border-white/5 bg-white dark:bg-gray-800 p-1 [--anchor-gap:var(--spacing-1)]',
              '[--anchor-max-height:20rem]',
              'origin-top border transition duration-200 ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] data-[closed]:translate-y-[-15%] data-[closed]:opacity-0',
              dropdownContainerClass,
            )}
            transition
            data-testid="combobox-options"
          >
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
                {filteredOptions.map((option) => (
                  <ComboboxOption
                    key={getValue(option)}
                    disabled={(option as BaseOption).disabled}
                    value={option}
                    className="group rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/3 dark:data-[focus]:bg-white/10 data-disabled:opacity-50 cursor-pointer data-disabled:pointer-events-none"
                  >
                    {/* Wrap the option content in a single element to avoid Fragment ref errors */}
                    <div className="flex items-center justify-between gap-2 dark:text-white group-data-[selected]:text-blue-600">
                      <span className="text-sm/6">{getDisplayValue(option)}</span>
                      <CheckIcon className="invisible size-5 dark:stroke-gray-300 group-data-[selected]:visible" />
                    </div>
                  </ComboboxOption>
                ))}

                {filteredOptions.length === 0 && (
                  <div
                    data-testid="no-result-found"
                    className="flex items-center gap-2 py-1.5 px-3 select-none text-gray-500 dark:text-gray-400"
                  >
                    {query ? (
                      <>
                        No results found for <span className="font-semibold">{query}</span>
                      </>
                    ) : (
                      noOptionsText
                    )}
                  </div>
                )}

                {allowAdd && (
                  <ComboboxOption
                    value={query}
                    className="group rounded-lg py-1.5 px-3 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => void handleAddAndSelect(query)}
                  >
                    {/* Single wrapper here too */}
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
      </div>
    )
  },
)
