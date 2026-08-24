import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { FloatingActionButton } from '@pk-design/react-tailwind'
import { Plus, X, QrCode, FileText, Share2, Send, Heart, ShoppingCart } from 'lucide-react'

function FABPlayground(props: any) {
  const [lastAction, setLastAction] = useState<string | null>(null)

  const speedDialActions = [
    {
      id: 'scan',
      label: 'Scan QR Code',
      icon: <QrCode className="size-4" />,
      onClick: () => setLastAction('Scan QR Code'),
    },
    {
      id: 'create',
      label: 'Create Invoice',
      icon: <FileText className="size-4" />,
      theme: 'primary' as const,
      onClick: () => setLastAction('Create Invoice'),
    },
    {
      id: 'share',
      label: 'Share Link',
      icon: <Share2 className="size-4" />,
      onClick: () => setLastAction('Share Link'),
    },
  ]

  return (
    <div className="w-full max-w-sm h-72 border border-[var(--ui-border)] rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 relative p-4 flex flex-col items-center justify-center text-center">
      <div className="text-xs text-gray-500 max-w-xs">
        {lastAction ? (
          <span className="p-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-700 dark:text-blue-300 font-semibold block">
            Last Action: {lastAction}
          </span>
        ) : (
          'Tap the FAB in the corner to expand speed dial actions!'
        )}
      </div>

      <FloatingActionButton
        {...props}
        icon={<Plus className="size-5" />}
        activeIcon={<X className="size-5" />}
        speedDialActions={speedDialActions}
        position="inline"
        containerClass="absolute bottom-4 right-4"
      />
    </div>
  )
}

export default function FloatingActionButtonDocsPage() {
  const [clickedMsg, setClickedMsg] = useState<string | null>(null)
  const examples = [
    {
      title: 'Extended Icon + Text Pill Layout',
      description:
        'Pass the label prop to create an extended pill FAB for prominent primary actions (e.g. "+ Create Order").',
      render: (
        <div className="w-full max-w-sm h-40 rounded-2xl border border-[var(--ui-border)] bg-white dark:bg-gray-800 relative p-4 flex items-center justify-center">
          <FloatingActionButton
            icon={<Plus className="size-4" />}
            label="New Order"
            position="inline"
            variant="primary"
            onClick={() => setClickedMsg('Clicked Extended FAB (+ New Order)')}
          />
        </div>
      ),
      code: `
<FloatingActionButton
  icon={<Plus />}
  label="New Order"
  variant="primary"
  onClick={() => handleCreate()}
/>`,
    },
    {
      title: 'Expandable Speed Dial Action Menu',
      description:
        'Pass speedDialActions to render an expandable vertical stack of sub-actions with backdrop blur overlay.',
      render: (
        <div className="w-full max-w-sm h-64 rounded-2xl border border-[var(--ui-border)] bg-white dark:bg-gray-800 relative p-4 flex items-center justify-center">
          <div className="text-xs text-gray-400 text-center">
            Tap button to expand speed dial options
          </div>
          <FloatingActionButton
            icon={<Plus className="size-5" />}
            activeIcon={<X className="size-5" />}
            speedDialActions={[
              {
                id: 'scan',
                label: 'Scan Barcode',
                icon: <QrCode className="size-4" />,
                onClick: () => setClickedMsg('Scan Barcode'),
              },
              {
                id: 'send',
                label: 'Send Message',
                icon: <Send className="size-4" />,
                theme: 'primary',
                onClick: () => setClickedMsg('Send Message'),
              },
            ]}
            position="inline"
            containerClass="absolute bottom-4 right-4"
          />
        </div>
      ),
      code: `
<FloatingActionButton
  icon={<Plus />}
  activeIcon={<X />}
  speedDialActions={[
    { id: 'scan', label: 'Scan Barcode', icon: <QrCode /> },
    { id: 'send', label: 'Send Message', icon: <Send />, theme: 'primary' },
  ]}
/>`,
    },
    {
      title: 'Theme & Size Variants',
      description:
        'Supports primary, secondary, danger, and dark themes across sm, md, and lg sizes.',
      render: (
        <div className="flex flex-wrap items-center gap-4 p-4 border border-[var(--ui-border)] rounded-2xl bg-gray-50 dark:bg-gray-900">
          <FloatingActionButton
            icon={<Plus className="size-4" />}
            position="inline"
            variant="primary"
            size="sm"
          />
          <FloatingActionButton
            icon={<Heart className="size-5" />}
            position="inline"
            variant="danger"
            size="md"
          />
          <FloatingActionButton
            icon={<ShoppingCart className="size-5" />}
            position="inline"
            variant="secondary"
            size="md"
          />
          <FloatingActionButton
            icon={<Plus className="size-6" />}
            position="inline"
            variant="dark"
            size="lg"
          />
        </div>
      ),
      code: `
<FloatingActionButton icon={<Plus />} variant="primary" size="sm" />
<FloatingActionButton icon={<Heart />} variant="danger" size="md" />
<FloatingActionButton icon={<ShoppingCart />} variant="secondary" size="md" />
<FloatingActionButton icon={<Plus />} variant="dark" size="lg" />`,
    },
  ]

  return (
    <div className="space-y-4">
      {clickedMsg && (
        <div className="p-3 text-xs font-semibold rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
          Action triggered: {clickedMsg}
        </div>
      )}
      <DocsPageLayout
        component="FloatingActionButton"
        description="A mobile-native floating action button that provides primary screen actions with support for circular or extended pill layouts, theme variants, and expandable Speed Dial action menus."
        playground={{
          render: (props) => <FABPlayground {...props} />,
          initialProps: {
            variant: 'primary',
            size: 'md',
          },
        }}
        examples={examples}
      />
    </div>
  )
}
