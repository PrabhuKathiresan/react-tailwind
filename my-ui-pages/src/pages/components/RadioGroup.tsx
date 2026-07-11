import { useState } from 'react'
import { RadioGroup } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function RadioGroupDocsPage() {
  const [selected, setSelected] = useState('Apple')
  const [size, setSize] = useState('XS')

  const examples = [
    {
      title: 'Basic Radio Button Group',
      description: 'A simple radio group using string-based options.',
      render: (
        <RadioGroup
          name="fruit-basic"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          options={['Apple', 'Banana', 'Cherry']}
        />
      ),
      code: `
<RadioGroup
  name="fruit-basic"
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  options={["Apple", "Banana", "Cherry"]}
/>`,
    },

    {
      title: 'Controlled Radio Group',
      description: 'Control the selected value with React state.',
      render: (
        <RadioGroup
          name="fruit-controlled"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          options={['Apple', 'Banana', 'Cherry']}
        />
      ),
      code: `
const [selected, setSelected] = useState("Apple")

<RadioGroup
  name="fruit-controlled"
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  options={["Apple", "Banana", "Cherry"]}
/>`,
    },

    {
      title: 'Column Layout (Default)',
      description: 'Options are stacked vertically by default.',
      render: <RadioGroup name="layout-col" options={['Option A', 'Option B', 'Option C']} />,
      code: `
<RadioGroup
  name="layout-col"
  options={["Option A", "Option B", "Option C"]}
/>`,
    },

    {
      title: 'Row Layout',
      description: 'Set row={true} to display options horizontally.',
      render: (
        <RadioGroup
          name="layout-row"
          row
          options={['XS', 'S', 'M', 'L', 'XL']}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      ),
      code: `
<RadioGroup
  name="layout-row"
  row
  options={["XS", "S", "M", "L", "XL"]}
/>`,
    },

    {
      title: 'Using Object-based Options',
      description: 'Options can include separate label and value fields.',
      render: (
        <RadioGroup
          name="object-options"
          options={[
            { label: 'Low', value: 1 },
            { label: 'Medium', value: 2 },
            { label: 'High', value: 3 },
          ]}
        />
      ),
      code: `
<RadioGroup
  name="object-options"
  options={[
    { label: "Low", value: 1 },
    { label: "Medium", value: 2 },
    { label: "High", value: 3 },
  ]}
/>`,
    },

    {
      title: 'With Label and Hint',
      description: 'Add a label and an optional hint beside it.',
      render: (
        <RadioGroup
          name="with-label"
          label="Select Difficulty"
          labelHint={<span className="text-sm text-gray-500">Choose one</span>}
          options={['Easy', 'Medium', 'Hard']}
        />
      ),
      code: `
<RadioGroup
  name="with-label"
  label="Select Difficulty"
  labelHint={<span className="text-sm text-gray-500">Choose one</span>}
  options={["Easy", "Medium", "Hard"]}
/>`,
    },

    {
      title: 'Custom Classes',
      description: 'Customize spacing or alignment using Tailwind classes.',
      render: (
        <RadioGroup
          name="styled-group"
          label="Sizes"
          containerClass="p-4 border rounded-lg shadow-sm"
          row
          options={['Small', 'Medium', 'Large']}
        />
      ),
      code: `
<RadioGroup
  name="styled-group"
  label="Sizes"
  containerClass="p-4 border rounded-lg shadow-sm"
  row
  options={["Small", "Medium", "Large"]}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="RadioGroup"
      description="A controlled list of mutually exclusive radio options rendered from a data array. Handles the group label, hint, error state, and vertical or horizontal layout automatically, so you only need to provide the options and a value-change handler."
      examples={examples}
    />
  )
}
