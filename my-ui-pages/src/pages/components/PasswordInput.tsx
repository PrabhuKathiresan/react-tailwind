import { useState } from 'react'
import { PasswordInput, PASSWORD_PLACEHOLDER } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export const PasswordInputDocsPage = () => {
  const [password, setPassword] = useState('')

  return (
    <DocsPageLayout
      component="PasswordInput"
      description="The PasswordInput component extends the Input component to include a built-in show/hide password toggle button."
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
            <PasswordInput
              label="Password"
              placeholder={PASSWORD_PLACEHOLDER}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
            <PasswordInput
              label="Password"
              error="Password must contain at least 8 characters"
              showErrorMessage
            />
          ),
        },
      ]}
    />
  )
}

export default PasswordInputDocsPage
