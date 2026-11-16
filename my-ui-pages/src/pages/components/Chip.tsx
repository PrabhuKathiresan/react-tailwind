import { useState } from 'react'
import { Chip, ChipGroup } from '@pk-design/react-tailwind'
import { FilterIcon } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

const TERMS = [0, 7, 15, 30]

function PresetExample() {
  const [days, setDays] = useState(15)
  return (
    <ChipGroup label="Payment terms">
      {TERMS.map((value) => (
        <Chip key={value} selected={days === value} onClick={() => setDays(value)}>
          {value === 0 ? 'On receipt' : `${value} days`}
        </Chip>
      ))}
    </ChipGroup>
  )
}

function FilterExample() {
  const [picked, setPicked] = useState<string[]>(['Unpaid'])
  const toggle = (name: string) =>
    setPicked((current) =>
      current.includes(name) ? current.filter((n) => n !== name) : [...current, name],
    )
  return (
    <ChipGroup label="Quick filters" wrap>
      {['Unpaid', 'Overdue', 'This month', 'Exports'].map((name) => (
        <Chip
          key={name}
          size="md"
          icon={<FilterIcon className="size-3.5" />}
          selected={picked.includes(name)}
          onClick={() => toggle(name)}
        >
          {name}
        </Chip>
      ))}
    </ChipGroup>
  )
}

export default function ChipDocsPage() {
  const examples = [
    {
      title: 'Presets',
      description: 'One chip at a time: a quick choice that sets a value in one click.',
      render: <PresetExample />,
      code: `
<ChipGroup label="Payment terms">
  {[0, 7, 15, 30].map((value) => (
    <Chip key={value} selected={days === value} onClick={() => setDays(value)}>
      {value === 0 ? 'On receipt' : \`\${value} days\`}
    </Chip>
  ))}
</ChipGroup>`,
    },
    {
      title: 'Toggles',
      description:
        'Several chips on at once, e.g. quick filters. `wrap` lets a long row flow onto more lines.',
      render: <FilterExample />,
      code: `
<ChipGroup label="Quick filters" wrap>
  <Chip size="md" icon={<FilterIcon className="size-3.5" />} selected onClick={...}>Unpaid</Chip>
  <Chip size="md" icon={<FilterIcon className="size-3.5" />} onClick={...}>Overdue</Chip>
</ChipGroup>`,
    },
    {
      title: 'Sizes and disabled',
      description: "`sm` (default) and `md`. A disabled chip can't be picked.",
      render: (
        <ChipGroup label="Sizes">
          <Chip>Small</Chip>
          <Chip size="md">Medium</Chip>
          <Chip selected>Selected</Chip>
          <Chip disabled>Disabled</Chip>
        </ChipGroup>
      ),
      code: `
<Chip>Small</Chip>
<Chip size="md">Medium</Chip>
<Chip selected>Selected</Chip>
<Chip disabled>Disabled</Chip>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Chip"
      description="Pill-shaped choices picked in one click: presets that set a value, or toggles such as quick filters. Selected chips use the info colours and are announced as pressed toggles. Group them in a ChipGroup, which names the row for screen readers."
      playground={{
        render: (props) => <Chip {...props}>Chip label</Chip>,
        initialProps: { selected: false, size: 'sm', disabled: false },
      }}
      examples={examples}
    />
  )
}
