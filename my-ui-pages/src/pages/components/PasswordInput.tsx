import { useState } from 'react'
import { PasswordInput, PASSWORD_PLACEHOLDER } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export const PasswordInputDocsPage = () => {
  const [password, setPassword] = useState('')

  return (
    <DocsPageLayout
      component="PasswordInput"
      description="A secure text field with a built-in toggle that lets users reveal or mask their password without losing focus. Extends Input directly, so it inherits the full label, hint, error messaging, and icon slot API without any additional configuration."
      examples={[
        {
          title: 'Default Password Input',
          description:
            'By default, the password is masked and can be toggled visible with the eye icon.',
          code: `
<PasswordInput
  label="Password"
  placeholder="${PASSWORD_PLACEHOLDER}"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>`,
          render: (
            <div className="max-w-80">
              <PasswordInput
                label="Password"
                placeholder={PASSWORD_PLACEHOLDER}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ),
        },
        {
          title: 'Password Input with Error Message',
          description:
            'You can display validation messages below the input by passing the `error` and `showErrorMessage` props.',
          code: `
<PasswordInput
  label="Password"
  error="Password must contain at least 8 characters"
  showErrorMessage
/>`,
          render: (
            <div className="max-w-80">
              <PasswordInput
                label="Password"
                error="Password must contain at least 8 characters"
                showErrorMessage
              />
            </div>
          ),
        },
      ]}
    />
  )
}

export default PasswordInputDocsPage
