import { useState } from 'react'
import { RangeInput } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

function SizeDemo() {
  const [val1, setVal1] = useState(30)
  const [val2, setVal2] = useState(50)
  const [val3, setVal3] = useState(70)

  return (
    <div className="max-w-md flex flex-col gap-5">
      <RangeInput
        size="sm"
        label="Small Slider (sm)"
        value={val1}
        valueSuffix="%"
        onChange={(e) => setVal1(Number(e.target.value))}
      />
      <RangeInput
        size="md"
        label="Medium Slider (md, default)"
        value={val2}
        valueSuffix="%"
        onChange={(e) => setVal2(Number(e.target.value))}
      />
      <RangeInput
        size="lg"
        label="Large Slider (lg)"
        value={val3}
        valueSuffix="%"
        onChange={(e) => setVal3(Number(e.target.value))}
      />
    </div>
  )
}

function TooltipAndMarksDemo() {
  const [volume, setVolume] = useState(65)

  return (
    <div className="max-w-md">
      <RangeInput
        label="Playback Volume"
        min={0}
        max={100}
        value={volume}
        valueSuffix="%"
        showTooltip
        marks={{ 0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%' }}
        helperText="Hover over or drag thumb to view live value tooltip."
        onChange={(e) => setVolume(Number(e.target.value))}
      />
    </div>
  )
}

export default function RangeInputDocsPage() {
  const examples = [
    {
      title: 'Size Scales (sm, md, lg)',
      description: 'Choose from 3 responsive sizing scales.',
      render: <SizeDemo />,
      code: `
<RangeInput size="sm" label="Small Slider (sm)" value={val1} />
<RangeInput size="md" label="Medium Slider (md)" value={val2} />
<RangeInput size="lg" label="Large Slider (lg)" value={val3} />`,
    },
    {
      title: 'Floating Tooltip & Step Marks',
      description:
        'Use showTooltip for floating value popups on hover/drag and marks to render tick marks.',
      render: <TooltipAndMarksDemo />,
      code: `
const [volume, setVolume] = useState(65)

<RangeInput
  label="Playback Volume"
  min={0}
  max={100}
  value={volume}
  valueSuffix="%"
  showTooltip
  marks={{ 0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%' }}
  helperText="Hover over or drag thumb to view live value tooltip."
  onChange={(e) => setVolume(Number(e.target.value))}
/>`,
    },
    {
      title: 'Validation Error State',
      description: 'Display an error message and red highlight when limits are exceeded.',
      render: (
        <div className="max-w-md">
          <RangeInput
            label="Server CPU Limit"
            min={0}
            max={100}
            defaultValue={95}
            valueSuffix="%"
            error="CPU allocation exceeds 90% threshold!"
          />
        </div>
      ),
      code: `
<RangeInput
  label="Server CPU Limit"
  defaultValue={95}
  valueSuffix="%"
  error="CPU allocation exceeds 90% threshold!"
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="RangeInput"
      description="A single-thumb slider control supporting filled active track gradients, floating tooltips, step tick marks, responsive size scales (sm/md/lg), and helper guidance messages."
      examples={examples}
    />
  )
}
