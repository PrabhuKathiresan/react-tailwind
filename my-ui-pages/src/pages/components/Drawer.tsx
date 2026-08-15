import React from 'react'
import { Drawer, Button, type DrawerAlignment, type DrawerSize } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Filter, Check, ShieldAlert } from 'lucide-react'

export default function DrawerDocsPage() {
  const examples = [
    {
      title: 'Mobile Bottom Sheet (align="bottom")',
      description:
        'Aligning the drawer to "bottom" turns it into a touch-friendly mobile bottom sheet with a top drag handle indicator bar.',
      render: <ExampleBottomSheetDrawer />,
      code: `
function ExampleBottomSheetDrawer() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button leftIcon={<Filter className="size-4" />} onClick={() => setOpen(true)}>
        Open Mobile Bottom Sheet
      </Button>

      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        align="bottom"
        size="sm"
        title="Filter Results"
        description="Select criteria to narrow down search results"
        footer={
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button fullWidth variant="outlined" onClick={() => setOpen(false)}>
              Reset
            </Button>
            <Button fullWidth theme="primary" leftIcon={<Check className="size-4" />} onClick={() => setOpen(false)}>
              Apply Filters
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-sm dark:text-gray-200">
          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600" defaultChecked />
            In Stock Items Only
          </label>
          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600" defaultChecked />
            Free Express Shipping
          </label>
          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600" />
            Discounted Products
          </label>
        </div>
      </Drawer>
    </>
  );
}`,
    },
    {
      title: 'Prevent Close on Outside Click (closeOnOutsideClick={false})',
      description:
        'Set `closeOnOutsideClick={false}` to prevent accidental drawer closure when users click the backdrop or outside the drawer.',
      render: <ExamplePreventOutsideClickDrawer />,
      code: `
function ExamplePreventOutsideClickDrawer() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button leftIcon={<ShieldAlert className="size-4" />} theme="warning" onClick={() => setOpen(true)}>
        Open (Protected Outside Click)
      </Button>

      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        closeOnOutsideClick={false}
        title="Unsaved Form Changes"
        description="Clicking outside or on the backdrop will not close this drawer."
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Discard
            </Button>
            <Button theme="primary" onClick={() => setOpen(false)}>
              Save Draft
            </Button>
          </div>
        }
      >
        <p className="text-sm dark:text-gray-200">
          Try clicking outside on the background backdrop. Notice that the drawer stays open until you explicitly click the Close (✕), Discard, or Save buttons.
        </p>
      </Drawer>
    </>
  );
}`,
    },
    {
      title: 'Drawer with Sticky Footer',
      description:
        'Use the `footer` prop to render a dedicated action row at the bottom of the drawer panel.',
      render: <ExampleFooterDrawer />,
      code: `
<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  align="end"
  title="Edit Profile"
  footer={
    <div className="flex justify-end gap-2">
      <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
      <Button theme="primary" onClick={() => setOpen(false)}>Save Changes</Button>
    </div>
  }
>
  <ProfileForm />
</Drawer>`,
    },
    {
      title: 'Alignments',
      description: 'Control slide direction with `align` (start, end, top, bottom, center).',
      render: (
        <div className="flex flex-wrap gap-3">
          <ExampleAlignDrawer align="center" label="Center" />
          <ExampleAlignDrawer align="end" label="End (Right)" />
          <ExampleAlignDrawer align="start" label="Start (Left)" />
          <ExampleAlignDrawer align="top" label="Top" />
          <ExampleAlignDrawer align="bottom" label="Bottom Sheet" />
        </div>
      ),
      code: `
<Drawer isOpen={open} align="start" title="Left Slide-Over" />
<Drawer isOpen={open} align="end" title="Right Slide-Over" />
<Drawer isOpen={open} align="bottom" title="Bottom Sheet" />`,
    },
    {
      title: 'Sizes',
      description: 'Drawer supports multiple width sizes (xs, sm, md, lg, xl, 2xl, full).',
      render: (
        <div className="flex flex-wrap gap-3">
          <ExampleSizeDrawer size="xs" />
          <ExampleSizeDrawer size="sm" />
          <ExampleSizeDrawer size="md" />
          <ExampleSizeDrawer size="lg" />
          <ExampleSizeDrawer size="xl" />
          <ExampleSizeDrawer size="2xl" />
          <ExampleSizeDrawer size="full" />
        </div>
      ),
      code: `
<Drawer isOpen={open} size="xs" title="XS Drawer" />
<Drawer isOpen={open} size="sm" title="Small Drawer" />
<Drawer isOpen={open} size="md" title="Medium Drawer" />
<Drawer isOpen={open} size="lg" title="Large Drawer" />
<Drawer isOpen={open} size="xl" title="XL Drawer" />
<Drawer isOpen={open} size="2xl" title="2XL Drawer" />
<Drawer isOpen={open} size="full" title="Full Width Drawer" />`,
    },
  ]

  return (
    <DocsPageLayout
      component="Drawer"
      description="A slide-in overlay panel or mobile bottom sheet that keeps users in context. Supports 5 alignments (start, end, top, bottom, center), 7 width sizes (xs, sm, md, lg, xl, 2xl, full), closeOnOutsideClick protection, mobile drag handle indicators, sticky headers, top-right close buttons, and custom action footers."
      examples={examples}
    />
  )
}

