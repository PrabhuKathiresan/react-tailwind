import { Checkbox } from 'react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function CheckboxDocsPage() {
  const examples = [
    {
      title: 'Default Checkbox',
      description: 'A simple checkbox without any label or custom styling.',
      render: <Checkbox type="checkbox" id="checkbox-1" />,
      code: `<Checkbox type="checkbox" id="checkbox-1" />`,
    },
    {
      title: 'Checkbox with Label',
      description: 'Use the `label` prop to display text next to the checkbox.',
      render: <Checkbox id="checkbox-2" type="checkbox" label="Accept terms and conditions" />,
      code: `
<Checkbox
  id="checkbox-2"
  type="checkbox"
  label="Accept terms and conditions"
/>`,
    },
    {
      title: 'Error State',
      description: 'Use the `error` prop to display an error message.',
      render: (
        <Checkbox
          id="checkbox-4"
          type="checkbox"
          label="Accept privacy policy"
          error="You must accept the policy"
          showErrorMessage
        />
      ),
      code: `
<Checkbox
  id="checkbox-4"
  type="checkbox"
  label="Accept privacy policy"
  error="You must accept the policy"
  showErrorMessage
/>`,
    },
    {
      title: 'Custom Classes',
      description:
        'You can override styles for the wrapper, container, label wrapper, or label using the respective props.',
      render: (
        <Checkbox
          id="checkbox-5"
          type="checkbox"
          label="Custom styled checkbox"
          wrapperClass="bg-gray-100 p-2 rounded"
          containerClass="flex items-center gap-2"
          labelWrapperClass="flex items-center gap-1"
          labelClass="font-semibold text-blue-600"
        />
      ),
      code: `
<Checkbox
  id="checkbox-5"
  type="checkbox"
  label="Custom styled checkbox"
  wrapperClass="bg-gray-100 p-2 rounded"
  containerClass="flex items-center gap-2"
  labelWrapperClass="flex items-center gap-1"
  labelClass="font-semibold text-blue-600"
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Checkbox"
      description="Checkbox component for selecting single options, with support for labels, hints, error messages, and custom styling."
      examples={examples}
    />
  )
}
