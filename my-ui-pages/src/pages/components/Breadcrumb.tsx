import { Breadcrumb } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Link } from 'react-router'

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
      description="Breadcrumbs indicate the current page’s location within a hierarchy, helping users navigate easily."
      examples={examples}
    />
  )
}
