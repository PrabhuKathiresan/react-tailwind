import { useState } from 'react'
import { RangeInput } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function RangeInputDocsPage() {
  const examples = [
    // -------------------------------------------------------
    // Basic Example
    // -------------------------------------------------------
    {
      title: 'Basic Range Input',
      description: 'A simple range slider with a label and current value.',
      render: (() => {
        const Example = () => {
          const [value, setValue] = useState(50)
          return (
            <RangeInput
              label="Volume"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          )
        }
        return <Example />
      })(),
      code: `
const [value, setValue] = useState(50)

<RangeInput
  label="Volume"
  min={0}
  max={100}
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
/>`,
    },

    // -------------------------------------------------------
    // With Value Suffix
    // -------------------------------------------------------
    {
      title: 'With Value Suffix',
      description: 'Add a suffix like %, px, km, etc. to the displayed value.',
      render: (() => {
        const Example = () => {
          const [opacity, setOpacity] = useState(75)
          return (
            <RangeInput
              label="Opacity"
              min={0}
              max={100}
              value={opacity}
              valueSuffix="%"
              onChange={(e) => setOpacity(Number(e.target.value))}
            />
          )
        }
        return <Example />
      })(),
      code: `
const [opacity, setOpacity] = useState(75)

<RangeInput
  label="Opacity"
  min={0}
  max={100}
  value={opacity}
  valueSuffix="%"
  onChange={(e) => setOpacity(Number(e.target.value))}
/>`,
    },

    // -------------------------------------------------------
    // With Hint
    // -------------------------------------------------------
    {
      title: 'With Label Hint',
      description: 'Hints help explain what the slider controls.',
      render: (() => {
        const Example = () => {
          const [temperature, setTemperature] = useState(22)
          return (
            <RangeInput
              label="Temperature"
              labelHint={<span className="text-sm text-gray-500">In °C</span>}
              min={10}
              max={40}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
            />
          )
        }
        return <Example />
      })(),
      code: `
const [temperature, setTemperature] = useState(22)

<RangeInput
  label="Temperature"
  labelHint={<span className="text-sm text-gray-500">In °C</span>}
  min={10}
  max={40}
  value={temperature}
  onChange={(e) => setTemperature(Number(e.target.value))}
/>`,
    },

    // -------------------------------------------------------
    // Error State
    // -------------------------------------------------------
    {
      title: 'Error State',
      description: 'Show an error message when validation fails.',
      render: (() => {
        const Example = () => {
          const [brightness, setBrightness] = useState(150)
          return (
            <RangeInput
              label="Brightness"
              min={0}
              max={200}
              value={brightness}
              error={brightness > 180 ? 'Value too high!' : null}
              onChange={(e) => setBrightness(Number(e.target.value))}
            />
          )
        }
        return <Example />
      })(),
      code: `
const [brightness, setBrightness] = useState(150)

<RangeInput
  label="Brightness"
  min={0}
  max={200}
  value={brightness}
  error={brightness > 180 ? "Value too high!" : null}
  onChange={(e) => setBrightness(Number(e.target.value))}
/>`,
    },

    // -------------------------------------------------------
    // Custom Styling
    // -------------------------------------------------------
    {
      title: 'Custom Styling',
      description: 'Customize the slider track, wrapper, or thumb with classNames.',
      render: (() => {
        const Example = () => {
          const [zoom, setZoom] = useState(1)
          return (
            <RangeInput
              label="Zoom Level"
              min={1}
              max={10}
              step={1}
              value={zoom}
              valueSuffix="x"
              containerClass="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-900"
              className="accent-purple-600"
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          )
        }
        return <Example />
      })(),
      code: `
const [zoom, setZoom] = useState(1)

<RangeInput
  label="Zoom Level"
  min={1}
  max={10}
  step={1}
  value={zoom}
  valueSuffix="x"
  containerClass="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-900"
  className="accent-purple-600"
  onChange={(e) => setZoom(Number(e.target.value))}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="RangeInput"
      description="A styled single-thumb slider for selecting a numeric value within a defined min-max range. Pairs the native input range element with a label, hint text, value suffix for units like px or percent, and inline error messaging for validation scenarios."
      playground={{
        render: (props) => (
          <div className="w-full max-w-md">
            <RangeInput
              label="Volume"
              name="volume"
              min={0}
              max={100}
              showValue={props.showValue}
              valueSuffix={props.valueSuffix}
            />
          </div>
        ),
        initialProps: { showValue: true, valueSuffix: '%' },
      }}
      examples={examples}
    />
  )
}
