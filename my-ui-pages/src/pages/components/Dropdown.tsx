import { useState } from 'react'
import { Dropdown, Button } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

const DropdownDocPage = () => {
  const [_selected, setSelected] = useState<string | null>(null)

  const baseItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
    { id: 'logout', label: 'Logout' },
  ]

  return (
    <DocsPageLayout
      component="Dropdown"
      description="A flexible dropdown menu with support for custom triggers, custom item rendering, dividers, disabled items, styling overrides, and menu placement."
      examples={[
        {
          title: 'Basic Dropdown',
          description: 'Uses the simple triggerButton prop.',
          code: `
<Dropdown
  triggerButton={<Button variant="outlined">Menu</Button>}
  items={[
    { id: "profile", label: "Profile" },
    { id: "settings", label: "Settings" },
    { id: "logout", label: "Logout" },
  ]}
  onMenuClick={(item) => console.log(item.id)}
/>`,
          render: (
            <Dropdown
              triggerButton={<Button variant="outlined">Menu</Button>}
              items={baseItems}
              onMenuClick={(item) => setSelected(item.id)}
            />
          ),
        },

        {
          title: 'Custom Trigger — renderTriggerButton',
          description:
            'Use renderTriggerButton(state) for fully custom triggers that react to menu state.',
          code: `
<Dropdown
  renderTriggerButton={({ open }) => (
    <div className="flex items-center gap-1 cursor-pointer select-none">
      <span>Menu</span>
      <ChevronDownIcon className={
        \`w-4 h-4 transition-transform \${open ? 'rotate-180' : ''}\`
      }/>
    </div>
  )}
  items={[
    { id: "account", label: "Account" },
    { id: "billing", label: "Billing" },
  ]}
/>`,
          render: (
            <Dropdown
              renderTriggerButton={({ open }) => (
                <div className="flex items-center gap-1 cursor-pointer select-none">
                  <span>Menu</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              )}
              items={[
                { id: 'account', label: 'Account' },
                { id: 'billing', label: 'Billing' },
              ]}
            />
          ),
        },

        {
          title: 'Anchored Dropdown',
          description: 'Control placement using the anchor prop.',
          code: `
<Dropdown
  triggerButton={<Button>Top End</Button>}
  anchor="top end"
  items={[
    { id: "copy", label: "Copy" },
    { id: "paste", label: "Paste" },
  ]}
/>`,
          render: (
            <Dropdown
              triggerButton={<Button>Top End</Button>}
              anchor="top end"
              items={[
                { id: 'copy', label: 'Copy' },
                { id: 'paste', label: 'Paste' },
              ]}
            />
          ),
        },

        {
          title: 'Custom Item Rendering',
          description: 'renderItem lets you replace the entire item UI.',
          code: `
<Dropdown
  triggerButton={<Button>Custom</Button>}
  items={[{ id: "bold", label: "Bold" }]}
  renderItem={(item) => <strong>{item.label}</strong>}
/>`,
          render: (
            <Dropdown
              triggerButton={<Button>Custom</Button>}
              items={[
                { id: 'bold', label: 'Bold' },
                { id: 'italic', label: 'Italic' },
              ]}
              renderItem={(item) => <strong>{item.label}</strong>}
            />
          ),
        },

        {
          title: 'Dividers & Styling',
          description: 'Items can include a divider and the container can be styled.',
          code: `
<Dropdown
  triggerButton={<Button>Actions</Button>}
  itemsContainerClass="border p-2 w-40 rounded-lg shadow"
  items={[
    { id: "edit", label: "Edit" },
    { id: "delete", label: "Delete", divider: true },
    { id: "archive", label: "Archive" }
  ]}
/>`,
          render: (
            <Dropdown
              triggerButton={<Button theme="primary">Actions</Button>}
              itemsContainerClass="border border-gray-200 rounded-lg shadow-md p-2 w-40"
              items={[
                { id: 'edit', label: 'Edit' },
                { id: 'delete', label: 'Delete', divider: true },
                { id: 'archive', label: 'Archive' },
              ]}
            />
          ),
        },

        {
          title: 'Disabled Items',
          description: 'Disabled items cannot be clicked.',
          code: `
<Dropdown
  triggerButton={<Button>Disabled Items</Button>}
  items={[
    { id: "open", label: "Open" },
    { id: "save", label: "Save", disabled: true },
    { id: "export", label: "Export" },
  ]}
/>`,
          render: (
            <Dropdown
              triggerButton={<Button>Disabled Items</Button>}
              items={[
                { id: 'open', label: 'Open' },
                { id: 'save', label: 'Save', disabled: true },
                { id: 'export', label: 'Export' },
              ]}
            />
          ),
        },

        {
          title: 'Menu Item Styling',
          description: 'Use menuItemClass to style all items.',
          code: `
<Dropdown
  triggerButton={<Button>Styled</Button>}
  menuItemClass="text-blue-600 font-medium"
  items={[{ id: "view", label: "View" }]}
/>`,
          render: (
            <Dropdown
              triggerButton={<Button>Styled</Button>}
              menuItemClass="text-blue-600 font-medium"
              items={[
                { id: 'view', label: 'View' },
                { id: 'download', label: 'Download' },
              ]}
            />
          ),
        },

        {
          title: 'Selectable Dropdown (Custom Trigger)',
          description: 'The trigger updates based on the selected item.',
          code: `
const [value, setValue] = useState("Select")

<Dropdown
  renderTriggerButton={({ open }) => (
    <div className="flex items-center gap-1">
      <span>{value}</span>
      <ChevronDownIcon className={open ? "rotate-180" : ""} />
    </div>
  )}
  items={[
    { id: "apple", label: "Apple" },
    { id: "banana", label: "Banana" },
  ]}
  onMenuClick={(item) => setValue(item.label)}
/>`,
          render: (function SelectTriggerDemo() {
            const [value, setValue] = useState('Select')

            return (
              <Dropdown
                renderTriggerButton={({ open }) => (
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span>{value}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                )}
                items={[
                  { id: 'apple', label: 'Apple' },
                  { id: 'banana', label: 'Banana' },
                  { id: 'orange', label: 'Orange' },
                ]}
                onMenuClick={(item) => setValue(item.label as string)}
              />
            )
          })(),
        },
      ]}
    />
  )
}

export default DropdownDocPage
