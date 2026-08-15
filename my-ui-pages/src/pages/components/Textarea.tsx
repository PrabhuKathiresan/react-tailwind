import { useState } from 'react'
import { Textarea } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { MessageSquare } from 'lucide-react'

export default function TextareaDocsPage() {
  const [autoText, setAutoText] = useState(
    'Try typing multiple paragraphs here to watch the height expand automatically as new lines are added!',
  )
  const [countText, setCountText] = useState('React and Tailwind components are awesome.')

  const examples = [
    {
      title: 'Auto-Resize Height (autoSize={true})',
      description:
        'Use autoSize={true} to dynamically expand the textarea height as users type multiple lines.',
      render: (
        <div className="max-w-md">
          <Textarea
            label="Post Content (Auto-expanding)"
            autoSize
            value={autoText}
            onChange={(e) => setAutoText(e.target.value)}
            helperText="Height adjusts automatically based on content length."
          />
        </div>
      ),
      code: `
const [text, setText] = useState('...')

<Textarea
  label="Post Content"
  autoSize
  value={text}
  onChange={(e) => setText(e.target.value)}
  helperText="Height adjusts automatically based on content length."
/>`,
    },
    {
      title: 'Live Character Counter & Max Length',
      description: 'Use showCount and maxLength to display character counts below the textarea.',
      render: (
        <div className="max-w-md">
          <Textarea
            label="Short Bio"
            maxLength={140}
            showCount
            value={countText}
            onChange={(e) => setCountText(e.target.value)}
            helperText="Write a brief introduction for your team profile."
          />
        </div>
      ),
      code: `
<Textarea
  label="Short Bio"
  maxLength={140}
  showCount
  value={text}
  onChange={(e) => setText(e.target.value)}
/>`,
    },
    {
      title: 'Size Scales (sm, md, lg)',
      description: 'Choose from 3 responsive sizing scales.',
      render: (
        <div className="max-w-md flex flex-col gap-4">
          <Textarea
            size="sm"
            label="Small Textarea (sm)"
            placeholder="Compact multi-line entry..."
          />
          <Textarea
            size="md"
            label="Medium Textarea (md, default)"
            placeholder="Standard multi-line entry..."
          />
          <Textarea
            size="lg"
            label="Large Textarea (lg)"
            placeholder="Prominent multi-line entry..."
          />
        </div>
      ),
      code: `
<Textarea size="sm" label="Small Textarea (sm)" />
<Textarea size="md" label="Medium Textarea (md)" />
<Textarea size="lg" label="Large Textarea (lg)" />`,
    },
    {
      title: 'With Icons & Helper Guidance',
      description: 'Prefix textareas with leading icons and add guidance text.',
      render: (
        <div className="max-w-md flex flex-col gap-4">
          <Textarea
            label="User Feedback"
            placeholder="Tell us what you think..."
            leftGroup={<MessageSquare className="size-4" />}
            helperText="Your feedback will be reviewed by our design system team."
          />
        </div>
      ),
      code: `
<Textarea
  label="User Feedback"
  placeholder="Tell us what you think..."
  leftGroup={<MessageSquare className="size-4" />}
  helperText="Your feedback will be reviewed by our team."
/>`,
    },
    {
      title: 'Validation Error State',
      description: 'Display validation messages when requirements are not met.',
      render: (
        <div className="max-w-md">
          <Textarea
            label="Support Ticket Description"
            placeholder="Describe the issue in detail..."
            error="Please provide at least 20 characters describing the issue."
          />
        </div>
      ),
      code: `
<Textarea
  label="Support Ticket Description"
  error="Please provide at least 20 characters describing the issue."
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Textarea"
      description="A multi-line text input control featuring auto-resizing height, live character counters, responsive size scales (sm/md/lg), helper guidance text, and resize controls."
      examples={examples}
    />
  )
}
