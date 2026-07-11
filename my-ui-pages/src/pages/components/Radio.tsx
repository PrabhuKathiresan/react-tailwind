import { useState } from 'react'
import { Radio } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function RadioDocsPage() {
  const [selected, setSelected] = useState('apple')

  const examples = [
    {
      title: 'Basic Radio Button',
      description: 'A simple radio button with a label.',
      render: <Radio name="fruit-basic" label="Apple" value="apple" id="radio-1" />,
      code: `
<Radio
  name="fruit-basic"
  label="Apple"
  value="apple"
/>`,
    },

    {
      title: 'Controlled Radio Group',
      description: 'Use a controlled React state to manage selected value.',
      render: (
        <div className="space-y-2">
          {['apple', 'banana', 'cherry'].map((fruit) => (
            <Radio
              key={fruit}
              name="fruit-controlled"
              label={fruit.charAt(0).toUpperCase() + fruit.slice(1)}
              value={fruit}
              checked={selected === fruit}
              onChange={(e) => setSelected(e.target.value)}
              id={`${fruit}-radio-2`}
            />
          ))}
        </div>
      ),
      code: `
const [selected, setSelected] = useState("apple")

{["apple", "banana", "cherry"].map((fruit) => (
  <Radio
    key={fruit}
    name="fruit-controlled"
    label={fruit.charAt(0).toUpperCase() + fruit.slice(1)}
    value={fruit}
    checked={selected === fruit}
    onChange={(e) => setSelected(e.target.value)}
    id={"fruit-radio-2"}
  />
))}`,
    },

    {
      title: 'Disabled Radio Button',
      description: 'You can disable a radio button to prevent user interaction.',
      render: (
        <Radio
          name="fruit-disabled"
          label="Disabled Option"
          value="disabled"
          disabled
          id="radio-3"
        />
      ),
      code: `
<Radio
  name="fruit-disabled"
  label="Disabled Option"
  value="disabled"
  disabled
/>`,
    },

    {
      title: 'Error State',
      description: 'Display an error message under the radio button.',
      render: (
        <Radio
          name="fruit-error"
          label="Apple"
          value="apple"
          error="Please select a valid option"
          id="radio-4"
        />
      ),
      code: `
<Radio
  name="fruit-error"
  label="Apple"
  value="apple"
  error="Please select a valid option"
/>`,
    },

    {
      title: 'Custom Styling',
      description: 'You can pass custom classes to adjust spacing or layout.',
      render: (
        <Radio
          name="fruit-custom"
          label="Custom Styled"
          value="custom"
          wrapperClass="p-3 border rounded-lg shadow-sm"
          containerClass="gap-4"
          labelClass="text-blue-600"
          id="radio-5"
        />
      ),
      code: `
<Radio
  name="fruit-custom"
  label="Custom Styled"
  value="custom"
  wrapperClass="p-3 border rounded-lg shadow-sm"
  containerClass="gap-4"
  labelClass="text-blue-600"
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Radio"
      description="A single radio option with accessible label, hint, and error message slots. Use it directly when you need full control over each option's rendering, or reach for RadioGroup when you want to build a mutually exclusive list from a data array with less wiring."
      examples={examples}
    />
  )
}
