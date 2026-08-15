import { Button } from '@pk-design/react-tailwind'
import { Plus, ArrowRight, Check, AlertTriangle, Trash2, Download } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function ButtonDocsPage() {
  const examples = [
    {
      title: 'Dedicated Icon Slots (leftIcon & rightIcon)',
      description: 'Use leftIcon and rightIcon for clean, automated icon placement and alignment.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button leftIcon={<Plus className="size-4" />}>Create Project</Button>
          <Button theme="secondary" rightIcon={<ArrowRight className="size-4" />}>
            Continue
          </Button>
          <Button theme="primary" variant="outlined" leftIcon={<Download className="size-4" />}>
            Export File
          </Button>
        </div>
      ),
      code: `
<Button leftIcon={<Plus className="size-4" />}>Create Project</Button>
<Button theme="secondary" rightIcon={<ArrowRight className="size-4" />}>Continue</Button>
<Button theme="primary" variant="outlined" leftIcon={<Download className="size-4" />}>Export File</Button>`,
    },
    {
      title: 'Expanded Color Themes (Primary, Secondary, Danger, Success & Warning)',
      description: 'Buttons support 5 semantic themes across filled, outlined, and plain variants.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button theme="primary">Primary</Button>
          <Button theme="secondary">Secondary</Button>
          <Button theme="danger" leftIcon={<Trash2 className="size-4" />}>
            Danger
          </Button>
          <Button theme="success" leftIcon={<Check className="size-4" />}>
            Success
          </Button>
          <Button theme="warning" leftIcon={<AlertTriangle className="size-4" />}>
            Warning
          </Button>
        </div>
      ),
      code: `
<Button theme="primary">Primary</Button>
<Button theme="secondary">Secondary</Button>
<Button theme="danger" leftIcon={<Trash2 className="size-4" />}>Danger</Button>
<Button theme="success" leftIcon={<Check className="size-4" />}>Success</Button>
<Button theme="warning" leftIcon={<AlertTriangle className="size-4" />}>Warning</Button>`,
    },
    {
      title: 'Variants',
      description: 'Choose between filled default, bordered outlined, or text-only plain variants.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button variant="default">Default (Filled)</Button>
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
      description: 'Four consistent sizes (xs: 28px, sm: 32px, md: 36px, lg: 40px height).',
      render: (
        <div className="flex gap-3 flex-wrap items-center">
          <Button size="xs">XS (28px)</Button>
          <Button size="sm">Small (32px)</Button>
          <Button size="md">Medium (36px)</Button>
          <Button size="lg">Large (40px)</Button>
        </div>
      ),
      code: `
<Button size="xs">XS</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
    },
    {
      title: 'Full Width Button',
      description: 'Use fullWidth to stretch the button to fill 100% of container width.',
      render: (
        <div className="max-w-md w-full">
          <Button fullWidth theme="primary" leftIcon={<Plus className="size-4" />}>
            Full Width Action Button
          </Button>
        </div>
      ),
      code: `
<Button fullWidth theme="primary" leftIcon={<Plus className="size-4" />}>
  Full Width Action Button
</Button>`,
    },
    {
      title: 'Loading States',
      description:
        'Set loading=true to automatically show a spinner loader and disable interaction.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button loading>Saving...</Button>
          <Button theme="secondary" loading loadingText="Processing..." />
          <Button theme="danger" loading iconOnly aria-label="Deleting" />
        </div>
      ),
      code: `
<Button loading>Saving...</Button>
<Button theme="secondary" loading loadingText="Processing..." />
<Button theme="danger" loading iconOnly aria-label="Deleting" />`,
    },
  ]

  return (
    <DocsPageLayout
      component="Button"
      description="The primary trigger for user actions. Supports 5 semantic themes (primary, secondary, danger, success, warning), 3 visual variants (default, outlined, plain), dedicated icon slots (leftIcon, rightIcon), full-width layout, rounded pill styling, and animated loading states."
      playground={{
        render: (props) => <Button {...props}>Click me</Button>,
        initialProps: { theme: 'primary', variant: 'default', size: 'md' },
      }}
      examples={examples}
    />
  )
}
