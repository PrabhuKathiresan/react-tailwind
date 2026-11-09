import { useState } from 'react'
import { RadioSwitch } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function RadioSwitchDocsPage() {
  const [basic, setBasic] = useState('Option A')
  const [plan, setPlan] = useState('basic')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

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
    {
      title: 'Typed Values, Labelling and Forms',
      description:
        'The switch is generic over its option values, so `onChange` receives your own union and a typed setter fits directly. Name it with `label`, or with `aria-labelledby` when a visible heading names it; give it a `name` to submit the choice with a form.',
      render: (
        <div className="space-y-2">
          <div id="theme-heading" className="text-sm font-semibold">
            Appearance
          </div>
          <RadioSwitch<'light' | 'dark'>
            aria-labelledby="theme-heading"
            name="theme"
            selected={theme}
            onChange={setTheme}
            items={[
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
            ]}
          />
        </div>
      ),
      code: `
type Theme = 'light' | 'dark'
const [theme, setTheme] = useState<Theme>('light')

<div id="theme-heading">Appearance</div>
<RadioSwitch<Theme>
  aria-labelledby="theme-heading"
  name="theme"
  selected={theme}
  onChange={setTheme} // receives Theme, not string
  items={[{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="RadioSwitch"
      description="A small set of mutually exclusive options as one pill, with a highlight that slides to the chosen option (and stays put on first paint and resize; no motion with reduced motion). Supports size variants, color themes, subtext descriptions, and disabled items. A radio group for assistive tech: one Tab stop, the arrow keys, Home and End choose and move focus together, and disabled options are skipped."
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
