import { useState } from 'react'
import { Alert } from '@pk-design/react-tailwind'
import { ShieldAlertIcon } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

function DismissibleAlertExample() {
  const [visible, setVisible] = useState(true)
  return visible ? (
    <Alert
      type="info"
      message="You can dismiss this alert."
      removable
      onRemove={() => setVisible(false)}
    />
  ) : (
    <button className="text-sm text-blue-600 underline" onClick={() => setVisible(true)}>
      Show alert again
    </button>
  )
}

export default function AlertDocsPage() {
  const examples = [
    {
      title: 'Types',
      description: 'Four semantic types — each with a matching color, icon, and ring.',
      render: (
        <div className="flex flex-col gap-3 w-full">
          <Alert type="success" message="Your payment was successful!" />
          <Alert type="info" message="New updates are available." />
          <Alert type="warning" message="Your subscription is expiring soon." />
          <Alert type="danger" message="Error saving changes. Please try again." />
        </div>
      ),
      code: `
<Alert type="success" message="Your payment was successful!" />
<Alert type="info" message="New updates are available." />
<Alert type="warning" message="Your subscription is expiring soon." />
<Alert type="danger" message="Error saving changes. Please try again." />`,
    },
    {
      title: 'With Title',
      description:
        'Use the `title` prop to add a bold heading above the message for more structured feedback.',
      render: (
        <div className="flex flex-col gap-3 w-full">
          <Alert type="success" title="Payment complete" message="Your order has been confirmed." />
          <Alert
            type="danger"
            title="Upload failed"
            message="The file exceeds the 10 MB size limit."
          />
        </div>
      ),
      code: `
<Alert type="success" title="Payment complete" message="Your order has been confirmed." />
<Alert type="danger" title="Upload failed" message="The file exceeds the 10 MB size limit." />`,
    },
    {
      title: 'Dismissible',
      description: 'Set `removable` and provide `onRemove` to make the alert dismissible.',
      render: <DismissibleAlertExample />,
      code: `
const [visible, setVisible] = useState(true)

{visible && (
  <Alert
    type="info"
    message="You can dismiss this alert."
    removable
    onRemove={() => setVisible(false)}
  />
)}`,
    },
    {
      title: 'Custom Icon',
      description:
        'Pass any ReactNode to `icon` to replace the built-in icon. Pass `icon={null}` to suppress it entirely.',
      render: (
        <div className="flex flex-col gap-3 w-full">
          <Alert
            type="warning"
            icon={<ShieldAlertIcon className="size-5 shrink-0" />}
            message="Custom icon overrides the default."
          />
          <Alert type="info" icon={null} message="No icon — suppressed with icon={null}." />
        </div>
      ),
      code: `
<Alert
  type="warning"
  icon={<ShieldAlertIcon className="size-5 shrink-0" />}
  message="Custom icon overrides the default."
/>
<Alert type="info" icon={null} message="No icon — suppressed with icon={null}." />`,
    },
    {
      title: 'Rich Content',
      description: 'Use `children` instead of `message` to embed links or formatted content.',
      render: (
        <Alert type="warning">
          Your API key expires in 3 days.{' '}
          <a href="#" className="underline font-medium">
            Renew now
          </a>{' '}
          to avoid service interruptions.
        </Alert>
      ),
      code: `
<Alert type="warning">
  Your API key expires in 3 days.{' '}
  <a href="#" className="underline font-medium">Renew now</a>{' '}
  to avoid service interruptions.
</Alert>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Alert"
      description="Inline feedback banners that communicate the outcome of an action or the state of the system. Supports a title, custom icon, rich children content, and a dismiss button."
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
