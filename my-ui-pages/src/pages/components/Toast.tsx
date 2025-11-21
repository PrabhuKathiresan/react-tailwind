import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import {
  BodyText,
  Button,
  RadioSwitch,
  TextContent,
  ToastProvider,
  useToast,
  type ToastPlacement,
} from '@pk-design/react-tailwind'
import { CodeBlock } from '../../components/CodeBlock'

/* ----------------------------------------------------
 * ROOT SETUP — Example
 * ----------------------------------------------------
 *
 * Wrap your application with:
 *
 * <ToastProvider>
 *    <App />
 * </ToastProvider>
 *
 * Then inside any component:
 *
 * const { showToast } = useToast()
 * showToast("Message!", { type: "success" })
 *
 * ---------------------------------------------------- */

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

      <Button onClick={() => showToast('Something went wrong!', { type: 'error' })}>
        Show Error
      </Button>
    </div>
  )
}

/* ----------------------------------------------
 * Example: All Toast Types
 * ---------------------------------------------- */
function AllTypesExample() {
  const { showToast } = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => showToast('Operation completed!', { type: 'success' })}>
        Success
      </Button>

      <Button
        onClick={() => showToast('Something looks off.', { type: 'warning' })}
        theme="secondary"
      >
        Warning
      </Button>

      <Button
        onClick={() => showToast('Here is some information.', { type: 'info' })}
        theme="secondary"
      >
        Info
      </Button>

      <Button
        onClick={() => showToast('Unable to process the request!', { type: 'error' })}
        theme="danger"
      >
        Error
      </Button>
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
          "Your backup has started. This may take several minutes depending on the size of your data. You can safely close this window—we'll notify you once everything is complete.",
          { type: 'info', duration: 6000 },
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
      {/* Placement Switcher */}
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

/* ----------------------------------------------
 * Inner Component inside dynamic provider
 * ---------------------------------------------- */
function PlacementDemoInner({ placement }: { placement: string }) {
  const { showToast } = useToast()

  return (
    <div className="space-y-3">
      <BodyText>
        Placement: <TextContent strong>{placement}</TextContent>
      </BodyText>

      <Button
        onClick={() => showToast(`Toast at ${placement}`, { type: 'info', autoClose: false })}
      >
        Show Toast
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
        ✓ Use <TextContent strong>useToast()</TextContent> inside any component to trigger toasts.
      </BodyText>
      <BodyText>✓ Keep toast messages short, actionable, and concise.</BodyText>
      <BodyText>
        ✓ Use <TextContent strong>autoClose = false</TextContent> only for important or blocking
        warnings.
      </BodyText>
      <BodyText>
        ✓ Select placement that matches your product behavior (e.g., top-right for general apps,
        bottom-center for mobile-first).
      </BodyText>
      <BodyText>✓ Avoid stacking too many toasts — limit frequency and importance.</BodyText>
      <BodyText>✓ Do not use toasts for destructive confirmations — use dialogs instead.</BodyText>
    </>
  )
}

/* ----------------------------------------------
 * Main Docs Page
 * ---------------------------------------------- */
export default function ToastDocsPage() {
  const examples = [
    /* Root Setup */
    {
      title: 'Setup (Required)',
      description: 'Wrap your entire application with <ToastProvider> to enable toasts globally.',
      render: (
        <div className="space-y-2">
          <BodyText>This is usually done in your App.tsx:</BodyText>
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

          <BodyText>
            Inside any component, call <TextContent strong>showToast()</TextContent> using{' '}
            <TextContent strong>useToast()</TextContent>.
          </BodyText>
          <CodeBlock
            code={`const { showToast } = useToast()
showToast("Hello!", { type: "success" })`}
          />
        </div>
      ),
      code: ``,
    },

    /* Basic Usage */
    {
      title: 'Basic Usage',
      description: 'Trigger success or error toasts using useToast().',
      render: (
        <ToastProvider>
          <BasicToastExample />
        </ToastProvider>
      ),
      code: `
<Button onClick={() => showToast("This is a success message!", { type: "success" })}>
  Show Success
</Button>
<Button onClick={() => showToast("Something went wrong!", { type: "success" })}>
  Show Error
</Button>`,
    },

    /* All Types */
    {
      title: 'All Toast Types',
      description: 'Built-in variants: success, error, info, warning.',
      render: (
        <ToastProvider>
          <AllTypesExample />
        </ToastProvider>
      ),
      code: `
showToast("Operation completed!", { type: "success" })
showToast("Careful!", { type: "warning" })
showToast("Here is info", { type: "info" })
showToast("Something went wrong!", { type: "error" })`,
    },

    /* Large Text */
    {
      title: 'Larger / Multi-line Text',
      description: 'Toasts automatically expand for long messages.',
      render: (
        <ToastProvider>
          <LongTextToastExample />
        </ToastProvider>
      ),
      code: `
showToast(
  "Your backup has started. This may take several minutes...",
  { type: "info", duration: 6000 }
)`,
    },

    /* AutoClose false */
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

    /* Placement Demo */
    {
      title: 'Toast Placement',
      description: 'Toasts can appear in any screen corner or center. Placement is set globally.',
      render: <PlacementDemoExample />,
      code: `
<ToastProvider placement="bottom-right">
  <App />
</ToastProvider>

// Available placements:
// "top-left", "top-center", "top-right",
// "bottom-left", "bottom-center", "bottom-right"`,
    },
  ]

  return (
    <DocsPageLayout
      component="Toast"
      description="Toasts are transient notifications displayed in a chosen screen corner. Trigger them via the useToast() hook."
      examples={examples}
      bestPractices={<ToastBestPractices />}
    />
  )
}
