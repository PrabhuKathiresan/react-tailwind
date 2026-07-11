import { Badge } from '@pk-design/react-tailwind'
import { StarIcon, TagIcon } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function BadgeDocsPage() {
  const examples = [
    {
      title: 'Themes',
      description: 'Five semantic color themes to convey different states or categories.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Badge theme="success">Success</Badge>
          <Badge theme="danger">Danger</Badge>
          <Badge theme="warning">Warning</Badge>
          <Badge theme="info">Info</Badge>
          <Badge theme="secondary">Secondary</Badge>
        </div>
      ),
      code: `
<Badge theme="success">Success</Badge>
<Badge theme="danger">Danger</Badge>
<Badge theme="warning">Warning</Badge>
<Badge theme="info">Info</Badge>
<Badge theme="secondary">Secondary</Badge>`,
    },
    {
      title: 'Sizes',
      description: 'Use `size` to control padding. `md` is the default; `sm` is more compact.',
      render: (
        <div className="flex gap-3 flex-wrap items-center">
          <Badge theme="info" size="sm">
            Small
          </Badge>
          <Badge theme="info" size="md">
            Medium (default)
          </Badge>
          <Badge theme="success" size="sm" rounded>
            Small pill
          </Badge>
          <Badge theme="success" size="md" rounded>
            Medium pill
          </Badge>
        </div>
      ),
      code: `
<Badge theme="info" size="sm">Small</Badge>
<Badge theme="info" size="md">Medium (default)</Badge>
<Badge theme="success" size="sm" rounded>Small pill</Badge>
<Badge theme="success" size="md" rounded>Medium pill</Badge>`,
    },
    {
      title: 'Rounded',
      description: 'Add the `rounded` prop to create pill-style badges.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Badge theme="success" rounded>
            Success
          </Badge>
          <Badge theme="danger" rounded>
            Danger
          </Badge>
          <Badge theme="warning" rounded>
            Warning
          </Badge>
          <Badge theme="info" rounded>
            Info
          </Badge>
        </div>
      ),
      code: `
<Badge theme="success" rounded>Success</Badge>
<Badge theme="danger" rounded>Danger</Badge>
<Badge theme="warning" rounded>Warning</Badge>
<Badge theme="info" rounded>Info</Badge>`,
    },
    {
      title: 'With Icon',
      description:
        'Pass any ReactNode to `icon` to render a leading icon before the label. Left padding adjusts automatically.',
      render: (
        <div className="flex gap-3 flex-wrap items-center">
          <Badge theme="success" icon={<StarIcon className="size-3" />}>
            Featured
          </Badge>
          <Badge theme="info" icon={<TagIcon className="size-3" />} rounded>
            Labelled
          </Badge>
          <Badge theme="warning" icon={<span>⚠</span>} size="sm">
            Warning
          </Badge>
        </div>
      ),
      code: `
<Badge theme="success" icon={<StarIcon className="size-3" />}>Featured</Badge>
<Badge theme="info" icon={<TagIcon className="size-3" />} rounded>Labelled</Badge>
<Badge theme="warning" icon={<span>⚠</span>} size="sm">Warning</Badge>`,
    },
    {
      title: 'Removable',
      description:
        'Set `removable` to show a close icon. The `onRemove` callback fires when it is clicked or activated via keyboard.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Badge theme="info" removable onRemove={() => alert('Removed Info')}>
            Info
          </Badge>
          <Badge theme="success" removable onRemove={() => alert('Removed Success')}>
            Success
          </Badge>
          <Badge theme="danger" removable onRemove={() => alert('Removed Danger')}>
            Danger
          </Badge>
        </div>
      ),
      code: `
<Badge theme="info" removable onRemove={() => alert('Removed Info')}>Info</Badge>
<Badge theme="success" removable onRemove={() => alert('Removed Success')}>Success</Badge>
<Badge theme="danger" removable onRemove={() => alert('Removed Danger')}>Danger</Badge>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Badge"
      description="Compact labels for surfacing status, categories, counts, or metadata inline with content. Supports semantic themes, pill or squared shape, sizes, leading icons, and an optional dismiss callback."
      playground={{
        render: (props) => <Badge {...props}>Badge label</Badge>,
        initialProps: { theme: 'info', rounded: false, removable: false, size: 'md' },
      }}
      examples={examples}
    />
  )
}
