import { StatusPill } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function StatusPillDocsPage() {
  const examples = [
    {
      title: 'Semantic Themes',
      description: 'Five soft background tones with high-contrast text and indicator dots.',
      render: (
        <div className="flex gap-3 flex-wrap items-center">
          <StatusPill theme="success">Paid</StatusPill>
          <StatusPill theme="warning">Pending</StatusPill>
          <StatusPill theme="danger">Overdue</StatusPill>
          <StatusPill theme="info">Processing</StatusPill>
          <StatusPill theme="secondary">Draft</StatusPill>
        </div>
      ),
      code: `
<StatusPill theme="success">Paid</StatusPill>
<StatusPill theme="warning">Pending</StatusPill>
<StatusPill theme="danger">Overdue</StatusPill>
<StatusPill theme="info">Processing</StatusPill>
<StatusPill theme="secondary">Draft</StatusPill>`,
    },
    {
      title: 'Pulsing Animation',
      description: 'Set `pulse` to enable a subtle indicator pulse for active or urgent states.',
      render: (
        <div className="flex gap-3 flex-wrap items-center">
          <StatusPill theme="danger" pulse>
            Critical Overdue
          </StatusPill>
          <StatusPill theme="warning" pulse>
            Syncing…
          </StatusPill>
          <StatusPill theme="info" pulse>
            Live Activity
          </StatusPill>
        </div>
      ),
      code: `
<StatusPill theme="danger" pulse>Critical Overdue</StatusPill>
<StatusPill theme="warning" pulse>Syncing…</StatusPill>
<StatusPill theme="info" pulse>Live Activity</StatusPill>`,
    },
    {
      title: 'Sizes & Dot Options',
      description: 'Control size (`sm` or `md`) and toggle indicator dot visibility using `dot`.',
      render: (
        <div className="flex gap-3 flex-wrap items-center">
          <StatusPill size="sm" theme="success">
            Small
          </StatusPill>
          <StatusPill size="md" theme="success">
            Medium
          </StatusPill>
          <StatusPill theme="info" dot={false}>
            No Dot Indicator
          </StatusPill>
        </div>
      ),
      code: `
<StatusPill size="sm" theme="success">Small</StatusPill>
<StatusPill size="md" theme="success">Medium</StatusPill>
<StatusPill theme="info" dot={false}>No Dot Indicator</StatusPill>`,
    },
  ]

  return (
    <DocsPageLayout
      component="StatusPill"
      description="Status indicator pill with colored indicator dots, soft background fills, and optional pulse animations for high-visibility state communication."
      playground={{
        render: (props) => <StatusPill {...props}>Status Pill</StatusPill>,
        initialProps: { theme: 'success', size: 'sm', dot: true, pulse: false },
      }}
      examples={examples}
    />
  )
}
