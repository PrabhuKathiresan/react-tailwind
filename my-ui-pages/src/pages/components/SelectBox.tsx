import { useRef, useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Button, SelectBox, type BaseOption } from '@pk-design/react-tailwind'

export default function SelectBoxDocsPage() {
  const [basicOptions, setBasicOptions] = useState(['Apple', 'Banana', 'Orange', 'Grapes'])

  const objectOptions: BaseOption[] = [
    { value: 'cricket', label: 'Cricket' },
    { value: 'football', label: 'Football' },
    { value: 'tennis', label: 'Tennis' },
  ]

  const asyncOptions = [
    { value: 'react', label: 'ReactJS' },
    { value: 'vue', label: 'VueJS' },
    { value: 'svelte', label: 'Svelte' },
  ]

  const [asyncList, setAsyncList] = useState<BaseOption[]>([])
  const [_loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<any>(null)
  const [mselected, setMselected] = useState<any>([])
  const [sport, setSport] = useState<any>(null)
  const [asyncSelected, setAsyncSelected] = useState<any>(null)

  const handleAsyncSearch = async (q: string) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 300)) // fake network delay
    setAsyncList(asyncOptions.filter((opt) => opt.label!.toLowerCase().includes(q.toLowerCase())))
    setLoading(false)
  }

  const selectRef = useRef<HTMLInputElement | null>(null)

  const examples = [
    /* -------------------------------------------------------------------- */
    {
      title: 'Basic Usage',
      description: 'A simple single select with string options.',
      render: (
        <SelectBox
          options={basicOptions}
          placeholder="Select a fruit"
          selected={selected}
          onChange={setSelected}
          label="Favourite Fruit"
        />
      ),
      code: `
<SelectBox
  options={["Apple", "Banana", "Orange", "Grapes"]}
  placeholder="Select a fruit"
  selected={selected}
  onChange={setSelected}
  label="Favourite Fruit"
/>`,
    },

    /* -------------------------------------------------------------------- */
    {
      title: 'Single Select with Object Options',
      description: 'Uses BaseOption objects with value/label keys.',
      render: (
        <SelectBox
          options={objectOptions}
          placeholder="Pick a sport"
          selected={sport}
          onChange={setSport}
          label="Favourite Sport"
        />
      ),
      code: `
<SelectBox
  options={[
    { value: "cricket", label: "Cricket" },
    { value: "football", label: "Football" },
    { value: "tennis", label: "Tennis" },
  ]}
  placeholder="Pick a sport"
  selected={sport}
  onChange={setSport}
  label="Favourite Sport"
/>`,
    },

    /* -------------------------------------------------------------------- */
    {
      title: 'Multiple Select',
      description: 'Allows selecting multiple values with removable badges.',
      render: (
        <SelectBox
          options={basicOptions}
          multiple
          placeholder="Choose fruits"
          selected={mselected}
          onChange={setMselected}
          label="Favourite Fruits"
          labelHint="You can select multiple fruits"
        />
      ),
      code: `
<SelectBox
  options={["Apple", "Banana", "Orange", "Grapes"]}
  multiple
  placeholder="Choose fruits"
  selected={mselected}
  onChange={setMselected}
  label="Favourite Fruits"
  labelHint="You can select multiple fruits"
/>`,
    },

    /* -------------------------------------------------------------------- */
    {
      title: 'Max Selection Limit',
      description: 'Users can select only up to 2 items.',
      render: (
        <SelectBox
          options={basicOptions}
          multiple
          maxSelection={2}
          placeholder="Max 2 selections"
          onChange={setMselected}
          selected={mselected}
          label="Favourite Fruits (Max 2)"
        />
      ),
      code: `
<SelectBox
  options={["Apple", "Banana", "Orange", "Grapes"]}
  multiple
  maxSelection={2}
  placeholder="Max 2 selections"
  onChange={setMselected}
  selected={mselected}
  label="Favourite Fruits (Max 2)"
/>`,
    },

    /* -------------------------------------------------------------------- */
    {
      title: 'Async Search',
      description: 'Loads search results from server (debounced).',
      render: (
        <SelectBox
          async
          options={asyncList}
          placeholder="Search frameworks..."
          onSearch={handleAsyncSearch}
          selected={asyncSelected}
          onChange={setAsyncSelected}
          label="Search favourite frameworks"
        />
      ),
      code: `
const [asyncList, setAsyncList] = useState([])
const handleAsyncSearch = async (q) => {
  await fetch(...)
  setAsyncList(...)
}

<SelectBox
  async
  options={asyncList}
  placeholder="Search frameworks..."
  onSearch={handleAsyncSearch}
  selected={asyncSelected}
  onChange={setAsyncSelected}
  label="Search favourite frameworks"
/>`,
    },

    /* -------------------------------------------------------------------- */
    {
      title: 'Creatable Input (Add New Option)',
      description: 'User can type and create a new option.',
      render: (
        <SelectBox
          options={basicOptions}
          placeholder="Add new fruit"
          allowAdd
          onAdd={(newVal) => setBasicOptions((options) => [...options, newVal])}
          onChange={setSelected}
          selected={selected}
          label="Select or Create a Fruit"
        />
      ),
      code: `
<SelectBox
  options={["Apple", "Banana", "Orange", "Grapes"]}
  placeholder="Add new fruit"
  allowAdd
  onAdd={(value) => console.log("Created:", value)}
  onChange={setSelected}
  selected={selected}
  label="Select or Create a Fruit"
/>`,
    },

    /* -------------------------------------------------------------------- */
    {
      title: 'Clear Button',
      description: 'Shows a clear icon to remove selected value.',
      render: (
        <SelectBox
          options={basicOptions}
          placeholder="Clearable select"
          allowClear
          onChange={setSelected}
          selected={selected}
          label="Select a Fruit"
        />
      ),
      code: `
<SelectBox
  options={["Apple", "Banana", "Orange"]}
  allowClear
  placeholder="Clearable select"
  onChange={setSelected}
  selected={selected}
  label="Select a Fruit"
/>`,
    },

    /* -------------------------------------------------------------------- */
    {
      title: 'Empty State',
      description:
        'When `options` is empty, the dropdown shows a message instead of staying blank. Customize it with `noOptionsText`.',
      render: (
        <SelectBox options={[]} placeholder="Nothing to pick from" noOptionsText="No fruits yet" />
      ),
      code: `
<SelectBox
  options={[]}
  placeholder="Nothing to pick from"
  noOptionsText="No fruits yet"
/>`,
    },

    /* -------------------------------------------------------------------- */
    {
      title: 'Disabled State',
      description: 'Prevents user interaction.',
      render: (
        <SelectBox
          options={basicOptions}
          placeholder="Disabled"
          disabled
          onChange={setSelected}
          selected={selected}
          label="Select a Fruit"
        />
      ),
      code: `
<SelectBox
  options={["Apple", "Banana", "Orange"]}
  disabled
  onChange={setSelected}
  selected={selected}
  label="Select a Fruit"
/>`,
    },

    /* -------------------------------------------------------------------- */
    {
      title: 'Validation & Error Message',
      description: 'Displays an error message under the input.',
      render: (
        <SelectBox
          options={basicOptions}
          placeholder="Form error example"
          error="This field is required"
          onChange={setSelected}
          selected={selected}
          label="Select a Fruit"
        />
      ),
      code: `
<SelectBox
  options={basicOptions}
  placeholder="Form error example"
  error="This field is required"
  onChange={setSelected}
  selected={selected}
  label="Select a Fruit"
/>`,
    },

    /* -------------------------------------------------------------------- */
    {
      title: 'Using Ref (focus programmatically)',
      description: 'Focus the SelectBox input using a ref.',
      render: (
        <div>
          <Button
            onClick={() => selectRef.current?.focus()}
            className="mb-2 px-3 py-1 rounded bg-blue-600 text-white"
          >
            Focus SelectBox
          </Button>
          <SelectBox
            ref={selectRef}
            options={basicOptions}
            placeholder="Focusable select"
            onChange={setSelected}
            selected={selected}
            label="Select a Fruit"
          />
        </div>
      ),
      code: `
const selectRef = useRef(null)

<Button onClick={() => selectRef.current?.focus()}>Focus SelectBox</Button>

<SelectBox
  ref={selectRef}
  options={["Apple", "Banana", "Orange"]}
  placeholder="Focusable select"
  onChange={setSelected}
  selected={selected}
  label="Select a Fruit"
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="SelectBox"
      description="A powerful replacement for the native select element, built on react-select. Handles single selection, multi-select with removable badge chips, async option loading with search, and a creatable mode for adding new options on the fly. Works in controlled and uncontrolled forms with full keyboard and screen-reader support."
      examples={examples}
    />
  )
}
