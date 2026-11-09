import { useState } from 'react'
import { FilterChips, FilterSheet, SelectBox } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

const STATUSES = [
  { label: 'Any status', value: '' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Paid', value: 'paid' },
]

export default function FilterSheetDocsPage() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  const label = STATUSES.find((option) => option.value === status)?.label ?? ''
  const chips = status ? [{ key: 'status', label, onRemove: () => setStatus('') }] : []

  const examples = [
    {
      title: 'Filters behind one button',
      description:
        '"Filters (N)" with the result count beside it, the filters in effect as removable chips under it, and the fields in a bottom sheet with Clear filters and Done.',
      render: (
        <div className="max-w-sm space-y-3">
          <FilterSheet
            isOpen={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onClear={() => setStatus('')}
            activeCount={status ? 1 : 0}
            resultCount={status ? 4 : 12}
            resultLabel="invoice"
            chips={chips}
          >
            <SelectBox
              label="Status"
              searchable={false}
              options={STATUSES}
              selected={STATUSES.find((option) => option.value === status) ?? null}
              onChange={(option) => setStatus((option as { value: string } | null)?.value ?? '')}
            />
          </FilterSheet>
        </div>
      ),
      code: `
<FilterSheet
  isOpen={open}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
  onClear={clearFilters}
  activeCount={activeCount}
  resultCount={total}
  resultLabel="invoice"
  chips={[{ key: 'status', label: 'Unpaid', onRemove: () => setStatus('') }]}
>
  <SelectBox label="Status" ... />
</FilterSheet>`,
    },
    {
      title: 'Chips on their own',
      description:
        'A page without a filter sheet, e.g. one searched from the top bar, can still show what narrows its list.',
      render: <FilterChips chips={[{ key: 'search', label: '“sharma”', onRemove: () => {} }]} />,
      code: `<FilterChips chips={[{ key: 'search', label: '“sharma”', onRemove: clearSearch }]} />`,
    },
  ]

  return (
    <DocsPageLayout
      component="FilterSheet"
      description="A phone list's filters behind one button and a bottom sheet, so the list shows straight away instead of under a wall of dropdowns."
      examples={examples}
    />
  )
}
