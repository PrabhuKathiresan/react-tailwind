import { Alert } from '@pk-design/react-tailwind'
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
      description="Inline feedback banners that communicate the outcome of an action or the state of the system. Four semantic types — success, info, warning, and danger — each with a matching color and icon. Supports an optional title, custom content, and a dismiss button for transient messages."
      playground={{
        render: (props) => (
          <Alert
            type={props.type || 'info'}
            message={props.message || 'This is an alert message.'}
            removable={props.removable}
            onRemove={() => {}}
          />
        ),
        initialProps: { type: 'info', message: 'This is an alert message.', removable: false },
      }}
      examples={examples}
    />
  )
}
