import { useState } from 'react'
import { Dropdown, Button } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

const DropdownDocPage = () => {
  const [selected, setSelected] = useState<string | null>(null)

  const items = [
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
    { id: 'logout', label: 'Logout' },
  ]

  console.log('Selected', selected)

  return (
    <DocsPageLayout
      component="Dropdown"
      description="The Dropdown component displays a list of actions or options anchored to a trigger button. It supports custom rendering, alignment, and transitions."
      examples={[
        {
          title: 'Basic Dropdown',
          description: 'A simple dropdown with default bottom-start placement.',
          code: `
<Dropdown
  triggerButton={<Button variant="outline">Menu</Button>}
  items={[
    { id: "profile", label: "Profile" },
    { id: "settings", label: "Settings" },
    { id: "logout", label: "Logout" },
  ]}
  renderItem={(item) => (
    <div className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded">
      {item.label}
    </div>
  )}
/>`,
          render: (
            <Dropdown
              triggerButton={<Button variant="outlined">Menu</Button>}
              items={items}
              renderItem={(item, { className }) => (
                <button key={item.id} className={className} onClick={() => setSelected(item.label)}>
                  {item.label}
                </button>
              )}
            />
          ),
        },
        {
          title: 'Dropdown with Anchors',
          description:
            "You can control the dropdown position using the `anchor` prop. It supports placements like 'top end', 'bottom start', 'right', etc.",
          code: `
<Dropdown
  triggerButton={<Button>Top End</Button>}
  anchor="top end"
  items={[
    { id: "copy", label: "Copy" },
    { id: "paste", label: "Paste" },
  ]}
  renderItem={(item) => (
    <div className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded">
      {item.label}
    </div>
  )}
/>`,
          render: (
            <Dropdown
              triggerButton={<Button>Top End</Button>}
              anchor="top end"
              items={[
                { id: 'copy', label: 'Copy' },
                { id: 'paste', label: 'Paste' },
              ]}
              renderItem={(item, { className }) => (
                <button className={className}>{item.label}</button>
              )}
            />
          ),
        },
        {
          title: 'Dropdown with Divider & Custom Styling',
          description:
            'You can add dividers and custom container classes to style the dropdown menu.',
          code: `
<Dropdown
  triggerButton={<Button variant="primary">Actions</Button>}
  itemsContainerClass="bg-white border border-gray-200 rounded-lg shadow-md p-2 w-40"
  items={[
    { id: "edit", label: "Edit" },
    { id: "delete", label: "Delete", divider: true },
    { id: "archive", label: "Archive" },
  ]}
  renderItem={(item) => (
    <>
      <div className="px-3 py-2 cursor-pointer hover:bg-gray-50 rounded">
        {item.label}
      </div>
      {item.divider && <hr className="my-1 border-gray-200" />}
    </>
  )}
/>`,
          render: (
            <Dropdown
              triggerButton={<Button theme="primary">Actions</Button>}
              itemsContainerClass="bg-white border border-gray-200 rounded-lg shadow-md p-2 w-40"
              items={[
                { id: 'edit', label: 'Edit' },
                { id: 'delete', label: 'Delete', divider: true },
                { id: 'archive', label: 'Archive' },
              ]}
              renderItem={(item, { className }) => (
                <button className={className}>{item.label}</button>
              )}
            />
          ),
        },
      ]}
    />
  )
}

export default DropdownDocPage
