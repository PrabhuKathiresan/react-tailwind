import { useRef, useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Button, SelectBox, type BaseOption } from '@pk-design/react-tailwind'
import { Globe, User, Search, Sparkles } from 'lucide-react'

export default function SelectBoxDocsPage() {
  const [basicOptions, setBasicOptions] = useState(['Apple', 'Banana', 'Orange', 'Grapes'])
  const [selected, setSelected] = useState<any>(null)
  const [selectedTech, setSelectedTech] = useState<string[]>(['React', 'Vue'])
  const [groupedSelected, setGroupedSelected] = useState<any>(null)

  const regionGroups = [
    {
      group: 'North America',
      options: [
        { value: 'us', label: 'United States', code: 'US', flag: '🇺🇸' },
        { value: 'ca', label: 'Canada', code: 'CA', flag: '🇨🇦' },
        { value: 'mx', label: 'Mexico', code: 'MX', flag: '🇲🇽' },
      ],
    },
    {
      group: 'Europe',
      options: [
        { value: 'uk', label: 'United Kingdom', code: 'UK', flag: '🇬🇧' },
        { value: 'de', label: 'Germany', code: 'DE', flag: '🇩🇪' },
        { value: 'fr', label: 'France', code: 'FR', flag: '🇫🇷' },
      ],
    },
    {
      group: 'Asia Pacific',
      options: [
        { value: 'jp', label: 'Japan', code: 'JP', flag: '🇯🇵' },
        { value: 'in', label: 'India', code: 'IN', flag: '🇮🇳' },
        { value: 'au', label: 'Australia', code: 'AU', flag: '🇦🇺' },
      ],
    },
  ]

  const selectRef = useRef<HTMLInputElement | null>(null)

  const examples = [
    {
      title: 'Size Scales (sm, md, lg)',
      description: 'Choose from 3 responsive sizing scales.',
      render: (
        <div className="max-w-md flex flex-col gap-4">
          <SelectBox
            size="sm"
            label="Small (sm)"
            options={basicOptions}
            placeholder="Compact 28px select"
          />
          <SelectBox
            size="md"
            label="Medium (md, default)"
            options={basicOptions}
            placeholder="Standard 36px select"
          />
          <SelectBox
            size="lg"
            label="Large (lg)"
            options={basicOptions}
            placeholder="Prominent 44px select"
          />
        </div>
      ),
      code: `
<SelectBox size="sm" label="Small (sm)" options={["Apple", "Banana"]} />
<SelectBox size="md" label="Medium (md)" options={["Apple", "Banana"]} />
<SelectBox size="lg" label="Large (lg)" options={["Apple", "Banana"]} />`,
    },
    {
      title: 'Option Grouping & Custom Option Renderer',
      description:
        'Organize options under categorized group headers and use renderOption to display custom JSX (flags, badges, subtext).',
      render: (
        <div className="max-w-md">
          <SelectBox
            label="Select Region / Country"
            groups={regionGroups}
            selected={groupedSelected}
            onChange={setGroupedSelected}
            placeholder="Search regions..."
            leftGroup={<Globe className="size-4" />}
            renderOption={(option: any, isSelected) => (
              <div className="flex items-center justify-between w-full py-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">{option.flag}</span>
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                    {option.label}
                  </span>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  {option.code}
                </span>
              </div>
            )}
          />
        </div>
      ),
      code: `
const regionGroups = [
  {
    group: 'North America',
    options: [
      { value: 'us', label: 'United States', flag: '🇺🇸' },
      { value: 'ca', label: 'Canada', flag: '🇨🇦' },
    ],
  },
]

<SelectBox
  label="Select Region"
  groups={regionGroups}
  leftGroup={<Globe className="size-4" />}
  renderOption={(option, isSelected) => (
    <div className="flex items-center gap-2">
      <span>{option.flag}</span>
      <span>{option.label}</span>
    </div>
  )}
/>`,
    },
    {
      title: 'Multi-Select with "Select All" Action Header',
      description:
        'Use showSelectAll to render a 1-click Select All / Deselect All action header in multi-select dropdowns.',
      render: (
        <div className="max-w-md">
          <SelectBox
            label="Select Technologies"
            options={['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Next.js']}
            multiple
            showSelectAll
            selected={selectedTech}
            onChange={(val: any) => setSelectedTech(val)}
            placeholder="Choose frameworks..."
          />
        </div>
      ),
      code: `
const [selectedTech, setSelectedTech] = useState(['React', 'Vue'])

<SelectBox
  label="Select Technologies"
  options={['React', 'Vue', 'Angular', 'Svelte', 'Next.js']}
  multiple
  showSelectAll
  selected={selectedTech}
  onChange={setSelectedTech}
/>`,
    },
    {
      title: 'Creatable Input (Add New Option)',
      description: 'Allows typing and adding new custom options on the fly.',
      render: (
        <div className="max-w-md">
          <SelectBox
            options={basicOptions}
            placeholder="Add new fruit"
            allowAdd
            onAdd={(newVal) => setBasicOptions((options) => [...options, newVal])}
            onChange={setSelected}
            selected={selected}
            label="Select or Create a Fruit"
          />
        </div>
      ),
      code: `
<SelectBox
  options={["Apple", "Banana", "Orange"]}
  allowAdd
  onAdd={(value) => setOptions((prev) => [...prev, value])}
  onChange={setSelected}
/>`,
    },
    {
      title: 'Clear Button & Helper Guidance Text',
      description: 'Enable allowClear for single-select clearing and helperText for guidance.',
      render: (
        <div className="max-w-md flex flex-col gap-4">
          <SelectBox
            options={basicOptions}
            placeholder="Clearable select"
            allowClear
            onChange={setSelected}
            selected={selected}
            label="Select a Fruit"
            helperText="Click the X button to reset selection."
          />
          <SelectBox
            options={basicOptions}
            placeholder="Form error example"
            error="Please choose a valid fruit before proceeding."
            label="Validation State"
          />
        </div>
      ),
      code: `
<SelectBox
  options={["Apple", "Banana", "Orange"]}
  allowClear
  helperText="Click the X button to reset selection."
/>
<SelectBox
  options={["Apple", "Banana", "Orange"]}
  error="Please choose a valid fruit before proceeding."
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="SelectBox"
      description="An accessible, multi-mode combobox control supporting single and multi-select modes, responsive size scales (sm/md/lg), option grouping, custom item rendering, automated Select All headers, creatable option tags, and leading icon slots."
      examples={examples}
    />
  )
}
