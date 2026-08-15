import { useState } from 'react'
import { Dropdown, Button } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
  Plus,
  Trash2,
  Copy,
  Shield,
} from 'lucide-react'

const DropdownDocPage = () => {
  const [_selected, setSelected] = useState<string | null>(null)

  const richItems = [
    {
      id: 'account',
      groupTitle: 'Account',
      label: 'My Profile',
      icon: <User className="size-4" />,
      shortcut: '⇧⌘P',
    },
    {
      id: 'billing',
      label: 'Billing & Invoices',
      icon: <CreditCard className="size-4" />,
      description: 'Manage subscription',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="size-4" />,
      shortcut: '⌘S',
      divider: true,
    },
    {
      id: 'team',
      groupTitle: 'Workspace',
      label: 'Invite Team',
      icon: <Plus className="size-4" />,
    },
    { id: 'security', label: 'Security & 2FA', icon: <Shield className="size-4" />, divider: true },
    { id: 'logout', label: 'Log Out', icon: <LogOut className="size-4" />, danger: true },
  ]

  return (
    <DocsPageLayout
      component="Dropdown"
      description="A contextual action menu anchored to any custom trigger element. Supports grouped section titles, item icons, keyboard shortcuts, 2-line descriptions, destructive items, and configurable placement options."
      examples={[
        {
          title: 'Rich Menu Items (Icons, Shortcuts & Group Titles)',
          description:
            'Render items with left icons, right-aligned keyboard shortcuts (⌘K), section headers, and red danger actions.',
          code: `
<Dropdown
  width="lg"
  triggerButton={<Button variant="outlined">Account Menu</Button>}
  items={[
    { id: 'profile', groupTitle: 'Account', label: 'My Profile', icon: <User className="size-4" />, shortcut: '⇧⌘P' },
    { id: 'billing', label: 'Billing & Invoices', icon: <CreditCard className="size-4" />, description: 'Manage subscription' },
    { id: 'settings', label: 'Settings', icon: <Settings className="size-4" />, shortcut: '⌘S', divider: true },
    { id: 'team', groupTitle: 'Workspace', label: 'Invite Team', icon: <Plus className="size-4" />, divider: true },
    { id: 'logout', label: 'Log Out', icon: <LogOut className="size-4" />, danger: true },
  ]}
  onMenuClick={(item) => console.log(item.id)}
/>`,
          render: (
            <Dropdown
              width="lg"
              triggerButton={<Button variant="outlined">Account Menu</Button>}
              items={richItems}
              onMenuClick={(item) => setSelected(item.id)}
            />
          ),
        },
        {
          title: 'Custom Trigger — renderTriggerButton',
          description:
            'Use renderTriggerButton(state) for custom triggers that react dynamically to open/close menu state.',
          code: `
<Dropdown
  width="md"
  renderTriggerButton={({ open }) => (
    <Button variant="outlined" className="gap-2">
      <span>Actions</span>
      <ChevronDown className={\`size-4 transition-transform duration-200 \${open ? 'rotate-180' : ''}\`} />
    </Button>
  )}
  items={[
    { id: 'copy', label: 'Duplicate Item', icon: <Copy className="size-4" />, shortcut: '⌘D' },
    { id: 'delete', label: 'Delete Item', icon: <Trash2 className="size-4" />, danger: true },
  ]}
/>`,
          render: (
            <Dropdown
              width="md"
              renderTriggerButton={({ open }) => (
                <Button variant="outlined" className="gap-2">
                  <span>Actions</span>
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  />
                </Button>
              )}
              items={[
                {
                  id: 'copy',
                  label: 'Duplicate Item',
                  icon: <Copy className="size-4" />,
                  shortcut: '⌘D',
                },
                {
                  id: 'delete',
                  label: 'Delete Item',
                  icon: <Trash2 className="size-4" />,
                  danger: true,
                },
              ]}
            />
          ),
        },
        {
          title: 'Anchored Dropdown Placement',
          description: 'Control placement using anchor ("bottom start", "top end", "right", etc.).',
          code: `
<Dropdown
  anchor="top end"
  triggerButton={<Button>Top End Placement</Button>}
  items={[
    { id: 'copy', label: 'Copy Link' },
    { id: 'share', label: 'Share Project' },
  ]}
/>`,
          render: (
            <Dropdown
              anchor="top end"
              triggerButton={<Button>Top End Placement</Button>}
              items={[
                { id: 'copy', label: 'Copy Link' },
                { id: 'share', label: 'Share Project' },
              ]}
            />
          ),
        },
        {
          title: 'Disabled & Custom Item States',
          description: 'Items can be disabled or styled with custom menuItemClass.',
          code: `
<Dropdown
  triggerButton={<Button variant="ghost">Document Actions</Button>}
  items={[
    { id: 'open', label: 'Open File', shortcut: '⌘O' },
    { id: 'save', label: 'Save File (Locked)', disabled: true, shortcut: '⌘S' },
    { id: 'export', label: 'Export PDF' },
  ]}
/>`,
          render: (
            <Dropdown
              triggerButton={<Button variant="outlined">Document Actions</Button>}
              items={[
                { id: 'open', label: 'Open File', shortcut: '⌘O' },
                { id: 'save', label: 'Save File (Locked)', disabled: true, shortcut: '⌘S' },
                { id: 'export', label: 'Export PDF' },
              ]}
            />
          ),
        },
      ]}
    />
  )
}

export default DropdownDocPage