/* -------------------------
   Example helper components
   ------------------------- */

function ExampleBottomSheetDrawer() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button leftIcon={<Filter className="size-4" />} onClick={() => setOpen(true)}>
        Open Mobile Bottom Sheet
      </Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        align="bottom"
        size="sm"
        title="Filter Results"
        description="Select criteria to narrow down search results"
        footer={
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button fullWidth variant="outlined" onClick={() => setOpen(false)}>
              Reset
            </Button>
            <Button
              fullWidth
              theme="primary"
              leftIcon={<Check className="size-4" />}
              onClick={() => setOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        }
      >
        <div className="space-y-3 py-1 text-sm dark:text-gray-200">
          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600" defaultChecked />
            In Stock Items Only
          </label>
          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600" defaultChecked />
            Free Express Shipping
          </label>
          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input type="checkbox" className="rounded text-blue-600" />
            Discounted Products
          </label>
        </div>
      </Drawer>
    </>
  )
}

function ExamplePreventOutsideClickDrawer() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button
        leftIcon={<ShieldAlert className="size-4" />}
        theme="warning"
        onClick={() => setOpen(true)}
      >
        Open (Protected Outside Click)
      </Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        closeOnOutsideClick={false}
        title="Unsaved Form Changes"
        description="Clicking outside or on the backdrop will not close this drawer."
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Discard
            </Button>
            <Button theme="primary" onClick={() => setOpen(false)}>
              Save Draft
            </Button>
          </div>
        }
      >
        <p className="text-sm dark:text-gray-200">
          Try clicking outside on the background backdrop. Notice that the drawer stays open until
          you explicitly click the Close (✕), Discard, or Save buttons.
        </p>
      </Drawer>
    </>
  )
}

function ExampleFooterDrawer() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer with Footer</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        align="end"
        title="Edit Settings"
        description="Update your notification and privacy preferences"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button theme="primary" onClick={() => setOpen(false)}>
              Save Changes
            </Button>
          </div>
        }
      >
        <div className="space-y-3 text-sm dark:text-gray-200">
          <p>Modify settings inside this drawer content area.</p>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-xs text-gray-600 dark:text-gray-300">
            Changes will be applied immediately after saving.
          </div>
        </div>
      </Drawer>
    </>
  )
}

function ExampleSizeDrawer({ size }: { size: DrawerSize }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{size.toUpperCase()}</Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        size={size}
        title={`Size: ${size}`}
        showBackButton
      >
        <div className="space-y-4">
          <p className="text-sm dark:text-gray-200">
            Drawer content formatted for width size: <strong>{size}</strong>
          </p>
          <Button theme="secondary" onClick={() => setOpen(false)}>
            Close Drawer
          </Button>
        </div>
      </Drawer>
    </>
  )
}

function ExampleAlignDrawer({ align, label }: { align: DrawerAlignment; label: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} align={align} title={`${label} Drawer`}>
        <div className="space-y-4">
          <p className="text-sm dark:text-gray-200">
            Drawer aligned to: <strong>{align}</strong>
          </p>
          <Button theme="secondary" onClick={() => setOpen(false)}>
            Close Drawer
          </Button>
        </div>
      </Drawer>
    </>
  )
}
