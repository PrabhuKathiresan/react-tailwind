import { SelectionBar } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function SelectionBarDocsPage() {
  const examples = [
    {
      title: 'Bulk actions while selecting',
      description:
        "Takes the bottom bar's place on phones, with a labelled button per action in equal columns. Hidden from 768px. Shown here in place rather than fixed to the screen.",
      render: (
        <div className="relative h-24 max-w-sm overflow-hidden rounded-xl border border-dashed border-slate-300 [transform:translateZ(0)] dark:border-gray-700">
          <SelectionBar
            className="md:grid"
            count={3}
            actions={[
              { id: 'print', label: 'Print', onClick: () => {} },
              { id: 'archive', label: 'Archive', onClick: () => {} },
              { id: 'delete', label: 'Delete', danger: true, onClick: () => {} },
            ]}
          />
        </div>
      ),
      code: `
{selecting && (
  <SelectionBar
    count={selectedIds.length}
    actions={[
      { id: 'print', label: 'Print', onClick: printSelected },
      { id: 'archive', label: 'Archive', onClick: archiveSelected },
      { id: 'delete', label: 'Delete', danger: true, onClick: deleteSelected },
    ]}
  />
)}`,
    },
  ]

  return (
    <DocsPageLayout
      component="SelectionBar"
      description="Bulk actions on phones while a list is selecting: replaces the bottom navigation with labelled actions, within thumb reach. Actions are off while nothing is selected."
      examples={examples}
    />
  )
}
