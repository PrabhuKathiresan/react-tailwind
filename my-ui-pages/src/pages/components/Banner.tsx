import { Banner } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function BannerDocsPage() {
  const examples = [
    {
      title: 'Banner Types',
      description:
        'Banners come in different types to convey contextual information such as success, error, warnings, or general info.',
      render: (
        <div className="space-y-3">
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
      title: 'Custom Icon Sizes',
      description:
        'Use the `iconSize` prop to control the size of the banner\’s leading icon. Available sizes: xs, sm (default), md, lg, xl.',
      render: (
        <div className="space-y-3">
          <Banner type="info" iconSize="sm">
            Small icon (sm)
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
<Banner type="info" iconSize="sm">Small icon (sm)</Banner>
<Banner type="info" iconSize="md">Medium icon (md)</Banner>
<Banner type="info" iconSize="lg">Large icon (lg)</Banner>`,
    },
    {
      title: 'Custom Content',
      description: 'You can include links, inline actions, or custom content inside a banner.',
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
  Your trial is expiring soon.{" "}
  <a href="#" className="underline font-medium">Upgrade now.</a>
</Banner>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Banner"
      description="A full-width notification strip designed to sit at the top of a page or section. Ideal for system-wide announcements, upgrade prompts, or persistent warnings that need to stay visible while users continue working. Supports icon size control, semantic types, and a dismiss action."
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
