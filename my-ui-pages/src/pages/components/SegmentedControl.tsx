import { useState } from 'react'
import { SegmentedControl } from '@pk-design/react-tailwind'
import { LayoutGridIcon, ListIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function SegmentedControlDocsPage() {
  const [view, setView] = useState('grid')
  const [timeframe, setTimeframe] = useState('month')
  const [sizeVal, setSizeVal] = useState('md')

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Segmented option pill control for switching between views or modes.',
      render: (
        <div className="space-y-4">
          <SegmentedControl
            options={[
              { label: 'Grid View', value: 'grid', icon: <LayoutGridIcon className="size-4" /> },
              { label: 'List View', value: 'list', icon: <ListIcon className="size-4" /> },
            ]}
            value={view}
            onChange={setView}
          />
        </div>
      ),
      code: `
const [view, setView] = useState('grid')

<SegmentedControl
  options={[
    { label: 'Grid View', value: 'grid', icon: <LayoutGridIcon className="size-4" /> },
    { label: 'List View', value: 'list', icon: <ListIcon className="size-4" /> },
  ]}
  value={view}
  onChange={setView}
/>`,
    },
    {
      title: 'Sizes',
      description: 'Use the `size` prop to choose between `sm`, `md` (default), or `lg`.',
      render: (
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <SegmentedControl
              size="sm"
              options={[
                { label: 'Day', value: 'day' },
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
              ]}
              value={sizeVal}
              onChange={setSizeVal}
            />
            <SegmentedControl
              size="md"
              options={[
                { label: 'Day', value: 'day' },
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
              ]}
              value={sizeVal}
              onChange={setSizeVal}
            />
            <SegmentedControl
              size="lg"
              options={[
                { label: 'Day', value: 'day' },
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
              ]}
              value={sizeVal}
              onChange={setSizeVal}
            />
          </div>
        </div>
      ),
      code: `
<SegmentedControl size="sm" options={options} value={val} onChange={setVal} />
<SegmentedControl size="md" options={options} value={val} onChange={setVal} />
<SegmentedControl size="lg" options={options} value={val} onChange={setVal} />`,
    },
    {
      title: 'Full Width & Icons',
      description: 'Add `fullWidth` to expand the segmented control to fill its container.',
      render: (
        <div className="max-w-md">
          <SegmentedControl
            fullWidth
            options={[
              { label: 'Recent', value: 'recent', icon: <ClockIcon className="size-4" /> },
              { label: 'Scheduled', value: 'month', icon: <CalendarIcon className="size-4" /> },
            ]}
            value={timeframe}
            onChange={setTimeframe}
          />
        </div>
      ),
      code: `
<SegmentedControl
  fullWidth
  options={[
    { label: 'Recent', value: 'recent', icon: <ClockIcon className="size-4" /> },
    { label: 'Scheduled', value: 'month', icon: <CalendarIcon className="size-4" /> },
  ]}
  value={timeframe}
  onChange={setTimeframe}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="SegmentedControl"
      description="Linear set of two or more options functioning as a view toggle or tab alternative. Supports keyboard navigation (Arrow keys), responsive sizes, icons, and full-width containers."
      playground={{
        render: (props) => (
          <SegmentedControl
            {...props}
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
              { label: 'Option C', value: 'c' },
            ]}
            value={view}
            onChange={setView}
          />
        ),
        initialProps: { size: 'md', fullWidth: false, disabled: false },
      }}
      examples={examples}
    />
  )
}
