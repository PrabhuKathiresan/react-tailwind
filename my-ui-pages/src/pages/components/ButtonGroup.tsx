import { Button, ButtonGroup } from '@pk-design/react-tailwind'
import { IndianRupee, Printer, Bold, Italic, Underline } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function ButtonGroupDocsPage() {
  const examples = [
    {
      title: 'Basic Usage',
      description: 'Join related actions into a single control with a shared border.',
      render: (
        <ButtonGroup label="Payment actions">
          <Button iconOnly aria-label="Amount in rupees" theme="primary" variant="plain">
            <IndianRupee className="size-4" />
          </Button>
          <Button iconOnly aria-label="Print">
            <Printer className="size-4" />
          </Button>
        </ButtonGroup>
      ),
      code: `
<ButtonGroup label="Payment actions">
  <Button iconOnly aria-label="Amount in rupees" theme="primary" variant="plain">
    <IndianRupee className="size-4" />
  </Button>
  <Button iconOnly aria-label="Print">
    <Printer className="size-4" />
  </Button>
</ButtonGroup>`,
    },
    {
      title: 'Text Buttons',
      description: 'Works the same way with labeled buttons, not just icons.',
      render: (
        <ButtonGroup label="View toggle">
          <Button>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>
      ),
      code: `
<ButtonGroup label="View toggle">
  <Button>Day</Button>
  <Button>Week</Button>
  <Button>Month</Button>
</ButtonGroup>`,
    },
    {
      title: 'Theme & Variant',
      description:
        'The group applies a fallback theme/variant/size to children, but any child can override it individually.',
      render: (
        <div className="flex flex-wrap gap-4">
          <ButtonGroup theme="primary" variant="default">
            <Button>Left</Button>
            <Button>Right</Button>
          </ButtonGroup>
          <ButtonGroup theme="danger" variant="outlined">
            <Button>Left</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </div>
      ),
      code: `
<ButtonGroup theme="primary" variant="default">
  <Button>Left</Button>
  <Button>Right</Button>
</ButtonGroup>

<ButtonGroup theme="danger" variant="outlined">
  <Button>Left</Button>
  <Button>Right</Button>
</ButtonGroup>`,
    },
    {
      title: 'Sizes',
      description: 'Pass `size` to the group to size every child button consistently.',
      render: (
        <div className="flex flex-wrap items-center gap-4">
          <ButtonGroup size="xs">
            <Button>XS</Button>
            <Button>Small</Button>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <Button>Large</Button>
            <Button>Buttons</Button>
          </ButtonGroup>
        </div>
      ),
      code: `
<ButtonGroup size="xs">
  <Button>XS</Button>
  <Button>Small</Button>
</ButtonGroup>

<ButtonGroup size="lg">
  <Button>Large</Button>
  <Button>Buttons</Button>
</ButtonGroup>`,
    },
    {
      title: 'Vertical Orientation',
      description: 'Stack the group vertically for sidebars or toolbars.',
      render: (
        <ButtonGroup orientation="vertical" label="Text formatting">
          <Button iconOnly aria-label="Bold">
            <Bold className="size-4" />
          </Button>
          <Button iconOnly aria-label="Italic">
            <Italic className="size-4" />
          </Button>
          <Button iconOnly aria-label="Underline">
            <Underline className="size-4" />
          </Button>
        </ButtonGroup>
      ),
      code: `
<ButtonGroup orientation="vertical" label="Text formatting">
  <Button iconOnly aria-label="Bold"><Bold className="size-4" /></Button>
  <Button iconOnly aria-label="Italic"><Italic className="size-4" /></Button>
  <Button iconOnly aria-label="Underline"><Underline className="size-4" /></Button>
</ButtonGroup>`,
    },
    {
      title: 'Rounded (Pill)',
      description: "Use `rounded` to round the group's outer corners into a pill shape.",
      render: (
        <ButtonGroup rounded>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      ),
      code: `
<ButtonGroup rounded>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>`,
    },
    {
      title: 'Full Width',
      description: 'Stretch buttons to share the available width equally.',
      render: (
        <ButtonGroup fullWidth className="w-full max-w-md">
          <Button>Save</Button>
          <Button>Preview</Button>
          <Button>Publish</Button>
        </ButtonGroup>
      ),
      code: `
<ButtonGroup fullWidth className="w-full max-w-md">
  <Button>Save</Button>
  <Button>Preview</Button>
  <Button>Publish</Button>
</ButtonGroup>`,
    },
  ]

  return (
    <DocsPageLayout
      component="ButtonGroup"
      description="Joins related Button elements into a single cohesive control with a shared border and a single hairline divider between items, instead of separate floating buttons. Supports horizontal or vertical orientation, pill rounding, full-width stretching, and lets any child button override the group's theme, variant, or size."
      playground={{
        render: (props) => (
          <ButtonGroup {...props}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        ),
        initialProps: { theme: 'secondary', variant: 'default', size: 'md' },
      }}
      examples={examples}
    />
  )
}
