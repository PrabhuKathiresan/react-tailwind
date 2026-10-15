import { useState } from 'react'
import { Banner, Button } from '@pk-design/react-tailwind'
import { RocketIcon } from 'lucide-react'
import { DocsPageLayout } from '../../components/DocsPageLayout'

function DismissibleBannerExample() {
  const [visible, setVisible] = useState(true)
  return visible ? (
    <Banner type="info" removable onRemove={() => setVisible(false)}>
      Your trial period ends in 7 days.{' '}
      <a href="#" className="underline font-medium">
        Upgrade now.
      </a>
    </Banner>
  ) : (
    <button className="text-sm text-blue-600 underline" onClick={() => setVisible(true)}>
      Show banner again
    </button>
  )
}

export default function BannerDocsPage() {
  const examples = [
    {
      title: 'Banner Types',
      description:
        'Four semantic types to convey contextual information. Colors are driven by design tokens and respect dark mode automatically.',
      render: (
        <div className="space-y-3 w-full">
          <Banner type="info">This is an informational banner.</Banner>
          <Banner type="success">Your operation completed successfully!</Banner>
          <Banner type="warning">This is a warning message — check your inputs.</Banner>
          <Banner type="error">Something went wrong. Please try again.</Banner>
        </div>
      ),
      code: `
<Banner type="info">This is an informational banner.</Banner>
<Banner type="success">Your operation completed successfully!</Banner>
<Banner type="warning">This is a warning message — check your inputs.</Banner>
<Banner type="error">Something went wrong. Please try again.</Banner>`,
    },
    {
      title: 'Dismissible',
      description:
        'Set `removable` and provide `onRemove` to show a dismiss button on the right side.',
      render: <DismissibleBannerExample />,
      code: `
const [visible, setVisible] = useState(true)

{visible && (
  <Banner type="info" removable onRemove={() => setVisible(false)}>
    Your trial period ends in 7 days.{' '}
    <a href="#" className="underline font-medium">Upgrade now.</a>
  </Banner>
)}`,
    },
    {
      title: 'Actions in Banners',
      description:
        'Use plain Buttons with className="text-current" so the action takes the banner colour. Its hover tint and focus outline follow that colour, so it reads well on every banner type in light and dark mode.',
      render: (
        <div className="space-y-3 w-full">
          <Banner type="info" removable>
            <span>A new version is available.</span>
            <Button variant="plain" size="xs" className="text-current">
              Reload
            </Button>
          </Banner>
          <Banner type="success" removable>
            <span>Payment received.</span>
            <Button variant="plain" size="xs" className="text-current">
              View receipt
            </Button>
          </Banner>
          <Banner type="warning" removable>
            <span>Your trial ends in 3 days.</span>
            <Button variant="plain" size="xs" className="text-current">
              Upgrade
            </Button>
          </Banner>
          <Banner type="error" removable>
            <span>We couldn't save your changes.</span>
            <Button variant="plain" size="xs" className="text-current">
              Retry
            </Button>
          </Banner>
        </div>
      ),
      code: `
<Banner type="warning" removable onRemove={...}>
  <span>Your trial ends in 3 days.</span>
  <Button variant="plain" size="xs" className="text-current">
    Upgrade
  </Button>
</Banner>`,
    },
    {
      title: 'Custom Icon Sizes',
      description:
        'Use `iconSize` to control the built-in icon. Available sizes: xs, sm (default), md, lg, xl.',
      render: (
        <div className="space-y-3 w-full">
          <Banner type="info" iconSize="sm">
            Small icon (sm — default)
          </Banner>
          <Banner type="info" iconSize="md">
            Medium icon (md)
          </Banner>
          <Banner type="info" iconSize="lg">
            Large icon (lg)
          </Banner>
        </div>
      ),
      code: `
<Banner type="info" iconSize="sm">Small icon (sm — default)</Banner>
<Banner type="info" iconSize="md">Medium icon (md)</Banner>
<Banner type="info" iconSize="lg">Large icon (lg)</Banner>`,
    },
    {
      title: 'Custom Icon',
      description:
        'Pass any ReactNode to `icon` to replace the built-in icon. Pass `icon={null}` to suppress it.',
      render: (
        <div className="space-y-3 w-full">
          <Banner type="info" icon={<RocketIcon className="size-5 shrink-0" />}>
            Custom icon overrides the default.
          </Banner>
          <Banner type="success" icon={null}>
            No icon — suppressed with icon={'{null}'}.
          </Banner>
        </div>
      ),
      code: `
<Banner type="info" icon={<RocketIcon className="size-5 shrink-0" />}>
  Custom icon overrides the default.
</Banner>
<Banner type="success" icon={null}>
  No icon — suppressed with icon={null}.
</Banner>`,
    },
    {
      title: 'Custom Content',
      description: 'Banners accept any children — include links, actions, or formatted content.',
      render: (
        <Banner type="warning">
          Your trial is expiring soon.{' '}
          <a href="#" className="underline font-medium">
            Upgrade now.
          </a>
        </Banner>
      ),
      code: `
<Banner type="warning">
  Your trial is expiring soon.{' '}
  <a href="#" className="underline font-medium">Upgrade now.</a>
</Banner>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Banner"
      description="A full-width notification strip for system-wide announcements, upgrade prompts, or persistent warnings. Supports semantic types with design-token colors, custom icons, a dismiss button, and any children content."
      playground={{
        render: (props) => (
          <Banner type="info" {...props}>
            Your trial period ends in 7 days.{' '}
            <a href="#" className="underline font-medium">
              Upgrade now.
            </a>
          </Banner>
        ),
      }}
      examples={examples}
    />
  )
}
