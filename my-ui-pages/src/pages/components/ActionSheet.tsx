import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { ActionSheet, Button } from '@pk-design/react-tailwind'
import { Share2, Edit3, Copy, Trash2, Download, Archive, MoreHorizontal } from 'lucide-react'

function ActionSheetPlayground(props: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  const actions = [
    {
      id: 'share',
      label: 'Share Order',
      icon: <Share2 className="size-4" />,
      description: 'Send link via message or email',
      onClick: () => setLastAction('Share Order'),
    },
    {
      id: 'edit',
      label: 'Edit Details',
      icon: <Edit3 className="size-4" />,
      theme: 'primary' as const,
      onClick: () => setLastAction('Edit Details'),
    },
    {
      id: 'duplicate',
      label: 'Duplicate Item',
      icon: <Copy className="size-4" />,
      onClick: () => setLastAction('Duplicate Item'),
    },
    {
      id: 'delete',
      label: 'Delete Order',
      icon: <Trash2 className="size-4" />,
      theme: 'danger' as const,
      description: 'This action cannot be undone',
      onClick: () => setLastAction('Delete Order'),
    },
  ]

  return (
    <div className="w-full max-w-sm space-y-4">
      <Button theme="primary" size="md" fullWidth onClick={() => setIsOpen(true)}>
        Open Action Sheet
      </Button>

      {lastAction && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-center text-xs text-blue-700 dark:text-blue-300 font-medium">
          Triggered Action: <strong>{lastAction}</strong>
        </div>
      )}

      <ActionSheet
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Order Options"
        description="Select an action for Order #ORD-901"
        actions={actions}
      />
    </div>
  )
}

export default function ActionSheetDocsPage() {
  const [basicOpen, setBasicOpen] = useState(false)
  const [destructiveOpen, setDestructiveOpen] = useState(false)
  const [iconOpen, setIconOpen] = useState(false)

  const examples = [
    {
      title: 'Basic Contextual Actions',
      description:
        'Standard mobile bottom action sheet with title, description, and separate cancel button.',
      render: (
        <div className="w-full max-w-sm">
          <Button theme="secondary" size="sm" onClick={() => setBasicOpen(true)}>
            Open Basic Sheet
          </Button>
          <ActionSheet
            isOpen={basicOpen}
            onClose={() => setBasicOpen(false)}
            title="Manage Item"
            description="Perform quick actions"
            actions={[
              { id: 'view', label: 'View Details', onClick: () => {} },
              { id: 'export', label: 'Export PDF', onClick: () => {} },
              { id: 'archive', label: 'Archive Item', onClick: () => {} },
            ]}
          />
        </div>
      ),
      code: `
<ActionSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Manage Item"
  description="Perform quick actions"
  actions={[
    { id: 'view', label: 'View Details', onClick: () => {} },
    { id: 'export', label: 'Export PDF', onClick: () => {} },
    { id: 'archive', label: 'Archive Item', onClick: () => {} },
  ]}
/>`,
    },
    {
      title: 'Destructive Action Highlights (theme="danger")',
      description:
        'Set theme="danger" on items like Delete to highlight destructive operations with red styling.',
      render: (
        <div className="w-full max-w-sm">
          <Button theme="danger" size="sm" onClick={() => setDestructiveOpen(true)}>
            Open Destructive Sheet
          </Button>
          <ActionSheet
            isOpen={destructiveOpen}
            onClose={() => setDestructiveOpen(false)}
            title="Delete Account Data?"
            description="Choose how you wish to proceed"
            actions={[
              {
                id: 'download',
                label: 'Download Backup First',
                icon: <Download className="size-4" />,
                onClick: () => {},
              },
              {
                id: 'delete',
                label: 'Delete Permanently',
                icon: <Trash2 className="size-4" />,
                theme: 'danger',
                description: 'Irreversible action',
                onClick: () => {},
              },
            ]}
          />
        </div>
      ),
      code: `
<ActionSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete Account Data?"
  actions={[
    { id: 'download', label: 'Download Backup First', icon: <Download /> },
    {
      id: 'delete',
      label: 'Delete Permanently',
      icon: <Trash2 />,
      theme: 'danger',
      description: 'Irreversible action',
    },
  ]}
/>`,
    },
    {
      title: 'Icon Menu with Descriptions',
      description:
        'Pass icons and secondary descriptions to build rich touch-friendly option lists.',
      render: (
        <div className="w-full max-w-sm">
          <Button
            theme="secondary"
            size="sm"
            leftIcon={<MoreHorizontal className="size-4" />}
            onClick={() => setIconOpen(true)}
          >
            More Actions
          </Button>
          <ActionSheet
            isOpen={iconOpen}
            onClose={() => setIconOpen(false)}
            title="Document Actions"
            actions={[
              {
                id: 'share',
                label: 'Share Document',
                icon: <Share2 className="size-4" />,
                description: 'Anyone with link can view',
              },
              {
                id: 'archive',
                label: 'Move to Archive',
                icon: <Archive className="size-4" />,
                description: 'Store in long-term cold storage',
              },
              { id: 'copy', label: 'Make a Copy', icon: <Copy className="size-4" /> },
            ]}
          />
        </div>
      ),
      code: `
<ActionSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Document Actions"
  actions={[
    { id: 'share', label: 'Share Document', icon: <Share2 />, description: 'Anyone with link can view' },
    { id: 'archive', label: 'Move to Archive', icon: <Archive />, description: 'Store in long-term cold storage' },
    { id: 'copy', label: 'Make a Copy', icon: <Copy /> },
  ]}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="ActionSheet"
      description="A mobile-native bottom action sheet component for displaying quick contextual actions, options, and destructive operations with smooth slide-up animation and prominent cancel button."
      playground={{
        render: (props) => <ActionSheetPlayground {...props} />,
        initialProps: {
          showCancelButton: true,
          cancelLabel: 'Cancel',
          dragHandle: true,
        },
      }}
      examples={examples}
    />
  )
}
