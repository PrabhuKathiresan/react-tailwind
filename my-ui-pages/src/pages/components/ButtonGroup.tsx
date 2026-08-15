import { useState } from 'react'
import { Button, ButtonGroup, Dropdown } from '@pk-design/react-tailwind'
import { IndianRupee, Printer, Bold, Italic, Underline, ChevronDown } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function ButtonGroupDocsPage() {
  const [view, setView] = useState('week')
  const [format, setFormat] = useState<string[]>(['bold'])

  const toggleFormat = (itemVal: string) => {
    setFormat((prev) =>
      prev.includes(itemVal) ? prev.filter((v) => v !== itemVal) : [...prev, itemVal],
    )
  }

  const examples = [
    {
      title: 'Segmented Toggle Selection Mode (Single Select)',
      description:
        'Pass "value" and "onChange" to use ButtonGroup as an active toggle selection control.',
      render: (
        <div className="space-y-3">
          <ButtonGroup value={view} onChange={(v) => setView(v)}>
            <Button value="day">Day</Button>
            <Button value="week">Week</Button>
            <Button value="month">Month</Button>
            <Button value="year">Year</Button>
          </ButtonGroup>
          <p className="text-xs text-gray-500">
            Selected view:{' '}
            <strong className="text-gray-900 dark:text-white uppercase">{view}</strong>
          </p>
        </div>
      ),
      code: `
const [view, setView] = useState('week')

<ButtonGroup value={view} onChange={setView}>
  <Button value="day">Day</Button>
  <Button value="week">Week</Button>
  <Button value="month">Month</Button>
  <Button value="year">Year</Button>
</ButtonGroup>`,
    },
    {
      title: 'Multi-Select Formatting Bar',
      description:
        'Pass an array value for multi-select toggle controls (e.g. text formatting toolbar).',
      render: (
        <ButtonGroup value={format} onChange={toggleFormat}>
          <Button value="bold" iconOnly aria-label="Bold">
            <Bold className="size-4" />
          </Button>
          <Button value="italic" iconOnly aria-label="Italic">
            <Italic className="size-4" />
          </Button>
          <Button value="underline" iconOnly aria-label="Underline">
            <Underline className="size-4" />
          </Button>
        </ButtonGroup>
      ),
      code: `
const [format, setFormat] = useState(['bold'])

<ButtonGroup value={format} onChange={toggleFormat}>
  <Button value="bold" iconOnly aria-label="Bold"><Bold className="size-4" /></Button>
  <Button value="italic" iconOnly aria-label="Italic"><Italic className="size-4" /></Button>
  <Button value="underline" iconOnly aria-label="Underline"><Underline className="size-4" /></Button>
</ButtonGroup>`,
    },
    {
      title: 'Split Button with Dropdown',
      description: 'Combine a primary action button with an attached dropdown menu.',
      render: (
        <ButtonGroup>
          <Button theme="primary">Save Changes</Button>
          <Dropdown
            width="sm"
            anchor="bottom end"
            triggerButton={
              <Button theme="primary" iconOnly aria-label="More save options">
                <ChevronDown className="size-4" />
              </Button>
            }
            items={[
              { id: 'draft', label: 'Save as Draft' },
              { id: 'template', label: 'Save as Template', divider: true },
              { id: 'publish', label: 'Save & Publish' },
            ]}
          />
        </ButtonGroup>
      ),
      code: `
<ButtonGroup>
  <Button theme="primary">Save Changes</Button>
  <Dropdown
    anchor="bottom end"
    triggerButton={
      <Button theme="primary" iconOnly aria-label="Options">
        <ChevronDown className="size-4" />
      </Button>
    }
    items={[
      { id: 'draft', label: 'Save as Draft' },
      { id: 'template', label: 'Save as Template', divider: true },
      { id: 'publish', label: 'Save & Publish' },
    ]}
  />
</ButtonGroup>`,
    },
    {
      title: 'Basic Usage & Icon Buttons',
      description: 'Join related action controls into a single joined unit.',
      render: (
        <ButtonGroup label="Payment actions">
          <Button iconOnly aria-label="Amount in rupees" theme="primary" variant="plain">
            <IndianRupee className="size-4" />
          </Button>
          <Button iconOnly aria-label="Print">
            <Printer className="size-4" />
          </Button>
        </ButtonGroup>
      ),
      code: `
<ButtonGroup label="Payment actions">
  <Button iconOnly aria-label="Amount in rupees" theme="primary" variant="plain">
    <IndianRupee className="size-4" />
  </Button>
  <Button iconOnly aria-label="Print">
    <Printer className="size-4" />
  </Button>
</ButtonGroup>`,
    },
    {
      title: 'Group Disabled State',
      description: 'Pass "disabled" to the group to disable every child button at once.',
      render: (
        <ButtonGroup disabled label="Disabled actions">
          <Button>Save</Button>
          <Button>Preview</Button>
          <Button>Publish</Button>
        </ButtonGroup>
      ),
      code: `
<ButtonGroup disabled>
  <Button>Save</Button>
  <Button>Preview</Button>
  <Button>Publish</Button>
</ButtonGroup>`,
    },
  ]

  return (
    <DocsPageLayout
      component="ButtonGroup"
      description="Joins related Button elements into a single cohesive control with a shared border and hairline dividers. Supports segmented toggle selection (single or multi-select mode), split buttons with dropdowns, group disabled propagation, horizontal or vertical orientation, and pill rounding."
      playground={{
        render: (props) => (
          <ButtonGroup {...props}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ),
        initialProps: { theme: 'secondary', variant: 'default', size: 'md' },
      }}
      examples={examples}
    />
  )
}
