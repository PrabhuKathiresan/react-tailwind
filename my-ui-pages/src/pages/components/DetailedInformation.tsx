import { DetailedInformation, Button, StatusPill } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function DetailedInformationDocsPage() {
  return (
    <DocsPageLayout
      component="DetailedInformation"
      description="A structured key-value display for detail views, profile pages, and summary panels. Supports multi-column grid layouts, stacked vertical orientations, copyable fields, top-right header actions, and card container variants."
      playground={{
        render: (props) => (
          <DetailedInformation
            {...props}
            title="User Information"
            details={[
              { label: 'Name', value: 'Prabhu Kathiresan' },
              { label: 'Role', value: 'Lead Developer' },
              { label: 'Status', value: <StatusPill color="success">Active</StatusPill> },
              { label: 'Plan', value: 'Enterprise' },
            ]}
          />
        ),
      }}
      examples={[
        {
          title: 'Default Description List',
          description: 'Basic 1-column layout showing detail rows with title and subtitle.',
          render: (
            <DetailedInformation
              title="User Information"
              subTitle="Personal and account details"
              details={[
                { label: 'Name', value: 'Prabhu Kathiresan' },
                { label: 'Email', value: 'prabhu@example.com', copyable: true },
                { label: 'Role', value: 'Founder' },
                { label: 'Phone', value: '+91 9876543210', copyable: true },
              ]}
            />
          ),
          code: `
<DetailedInformation
  title="User Information"
  subTitle="Personal and account details"
  details={[
    { label: 'Name', value: 'Prabhu Kathiresan' },
    { label: 'Email', value: 'prabhu@example.com', copyable: true },
    { label: 'Role', value: 'Founder' },
    { label: 'Phone', value: '+91 9876543210', copyable: true },
  ]}
/>
          `,
        },
        {
          title: 'Multi-Column Grid with Card Variant',
          description: 'Renders key-value items in a 3-column grid layout inside a card surface.',
          render: (
            <DetailedInformation
              title="Order Summary"
              subTitle="Invoice #INV-2026-8812"
              variant="card"
              columns={3}
              action={<StatusPill color="success">Paid</StatusPill>}
              details={[
                { label: 'Customer', value: 'Acme Corporation' },
                { label: 'Invoice Date', value: 'Aug 15, 2026' },
                { label: 'Payment Method', value: 'Credit Card (•••• 4242)' },
                { label: 'Subtotal', value: '$1,250.00' },
                { label: 'Tax (18%)', value: '$225.00' },
                {
                  label: 'Total Amount',
                  value: <strong className="text-gray-900 dark:text-white">$1,475.00</strong>,
                },
              ]}
            />
          ),
          code: `
<DetailedInformation
  title="Order Summary"
  subTitle="Invoice #INV-2026-8812"
  variant="card"
  columns={3}
  action={<StatusPill color="success">Paid</StatusPill>}
  details={[
    { label: 'Customer', value: 'Acme Corporation' },
    { label: 'Invoice Date', value: 'Aug 15, 2026' },
    { label: 'Payment Method', value: 'Credit Card (•••• 4242)' },
    { label: 'Subtotal', value: '$1,250.00' },
    { label: 'Tax (18%)', value: '$225.00' },
    { label: 'Total Amount', value: <strong className="text-gray-900 dark:text-white">$1,475.00</strong> },
  ]}
/>
          `,
        },
        {
          title: 'Copyable Fields & Custom Fallbacks',
          description:
            'Enable click-to-copy buttons for API keys/IDs and customize missing value placeholders.',
          render: (
            <DetailedInformation
              title="Developer API Settings"
              bordered
              emptyValue="Not configured"
              action={
                <Button size="sm" variant="outlined">
                  Regenerate Key
                </Button>
              }
              details={[
                { label: 'Environment', value: 'Production' },
                { label: 'API Key', value: 'pk_live_9921847120481239', copyable: true },
                { label: 'Webhook Secret', value: 'whsec_882910381920', copyable: true },
                { label: 'IP Whitelist', value: undefined },
                { label: 'Fallback Route', value: undefined, emptyValue: 'Default (us-east-1)' },
              ]}
            />
          ),
          code: `
<DetailedInformation
  title="Developer API Settings"
  bordered
  emptyValue="Not configured"
  action={<Button size="sm" variant="secondary">Regenerate Key</Button>}
  details={[
    { label: 'Environment', value: 'Production' },
    { label: 'API Key', value: 'pk_live_9921847120481239', copyable: true },
    { label: 'Webhook Secret', value: 'whsec_882910381920', copyable: true },
    { label: 'IP Whitelist', value: undefined },
    { label: 'Fallback Route', value: undefined, emptyValue: 'Default (us-east-1)' },
  ]}
/>
          `,
        },
        {
          title: 'Compact & Vertical Layout',
          description:
            'Presents dense metadata with vertical stacked labels and compact row padding.',
          render: (
            <DetailedInformation
              title="System Health"
              compact
              layout="vertical"
              columns={4}
              details={[
                { label: 'Uptime', value: '99.98%' },
                { label: 'Memory Usage', value: '4.2 / 16 GB' },
                { label: 'Active Sessions', value: '1,420' },
                { label: 'Latency', value: '14 ms' },
              ]}
            />
          ),
          code: `
<DetailedInformation
  title="System Health"
  compact
  layout="vertical"
  columns={4}
  details={[
    { label: 'Uptime', value: '99.98%' },
    { label: 'Memory Usage', value: '4.2 / 16 GB' },
    { label: 'Active Sessions', value: '1,420' },
    { label: 'Latency', value: '14 ms' },
  ]}
/>
          `,
        },
      ]}
    />
  )
}
