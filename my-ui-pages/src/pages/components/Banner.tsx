import { Banner } from 'react-tailwind'
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
        'Use the `iconSize` prop to control the size of the banner’s leading icon. Available sizes range from 5 to 10.',
      render: (
        <div className="space-y-3">
          <Banner type="info" iconSize={5}>
            Small icon (5)
          </Banner>
          <Banner type="info" iconSize={7}>
            Medium icon (7)
          </Banner>
          <Banner type="info" iconSize={9}>
            Large icon (9)
          </Banner>
        </div>
      ),
      code: `
<Banner type="info" iconSize={5}>Small icon (5)</Banner>
<Banner type="info" iconSize={7}>Medium icon (7)</Banner>
<Banner type="info" iconSize={9}>Large icon (9)</Banner>`,
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
      description="Banners are used to display high-visibility messages across the application, providing status updates or alerts to users."
      examples={examples}
    />
  )
}
