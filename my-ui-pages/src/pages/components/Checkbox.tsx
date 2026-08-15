import { useState } from 'react'
import { Checkbox } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

function IndeterminateDemo() {
  const [items, setItems] = useState([
    { id: 1, label: 'Analytics Reports', checked: true },
    { id: 2, label: 'User Activity Logs', checked: false },
    { id: 3, label: 'Billing Invoices', checked: false },
  ])

  const allChecked = items.every((i) => i.checked)
  const isIndeterminate = items.some((i) => i.checked) && !allChecked

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setItems((prev) => prev.map((item) => ({ ...item, checked: isChecked })))
  }

  const handleChildChange = (id: number, isChecked: boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: isChecked } : item)),
    )
  }

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
      <Checkbox
        label="Select All Reports"
        indeterminate={isIndeterminate}
        checked={allChecked}
        onChange={handleParentChange}
      />
      <div className="pl-6 flex flex-col gap-2 border-l border-gray-200 dark:border-gray-800 ml-2">
        {items.map((item) => (
          <Checkbox
            key={item.id}
            size="sm"
            label={item.label}
            checked={item.checked}
            onChange={(e) => handleChildChange(item.id, e.target.checked)}
          />
        ))}
      </div>
    </div>
  )
}

export default function CheckboxDocsPage() {
  const examples = [
    {
      title: 'Basic Usage & Sizes (sm, md, lg)',
      description: 'Standard checkbox controls with label and 3 responsive size scales.',
      render: (
        <div className="flex flex-col gap-3">
          <Checkbox size="sm" label="Small Checkbox (sm)" defaultChecked />
          <Checkbox size="md" label="Medium Checkbox (md, default)" defaultChecked />
          <Checkbox size="lg" label="Large Checkbox (lg)" defaultChecked />
        </div>
      ),
      code: `
<Checkbox size="sm" label="Small Checkbox (sm)" />
<Checkbox size="md" label="Medium Checkbox (md)" />
<Checkbox size="lg" label="Large Checkbox (lg)" />`,
    },
    {
      title: 'Indeterminate State (Partially Checked)',
      description:
        'Pass indeterminate={true} to render a minus (—) icon for parent controls and Select All trees.',
      render: <IndeterminateDemo />,
      code: `
const [items, setItems] = useState([
  { id: 1, label: 'Analytics Reports', checked: true },
  { id: 2, label: 'User Activity Logs', checked: false },
  { id: 3, label: 'Billing Invoices', checked: false },
])

const allChecked = items.every((i) => i.checked)
const isIndeterminate = items.some((i) => i.checked) && !allChecked

<Checkbox
  label="Select All Reports"
  indeterminate={isIndeterminate}
  checked={allChecked}
  onChange={(e) => handleParentToggle(e.target.checked)}
/>`,
    },
    {
      title: 'Card Container Variant',
      description: 'Use variant="card" for enclosed interactive setting cards.',
      render: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Checkbox
            variant="card"
            label="Automatic Backups"
            description="Perform daily encrypted database backups to S3 storage."
            defaultChecked
          />
          <Checkbox
            variant="card"
            label="Email Digest"
            description="Receive weekly activity reports and system notifications."
          />
        </div>
      ),
      code: `
<Checkbox
  variant="card"
  label="Automatic Backups"
  description="Perform daily encrypted database backups to S3 storage."
  defaultChecked
/>
<Checkbox
  variant="card"
  label="Email Digest"
  description="Receive weekly activity reports and system notifications."
/>`,
    },
    {
      title: 'Label with Description Subtext',
      description: 'Pass the description prop to render subtext beneath the label.',
      render: (
        <Checkbox
          label="Two-Factor Authentication"
          description="Require a verification code from your authenticator app on login."
          defaultChecked
        />
      ),
      code: `
<Checkbox
  label="Two-Factor Authentication"
  description="Require a verification code from your authenticator app on login."
  defaultChecked
/>`,
    },
    {
      title: 'Disabled State',
      description: 'Disable interaction using the disabled prop.',
      render: (
        <div className="flex flex-col gap-2">
          <Checkbox label="Disabled Unchecked" disabled />
          <Checkbox label="Disabled Checked" disabled defaultChecked />
          <Checkbox
            label="Disabled Card"
            variant="card"
            description="Card in disabled state"
            disabled
          />
        </div>
      ),
      code: `
<Checkbox label="Disabled Unchecked" disabled />
<Checkbox label="Disabled Checked" disabled defaultChecked />`,
    },
    {
      title: 'Error & Helper Text',
      description: 'Display inline error messages or helper text.',
      render: (
        <div className="flex flex-col gap-4">
          <Checkbox
            label="I accept the Terms of Service"
            error="You must accept the terms before continuing."
          />
          <Checkbox
            label="Enable Public Profile"
            helperText="Your profile will be searchable on web search engines."
          />
        </div>
      ),
      code: `
<Checkbox
  label="I accept the Terms of Service"
  error="You must accept the terms before continuing."
/>
<Checkbox
  label="Enable Public Profile"
  helperText="Your profile will be searchable on web search engines."
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Checkbox"
      description="A single boolean control for opt-in choices, setting toggles, or multi-select option lists. Supports indeterminate state, size scales (sm/md/lg), card container variants, subtext descriptions, and error messages."
      examples={examples}
    />
  )
}
