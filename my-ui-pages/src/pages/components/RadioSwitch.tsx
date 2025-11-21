import { useState } from 'react'
import { RadioSwitch, TextContent } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function RadioSwitchDocsPage() {
  const examples = [
    {
      title: 'Basic Radio Switch',
      description: 'A simple segmented control using string-based items.',
      render: (() => {
        const Example = () => {
          const [selected, setSelected] = useState('Option A')
          return (
            <RadioSwitch
              selected={selected}
              onChange={setSelected}
              items={['Option A', 'Option B', 'Option C']}
            />
          )
        }
        return <Example />
      })(),
      code: `
const [selected, setSelected] = useState("Option A")

<RadioSwitch
  selected={selected}
  onChange={setSelected}
  items={["Option A", "Option B", "Option C"]}
/>`,
    },

    {
      title: 'Controlled Radio Switch',
      description: 'Manage the selected value using React state.',
      render: (() => {
        const Example = () => {
          const [selected, setSelected] = useState('Monthly')
          return (
            <RadioSwitch
              label="Billing"
              selected={selected}
              onChange={setSelected}
              items={['Monthly', 'Yearly']}
            />
          )
        }
        return <Example />
      })(),
      code: `
const [selected, setSelected] = useState("Monthly")

<RadioSwitch
  label="Billing"
  selected={selected}
  onChange={setSelected}
  items={["Monthly", "Yearly"]}
/>`,
    },

    {
      title: 'Options With Descriptions',
      description: 'Pass objects to show a label and a description.',
      render: (() => {
        const Example = () => {
          const [selected, setSelected] = useState('basic')
          return (
            <RadioSwitch
              selected={selected}
              onChange={setSelected}
              items={[
                { label: 'Basic', value: 'basic', description: 'For individuals' },
                { label: 'Pro', value: 'pro', description: 'For small teams' },
                { label: 'Enterprise', value: 'enterprise', description: 'For large orgs' },
              ]}
              contentClass="px-3"
            />
          )
        }
        return <Example />
      })(),
      code: `
const [selected, setSelected] = useState("basic")

<RadioSwitch
  selected={selected}
  onChange={setSelected}
  items={[
    { label: "Basic", value: "basic", description: "For individuals" },
    { label: "Pro", value: "pro", description: "For small teams" },
    { label: "Enterprise", value: "enterprise", description: "For large orgs" },
  ]}
/>`,
    },

    {
      title: 'With Label and Hint',
      description: 'Display additional UI context using an external label block.',
      render: (() => {
        const Example = () => {
          const [selected, setSelected] = useState('Light')
          return (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <TextContent strong>Theme</TextContent>
                <TextContent muted small>
                  Choose your preference
                </TextContent>
              </div>

              <RadioSwitch
                selected={selected}
                onChange={setSelected}
                items={['Light', 'Dark', 'System']}
              />
            </div>
          )
        }
        return <Example />
      })(),
      code: `
const [selected, setSelected] = useState("Light")

<div className="space-y-2">
  <div className="flex justify-between items-center">
    <span className="font-medium text-gray-700">Theme</span>
    <span className="text-sm text-gray-500">Choose your preference</span>
  </div>

  <RadioSwitch
    selected={selected}
    onChange={setSelected}
    items={["Light", "Dark", "System"]}
  />
</div>`,
    },

    {
      title: 'Custom Styling',
      description: 'Add Tailwind classes to wrapper or inner content.',
      render: (() => {
        const Example = () => {
          const [selected, setSelected] = useState('medium')
          return (
            <RadioSwitch
              selected={selected}
              onChange={setSelected}
              wrapperClass="bg-gray-50 dark:bg-gray-900 shadow-inner"
              contentClass="py-1"
              items={[
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
              ]}
            />
          )
        }
        return <Example />
      })(),
      code: `
const [selected, setSelected] = useState("medium")

<RadioSwitch
  selected={selected}
  onChange={setSelected}
  wrapperClass="bg-gray-50 dark:bg-gray-900 shadow-inner"
  contentClass="py-1"
  items={[
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ]}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="RadioSwitch"
      description="A segmented-control style switch built with HeadlessUI and Tailwind CSS. Supports sliding highlight animation, descriptions, custom styles, and full keyboard accessibility."
      examples={examples}
    />
  )
}
