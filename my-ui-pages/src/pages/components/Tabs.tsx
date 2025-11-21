import { Tabs } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Home, Star, Flame } from 'lucide-react'

export default function TabsDocsPage() {
  const examples = [
    {
      title: 'Underline (Default)',
      description: 'A simple underline-style tabs component. This is the default variant.',
      render: (
        <Tabs
          variant="underline"
          tabs={[
            { label: 'Overview', content: <p>Overview content</p> },
            { label: 'Features', content: <p>Features content</p> },
            { label: 'Pricing', content: <p>Pricing content</p> },
          ]}
        />
      ),
      code: `
<Tabs
  variant="underline"
  tabs={[
    { label: "Overview", content: <p>Overview content</p> },
    { label: "Features", content: <p>Features content</p> },
    { label: "Pricing", content: <p>Pricing content</p> },
  ]}
/>`,
    },
    {
      title: 'Segmented',
      description: 'A clean segmented control appearance, useful for compact option switching.',
      render: (
        <Tabs
          variant="segmented"
          tabs={[
            { label: 'All', content: <p>All items</p> },
            { label: 'Active', content: <p>Active items</p> },
            { label: 'Archived', content: <p>Archived items</p> },
          ]}
        />
      ),
      code: `
<Tabs
  variant="segmented"
  tabs={[
    { label: "All", content: <p>All items</p> },
    { label: "Active", content: <p>Active items</p> },
    { label: "Archived", content: <p>Archived items</p> },
  ]}
/>`,
    },
    {
      title: 'Solid',
      description: 'A filled button-style tab appearance.',
      render: (
        <Tabs
          variant="solid"
          tabs={[
            { label: 'Profile', content: <p>Profile content</p> },
            { label: 'Settings', content: <p>Settings content</p> },
            { label: 'Billing', content: <p>Billing content</p> },
          ]}
        />
      ),
      code: `
<Tabs
  variant="solid"
  tabs={[
    { label: "Profile", content: <p>Profile content</p> },
    { label: "Settings", content: <p>Settings content</p> },
    { label: "Billing", content: <p>Billing content</p> },
  ]}
/>`,
    },
    {
      title: 'Tabs With Icons',
      description: 'Tabs can include icons by passing JSX to the label.',
      render: (
        <Tabs
          variant="underline"
          tabs={[
            {
              label: (
                <span className="flex items-center gap-1">
                  <Home size={14} /> Home
                </span>
              ),
              content: <p>Home content</p>,
            },
            {
              label: (
                <span className="flex items-center gap-1">
                  <Star size={14} /> Favorites
                </span>
              ),
              content: <p>Favorite items</p>,
            },
            {
              label: (
                <span className="flex items-center gap-1">
                  <Flame size={14} /> Trending
                </span>
              ),
              content: <p>Trending topics</p>,
            },
          ]}
        />
      ),
      code: `
<Tabs
  variant="underline"
  tabs={[
    {
      label: (
        <span className="flex items-center gap-1">
          <Home size={14} /> Home
        </span>
      ),
      content: <p>Home content</p>,
    },
    {
      label: (
        <span className="flex items-center gap-1">
          <Star size={14} /> Favorites
        </span>
      ),
      content: <p>Favorite items</p>,
    },
    {
      label: (
        <span className="flex items-center gap-1">
          <Flame size={14} /> Trending
        </span>
      ),
      content: <p>Trending topics</p>,
    },
  ]}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Tabs"
      description="A flexible tab component built on top of Headless UI's TabGroup with support for underline, segmented, and solid visual styles."
      examples={examples}
    />
  )
}
