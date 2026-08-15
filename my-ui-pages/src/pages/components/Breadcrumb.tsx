import { Link } from 'react-router'
import { Breadcrumb } from '@pk-design/react-tailwind'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { Home, Folder, FileText, Settings, Shield } from 'lucide-react'

export default function BreadcrumbDocsPage() {
  const examples = [
    {
      title: 'Basic Breadcrumb & Optional Link Rendering',
      description:
        'A simple breadcrumb trail. Render prop is optional—items with a "to" property link automatically.',
      render: (
        <Breadcrumb
          items={[
            { key: 'home', text: 'Home', to: '/' },
            { key: 'components', text: 'Components', to: '/components' },
            { key: 'breadcrumb', text: 'Breadcrumb' },
          ]}
          render={(item) => (
            <Link
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium hover:underline"
              to={item.to as string}
            >
              {item.text}
            </Link>
          )}
        />
      ),
      code: `
<Breadcrumb
  items={[
    { key: "home", text: "Home", to: "/" },
    { key: "components", text: "Components", to: "/components" },
    { key: "breadcrumb", text: "Breadcrumb" },
  ]}
  render={(item) => (
    <Link className="text-blue-600 hover:underline" to={item.to}>
      {item.text}
    </Link>
  )}
/>`,
    },
    {
      title: 'Custom Separators (Chevron, Dot & Slash)',
      description:
        'Customize the divider between trail items using "chevron", "dot", "slash", or custom icons.',
      render: (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">
              Chevron Separator
            </p>
            <Breadcrumb
              separator="chevron"
              items={[
                { key: 'store', text: 'Store', to: '#' },
                { key: 'electronics', text: 'Electronics', to: '#' },
                { key: 'laptops', text: 'Laptops' },
              ]}
              render={(item) => (
                <Link to="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
                  {item.text}
                </Link>
              )}
            />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">
              Dot Separator
            </p>
            <Breadcrumb
              separator="dot"
              items={[
                { key: 'docs', text: 'Docs', to: '#' },
                { key: 'guides', text: 'Guides', to: '#' },
                { key: 'authentication', text: 'Authentication' },
              ]}
              render={(item) => (
                <Link to="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
                  {item.text}
                </Link>
              )}
            />
          </div>
        </div>
      ),
      code: `
{/* Chevron Separator */}
<Breadcrumb
  separator="chevron"
  items={[
    { key: 'store', text: 'Store', to: '/store' },
    { key: 'electronics', text: 'Electronics', to: '/electronics' },
    { key: 'laptops', text: 'Laptops' },
  ]}
/>

{/* Dot Separator */}
<Breadcrumb
  separator="dot"
  items={[
    { key: 'docs', text: 'Docs', to: '/docs' },
    { key: 'guides', text: 'Guides', to: '/guides' },
    { key: 'authentication', text: 'Authentication' },
  ]}
/>`,
    },
    {
      title: 'Icons & Size Variants',
      description: 'Pair items with icons and select between sm, md, or lg size options.',
      render: (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">
              Small (sm) with Icons
            </p>
            <Breadcrumb
              size="sm"
              separator="chevron"
              items={[
                { key: 'home', text: 'Home', icon: <Home className="size-3.5" />, to: '#' },
                {
                  key: 'settings',
                  text: 'Settings',
                  icon: <Settings className="size-3.5" />,
                  to: '#',
                },
                { key: 'security', text: 'Security', icon: <Shield className="size-3.5" /> },
              ]}
              render={(item) => (
                <Link to="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
                  {item.text}
                </Link>
              )}
            />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">
              Large (lg)
            </p>
            <Breadcrumb
              size="lg"
              separator="chevron"
              items={[
                { key: 'root', text: 'Root', icon: <Folder className="size-4" />, to: '#' },
                { key: 'projects', text: 'Projects', icon: <Folder className="size-4" />, to: '#' },
                { key: 'readme', text: 'README.md', icon: <FileText className="size-4" /> },
              ]}
              render={(item) => (
                <Link to="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
                  {item.text}
                </Link>
              )}
            />
          </div>
        </div>
      ),
      code: `
<Breadcrumb
  size="sm"
  separator="chevron"
  items={[
    { key: 'home', text: 'Home', icon: <Home className="size-3.5" />, to: '/home' },
    { key: 'settings', text: 'Settings', icon: <Settings className="size-3.5" />, to: '/settings' },
    { key: 'security', text: 'Security', icon: <Shield className="size-3.5" /> },
  ]}
/>`,
    },
    {
      title: 'Smart Truncation (maxItems)',
      description:
        'Automatically collapse long navigation trails into an interactive "•••" expand pill.',
      render: (
        <Breadcrumb
          separator="chevron"
          maxItems={3}
          items={[
            { key: 'home', text: 'Home', icon: <Home className="size-4" />, to: '#' },
            { key: 'store', text: 'Store', to: '#' },
            { key: 'electronics', text: 'Electronics', to: '#' },
            { key: 'computers', text: 'Computers & Laptops', to: '#' },
            { key: 'gaming', text: 'Gaming Laptops', to: '#' },
            { key: 'model', text: 'ROG Strix G16' },
          ]}
          render={(item) => (
            <Link to="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
              {item.text}
            </Link>
          )}
        />
      ),
      code: `
<Breadcrumb
  separator="chevron"
  maxItems={3}
  items={[
    { key: 'home', text: 'Home', icon: <Home className="size-4" />, to: '/' },
    { key: 'store', text: 'Store', to: '/store' },
    { key: 'electronics', text: 'Electronics', to: '/electronics' },
    { key: 'computers', text: 'Computers', to: '/computers' },
    { key: 'gaming', text: 'Gaming Laptops', to: '/gaming' },
    { key: 'model', text: 'ROG Strix G16' },
  ]}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Breadcrumb"
      description="A navigation trail that shows the user's current location within a page hierarchy and lets them jump back to any ancestor level. Supports custom separators (slash, chevron, dot), item icons, smart maxItems truncation, size options, and optional link rendering."
      examples={examples}
    />
  )
}
