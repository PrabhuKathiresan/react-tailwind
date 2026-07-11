import { useState } from 'react'
import { Tabs } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Home, Star, Flame, Settings, User, CreditCard } from 'lucide-react'

export default function TabsDocsPage() {
  const examples = [
    {
      title: 'Underline',
      description: 'The default variant. An active indicator line sits below the selected tab.',
      render: (
        <Tabs
          tabs={[
            {
              label: 'Overview',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Overview content</p>,
            },
            {
              label: 'Features',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Features content</p>,
            },
            {
              label: 'Pricing',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Pricing content</p>,
            },
          ]}
        />
      ),
      code: `<Tabs
  tabs={[
    { label: "Overview", content: <p>Overview content</p> },
    { label: "Features", content: <p>Features content</p> },
    { label: "Pricing",  content: <p>Pricing content</p>  },
  ]}
/>`,
    },
    {
      title: 'Segmented',
      description: 'Active tab renders as a filled pill. Good for compact option switching.',
      render: (
        <Tabs
          variant="segmented"
          tabs={[
            {
              label: 'All',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">All items</p>,
            },
            {
              label: 'Active',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Active items</p>,
            },
            {
              label: 'Archived',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Archived items</p>,
            },
          ]}
        />
      ),
      code: `<Tabs
  variant="segmented"
  tabs={[
    { label: "All",      content: <p>All items</p>      },
    { label: "Active",   content: <p>Active items</p>   },
    { label: "Archived", content: <p>Archived items</p> },
  ]}
/>`,
    },
    {
      title: 'Solid',
      description: 'Active tab has a solid block background, similar to a button group.',
      render: (
        <Tabs
          variant="solid"
          tabs={[
            {
              label: 'Profile',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Profile content</p>,
            },
            {
              label: 'Settings',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Settings content</p>,
            },
            {
              label: 'Billing',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Billing content</p>,
            },
          ]}
        />
      ),
      code: `<Tabs
  variant="solid"
  tabs={[
    { label: "Profile",  content: <p>Profile content</p>  },
    { label: "Settings", content: <p>Settings content</p> },
    { label: "Billing",  content: <p>Billing content</p>  },
  ]}
/>`,
    },
    {
      title: 'With Icons',
      description:
        'Pass an icon via the icon prop on each item. It renders before the label with a consistent gap.',
      render: (
        <Tabs
          tabs={[
            {
              label: 'Home',
              icon: <Home size={14} />,
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Home content</p>,
            },
            {
              label: 'Favorites',
              icon: <Star size={14} />,
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Favorite items</p>,
            },
            {
              label: 'Trending',
              icon: <Flame size={14} />,
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Trending topics</p>,
            },
          ]}
        />
      ),
      code: `<Tabs
  tabs={[
    { label: "Home",      icon: <Home size={14} />,  content: <p>Home content</p>    },
    { label: "Favorites", icon: <Star size={14} />,  content: <p>Favorite items</p>  },
    { label: "Trending",  icon: <Flame size={14} />, content: <p>Trending topics</p> },
  ]}
/>`,
    },
    {
      title: 'Stretch',
      description:
        'Tabs fill the full width of the container equally. Works on horizontal layouts.',
      render: (
        <Tabs
          stretch
          tabs={[
            {
              label: 'Profile',
              icon: <User size={14} />,
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Profile settings</p>,
            },
            {
              label: 'Account',
              icon: <Settings size={14} />,
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Account settings</p>,
            },
            {
              label: 'Billing',
              icon: <CreditCard size={14} />,
              content: <p className="text-sm text-gray-600 dark:text-gray-300">Billing settings</p>,
            },
          ]}
        />
      ),
      code: `<Tabs
  stretch
  tabs={[
    { label: "Profile", icon: <User size={14} />,       content: <p>Profile settings</p> },
    { label: "Account", icon: <Settings size={14} />,   content: <p>Account settings</p> },
    { label: "Billing", icon: <CreditCard size={14} />, content: <p>Billing settings</p> },
  ]}
/>`,
    },
    {
      title: 'Vertical',
      description:
        'Tabs stack in a column on the left with the panel content to the right. Works with all three variants.',
      render: (
        <Tabs
          orientation="vertical"
          tabs={[
            {
              label: 'General',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">General settings</p>,
            },
            {
              label: 'Security',
              content: (
                <p className="text-sm text-gray-600 dark:text-gray-300">Security settings</p>
              ),
            },
            {
              label: 'Notifications',
              content: (
                <p className="text-sm text-gray-600 dark:text-gray-300">Notification preferences</p>
              ),
            },
          ]}
        />
      ),
      code: `<Tabs
  orientation="vertical"
  tabs={[
    { label: "General",       content: <p>General settings</p>         },
    { label: "Security",      content: <p>Security settings</p>        },
    { label: "Notifications", content: <p>Notification preferences</p> },
  ]}
/>`,
    },
    {
      title: 'Disabled Tab',
      description:
        'Individual tabs can be disabled. Disabled tabs are not clickable and appear at reduced opacity.',
      render: (
        <Tabs
          tabs={[
            {
              label: 'Available',
              content: (
                <p className="text-sm text-gray-600 dark:text-gray-300">This tab is available.</p>
              ),
            },
            { label: 'Disabled', content: <p>Hidden</p>, disabled: true },
            {
              label: 'Also Available',
              content: <p className="text-sm text-gray-600 dark:text-gray-300">This one too.</p>,
            },
          ]}
        />
      ),
      code: `<Tabs
  tabs={[
    { label: "Available",      content: <p>This tab is available.</p> },
    { label: "Disabled",       content: <p>Hidden</p>, disabled: true },
    { label: "Also Available", content: <p>This one too.</p>          },
  ]}
/>`,
    },
    {
      title: 'Controlled',
      description: 'Use selectedIndex and onChange to drive the active tab from external state.',
      render: (() => {
        const Example = () => {
          const [index, setIndex] = useState(0)
          return (
            <div className="space-y-3">
              <Tabs
                selectedIndex={index}
                onChange={setIndex}
                tabs={[
                  {
                    label: 'Step 1',
                    content: (
                      <p className="text-sm text-gray-600 dark:text-gray-300">First step content</p>
                    ),
                  },
                  {
                    label: 'Step 2',
                    content: (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Second step content
                      </p>
                    ),
                  },
                  {
                    label: 'Step 3',
                    content: (
                      <p className="text-sm text-gray-600 dark:text-gray-300">Third step content</p>
                    ),
                  },
                ]}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className="px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Previous
                </button>
                <button
                  onClick={() => setIndex((i) => Math.min(2, i + 1))}
                  className="px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Next
                </button>
              </div>
            </div>
          )
        }
        return <Example />
      })(),
      code: `const [index, setIndex] = useState(0)

<Tabs
  selectedIndex={index}
  onChange={setIndex}
  tabs={[
    { label: "Step 1", content: <p>First step content</p>  },
    { label: "Step 2", content: <p>Second step content</p> },
    { label: "Step 3", content: <p>Third step content</p>  },
  ]}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Tabs"
      description="A panel switcher built on Headless UI's TabGroup for full keyboard navigation and ARIA compliance out of the box. Choose from three visual styles: underline for a clean docs-style look, segmented for a pill control, or solid for a more prominent active state. Supports icons, disabled tabs, stretch layout, vertical orientation, and full controlled mode."
      playground={{
        controls: {
          selectedIndex: 'hidden',
        },
        render: (props) => (
          <Tabs
            variant={props.variant}
            stretch={props.stretch}
            orientation={props.orientation}
            defaultIndex={props.defaultIndex}
            className="w-full"
            tabs={[
              {
                label: 'Overview',
                content: (
                  <p className="text-sm text-gray-600 dark:text-gray-300">Overview panel content</p>
                ),
              },
              {
                label: 'Details',
                content: (
                  <p className="text-sm text-gray-600 dark:text-gray-300">Details panel content</p>
                ),
              },
              {
                label: 'Settings',
                content: (
                  <p className="text-sm text-gray-600 dark:text-gray-300">Settings panel content</p>
                ),
              },
            ]}
          />
        ),
        initialProps: {
          variant: 'underline',
          stretch: false,
          orientation: 'horizontal',
          defaultIndex: 0,
        },
      }}
      examples={examples}
    />
  )
}
