import { useState } from 'react'
import { RadioSwitch } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function RadioSwitchDocsPage() {
  const [basic, setBasic] = useState('Option A')
  const [plan, setPlan] = useState('basic')

  const examples = [
    {
      title: 'Basic Radio Switch',
      description: 'A GPU-accelerated segmented control with smooth sliding selection highlight.',
      render: (
        <RadioSwitch
          selected={basic}
          onChange={setBasic}
          items={['Option A', 'Option B', 'Option C']}
        />
      ),
      code: `
const [selected, setSelected] = useState("Option A")

<RadioSwitch
  selected={selected}
  onChange={setSelected}
  items={["Option A", "Option B", "Option C"]}
/>`,
    },

    {
      title: 'Size Variants (sm, md, lg)',
      description: 'RadioSwitch supports 3 size variants.',
      render: <ExampleSizeSwitchGroup />,
      code: `
<RadioSwitch size="sm" selected={selectedSm} onChange={setSelectedSm} items={['Small', 'Medium', 'Large']} />
<RadioSwitch size="md" selected={selectedMd} onChange={setSelectedMd} items={['Small', 'Medium', 'Large']} />
<RadioSwitch size="lg" selected={selectedLg} onChange={setSelectedLg} items={['Small', 'Medium', 'Large']} />`,
    },

    {
      title: 'Color Themes (Primary, Secondary, Dark)',
      description: 'Customize the sliding indicator highlight color theme.',
      render: <ExampleThemeSwitchGroup />,
      code: `
<RadioSwitch theme="primary" selected={sel1} onChange={setSel1} items={['Primary', 'Secondary', 'Dark']} />
<RadioSwitch theme="secondary" selected={sel2} onChange={setSel2} items={['Primary', 'Secondary', 'Dark']} />
<RadioSwitch theme="dark" selected={sel3} onChange={setSel3} items={['Primary', 'Secondary', 'Dark']} />`,
    },

    {
      title: 'Options With Descriptions & Disabled Items',
      description: 'Pass objects with subtext descriptions and disable specific options.',
      render: (
        <RadioSwitch
          selected={plan}
          onChange={setPlan}
          items={[
            { label: 'Basic', value: 'basic', description: 'For individuals' },
            { label: 'Pro', value: 'pro', description: 'For small teams' },
            { label: 'Enterprise', value: 'enterprise', description: 'Sold out', disabled: true },
          ]}
        />
      ),
      code: `
<RadioSwitch
  selected={plan}
  onChange={setPlan}
  items={[
    { label: 'Basic', value: 'basic', description: 'For individuals' },
    { label: 'Pro', value: 'pro', description: 'For small teams' },
    { label: 'Enterprise', value: 'enterprise', description: 'Sold out', disabled: true },
  ]}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="RadioSwitch"
      description="A GPU-accelerated segmented control with smooth sliding selection highlight. Supports size variants, color themes, subtext descriptions, and disabled items."
      examples={examples}
    />
  )
}

function ExampleSizeSwitchGroup() {
  const [sm, setSm] = useState('Small')
  const [md, setMd] = useState('Medium')
  const [lg, setLg] = useState('Large')

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1">Small (size="sm")</p>
        <RadioSwitch
          size="sm"
          selected={sm}
          onChange={setSm}
          items={['Small', 'Medium', 'Large']}
        />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1">Medium (size="md")</p>
        <RadioSwitch
          size="md"
          selected={md}
          onChange={setMd}
          items={['Small', 'Medium', 'Large']}
        />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1">Large (size="lg")</p>
        <RadioSwitch
          size="lg"
          selected={lg}
          onChange={setLg}
          items={['Small', 'Medium', 'Large']}
        />
      </div>
    </div>
  )
}

function ExampleThemeSwitchGroup() {
  const [p, setP] = useState('Primary')
  const [s, setS] = useState('Secondary')
  const [d, setD] = useState('Dark')

  return (
    <div className="space-y-4">
      <RadioSwitch
        theme="primary"
        selected={p}
        onChange={setP}
        items={['Primary', 'Secondary', 'Dark']}
      />
      <RadioSwitch
        theme="secondary"
        selected={s}
        onChange={setS}
        items={['Primary', 'Secondary', 'Dark']}
      />
      <RadioSwitch
        theme="dark"
        selected={d}
        onChange={setD}
        items={['Primary', 'Secondary', 'Dark']}
      />
    </div>
  )
}
