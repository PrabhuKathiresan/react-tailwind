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
          <Input size="sm" label="Small Input (sm)" placeholder="Compact 28px height" />
          <Input size="md" label="Medium Input (md, default)" placeholder="Standard 36px height" />
          <Input size="lg" label="Large Input (lg)" placeholder="Prominent 44px height" />
        </div>
      ),
      code: `
<Input size="sm" label="Small Input (sm)" placeholder="Compact 28px height" />
<Input size="md" label="Medium Input (md)" placeholder="Standard 36px height" />
<Input size="lg" label="Large Input (lg)" placeholder="Prominent 44px height" />`,
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
      description="A flexible text input control supporting responsive size scales (sm/md/lg), 1-click clearable buttons, prefix/suffix addons, character counters, leading/trailing icons, and validation errors."
      examples={examples}
    />
  )
}
