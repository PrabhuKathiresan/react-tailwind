import { DocsPageLayout } from '../../components/DocsPageLayout'
import { TextContent } from '@pk-design/react-tailwind'

export default function TextContentDocsPage() {
  const examples = [
    {
      title: 'Basic Usage',
      description:
        'TextContent is an inline typography utility component for rendering styled inline text blocks.',
      render: (
        <div className="space-y-2">
          <TextContent>This is default TextContent.</TextContent>
          <TextContent strong>Strong text (semibold)</TextContent>
          <TextContent muted>Muted text (gray)</TextContent>
          <TextContent error>Error text (red)</TextContent>
        </div>
      ),
      code: `
<TextContent>This is default text.</TextContent>
<TextContent strong>Strong text</TextContent>
<TextContent muted>Muted text</TextContent>
<TextContent error>Error text</TextContent>`,
    },
    {
      title: 'Size Scales (xs, sm, md, lg, xl)',
      description: 'Use size prop to scale inline text sizes.',
      render: (
        <div className="space-y-2">
          <div>
            <TextContent size="xs">Extra Small (size="xs")</TextContent>
          </div>
          <div>
            <TextContent size="sm">Small (size="sm")</TextContent>
          </div>
          <div>
            <TextContent size="md">Medium (size="md")</TextContent>
          </div>
          <div>
            <TextContent size="lg">Large (size="lg")</TextContent>
          </div>
          <div>
            <TextContent size="xl">Extra Large (size="xl")</TextContent>
          </div>
        </div>
      ),
      code: `
<TextContent size="xs">Extra Small</TextContent>
<TextContent size="sm">Small</TextContent>
<TextContent size="md">Medium</TextContent>
<TextContent size="lg">Large</TextContent>
<TextContent size="xl">Extra Large</TextContent>`,
    },
    {
      title: 'Monospace & Code Snippets',
      description: 'Use monospace prop to format code or numeric data with font-mono.',
      render: (
        <div className="space-y-2">
          <div>
            <TextContent
              as="code"
              monospace
              size="sm"
              className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
            >
              const userId = 492049;
            </TextContent>
          </div>
          <div>
            <TextContent monospace info weight="semibold">
              $1,248.50 USD
            </TextContent>
          </div>
        </div>
      ),
      code: `
<TextContent as="code" monospace size="sm">const userId = 492049;</TextContent>
<TextContent monospace info weight="semibold">$1,248.50 USD</TextContent>`,
    },
    {
      title: 'Color Intents (muted, error, success, warning, info)',
      description: 'Built-in color intents for inline text highlights.',
      render: (
        <div className="flex flex-wrap gap-4">
          <TextContent success weight="semibold">
            Active (Success)
          </TextContent>
          <TextContent warning weight="semibold">
            Pending (Warning)
          </TextContent>
          <TextContent error weight="semibold">
            Failed (Error)
          </TextContent>
          <TextContent info weight="semibold">
            Processing (Info)
          </TextContent>
          <TextContent muted weight="normal">
            Archived (Muted)
          </TextContent>
        </div>
      ),
      code: `
<TextContent success weight="semibold">Active</TextContent>
<TextContent warning weight="semibold">Pending</TextContent>
<TextContent error weight="semibold">Failed</TextContent>
<TextContent info weight="semibold">Processing</TextContent>`,
    },
    {
      title: 'Custom Element Rendering (as prop)',
      description: 'Render TextContent as span, code, mark, label, b, i, or time.',
      render: (
        <div className="space-y-2">
          <div>
            <TextContent as="mark" className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
              Highlighted text using as="mark"
            </TextContent>
          </div>
          <div>
            <TextContent as="time" muted size="xs" monospace>
              2026-08-15 19:10:00 UTC
            </TextContent>
          </div>
        </div>
      ),
      code: `
<TextContent as="mark">Highlighted text</TextContent>
<TextContent as="time" muted size="xs" monospace>2026-08-15 19:10:00 UTC</TextContent>`,
    },
  ]

  return (
    <DocsPageLayout
      component="TextContent"
      description="A lightweight typography utility component for inline text formatting. Features size scales, font weights, color intents, monospace code formatting, and custom HTML element rendering."
      playground={{
        render: (props) => (
          <TextContent {...props}>The quick brown fox jumps over the lazy dog.</TextContent>
        ),
      }}
      examples={examples}
    />
  )
}
