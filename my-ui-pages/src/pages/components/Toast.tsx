import { useState } from 'react'
import { DocsPageLayout, type ExampleSection } from '../../components/DocsPageLayout'
import {
  BodyText,
  Button,
  RadioSwitch,
  TextContent,
  ToastProvider,
  useToast,
  type ToastPlacement,
  type ToastVariant,
} from '@pk-design/react-tailwind'
import { CodeBlock } from '../../components/CodeBlock'

/* ----------------------------------------------
 * Example: Basic Usage
 * ---------------------------------------------- */
function BasicToastExample() {
  const { showToast } = useToast()

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => showToast('This is a success message!', { type: 'success' })}>
        Show Success
      </Button>

      <Button onClick={() => showToast('Something went wrong!', { type: 'error' })} theme="danger">
        Show Error
      </Button>
    </div>
  )
}

/* ----------------------------------------------
 * Example: Shorthand Helpers (toast.success, etc)
 * ---------------------------------------------- */
function ShorthandToastExample() {
  const { toast } = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast.success('Changes saved successfully!')}>toast.success()</Button>
      <Button onClick={() => toast.error('Failed to connect to server!')} theme="danger">
        toast.error()
      </Button>
      <Button onClick={() => toast.info('New software update available.')} theme="secondary">
        toast.info()
      </Button>
      <Button onClick={() => toast.warning('Storage space is 90% full.')} theme="secondary">
        toast.warning()
      </Button>
      <Button onClick={() => toast.dismissAll()} variant="plain" theme="secondary">
        Dismiss All
      </Button>
    </div>
  )
}

/* ----------------------------------------------
 * Example: Title & Description Subtext
 * ---------------------------------------------- */
function TitleSubtextExample() {
  const { toast } = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast.success('File invoice_q3.pdf uploaded successfully.', {
            title: 'Upload Complete',
          })
        }
      >
        Show Title + Message
      </Button>

      <Button
        onClick={() =>
          toast.error('Invalid email format or password length.', {
            title: 'Authentication Error',
          })
        }
        theme="danger"
      >
        Show Error Title
      </Button>
    </div>
  )
}

/* ----------------------------------------------
 * Example: Interactive Action Button
 * ---------------------------------------------- */
function ActionButtonExample() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() =>
        toast.info('Item moved to trash.', {
          title: 'Deleted',
          action: {
            label: 'Undo',
            onClick: () => alert('Undo action triggered!'),
          },
        })
      }
    >
      Show Toast with Action Button
    </Button>
  )
}

/* ----------------------------------------------
 * Example: Visual Variants (accent, filled, outlined, glass)
 * ---------------------------------------------- */
function VariantsToastExample() {
  const { toast } = useToast()
  const [variant, setVariant] = useState<ToastVariant>('accent')

  return (
    <div className="flex flex-col gap-4">
      <RadioSwitch
        items={[
          { label: 'Accent (Default)', value: 'accent' },
          { label: 'Filled', value: 'filled' },
          { label: 'Outlined', value: 'outlined' },
          { label: 'Glass', value: 'glass' },
        ]}
        selected={variant}
        onChange={(v) => setVariant(v as ToastVariant)}
      />

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            toast.success('Your workspace settings were saved.', {
              title: 'Settings Saved',
              variant,
            })
          }
        >
          Success ({variant})
        </Button>
        <Button
          onClick={() =>
            toast.error('Payment processing failed.', {
              title: 'Billing Error',
              variant,
            })
          }
          theme="danger"
        >
          Error ({variant})
        </Button>
        <Button
          onClick={() =>
            toast.warning('Your session will expire in 2 minutes.', {
              title: 'Session Timeout',
              variant,
            })
          }
          theme="secondary"
        >
          Warning ({variant})
        </Button>
      </div>
    </div>
  )
}

/* ----------------------------------------------
 * Example: Large / Multi-line Text
 * ---------------------------------------------- */
function LongTextToastExample() {
  const { showToast } = useToast()

  return (
    <Button
      onClick={() =>
        showToast(
          "Your backup has started. This may take several minutes depending on data size. You can safely close this window—we'll notify you once complete.",
          { title: 'System Backup', type: 'info', duration: 6000 },
        )
      }
    >
      Show Large Text Toast
    </Button>
  )
}

/* ----------------------------------------------
 * Example: Auto Close Disabled
 * ---------------------------------------------- */
function AutoCloseFalseExample() {
  const { showToast } = useToast()

  return (
    <Button
      onClick={() =>
        showToast('This toast will remain until manually closed.', {
          title: 'Persistent Alert',
          type: 'warning',
          autoClose: false,
        })
      }
    >
      Show Persistent Toast
    </Button>
  )
}

/* ----------------------------------------------
 * Example: Placement Demo
 * ---------------------------------------------- */
function PlacementDemoExample() {
  const [placement, setPlacement] = useState<ToastPlacement>('top-right')

  return (
    <div className="flex flex-col gap-4">
      <RadioSwitch
        items={[
          { label: 'Top Left', value: 'top-left' },
          { label: 'Top Center', value: 'top-center' },
          { label: 'Top Right', value: 'top-right' },
          { label: 'Bottom Left', value: 'bottom-left' },
          { label: 'Bottom Center', value: 'bottom-center' },
          { label: 'Bottom Right', value: 'bottom-right' },
        ]}
        selected={placement}
        onChange={(v) => setPlacement(v as ToastPlacement)}
      />

      <ToastProvider placement={placement}>
        <PlacementDemoInner placement={placement} />
      </ToastProvider>
    </div>
  )
}

