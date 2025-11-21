import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { RangeSlider } from '@pk-design/react-tailwind'

export default function RangeSliderDocsPage() {
  const ExampleBasic = () => {
    const [min, setMin] = useState(20)
    const [max, setMax] = useState(80)

    return (
      <RangeSlider
        label="Basic Range"
        min={0}
        max={100}
        valueMin={min}
        valueMax={max}
        onChange={(newMin, newMax) => {
          setMin(newMin)
          setMax(newMax)
        }}
      />
    )
  }

  const ExampleWithSuffix = () => {
    const [min, setMin] = useState(500)
    const [max, setMax] = useState(2500)

    return (
      <RangeSlider
        label="Price"
        labelHint={<span className="text-gray-500 text-sm">Select price range</span>}
        min={0}
        max={5000}
        valueMin={min}
        valueMax={max}
        valueSuffix="₹"
        onChange={(newMin, newMax) => {
          setMin(newMin)
          setMax(newMax)
        }}
      />
    )
  }

  const ExampleWithError = () => {
    const [min, setMin] = useState(10)
    const [max, setMax] = useState(40)

    return (
      <RangeSlider
        label="Invalid Range Example"
        min={0}
        max={100}
        valueMin={min}
        valueMax={max}
        error="Please choose a wider range"
        onChange={(newMin, newMax) => {
          setMin(newMin)
          setMax(newMax)
        }}
      />
    )
  }

  const examples = [
    {
      title: 'Basic Range Slider',
      description: 'A simple dual-thumb range selector with smooth animations.',
      render: <ExampleBasic />,
      code: `
const [min, setMin] = useState(20)
const [max, setMax] = useState(80)

<RangeSlider
  label="Basic Range"
  min={0}
  max={100}
  valueMin={min}
  valueMax={max}
  onChange={(newMin, newMax) => {
    setMin(newMin)
    setMax(newMax)
  }}
/>`.trim(),
    },

    {
      title: 'Range Slider with Value Suffix',
      description: 'Add a suffix like currency, %, km, etc.',
      render: <ExampleWithSuffix />,
      code: `
const [min, setMin] = useState(500)
const [max, setMax] = useState(2500)

<RangeSlider
  label="Price"
  labelHint={<span>Select your price range</span>}
  min={0}
  max={5000}
  valueMin={min}
  valueMax={max}
  valueSuffix="₹"
  onChange={(newMin, newMax) => {
    setMin(newMin)
    setMax(newMax)
  }}
/>`.trim(),
    },

    {
      title: 'Range Slider With Error',
      description: 'Show validation errors below the slider.',
      render: <ExampleWithError />,
      code: `
const [min, setMin] = useState(10)
const [max, setMax] = useState(40)

<RangeSlider
  label="Invalid Range Example"
  min={0}
  max={100}
  valueMin={min}
  valueMax={max}
  error="Please choose a wider range"
  onChange={(newMin, newMax) => {
    setMin(newMin)
    setMax(newMax)
  }}
/>`.trim(),
    },
  ]

  return (
    <DocsPageLayout
      component="RangeSlider"
      description="A dual-thumb range slider with smooth animations, track-click behavior, and full keyboard/mouse support."
      examples={examples}
    />
  )
}
