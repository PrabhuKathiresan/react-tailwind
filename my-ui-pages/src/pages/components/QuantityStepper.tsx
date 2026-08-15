import { useState } from 'react'
import { QuantityStepper } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function QuantityStepperDocsPage() {
  const [qty, setQty] = useState(1)
  const [priceQty, setPriceQty] = useState(5)

  const examples = [
    {
      title: 'Basic Usage',
      description: 'Specialized number stepper with increment/decrement buttons and bounds.',
      render: (
        <div className="space-y-4">
          <QuantityStepper value={qty} min={1} max={99} onChange={setQty} />
        </div>
      ),
      code: `
const [qty, setQty] = useState(1)

<QuantityStepper value={qty} min={1} max={99} onChange={setQty} />`,
    },
    {
      title: 'Sizes & Labels',
      description: 'Supports `sm`, `md` (default), and `lg` sizes along with field labels.',
      render: (
        <div className="flex gap-6 items-end flex-wrap">
          <QuantityStepper size="sm" label="Small" value={qty} onChange={setQty} />
          <QuantityStepper size="md" label="Medium" value={qty} onChange={setQty} />
          <QuantityStepper size="lg" label="Large" value={qty} onChange={setQty} />
        </div>
      ),
      code: `
<QuantityStepper size="sm" label="Small" value={qty} onChange={setQty} />
<QuantityStepper size="md" label="Medium" value={qty} onChange={setQty} />
<QuantityStepper size="lg" label="Large" value={qty} onChange={setQty} />`,
    },
    {
      title: 'Prefix & Suffix Slots',
      description: 'Add custom prefix or suffix elements such as currency symbols or unit labels.',
      render: (
        <div className="flex gap-6 items-end flex-wrap">
          <QuantityStepper
            label="Weight"
            suffix="kg"
            value={priceQty}
            step={0.5}
            onChange={setPriceQty}
          />
          <QuantityStepper label="Custom Units" suffix="items" value={qty} onChange={setQty} />
        </div>
      ),
      code: `
<QuantityStepper label="Weight" suffix="kg" step={0.5} value={weight} onChange={setWeight} />
<QuantityStepper label="Custom Units" suffix="items" value={qty} onChange={setQty} />`,
    },
  ]

  return (
    <DocsPageLayout
      component="QuantityStepper"
      description="Input component for incrementing or decrementing numeric quantities. Features min/max constraints, custom steps, text auto-selection on focus, and prefix/suffix slots."
      playground={{
        render: (props) => <QuantityStepper {...props} value={qty} onChange={setQty} />,
        initialProps: { min: 0, max: 100, step: 1, size: 'md', disabled: false },
      }}
      examples={examples}
    />
  )
}