function PlacementDemoInner({ placement }: { placement: string }) {
  const { toast } = useToast()

  return (
    <div className="space-y-3">
      <BodyText>
        Placement: <TextContent strong>{placement}</TextContent>
      </BodyText>

      <Button
        onClick={() => toast.info(`Toast positioned at ${placement}`, { title: 'Notification' })}
      >
        Show Toast at {placement}
      </Button>
    </div>
  )
}

function ToastBestPractices() {
  return (
    <>
      <BodyText>
        ✓ Wrap your entire application with <TextContent strong>ToastProvider</TextContent>.
      </BodyText>
      <BodyText>
        ✓ Use <TextContent strong>useToast()</TextContent> or{' '}
        <TextContent strong>toast.success()</TextContent> inside components to trigger toasts.
      </BodyText>
      <BodyText>
        ✓ Add short headline <TextContent strong>title</TextContent> for multi-line notifications.
      </BodyText>
      <BodyText>
        ✓ Use <TextContent strong>action</TextContent> slots for quick undo or view operations.
      </BodyText>
      <BodyText>
        ✓ Select container variants (<TextContent strong>accent</TextContent>,{' '}
        <TextContent strong>filled</TextContent>, <TextContent strong>outlined</TextContent>,{' '}
        <TextContent strong>glass</TextContent>) matching your app aesthetic.
      </BodyText>
    </>
  )
}

export default function ToastDocsPage() {
  const examples: ExampleSection[] = [
    {
      title: 'Setup (Required)',
      description: 'Wrap your entire application with <ToastProvider> to enable toasts globally.',
      render: (
        <div className="space-y-2">
          <BodyText>App.tsx setup:</BodyText>
          <CodeBlock
            code={`// App.tsx
import { ToastProvider } from "@pk-design/react-tailwind"

export default function App() {
  return (
    <ToastProvider placement="top-right">
      <YourApp />
    </ToastProvider>
  )
}`}
          />

          <BodyText>Inside any component:</BodyText>
          <CodeBlock
            code={`const { toast } = useToast()
toast.success("Changes saved!")`}
          />
        </div>
      ),
      code: ``,
    },
    {
      title: 'Basic Usage',
      description: 'Trigger success or error toasts using showToast().',
      render: (
        <ToastProvider>
          <BasicToastExample />
        </ToastProvider>
      ),
      code: `
showToast("This is a success message!", { type: "success" })
showToast("Something went wrong!", { type: "error" })`,
    },
    {
      title: 'Shorthand Helper Methods',
      description:
        'Use toast.success(), toast.error(), toast.info(), toast.warning(), and toast.dismissAll().',
      since: '2.0.0',
      render: (
        <ToastProvider>
          <ShorthandToastExample />
        </ToastProvider>
      ),
      code: `
const { toast } = useToast()

toast.success("Changes saved successfully!")
toast.error("Failed to connect to server!")
toast.info("New update available.")
toast.warning("Storage is almost full.")
toast.dismissAll()`,
    },
    {
      title: 'Title & Subtext Description',
      description: 'Pass title prop for structured multi-line notifications.',
      since: '2.0.0',
      render: (
        <ToastProvider>
          <TitleSubtextExample />
        </ToastProvider>
      ),
      code: `
toast.success("File invoice_q3.pdf uploaded.", { title: "Upload Complete" })
toast.error("Invalid credentials.", { title: "Authentication Error" })`,
    },
    {
      title: 'Action Button Slot',
      description: 'Attach interactive inline action triggers.',
      since: '2.0.0',
      render: (
        <ToastProvider>
          <ActionButtonExample />
        </ToastProvider>
      ),
      code: `
toast.info("Item moved to trash.", {
  title: "Deleted",
  action: {
    label: "Undo",
    onClick: () => handleUndo(),
  },
})`,
    },
    {
      title: 'Visual Variants (accent, filled, outlined, glass)',
      description: 'Choose from 4 visual styles matching your design system.',
      since: '2.0.0',
      render: (
        <ToastProvider>
          <VariantsToastExample />
        </ToastProvider>
      ),
      code: `
toast.success("Workspace saved.", { variant: "filled" })
toast.error("Billing failed.", { variant: "outlined" })
toast.info("Update available.", { variant: "glass" })`,
    },
    {
      title: 'Larger / Multi-line Text & Progress Bar',
      description: 'Toasts feature an animated auto-close countdown progress bar.',
      render: (
        <ToastProvider>
          <LongTextToastExample />
        </ToastProvider>
      ),
      code: `
showToast(
  "Your backup has started. This may take several minutes...",
  { title: "System Backup", type: "info", duration: 6000 }
)`,
    },
    {
      title: 'Persistent Toast (autoClose = false)',
      description: 'Display toasts that remain visible until manually closed.',
      render: (
        <ToastProvider>
          <AutoCloseFalseExample />
        </ToastProvider>
      ),
      code: `
showToast("This will not auto-close.", { autoClose: false })`,
    },
    {
      title: 'Toast Placement',
      description: 'Toasts can appear in any screen corner or center.',
      render: <PlacementDemoExample />,
      code: `
<ToastProvider placement="top-right" maxToasts={5}>
  <App />
</ToastProvider>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Toast"
      description="Non-blocking notification popups with progress bar countdowns, visual variants, titles, action buttons, and ergonomic toast.success() shorthand helpers."
      examples={examples}
      bestPractices={<ToastBestPractices />}
    />
  )
}
