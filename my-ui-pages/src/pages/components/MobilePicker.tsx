import { useState, useEffect } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { MobilePicker, SelectBox } from '@pk-design/react-tailwind'
import { Globe, Tag, MapPin } from 'lucide-react'

const PLAYGROUND_OPTIONS = [
  'Apple',
  'Banana',
  'Orange',
  'Grapes',
  'Mango',
  'Pineapple',
  'Watermelon',
]

function MobilePickerPlayground(props: any) {
  const [val, setVal] = useState<any>(props.multiple ? ['Apple', 'Banana'] : 'Apple')

  useEffect(() => {
    if (props.multiple) {
      if (!Array.isArray(val)) {
        setVal(val ? [val] : ['Apple'])
      }
    } else {
      if (Array.isArray(val)) {
        setVal(val.length > 0 ? val[0] : 'Apple')
      }
    }
  }, [props.multiple])

  useEffect(() => {
    if (props.selected !== undefined) {
      setVal(props.selected)
    }
  }, [props.selected])

  return (
    <div className="w-full max-w-md">
      <MobilePicker
        {...props}
        options={props.options || PLAYGROUND_OPTIONS}
        selected={val}
        onChange={(nVal: any) => setVal(nVal)}
      />
    </div>
  )
}

export default function MobilePickerDocsPage() {
  const [singleVal, setSingleVal] = useState<any>('California')
  const [multiVal, setMultiVal] = useState<string[]>(['Wireless Headphones', 'Smartwatch'])
  const [tagVal, setTagVal] = useState<string[]>(['Priority', 'Mobile-UX'])
  const [deliveryCity, setDeliveryCity] = useState<any>({ label: 'San Francisco', value: 'sf' })
  const [selectBoxVal, setSelectBoxVal] = useState<any>('United States')

  const [asyncSelected, setAsyncSelected] = useState<any>('React')
  const [asyncResults, setAsyncResults] = useState<string[]>([
    'React',
    'React Native',
    'ReactDOM',
    'React Redux',
  ])

  const [stateVal, setStateVal] = useState<any>('California')

  const allFrameworks = [
    'React',
    'React Native',
    'ReactDOM',
    'React Redux',
    'Vue.js',
    'Vuex',
    'Angular',
    'Angular Material',
    'Svelte',
    'SvelteKit',
    'SolidJS',
    'Next.js',
    'Nuxt.js',
    'Tailwind CSS',
    'TypeScript',
  ]

  const usStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ]

  const handleAsyncSearch = async (query: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    if (!query) {
      const defaultList = ['React', 'React Native', 'ReactDOM', 'React Redux']
      if (asyncSelected && !defaultList.includes(asyncSelected)) {
        setAsyncResults([asyncSelected, ...defaultList])
      } else {
        setAsyncResults(defaultList)
      }
    } else {
      setAsyncResults(
        allFrameworks.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
      )
    }
  }

  const countryGroups = [
    {
      group: 'North America',
      options: [
        { value: 'us', label: 'United States', flag: '🇺🇸' },
        { value: 'ca', label: 'Canada', flag: '🇨🇦' },
        { value: 'mx', label: 'Mexico', flag: '🇲🇽' },
      ],
    },
    {
      group: 'Europe',
      options: [
        { value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
        { value: 'de', label: 'Germany', flag: '🇩🇪' },
        { value: 'fr', label: 'France', flag: '🇫🇷' },
      ],
    },
  ]

  const examples = [
    {
      title: 'Single Select Mobile Bottom Sheet',
      description:
        'Tapping the trigger opens a native slide-up bottom sheet with large touch targets. Selecting an option instantly commits the choice and smoothly closes the sheet.',
      render: (
        <div className="max-w-md">
          <MobilePicker
            label="Shipping Region"
            title="Choose Shipping Region"
            description="Select your state or territory for delivery calculations."
            options={['California', 'New York', 'Texas', 'Florida', 'Washington', 'Illinois']}
            selected={singleVal}
            onChange={(val: any) => setSingleVal(val)}
            allowClear
            leftGroup={<MapPin className="size-4" />}
            placeholder="Select a state..."
          />
        </div>
      ),
      code: `
const [region, setRegion] = useState('California')

<MobilePicker
  label="Shipping Region"
  title="Choose Shipping Region"
  description="Select your state or territory for delivery calculations."
  options={['California', 'New York', 'Texas', 'Florida']}
  selected={region}
  onChange={setRegion}
  allowClear
  leftGroup={<MapPin className="size-4" />}
/>`,
    },
    {
      title: 'Multi-Select with Sticky Confirmation CTA',
      description:
        'In multi-select mode, users can check/uncheck multiple options smoothly inside the sheet, use 1-click Select All, and confirm their selection with a sticky bottom CTA button.',
      render: (
        <div className="max-w-md">
          <MobilePicker
            label="Product Categories"
            title="Filter Categories"
            description="Choose one or more categories to filter catalog products."
            options={[
              'Wireless Headphones',
              'Smartwatch',
              'Laptops & Computers',
              'Gaming Accessories',
              'Cameras & Lenses',
              'Smart Home Devices',
            ]}
            multiple
            showSelectAll
            confirmText="Apply Filters"
            selected={multiVal}
            onChange={(val: any) => setMultiVal(val)}
            leftGroup={<Tag className="size-4" />}
          />
        </div>
      ),
      code: `
const [categories, setCategories] = useState(['Wireless Headphones', 'Smartwatch'])

<MobilePicker
  label="Product Categories"
  title="Filter Categories"
  options={['Wireless Headphones', 'Smartwatch', 'Laptops', 'Gaming Accessories']}
  multiple
  showSelectAll
  confirmText="Apply Filters"
  selected={categories}
  onChange={setCategories}
/>`,
    },
    {
      title: 'Quick Choice Chips & Subtitle Metadata',
      description:
        'Display 1-tap quick pick chips at the top of the mobile sheet so users do not have to type or scroll for popular choices, along with subtitle descriptions on option items.',
      render: (
        <div className="max-w-md">
          <MobilePicker
            label="Delivery Location"
            title="Select Delivery City"
            options={[
              {
                label: 'San Francisco',
                value: 'sf',
                subtitle: 'California, USA (Same-day delivery)',
              },
              {
                label: 'New York City',
                value: 'nyc',
                subtitle: 'New York, USA (Next-day delivery)',
              },
              { label: 'London', value: 'ldn', subtitle: 'United Kingdom (Standard delivery)' },
              { label: 'Tokyo', value: 'tyo', subtitle: 'Japan (Express international)' },
              { label: 'Sydney', value: 'syd', subtitle: 'Australia (Standard international)' },
            ]}
            quickOptions={[
              { label: 'San Francisco', value: 'sf' },
              { label: 'New York City', value: 'nyc' },
              { label: 'London', value: 'ldn' },
            ]}
            quickOptionsTitle="Popular Destinations"
            selected={deliveryCity}
            onChange={(val: any) => setDeliveryCity(val)}
            leftGroup={<MapPin className="size-4" />}
            allowClear
          />
        </div>
      ),
      code: `
<MobilePicker
  label="Delivery Location"
  title="Select Delivery City"
  options={[
    { label: 'San Francisco', value: 'sf', subtitle: 'California, USA' },
    { label: 'New York City', value: 'nyc', subtitle: 'New York, USA' },
  ]}
  quickOptions={[
    { label: 'San Francisco', value: 'sf' },
    { label: 'New York City', value: 'nyc' },
  ]}
  quickOptionsTitle="Popular Destinations"
/>`,
    },
    {
      title: 'Searchable Free-Text Tags Picker',
      description:
        'Combine allowFreeText with searchable to allow users to search existing tags or type custom freeform tags directly inside the mobile search bar.',
      render: (
        <div className="max-w-md">
          <MobilePicker
            label="Issue Labels"
            title="Manage Labels"
            options={['Bug', 'Feature', 'Priority', 'Mobile-UX', 'Documentation', 'Refactor']}
            multiple
            searchable
            allowFreeText
            selected={tagVal}
            onChange={(val: any) => setTagVal(val)}
            placeholder="Search or type custom label..."
            searchPlaceholder="Search or type new tag (press Enter)..."
          />
        </div>
      ),
      code: `
const [labels, setLabels] = useState(['Priority', 'Mobile-UX'])

<MobilePicker
  label="Issue Labels"
  title="Manage Labels"
  options={['Bug', 'Feature', 'Priority', 'Mobile-UX']}
  multiple
  searchable
  allowFreeText
  selected={labels}
  onChange={setLabels}
/>`,
    },
    {
      title: 'Async Remote Search (async + onSearch)',
      description:
        'Enable async and pass onSearch to trigger debounced server-side API queries with an interactive loading spinner inside the mobile sheet search bar.',
      render: (
        <div className="max-w-md">
          <MobilePicker
            label="Tech Framework"
            title="Search Technology Directory"
            description="Type a framework or library name to search remotely."
            options={asyncResults}
            async
            onSearch={handleAsyncSearch}
            searchPlaceholder="Type 'Vue', 'Svelte', 'Tailwind'..."
            selected={asyncSelected}
            onChange={(val: any) => setAsyncSelected(val)}
            allowClear
          />
        </div>
      ),
      code: `
const [selected, setSelected] = useState('React')
const [results, setResults] = useState(['React', 'Vue', 'Angular', 'Svelte'])

const handleSearch = async (query: string) => {
  const data = await fetchFrameworksFromAPI(query)
  setResults(data)
}

<MobilePicker
  label="Tech Framework"
  title="Search Technology Directory"
  options={results}
  async
  onSearch={handleSearch}
  selected={selected}
  onChange={setSelected}
  searchPlaceholder="Type to search remotely..."
/>`,
    },
    {
      title: 'Scrollable Long Options List (50+ Items)',
      description:
        'MobilePicker handles large option sets effortlessly with smooth touch scrolling, sticky header controls, and responsive maximum height limits.',
      render: (
        <div className="max-w-md">
          <MobilePicker
            label="US State"
            title="Select US State"
            description="Scroll or search through all 50 US States."
            options={usStates}
            searchable
            selected={stateVal}
            onChange={(val: any) => setStateVal(val)}
            allowClear
            placeholder="Choose state..."
          />
        </div>
      ),
      code: `
const [state, setState] = useState('California')

<MobilePicker
  label="US State"
  title="Select US State"
  options={usStatesList} // 50+ items
  searchable
  selected={state}
  onChange={setState}
/>`,
    },
    {
      title: 'SelectBox Integration (asBottomSheet / mobileMode="sheet")',
      description:
        'You can also use asBottomSheet or mobileMode="sheet" directly on standard SelectBox components to automatically render as a MobilePicker on mobile screens.',
      render: (
        <div className="max-w-md">
          <SelectBox
            label="Country Selection"
            asBottomSheet
            groups={countryGroups}
            selected={selectBoxVal}
            onChange={(val: any) => setSelectBoxVal(val)}
            leftGroup={<Globe className="size-4" />}
            renderOption={(option: any, _isSelected: boolean) => (
              <div className="flex items-center gap-2">
                <span>{option.flag}</span>
                <span>{option.label}</span>
              </div>
            )}
          />
        </div>
      ),
      code: `
const [country, setCountry] = useState('United States')

<SelectBox
  label="Country Selection"
  asBottomSheet
  groups={countryGroups}
  selected={country}
  onChange={setCountry}
  leftGroup={<Globe className="size-4" />}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="MobilePicker"
      description="A mobile-optimized bottom sheet picker component for touch devices. Prevents virtual keyboard clutter by opening options inside a slide-up bottom sheet with large 48px touch targets, sticky headers, live search, and single/multi-select modes."
      playground={{
        render: (props) => <MobilePickerPlayground {...props} />,
        initialProps: {
          options: PLAYGROUND_OPTIONS,
          label: 'Select Fruit',
          title: 'Choose Fruit',
          placeholder: 'Tap to select fruit...',
          size: 'md',
          disabled: false,
          searchable: true,
          multiple: false,
          allowClear: true,
          allowFreeText: false,
          allowAdd: false,
        },
      }}
      examples={examples}
    />
  )
}
