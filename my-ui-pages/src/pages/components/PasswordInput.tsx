import { useState } from 'react'
import { PasswordInput } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Lock } from 'lucide-react'

export default function PasswordInputDocsPage() {
  const [password, setPassword] = useState('P@ssw0rd2026!')

  const examples = [
    {
      title: 'Password Strength Indicator',
      description:
        'Use showStrength={true} to automatically calculate and render a visual password strength progress bar.',
      render: (
        <div className="max-w-md">
          <PasswordInput
            label="Create New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showStrength
            leftGroup={<Lock className="size-4" />}
            helperText="Include uppercase letters, numbers, and symbols for a strong score."
          />
        </div>
      ),
      code: `
const [password, setPassword] = useState('P@ssw0rd2026!')

<PasswordInput
  label="Create New Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  showStrength
  leftGroup={<Lock className="size-4" />}
  helperText="Include uppercase letters, numbers, and symbols for a strong score."
/>`,
    },
    {
      title: 'Size Scales (sm, md, lg)',
      description: 'Choose from 3 responsive sizing scales.',
      render: (
        <div className="max-w-md flex flex-col gap-4">
          <PasswordInput size="sm" label="Small (sm)" defaultValue="secret123" />
          <PasswordInput size="md" label="Medium (md, default)" defaultValue="secret123" />
          <PasswordInput size="lg" label="Large (lg)" defaultValue="secret123" />
        </div>
      ),
      code: `
<PasswordInput size="sm" label="Small (sm)" />
<PasswordInput size="md" label="Medium (md)" />
<PasswordInput size="lg" label="Large (lg)" />`,
    },
    {
      title: 'Validation Error State',
      description: 'Display validation error messages when password criteria fail.',
      render: (
        <div className="max-w-md">
          <PasswordInput
            label="Current Password"
            defaultValue="123"
            error="Password must contain at least 8 characters"
          />
        </div>
      ),
      code: `
<PasswordInput
  label="Current Password"
  error="Password must contain at least 8 characters"
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="PasswordInput"
      description="A secure text field with built-in password visibility toggle buttons, live strength progress bar evaluation, ref forwarding for form libraries, size scales, and icon groups."
      examples={examples}
    />
  )
}
