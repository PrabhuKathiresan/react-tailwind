import { Link } from 'react-router'
import { Breadcrumb } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'

export default function BreadcrumbDocsPage() {
  const examples = [
    {
      title: 'Basic Breadcrumb',
      description: 'A simple breadcrumb with static items.',
      render: (
        <Breadcrumb
          items={[
            { key: 'home', text: 'Home', to: '/home' },
            { key: 'library', text: 'Library', to: '/library' },
            { key: 'data', text: 'Data' },
          ]}
          render={(item) => (
            <Link className="text-blue-600 hover:underline" to={item.to as string}>
              {item.text}
            </Link>
          )}
        />
      ),
      code: `
<Breadcrumb
  items={[
    { key: "home", text: "Home", to: "/home" },
    { key: "library", text: "Library", to: "/library" },
    { key: "data", text: "Data" },
  ]}
  render={(item) => <span className="text-blue-600 hover:underline">{item.text}</span>}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Breadcrumb"
      description="A navigation trail that shows the user’s current location within a page hierarchy and lets them jump back to any ancestor level. Each item is rendered via a custom render prop, keeping routing library coupling entirely out of the component so it works with any router."
      examples={examples}
    />
  )
}
