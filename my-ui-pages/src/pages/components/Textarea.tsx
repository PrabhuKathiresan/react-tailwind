import { useState } from 'react'
import { Textarea } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function TextareaDocsPage() {
  const [value, setValue] = useState('')

  const examples = [
    {
      title: 'Basic Textarea',
      description: 'A simple textarea with a label and controlled value.',
      render: (
        <Textarea
          label="Description"
          placeholder="Write something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ),
      code: `
const [value, setValue] = useState("")

<Textarea
  label="Description"
  placeholder="Write something..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`,
    },

    {
      title: 'Textarea with Left Icon',
      description: 'You can prefix the textarea with any React element using leftGroup.',
      render: (
        <Textarea
          label="Comment"
          placeholder="Your comment..."
          leftGroup={<span className="text-gray-400">💬</span>}
        />
      ),
      code: `
<Textarea
  label="Comment"
  placeholder="Your comment..."
  leftGroup={<span className="text-gray-400">💬</span>}
/>`,
    },

    {
      title: 'Textarea with Right Icon',
      description: 'Use rightGroup for actionable icons (e.g., character count, clear button).',
      render: (
        <Textarea
          label="Message"
          placeholder="Start typing..."
          rightGroup={<span className="text-xs text-gray-500">✏️</span>}
        />
      ),
      code: `
<Textarea
  label="Message"
  placeholder="Start typing..."
  rightGroup={<span className="text-xs text-gray-500">✏️</span>}
/>`,
    },

    {
      title: 'Error State',
      description: 'Provide an error message to highlight invalid input.',
      render: (
        <Textarea label="Feedback" placeholder="Enter feedback..." error="Feedback is required." />
      ),
      code: `
<Textarea
  label="Feedback"
  placeholder="Enter feedback..."
  error="Feedback is required."
/>`,
    },

    {
      title: 'Disabled State',
      description: 'Textarea can be disabled to prevent user input.',
      render: <Textarea label="Notes" placeholder="Disabled textarea" disabled />,
      code: `
<Textarea
  label="Notes"
  placeholder="Disabled textarea"
  disabled
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Textarea"
      description="A multi-line text field that shares the same label, hint, icon, and error messaging API as Input. Use it for longer free-text entries like comments, notes, addresses, or descriptions where a single-line input would be too restrictive."
      examples={examples}
    />
  )
}
