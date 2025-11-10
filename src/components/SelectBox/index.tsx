import React, { type ReactNode, useEffect, useRef, useState } from 'react'
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
import { useDebounce } from '../hooks/use-debounce'

import CheckIcon from '../Icons/Check.svg'
import ChevronDownIcon from '../Icons/ChevronDown.svg'
import XIcon from '../Icons/X.svg'
import CirclePlusIcon from '../Icons/CirclePlus.svg'

export type SelectOption = {
  value: string
  label?: string
  disabled?: boolean
  [key: string]: any
}

type Selected = SelectOption | string

interface SelectBoxProps {
  options: SelectOption[] | string[]
  selected?: Selected | Selected[] | null
  labelKey?: string
  valueKey?: string
  id?: string
  name?: string
  label?: string
  labelWrapperClass?: string
  labelClass?: string
  labelHint?: string
  onChange?: (value: any) => void
  disabled?: boolean
  containerClass?: string
  placeholder?: string
  dropdownContainerClass?: string
  multiple?: boolean
  maxSelection?: number
  immediate?: boolean
  showErrorMessage?: boolean
  error?: string | ReactNode
  async?: boolean
  onSearch?: (query: string) => Promise<void>
  searchable?: boolean
  required?: boolean
  allowAdd?: boolean
  addNewText?: string
  onAdd?: (value: string) => void
  allowClear?: boolean
}

const constructInputClass = (disabled: boolean) =>
  buildClassName(
    'transition-all',
    'block w-full rounded-lg px-3.5 py-2 text-base sm:text-sm/6',
    'text-gray-900 outline dark:outline outline-1 -outline-offset-1',
    'outline-gray-300 dark:outline-gray-600',
    'focus:outline-blue-600 dark:focus:outline-blue-600 focus:outline-2 focus:-outline-offset-2',
    'dark:border-gray-600 dark:placeholder-gray-500 placeholder:text-gray-400 dark:text-white',
    'group-[.has-error]:outline-red-600 group-[.has-error]:focus:outline-red-600',
    '[&:has(:focus-visible)]:outline-2 [&:has(:focus-visible)]:outline-blue-600',
    'group-[.has-error]:[&:has(:focus-visible)]:outline-red-600',
    disabled ? 'pointer-events-none bg-gray-100 dark:bg-gray-500' : 'bg-white dark:bg-gray-700',
  )

