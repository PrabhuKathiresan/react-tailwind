import { Button } from '@pk-design/react-tailwind'
import { Loader2, Plus } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function ButtonDocsPage() {
  const examples = [
    {
      title: 'Themes',
      description: 'Buttons support multiple themes for different emphasis levels.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button theme="primary">Primary</Button>
          <Button theme="secondary">Secondary</Button>
          <Button theme="danger">Danger</Button>
        </div>
      ),
      code: `
<Button theme="primary">Primary</Button>
<Button theme="secondary">Secondary</Button>
<Button theme="danger">Danger</Button>`,
    },
    {
      title: 'Variants',
      description: 'Use variants to control how the button appears: filled, outlined, or plain.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button variant="default">Default</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="plain">Plain</Button>
        </div>
      ),
      code: `
<Button variant="default">Default</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="plain">Plain</Button>`,
    },
    {
      title: 'Sizes',
      description: 'Buttons can be sized to fit different UI contexts.',
      render: (
        <div className="flex gap-3 flex-wrap items-center">
          <Button size="xs">XS</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      ),
      code: `
<Button size="xs">XS</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
    },
    {
      title: 'Disabled State',
      description: 'Use the disabled prop to prevent interactions.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button disabled>Disabled</Button>
          <Button theme="secondary" disabled>
            Secondary Disabled
          </Button>
        </div>
      ),
      code: `
<Button disabled>Disabled</Button>
<Button theme="secondary" disabled>Secondary Disabled</Button>`,
    },
    {
      title: 'Loading State',
      description: 'Use the `loading` and `loadingText` props to indicate progress.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button loading>Loading...</Button>
          <Button theme="secondary" loading loadingText="Saving..." />
          <Button theme="danger" loading>
            <Loader2 className="w-4 h-4 animate-spin" />
            Deleting...
          </Button>
        </div>
      ),
      code: `
<Button loading>Loading...</Button>
<Button theme="secondary" loading loadingText="Saving..." />
<Button theme="danger" loading>
  <Loader2 className="w-4 h-4 animate-spin" />
  Deleting...
</Button>`,
    },
    {
      title: 'Icon Buttons',
      description: 'You can render buttons with icons or use `iconOnly` for compact icon buttons.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button>
            <Plus className="size-5 mr-1" />
            Add Item
          </Button>
          <Button theme="secondary" iconOnly>
            <Plus className="size-5" />
          </Button>
        </div>
      ),
      code: `
<Button>
  <Plus className="size-5 mr-1" />
  Add Item
</Button>

<Button theme="secondary" iconOnly>
  <Plus className="size-5" />
</Button>`,
    },
    {
      title: 'Rounded Buttons',
      description: 'Use `rounded` for pill-like buttons.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button rounded>Rounded</Button>
          <Button theme="secondary" rounded>
            Secondary Rounded
          </Button>
        </div>
      ),
      code: `
<Button rounded>Rounded</Button>
<Button theme="secondary" rounded>Secondary Rounded</Button>`,
    },
  ]
  return (
    <DocsPageLayout
      component="Button"
      description="The primary trigger for user actions such as form submissions, confirmations, and navigation. Choose from four semantic color themes, three visual variants (solid, outline, ghost), three sizes, optional leading or trailing icons, full-width layout, and an animated loading state that prevents double submission."
      playground={{
        render: (props) => <Button {...props}>Click me</Button>,
        initialProps: { theme: 'primary', variant: 'default', size: 'md' },
      }}
      examples={examples}
    />
  )
}
