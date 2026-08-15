import { useState } from 'react'
import { Radio } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function RadioDocsPage() {
  const [selected, setSelected] = useState('apple')

  const examples = [
    {
      title: 'With Description Subtext',
      description: 'Add subtext descriptions below the label to provide guidance.',
      render: (
        <Radio
          name="shipping"
          label="Express Shipping (1-2 Days)"
          description="Delivered via FedEx Priority Air with real-time tracking"
          value="express"
          checked
          onChange={() => {}}
        />
      ),
      code: `
<Radio
  name="shipping"
  label="Express Shipping (1-2 Days)"
  description="Delivered via FedEx Priority Air with real-time tracking"
  value="express"
  checked
/>`,
    },

    {
      title: 'Size Variants (sm, md, lg)',
      description: 'Radio buttons support 3 consistent sizes.',
      render: (
        <div className="space-y-3">
          <Radio name="sz" size="sm" label="Small (16px)" value="sm" checked onChange={() => {}} />
          <Radio name="sz" size="md" label="Medium (18px)" value="md" checked onChange={() => {}} />
          <Radio name="sz" size="lg" label="Large (22px)" value="lg" checked onChange={() => {}} />
        </div>
      ),
      code: `
<Radio size="sm" label="Small (16px)" name="sz" checked />
<Radio size="md" label="Medium (18px)" name="sz" checked />
<Radio size="lg" label="Large (22px)" name="sz" checked />`,
    },

    {
      title: 'Theme Colors (Primary, Success & Danger)',
      description: 'Choose accent color themes for confirmation or warning states.',
      render: (
        <div className="space-y-3">
          <Radio
            name="th1"
            theme="primary"
            label="Primary Brand Theme"
            value="p"
            checked
            onChange={() => {}}
          />
          <Radio
            name="th2"
            theme="success"
            label="Success Emerald Theme"
            value="s"
            checked
            onChange={() => {}}
          />
          <Radio
            name="th3"
            theme="danger"
            label="Danger Red Theme"
            value="d"
            checked
            onChange={() => {}}
          />
        </div>
      ),
      code: `
<Radio theme="primary" label="Primary Brand Theme" checked />
<Radio theme="success" label="Success Emerald Theme" checked />
<Radio theme="danger" label="Danger Red Theme" checked />`,
    },

    {
      title: 'Controlled Radio Buttons',
      description: 'Use a controlled React state to manage selection.',
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
  />
))}`,
    },
  ]

  return (
    <DocsPageLayout
      component="Radio"
      description="A single radio control with support for description subtext, 3 sizes (sm, md, lg), and 3 accent themes (primary, success, danger)."
      examples={examples}
    />
  )
}
