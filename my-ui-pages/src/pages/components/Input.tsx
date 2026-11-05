import { useState } from 'react'
import { Input } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Search, Mail } from 'lucide-react'

export default function InputDocsPage() {
  const [clearableText, setClearableText] = useState('John Doe')

  const examples = [
    {
      title: 'Size Scales (sm, md, lg)',
      description:
        'Choose from 3 responsive sizing scales to fit tight data toolbars or prominent hero forms.',
      render: (
        <div className="max-w-md flex flex-col gap-4">
          <Input size="sm" label="Small Input (sm)" placeholder="Compact 32px height" />
          <Input size="md" label="Medium Input (md, default)" placeholder="Standard 40px height" />
          <Input size="lg" label="Large Input (lg)" placeholder="Prominent 48px height" />
        </div>
      ),
      code: `
<Input size="sm" label="Small Input (sm)" placeholder="Compact 32px height" />
<Input size="md" label="Medium Input (md)" placeholder="Standard 40px height" />
<Input size="lg" label="Large Input (lg)" placeholder="Prominent 48px height" />`,
    },
    {
      title: '1-Click Clearable Field',
      description:
        'Use clearable={true} to automatically display a 1-click clear ✕ button when text is entered.',
      render: (
        <div className="max-w-md">
          <Input
            label="Full Name"
            clearable
            value={clearableText}
            onChange={(e) => setClearableText(e.target.value)}
            onClear={() => setClearableText('')}
            placeholder="Type your name..."
          />
        </div>
      ),
      code: `
const [text, setText] = useState('John Doe')

<Input
  label="Full Name"
  clearable
  value={text}
  onChange={(e) => setText(e.target.value)}
  onClear={() => setText('')}
/>`,
    },
    {
      title: 'Prefix & Suffix Adornments',
      description: 'Prepend static text like https:// or append domain suffixes like .com.',
      render: (
        <div className="max-w-md flex flex-col gap-4">
          <Input
            label="Custom Subdomain"
            prefix="https://"
            suffix=".acme.io"
            placeholder="my-workspace"
          />
          <Input label="Price" prefix="$" suffix="USD" placeholder="0.00" />
        </div>
      ),
      code: `
<Input
  label="Custom Subdomain"
  prefix="https://"
  suffix=".acme.io"
  placeholder="my-workspace"
/>
<Input
  label="Price"
  prefix="$"
  suffix="USD"
  placeholder="0.00"
/>`,
    },
    {
      title: 'Live Character Counter & Max Length',
      description:
        'Pass showCount and maxLength to render a live character counter below the field.',
      render: (
        <div className="max-w-md">
          <Input
            label="Profile Handle"
            placeholder="handle_name"
            maxLength={15}
            showCount
            defaultValue="tech_lead"
          />
        </div>
      ),
      code: `
<Input
  label="Profile Handle"
  placeholder="handle_name"
  maxLength={15}
  showCount
  defaultValue="tech_lead"
/>`,
    },
    {
      title: 'Leading & Trailing Icon Groups',
      description:
        'Embed Lucide icons or interactive buttons in the leftGroup or rightGroup slots.',
      render: (
        <div className="max-w-md flex flex-col gap-4">
          <Input
            label="Search Directory"
            placeholder="Search team members..."
            leftGroup={<Search className="size-4" />}
          />
          <Input
            label="Email Address"
            placeholder="you@company.com"
            leftGroup={<Mail className="size-4" />}
          />
        </div>
      ),
      code: `
<Input
  label="Search Directory"
  placeholder="Search team members..."
  leftGroup={<Search className="size-4" />}
/>
<Input
  label="Email Address"
  placeholder="you@company.com"
  leftGroup={<Mail className="size-4" />}
/>`,
    },
    {
      title: 'Date & Time Fields',
      description:
        "Native date and time fields take the same height as a text field at every size, including in mobile browsers, which style them differently. Date, month, week and datetime-local fields show one calendar icon in place of the browser's own, except in Firefox, which always draws its own. Tapping anywhere on a phone opens the picker. A rightGroup you pass replaces the icon.",
      render: (
        <div className="max-w-md grid grid-cols-2 items-start gap-3">
          <Input label="Purchase date" id="docs-date" type="date" defaultValue="2026-11-04" />
          <Input label="Bill number" id="docs-bill" placeholder="e.g. PO-2026-001" />
          <Input label="Month" id="docs-month" type="month" defaultValue="2026-11" />
          <Input label="Time" id="docs-time" type="time" defaultValue="09:30" />
        </div>
      ),
      code: `
<Input label="Purchase date" id="purchase-date" type="date" />
<Input label="Bill number" id="bill-number" placeholder="e.g. PO-2026-001" />
<Input label="Month" id="month" type="month" />
<Input label="Time" id="time" type="time" />`,
    },
    {
      title: 'Error & Helper Text',
      description: 'Display validation error styling or subtle guidance helper text.',
      render: (
        <div className="max-w-md flex flex-col gap-4">
          <Input
            label="Email Address"
            placeholder="you@domain.com"
            error="Please enter a valid email address"
          />
          <Input
            label="Username"
            placeholder="john_doe"
            helperText="Username can contain letters, numbers, and underscores."
          />
        </div>
      ),
      code: `
<Input
  label="Email Address"
  error="Please enter a valid email address"
/>
<Input
  label="Username"
  helperText="Username can contain letters, numbers, and underscores."
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Input"
      description="A flexible text input control supporting responsive size scales (sm/md/lg), 1-click clearable buttons, prefix/suffix addons, character counters, leading/trailing icons, native date and time fields, and validation errors."
      examples={examples}
    />
  )
}
