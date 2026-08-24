import { useState, useEffect } from 'react'
import { RadioGroup } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Shield, Zap, Sparkles } from 'lucide-react'

function RadioGroupPlayground(props: any) {
  const [val, setVal] = useState(props.value || 'Apple')

  useEffect(() => {
    if (props.value !== undefined) setVal(props.value)
  }, [props.value])

  return (
    <RadioGroup
      {...props}
      options={props.options || ['Apple', 'Banana', 'Cherry']}
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  )
}

export default function RadioGroupDocsPage() {
  const [selected, setSelected] = useState('Apple')
  const [plan, setPlan] = useState('pro')
  const [sizeVal, setSizeVal] = useState('Medium')

  const examples = [
    {
      title: 'Selectable Cards Mode (variant="cards")',
      description:
        'Use variant="cards" to render options as rich selectable card tiles with icons and descriptions.',
      render: (
        <RadioGroup
          name="pricing-plan"
          label="Select Subscription Plan"
          variant="cards"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          columns={3}
          options={[
            {
              label: 'Starter Plan',
              value: 'starter',
              description: '$9/month • Up to 5 projects and 1GB storage',
              icon: <Zap className="size-5 text-amber-500" />,
            },
            {
              label: 'Pro Plan',
              value: 'pro',
              description: '$29/month • Unlimited projects and priority support',
              icon: <Sparkles className="size-5 text-blue-500" />,
            },
            {
              label: 'Enterprise',
              value: 'enterprise',
              description: '$99/month • Custom SLA, dedicated server & SSO',
              icon: <Shield className="size-5 text-emerald-500" />,
            },
          ]}
        />
      ),
      code: `
const [plan, setPlan] = useState('pro')

<RadioGroup
  name="pricing-plan"
  label="Select Subscription Plan"
  variant="cards"
  value={plan}
  onChange={(e) => setPlan(e.target.value)}
  columns={3}
  options={[
    { label: 'Starter Plan', value: 'starter', description: '$9/month • Up to 5 projects', icon: <Zap /> },
    { label: 'Pro Plan', value: 'pro', description: '$29/month • Unlimited projects', icon: <Sparkles /> },
    { label: 'Enterprise', value: 'enterprise', description: '$99/month • Custom SLA & SSO', icon: <Shield /> },
  ]}
/>`,
    },

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
const [selected, setSelected] = useState('Apple')

<RadioGroup
  name="fruit-basic"
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  options={["Apple", "Banana", "Cherry"]}
/>`,
    },

    {
      title: 'Row Layout',
      description: 'Set row={true} to display options horizontally in a single row.',
      render: (
        <RadioGroup
          name="layout-row"
          label="Size Preference"
          row
          options={['Small', 'Medium', 'Large', 'Extra Large']}
          value={sizeVal}
          onChange={(e) => setSizeVal(e.target.value)}
        />
      ),
      code: `
const [sizeVal, setSizeVal] = useState('Medium')

<RadioGroup
  name="layout-row"
  label="Size Preference"
  row
  value={sizeVal}
  onChange={(e) => setSizeVal(e.target.value)}
  options={["Small", "Medium", "Large", "Extra Large"]}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="RadioGroup"
      description="A controlled list of mutually exclusive options. Supports standard vertical/horizontal layout or rich selectable cards (variant='cards') with icons, descriptions, grid column counts, and custom theme colors."
      playground={{
        render: (props) => <RadioGroupPlayground {...props} />,
        initialProps: {
          name: 'playground-radio-group',
          label: 'Choose a Fruit',
          row: false,
          size: 'md',
          disabled: false,
          variant: 'default',
        },
      }}
      examples={examples}
    />
  )
}
