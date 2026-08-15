import { BodyText } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function BodyTextDocsPage() {
  const examples = [
    {
      title: 'Default Usage',
      description:
        'The BodyText component renders readable content paragraphs with standardized font sizes, line heights, and design tokens.',
      render: (
        <div className="space-y-2">
          <BodyText>This is the default body text used for content paragraphs.</BodyText>
          <BodyText muted>
            You can apply additional utility props like size, weight, color intents, or line clamp.
          </BodyText>
        </div>
      ),
      code: `
<BodyText>This is the default body text used for content paragraphs.</BodyText>
<BodyText muted>You can apply additional utility props...</BodyText>`,
    },
    {
      title: 'Size Scales (xs, sm, md, lg, xl)',
      description: 'Use size prop to scale body text size smoothly.',
      render: (
        <div className="space-y-2">
          <BodyText size="xs">Extra Small BodyText (size="xs")</BodyText>
          <BodyText size="sm">Small BodyText (size="sm")</BodyText>
          <BodyText size="md">Medium BodyText (size="md")</BodyText>
          <BodyText size="lg">Large BodyText (size="lg")</BodyText>
          <BodyText size="xl">Extra Large BodyText (size="xl")</BodyText>
        </div>
      ),
      code: `
<BodyText size="xs">Extra Small</BodyText>
<BodyText size="sm">Small</BodyText>
<BodyText size="md">Medium</BodyText>
<BodyText size="lg">Large</BodyText>
<BodyText size="xl">Extra Large</BodyText>`,
    },
    {
      title: 'Font Weight Variants (light, normal, medium, semibold, bold)',
      description: 'Use weight prop to control typography hierarchy.',
      render: (
        <div className="space-y-2">
          <BodyText weight="light">Light weight body copy</BodyText>
          <BodyText weight="normal">Normal weight body copy</BodyText>
          <BodyText weight="medium">Medium weight body copy</BodyText>
          <BodyText weight="semibold">Semibold weight body copy</BodyText>
          <BodyText weight="bold">Bold weight body copy</BodyText>
        </div>
      ),
      code: `
<BodyText weight="light">Light</BodyText>
<BodyText weight="medium">Medium</BodyText>
<BodyText weight="semibold">Semibold</BodyText>
<BodyText weight="bold">Bold</BodyText>`,
    },
    {
      title: 'Color Intents (muted, error, success, warning, info)',
      description: 'Built-in semantic color intents.',
      render: (
        <div className="space-y-2">
          <BodyText muted>Muted text tone</BodyText>
          <BodyText error>Error red alert text</BodyText>
          <BodyText success>Success green text confirmation</BodyText>
          <BodyText warning>Warning amber text alert</BodyText>
          <BodyText info>Info blue text note</BodyText>
        </div>
      ),
      code: `
<BodyText muted>Muted text</BodyText>
<BodyText error>Error text</BodyText>
<BodyText success>Success text</BodyText>
<BodyText warning>Warning text</BodyText>
<BodyText info>Info text</BodyText>`,
    },
    {
      title: 'Line Clamping & Truncation',
      description: 'Use clamp={2} or truncate for multi-line clamping and text ellipsis.',
      render: (
        <div className="space-y-4 max-w-md">
          <div>
            <BodyText size="xs" weight="semibold" muted>
              Line Clamp (2 lines):
            </BodyText>
            <BodyText clamp={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </BodyText>
          </div>
          <div>
            <BodyText size="xs" weight="semibold" muted>
              Single Line Truncate:
            </BodyText>
            <BodyText truncate>
              This long title sentence will truncate automatically with an ellipsis when overflowing
              its container width.
            </BodyText>
          </div>
        </div>
      ),
      code: `
<BodyText clamp={2}>Long multi-line text clamped to 2 lines...</BodyText>
<BodyText truncate>Single line overflow truncated with ellipsis...</BodyText>`,
    },
    {
      title: 'Custom Element Rendering & Alignment',
      description: 'Use as prop for semantic element rendering and align for alignment.',
      render: (
        <div className="space-y-2">
          <BodyText as="div" align="center" weight="medium">
            Rendered as centered div block.
          </BodyText>
          <BodyText as="span" align="right" info inline>
            Rendered as right-aligned span element.
          </BodyText>
        </div>
      ),
      code: `
<BodyText as="div" align="center" weight="medium">Centered div</BodyText>
<BodyText as="span" align="right" info>Right-aligned span</BodyText>`,
    },
  ]

  return (
    <DocsPageLayout
      component="BodyText"
      description="A semantic paragraph wrapper that standardizes body copy typography across the design system. Features size scales, font weights, color intents, line clamp truncation, and custom element rendering."
      playground={{
        render: (props) => (
          <BodyText {...props}>
            The quick brown fox jumps over the lazy dog. A short sentence demonstrating typography
            variants and styles.
          </BodyText>
        ),
      }}
      examples={examples}
    />
  )
}
