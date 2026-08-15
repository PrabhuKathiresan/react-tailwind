import { useState } from 'react'
import { CheckboxGroup, type CheckboxGroupItem } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

const permissionOptions: CheckboxGroupItem[] = [
  { label: 'Read Access', value: 'read', description: 'Can view dashboards and reports' },
  { label: 'Write Access', value: 'write', description: 'Can edit content and data entries' },
  { label: 'Delete Access', value: 'delete', description: 'Can permanently remove records' },
  { label: 'Admin Access', value: 'admin', description: 'Full system configuration management' },
]

function ValidationDemo() {
  const [consents, setConsents] = useState<string[]>([])
  const hasError =
    consents.length < 3 ? 'You must select all required consents to proceed.' : undefined

  return (
    <CheckboxGroup
      label="Required Consents"
      options={['Terms of Service', 'Privacy Policy', 'Cookie Tracking']}
      value={consents}
      onChange={(values) => setConsents(values)}
      error={hasError}
    />
  )
}

export default function CheckboxGroupDocsPage() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['read', 'write'])
  const [selectedCards, setSelectedCards] = useState<string[]>(['push', 'email'])
  const [selectedGrid, setSelectedGrid] = useState<string[]>(['vite', 'next'])

  const examples = [
    {
      title: 'Automated "Select All" Parent Header',
      description:
        'Use showSelectAll to automatically render a master checkbox with indeterminate state calculation.',
      render: (
        <CheckboxGroup
          label="Team Member Permissions"
          labelHint={`${selectedPermissions.length} of ${permissionOptions.length} selected`}
          options={permissionOptions}
          value={selectedPermissions}
          showSelectAll
          selectAllLabel="Select All Permissions"
          onChange={(values) => setSelectedPermissions(values)}
        />
      ),
      code: `
<CheckboxGroup
  label="Team Member Permissions"
  options={permissionOptions}
  value={selectedPermissions}
  showSelectAll
  selectAllLabel="Select All Permissions"
  onChange={(values) => setSelectedPermissions(values)}
/>`,
    },
    {
      title: 'Card Container Variant',
      description: 'Use variant="card" to render interactive card option tiles.',
      render: (
        <CheckboxGroup
          label="Notification Channels"
          variant="card"
          options={[
            {
              label: 'Push Notifications',
              value: 'push',
              description: 'Instant alerts delivered to mobile and desktop browsers',
            },
            {
              label: 'Email Summaries',
              value: 'email',
              description: 'Daily digest of activity sent to your inbox',
            },
            {
              label: 'SMS Alerts',
              value: 'sms',
              description: 'Urgent security and billing notifications',
            },
          ]}
          value={selectedCards}
          onChange={(values) => setSelectedCards(values)}
        />
      ),
      code: `
<CheckboxGroup
  label="Notification Channels"
  variant="card"
  options={[
    { label: 'Push Notifications', value: 'push', description: 'Instant alerts delivered...' },
    { label: 'Email Summaries', value: 'email', description: 'Daily digest of activity...' },
  ]}
  value={selectedCards}
  onChange={(values) => setSelectedCards(values)}
/>`,
    },
    {
      title: 'Multi-Column Grid Layout (columns={2|3|4})',
      description: 'Arrange checkbox items in responsive multi-column grid layouts.',
      render: (
        <CheckboxGroup
          label="Supported Frameworks"
          columns={3}
          options={[
            { label: 'Vite', value: 'vite' },
            { label: 'Next.js', value: 'next' },
            { label: 'Remix', value: 'remix' },
            { label: 'Astro', value: 'astro' },
            { label: 'Gatsby', value: 'gatsby' },
            { label: 'Nuxt', value: 'nuxt' },
          ]}
          value={selectedGrid}
          onChange={(values) => setSelectedGrid(values)}
        />
      ),
      code: `
<CheckboxGroup
  label="Supported Frameworks"
  columns={3}
  options={frameworkOptions}
  value={selectedGrid}
  onChange={(values) => setSelectedGrid(values)}
/>`,
    },
    {
      title: 'Group Error & Validation State',
      description: 'Pass the error prop to display group-level validation messages.',
      render: <ValidationDemo />,
      code: `
const [consents, setConsents] = useState<string[]>([])
const hasError = consents.length < 3 ? "You must select all required consents to proceed." : undefined

<CheckboxGroup
  label="Required Consents"
  options={['Terms of Service', 'Privacy Policy', 'Cookie Tracking']}
  value={consents}
  onChange={(values) => setConsents(values)}
  error={hasError}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="CheckboxGroup"
      description="Renders a collection of checkboxes from a data array, managing group labels, hints, multi-column grid layouts, card variants, and automated Select All parent controls."
      examples={examples}
    />
  )
}
