import { buildClassName } from '@pk-design/react-tailwind'
import { Link, useLocation } from 'react-router'

export interface NavItem {
  path: string
  label: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    title: 'Getting Started',
    items: [{ path: '/installation', label: 'Installation' }],
  },
  {
    title: 'Layout & Structure',
    items: [
      { path: '/drawer', label: 'Drawer' },
      { path: '/table', label: 'Table' },
      { path: '/data-table', label: 'DataTable' },
      { path: '/virtualized-data-table', label: 'VirtualizedDataTable' },
      { path: '/detailed-information', label: 'DetailedInformation' },
    ],
  },
  {
    title: 'Form Elements',
    items: [
      { path: '/input', label: 'Input' },
      { path: '/password-input', label: 'PasswordInput' },
      { path: '/textarea', label: 'Textarea' },
      { path: '/select-box', label: 'SelectBox' },
      { path: '/checkbox', label: 'Checkbox' },
      { path: '/checkbox-group', label: 'CheckboxGroup' },
      { path: '/radio', label: 'Radio' },
      { path: '/radio-group', label: 'RadioGroup' },
      { path: '/radio-switch', label: 'RadioSwitch' },
      { path: '/range-input', label: 'RangeInput' },
      { path: '/range-slider', label: 'RangeSlider' },
      { path: '/quantity-stepper', label: 'QuantityStepper' },
    ],
  },
  {
    title: 'UI Components',
    items: [
      { path: '/accordion', label: 'Accordion' },
      { path: '/alert', label: 'Alert' },
      { path: '/button', label: 'Button' },
      { path: '/button-group', label: 'ButtonGroup' },
      { path: '/badge', label: 'Badge' },
      { path: '/banner', label: 'Banner' },
      { path: '/breadcrumb', label: 'Breadcrumb' },
      { path: '/card', label: 'Card' },
      { path: '/dropdown', label: 'Dropdown' },
      { path: '/pagination', label: 'Pagination' },
      { path: '/segmented-control', label: 'SegmentedControl' },
      { path: '/skeleton', label: 'Skeleton' },
      { path: '/status-pill', label: 'StatusPill' },
      { path: '/sticky-action-bar', label: 'StickyActionBar' },
      { path: '/tabs', label: 'Tabs' },
      { path: '/toast', label: 'Toast' },
    ],
  },
  {
    title: 'Typography',
    items: [
      { path: '/body-text', label: 'BodyText' },
      { path: '/heading-text', label: 'HeadingText' },
      { path: '/text-content', label: 'TextContent' },
    ],
  },
]

export const pageRoutes = navSections.reduce((routes, section) => {
  routes.push(...section.items)
  return routes
}, [] as NavItem[])

export default function NavList() {
  const location = useLocation()

  return (
    <nav className="space-y-6">
      {navSections.map((section) => (
        <div key={section.title}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
            {section.title}
          </h3>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const active = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={buildClassName(
                      'block rounded-md px-3 py-2 text-sm transition-colors',
                      active
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-800/60 dark:text-blue-200 font-medium'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
