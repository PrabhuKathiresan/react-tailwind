import { Alert } from 'react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function AlertDocsPage() {
  const examples = [
    {
      title: 'Types',
      description: 'Different visual alert types to indicate message context.',
      render: (
        <>
          <Alert type="success" message="Your payment was successful!" />
          <Alert type="info" message="New updates available." />
          <Alert type="warning" message="Your subscription is expiring soon." />
          <Alert type="danger" message="Error saving changes." />
        </>
      ),
      code: `
<Alert type="success" message="Your payment was successful!" />
<Alert type="info" message="New updates available." />
<Alert type="warning" message="Your subscription is expiring soon." />
<Alert type="danger" message="Error saving changes." />
      `,
    },
    {
      title: 'Removable',
      description: 'Alert with close/dismiss button.',
      render: (
        <Alert
          type="info"
          removable
          onRemove={() => alert('Alert dismissed')}
          message="You can dismiss this alert."
        />
      ),
      code: `
<Alert
  type="info"
  removable
  onRemove={() => alert('Alert dismissed')}
  message="You can dismiss this alert."
/>
      `,
    },
  ]

  return (
    <DocsPageLayout
      component="Alert"
      description="Alerts provide contextual feedback messages for user actions."
      examples={examples}
    />
  )
}
