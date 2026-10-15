import { useState } from 'react'
import { Button } from '@pk-design/react-tailwind'
import {
  Plus,
  ArrowRight,
  Check,
  AlertTriangle,
  Trash2,
  Download,
  Bold,
  Italic,
  X,
  ExternalLink,
} from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

function ToggleDemo() {
  const [bold, setBold] = useState(true)
  const [italic, setItalic] = useState(false)
  return (
    <div className="flex gap-2">
      <Button
        theme="secondary"
        variant="plain"
        iconOnly
        aria-label="Bold"
        active={bold}
        onClick={() => setBold((v) => !v)}
      >
        <Bold className="size-4" />
      </Button>
      <Button
        theme="secondary"
        variant="plain"
        iconOnly
        aria-label="Italic"
        active={italic}
        onClick={() => setItalic((v) => !v)}
      >
        <Italic className="size-4" />
      </Button>
    </div>
  )
}

const bestPractices = (
  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
    <li>
      Use <code>variant="plain"</code> for actions on coloured surfaces (banners, toasts, filled
      cards). Its hover tint is derived from the button's text colour, so it blends with any
      background instead of painting a light patch over it.
    </li>
    <li>
      Every <code>iconOnly</code> button needs an accessible name via <code>aria-label</code> or{' '}
      <code>aria-labelledby</code>. A console warning is logged once if both are missing.
    </li>
    <li>
      The focus ring only appears for keyboard focus (<code>:focus-visible</code>), not mouse
      clicks. Avoid <code>noOutlineOnFocus</code> unless you provide another visible focus indicator
      through <code>className</code>.
    </li>
    <li>
      Pass <code>href</code> (or <code>to</code> for router links) when the button navigates. It
      then keeps native link semantics; other non-button elements get <code>role="button"</code> and
      Enter/Space keyboard activation automatically.
    </li>
    <li>
      Use <code>active</code> only for toggle buttons. Any boolean value sets{' '}
      <code>aria-pressed</code>; leave it unset for regular buttons.
    </li>
  </ul>
)

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
      title: 'Plain Buttons on Coloured Surfaces',
      description:
        'The plain variant tints its hover/pressed background from its own text colour, so it works on any surface. Hover the buttons below to compare.',
      render: (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 rounded-lg bg-blue-600 px-4 py-3 text-white">
            <span className="text-sm">A new version is available.</span>
            <div className="flex gap-1">
              <Button variant="plain" size="sm" className="text-white">
                Later
              </Button>
              <Button
                variant="plain"
                size="sm"
                iconOnly
                aria-label="Dismiss"
                className="text-white"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-lg bg-amber-100 px-4 py-3 dark:bg-amber-950">
            <span className="text-sm text-amber-900 dark:text-amber-100">
              Your trial ends soon.
            </span>
            <Button theme="warning" variant="plain" size="sm">
              Upgrade
            </Button>
          </div>
        </div>
      ),
      code: `
<div className="bg-blue-600 text-white ...">
  <Button variant="plain" size="sm" className="text-white">Later</Button>
  <Button variant="plain" size="sm" iconOnly aria-label="Dismiss" className="text-white">
    <X className="size-4" />
  </Button>
</div>

<div className="bg-amber-100 ...">
  <Button theme="warning" variant="plain" size="sm">Upgrade</Button>
</div>`,
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
    {
      title: 'Disabled State',
      description:
        'All themes and variants share one disabled style. It also applies when rendering a non-button element via as, which receives aria-disabled, is removed from the tab order, and blocks clicks.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button disabled>Primary</Button>
          <Button theme="secondary" variant="outlined" disabled>
            Outlined
          </Button>
          <Button theme="danger" variant="plain" disabled>
            Plain
          </Button>
          <Button as="a" href="#/button" disabled>
            Disabled Link
          </Button>
        </div>
      ),
      code: `
<Button disabled>Primary</Button>
<Button theme="secondary" variant="outlined" disabled>Outlined</Button>
<Button theme="danger" variant="plain" disabled>Plain</Button>
<Button as="a" href="/docs" disabled>Disabled Link</Button>`,
    },
    {
      title: 'Rendering as Links or Other Elements',
      description:
        'Use as to render a different element. With href (or to for router links) the button keeps native link semantics. Any other element gets role="button", is focusable, and activates with Enter and Space like a native button.',
      render: (
        <div className="flex gap-3 flex-wrap">
          <Button
            as="a"
            href="https://github.com/PrabhuKathiresan/react-tailwind"
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            rightIcon={<ExternalLink className="size-4" />}
          >
            GitHub
          </Button>
          <Button as="div" theme="secondary">
            Div as Button
          </Button>
        </div>
      ),
      code: `
<Button as="a" href="https://github.com/..." target="_blank" rel="noreferrer" variant="outlined">
  GitHub
</Button>

// Router link: keeps link semantics because of the to prop
<Button as={Link} to="/settings">Settings</Button>

// Non-link element: role="button", focusable, Enter/Space activate it
<Button as="div" theme="secondary">Div as Button</Button>`,
    },
    {
      title: 'Toggle Buttons',
      description:
        'Pass active to turn a button into a toggle. Its value is exposed as aria-pressed, and active={true} shows a ring.',
      render: () => <ToggleDemo />,
      code: `
const [bold, setBold] = useState(true)

<Button
  theme="secondary"
  variant="plain"
  iconOnly
  aria-label="Bold"
  active={bold}
  onClick={() => setBold((v) => !v)}
>
  <Bold className="size-4" />
</Button>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Button"
      description="The primary trigger for user actions. Supports 5 semantic themes (primary, secondary, danger, success, warning), 3 visual variants (default, outlined, plain), dedicated icon slots (leftIcon, rightIcon), full-width layout, rounded pill styling, animated loading states, toggle state, and rendering as links or other elements via the as prop."
      playground={{
        render: (props) => <Button {...props}>Click me</Button>,
        initialProps: { theme: 'primary', variant: 'default', size: 'md' },
      }}
      examples={examples}
      bestPractices={bestPractices}
    />
  )
}