export const SelectBox: React.FC<SelectBoxProps> = (props) => {
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
  } = props
  const hasError = Boolean(error)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [optionsLoading, setOptionsLoading] = useState(false)
  const shouldShowTypeToSearch = async && !debouncedQuery && !options.length
  const inputClass = constructInputClass(disabled)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOptions =
    query === '' || async
      ? options
      : options.filter((option) => {
          if (typeof option === 'string') return option.toLowerCase().includes(query.toLowerCase())
          return option[labelKey].toLowerCase().includes(query.toLowerCase())
        })

  const getDisplayValue = (option: string | SelectOption) => {
    return typeof option === 'string' ? option : option[labelKey]
  }

  const getValue = (option: string | SelectOption) => {
    return typeof option === 'string' ? option : option[valueKey]
  }

  const removeSelection = (idx: number) => {
    if (!isArray(selected)) {
      return
    }

    const nextSelectedValue = [...selected]
    nextSelectedValue.splice(idx, 1)
    onChange(nextSelectedValue)
  }

  const handleOnChange = (value: any) => {
    let nextValue = !value ? (multiple ? [] : {}) : value
    if (multiple && isArray(selected)) {
      if (maxSelection && selected.length >= maxSelection) {
        return
      }
    }
    onChange(nextValue)
    setQuery('')
  }

  const handleSearch = async (searchString: string) => {
    try {
      setOptionsLoading(true)
      await props.onSearch?.(searchString)
    } catch (error) {
      console.error('Error loading options:', error)
    } finally {
      setOptionsLoading(false)
    }
  }

  useEffect(() => {
    if (async && debouncedQuery) {
      handleSearch(debouncedQuery)
    }
  }, [debouncedQuery, async])

  return (
    <div className={buildClassName('group space-y-2', hasError && 'has-error', containerClass)}>
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
        onChange={handleOnChange}
        onClose={() => setQuery('')}
        disabled={disabled}
      >
        {multiple ? (
          <div className={buildClassName(inputClass, 'flex flex-wrap gap-2 peer')}>
            {isArray(selected) && selected?.length > 0 && (
              <>
                {selected.map((option, idx) => (
                  <Badge
                    key={getValue(option)}
                    theme="secondary"
                    removable={!disabled}
                    onRemove={() => removeSelection(idx)}
                  >
                    {getDisplayValue(option)}
                  </Badge>
                ))}
              </>
            )}
            <ComboboxInput
              className="outline-none flex-1"
              aria-label={name}
              value={query}
              autoComplete="off"
              placeholder={selected?.length ? '' : placeholder}
              onChange={(event) => setQuery(event.target.value)}
              id={id}
            />
          </div>
        ) : (
          <div className="relative">
            <ComboboxInput
              aria-label={name}
              displayValue={(option: any) => (option ? getDisplayValue(option) : null)}
              autoComplete="off"
              placeholder={placeholder}
              onChange={(event) => setQuery(event.target.value)}
              className={inputClass}
              disabled={disabled}
              data-disabled={disabled}
              id={id}
              readOnly={!searchable}
              ref={inputRef}
            />
            {allowClear && !isEmpty(selected) && (
              <Button
                size="xs"
                iconOnly
                theme="secondary"
                variant="plain"
                className="group absolute inset-y-0 right-8 h-6 top-2"
                onClick={() => handleOnChange(multiple ? [] : null)}
                disabled={disabled}
              >
                <XIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
              </Button>
            )}
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
            </ComboboxButton>
          </div>
        )}
        <ComboboxOptions
          anchor={{
            to: 'bottom',
            gap: 5,
          }}
          className={buildClassName(
            'w-[var(--input-width)] rounded-lg border border-gray-200 dark:border-white/5 bg-white dark:bg-gray-800 p-1 [--anchor-gap:var(--spacing-1)]',
            '[--anchor-max-height:20rem]',
            'origin-top border transition duration-200 ease-out data-[closed]:translate-y-[-25%] data-[closed]:opacity-0 data-[closed]:overflow-hidden',
            dropdownContainerClass,
          )}
        >
          {optionsLoading ? (
            <div className="flex items-center justify-center py-2 px-3 select-none">
              <Loader size="sm" />
            </div>
          ) : shouldShowTypeToSearch ? (
            <div className="flex items-center justify-between py-2 px-3 select-none">
              Type to search...
            </div>
          ) : (
            <>
              {filteredOptions.map((option) => (
                <ComboboxOption
                  key={getValue(option)}
                  disabled={(option as SelectOption).disabled}
                  value={option}
                  className="group flex items-center justify-between gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/3 dark:data-[focus]:bg-white/10 data-disabled:opacity-50 cursor-pointer data-disabled:pointer-events-none"
                >
                  <span className="text-sm/6 dark:text-white">{getDisplayValue(option)}</span>
                  <CheckIcon className="invisible size-5 dark:fill-white group-data-[selected]:visible" />
                </ComboboxOption>
              ))}
              {filteredOptions.length === 0 && query && !optionsLoading && (
                <div className="flex items-center gap-2 py-1.5 px-3 select-none text-gray-500 dark:text-gray-400">
                  No results found for <span className="font-semibold">{query}</span>
                </div>
              )}
              {allowAdd ? (
                <div
                  role="button"
                  onClick={() => onAdd(query)}
                  className="group flex items-center gap-2 rounded-lg py-1.5 px-3 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <CirclePlusIcon className="size-4.5 text-blue-600" />
                  <TextContent>{addNewText}</TextContent>
                  <TextContent strong>{query}</TextContent>
                </div>
              ) : null}
            </>
          )}
        </ComboboxOptions>
      </Combobox>
      {showErrorMessage && error && (
        <p className="text-red-500 dark:text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
