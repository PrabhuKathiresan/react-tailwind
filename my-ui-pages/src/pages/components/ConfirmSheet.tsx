import { useState } from 'react'
import { Button, ConfirmSheet } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function ConfirmSheetDocsPage() {
  const [open, setOpen] = useState(false)

  const examples = [
    {
      title: 'Asking before a delete',
      description:
        'A bottom sheet on phones, with the buttons stacked full width in thumb reach; a centred dialog from 768px. Name the confirming button for what it does, and say what is lost or kept.',
      render: (
        <>
          <Button theme="danger" variant="outlined" onClick={() => setOpen(true)}>
            Delete vendor
          </Button>
          <ConfirmSheet
            isOpen={open}
            title="Delete Sharma Traders?"
            description="It has 3 purchases. They keep the vendor's name, but you can't choose this vendor for new purchases."
            confirmLabel="Delete"
            danger
            onConfirm={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </>
      ),
      code: `
<ConfirmSheet
  isOpen={Boolean(target)}
  title={\`Delete \${target.name}?\`}
  description="It has 3 purchases. They keep the vendor's name, but you can't choose this vendor for new purchases."
  confirmLabel="Delete"
  danger
  isPending={deleteMutation.isPending}
  onConfirm={() => deleteMutation.mutate(target.id)}
  onCancel={() => setTarget(null)}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="ConfirmSheet"
      description="Asks before an action that's hard to undo, instead of the browser's confirm(): a bottom sheet on phones and a centred dialog on wider screens."
      examples={examples}
    />
  )
}
