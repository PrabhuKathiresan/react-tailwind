import { DocsPageLayout } from '../../components/DocsPageLayout'
import { TextContent } from '@pk-design/react-tailwind'

/* ----------------------------------------------
 * EXAMPLES
 * ---------------------------------------------- */

/** Basic usage */
function BasicExample() {
  return (
    <div className="space-y-2">
      <TextContent>This is default TextContent.</TextContent>
      <TextContent strong>Strong text (semibold)</TextContent>
      <TextContent muted>Muted text (gray)</TextContent>
      <TextContent error>Error text (red)</TextContent>
    </div>
  )
}

/** Font sizing variations */
function SizeExample() {
  return (
    <div className="space-y-2">
      <TextContent xsmall>XSmall size text</TextContent>
      <TextContent small>Small size text</TextContent>
      <TextContent>Regular size text</TextContent>
    </div>
  )
}

/** Combining styles */
function CombinedExample() {
  return (
    <div className="space-y-2">
      <TextContent strong small>
        Strong + Small
      </TextContent>
      <TextContent muted xsmall>
        Muted + XSmall
      </TextContent>
      <TextContent strong error>
        Strong + Error
      </TextContent>
    </div>
  )
}

/* ----------------------------------------------
 * MAIN DOCS PAGE
 * ---------------------------------------------- */
export default function TextContentDocsPage() {
  const examples = [
    {
      title: 'Basic Usage',
      description:
        'TextContent is a utility component for consistent typography styling using semantic Tailwind classes.',
      render: <BasicExample />,
      code: `
<TextContent>This is default text.</TextContent>
<TextContent strong>Strong text</TextContent>
<TextContent muted>Muted text</TextContent>
<TextContent error>Error text</TextContent>
      `,
    },

    {
      title: 'Font Sizes',
      description:
        'Adjust text size using xsmall and small props. By default, TextContent uses medium-size Tailwind typography.',
      render: <SizeExample />,
      code: `
<TextContent xsmall>XSmall text</TextContent>
<TextContent small>Small text</TextContent>
<TextContent>Regular</TextContent>
      `,
    },

    {
      title: 'Combining Styles',
      description: 'You can combine multiple props to achieve richer text styling.',
      render: <CombinedExample />,
      code: `
<TextContent strong small>Strong + Small</TextContent>
<TextContent muted xsmall>Muted + XSmall</TextContent>
<TextContent strong error>Strong + Error</TextContent>
      `,
    },
  ]

  return (
    <DocsPageLayout
      component="TextContent"
      description="A lightweight typography utility that unifies inline text styling with a single prop-driven API. Cover body copy variants including strong emphasis, muted secondary text, small captions, and error states without writing Tailwind class strings directly or coupling to semantic HTML elements."
      playground={{
        render: (props) => (
          <TextContent {...props}>The quick brown fox jumps over the lazy dog.</TextContent>
        ),
      }}
      examples={examples}
    />
  )
}
