import { useState } from 'react'
import { RangeSlider } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

function SizeDemo() {
  const [min1, setMin1] = useState(20)
  const [max1, setMax1] = useState(80)

  const [min2, setMin2] = useState(15)
  const [max2, setMax2] = useState(75)

  const [min3, setMin3] = useState(10)
  const [max3, setMax3] = useState(90)

  return (
    <div className="max-w-md flex flex-col gap-5">
      <RangeSlider
        size="sm"
        label="Small Dual Slider (sm)"
        min={0}
        max={100}
        valueMin={min1}
        valueMax={max1}
        onChange={(nMin, nMax) => {
          setMin1(nMin)
          setMax1(nMax)
        }}
      />
      <RangeSlider
        size="md"
        label="Medium Dual Slider (md, default)"
        min={0}
        max={100}
        valueMin={min2}
        valueMax={max2}
        onChange={(nMin, nMax) => {
          setMin2(nMin)
          setMax2(nMax)
        }}
      />
      <RangeSlider
        size="lg"
        label="Large Dual Slider (lg)"
        min={0}
        max={100}
        valueMin={min3}
        valueMax={max3}
        onChange={(nMin, nMax) => {
          setMin3(nMin)
          setMax3(nMax)
        }}
      />
    </div>
  )
}

function StepAndMarksDemo() {
  const [minVal, setMinVal] = useState(200)
  const [maxVal, setMaxVal] = useState(800)

  return (
    <div className="max-w-md">
      <RangeSlider
        label="Budget Range (Step = 50)"
        min={0}
        max={1000}
        step={50}
        valueMin={minVal}
        valueMax={maxVal}
        valueSuffix="$"
        showTooltips
        marks={{ 0: '$0', 250: '$250', 500: '$500', 750: '$750', 1000: '$1000' }}
        helperText="Click or drag handles to adjust budget limits in $50 steps. Keyboard accessible with arrow keys."
        onChange={(nMin, nMax) => {
          setMinVal(nMin)
          setMaxVal(nMax)
        }}
      />
    </div>
  )
}

export default function RangeSliderDocsPage() {
  const examples = [
    {
      title: 'Size Scales (sm, md, lg)',
      description: 'Choose from 3 responsive sizing scales for dual range thumbs.',
      render: <SizeDemo />,
      code: `
<RangeSlider size="sm" label="Small (sm)" min={0} max={100} valueMin={20} valueMax={80} onChange={handleChange} />
<RangeSlider size="md" label="Medium (md)" min={0} max={100} valueMin={15} valueMax={75} onChange={handleChange} />
<RangeSlider size="lg" label="Large (lg)" min={0} max={100} valueMin={10} valueMax={90} onChange={handleChange} />`,
    },
    {
      title: 'Step Snap Increments & Floating Tooltips',
      description:
        'Use step to snap handle values, showTooltips for popups, and marks to render tick labels.',
      render: <StepAndMarksDemo />,
      code: `
const [min, setMin] = useState(200)
const [max, setMax] = useState(800)

<RangeSlider
  label="Budget Range"
  min={0}
  max={1000}
  step={50}
  valueMin={min}
  valueMax={max}
  valueSuffix="$"
  showTooltips
  marks={{ 0: '$0', 250: '$250', 500: '$500', 750: '$750', 1000: '$1000' }}
  helperText="Click or drag handles to adjust budget limits in $50 steps."
  onChange={(nMin, nMax) => {
    setMin(nMin)
    setMax(nMax)
  }}
/>`,
    },
    {
      title: 'Validation Error State',
      description: 'Display an error message below the range slider when criteria are violated.',
      render: (
        <div className="max-w-md">
          <RangeSlider
            label="Salary Expectation Range"
            min={0}
            max={200}
            valueMin={20}
            valueMax={40}
            valueSuffix="k"
            error="Selected range spans less than the minimum required threshold of 30k."
            onChange={() => {}}
          />
        </div>
      ),
      code: `
<RangeSlider
  label="Salary Expectation Range"
  min={0}
  max={200}
  valueMin={20}
  valueMax={40}
  valueSuffix="k"
  error="Selected range spans less than the minimum required threshold of 30k."
  onChange={handleChange}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="RangeSlider"
      description="A dual-thumb range selector supporting step snap increments, step tick marks, floating value tooltips, keyboard navigation accessibility, and responsive size scales (sm/md/lg)."
      playground={{
        render: (props) => (
          <div className="w-full max-w-md">
            <RangeSlider
              min={props.min ?? 0}
              max={props.max ?? 100}
              valueMin={props.valueMin ?? 20}
              valueMax={props.valueMax ?? 80}
              label={props.label || 'Price range'}
              valueSuffix={props.valueSuffix || ''}
              onChange={() => {}}
            />
          </div>
        ),
        initialProps: {
          min: 0,
          max: 100,
          valueMin: 20,
          valueMax: 80,
          label: 'Price range',
          valueSuffix: '$',
        },
      }}
      examples={examples}
    />
  )
}
