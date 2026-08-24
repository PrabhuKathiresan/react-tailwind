import { useEffect, useRef } from 'react'
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
    title: 'Mobile & Touch',
    items: [
      { path: '/action-sheet', label: 'ActionSheet' },
      { path: '/bottom-navigation', label: 'BottomNavigation' },
      { path: '/data-list', label: 'DataList' },
      { path: '/floating-action-button', label: 'FloatingActionButton' },
      { path: '/mobile-header', label: 'MobileHeader' },
      { path: '/mobile-picker', label: 'MobilePicker' },
      { path: '/mobile-stepper', label: 'MobileStepper' },
      { path: '/pin-input', label: 'PinInput' },
      { path: '/pull-to-refresh', label: 'PullToRefresh' },
      { path: '/swipeable-row', label: 'SwipeableRow' },
      { path: '/swipeable-tabs', label: 'SwipeableTabs' },
      { path: '/wheel-picker', label: 'WheelPicker' },
    ],
  },
  {
    title: 'Layout & Structure',
    items: [
      { path: '/card', label: 'Card' },
      { path: '/detailed-information', label: 'DetailedInformation' },
      { path: '/drawer', label: 'Drawer' },
      { path: '/flex', label: 'Flex' },
      { path: '/grid', label: 'Grid' },
      { path: '/sticky-action-bar', label: 'StickyActionBar' },
      { path: '/table', label: 'Table' },
      { path: '/data-table', label: 'DataTable' },
      { path: '/virtualized-data-table', label: 'VirtualizedDataTable' },
    ],
  },
  {
    title: 'Form Elements',
    items: [
      { path: '/checkbox', label: 'Checkbox' },
      { path: '/checkbox-group', label: 'CheckboxGroup' },
      { path: '/input', label: 'Input' },
      { path: '/password-input', label: 'PasswordInput' },
      { path: '/quantity-stepper', label: 'QuantityStepper' },
      { path: '/radio', label: 'Radio' },
      { path: '/radio-group', label: 'RadioGroup' },
      { path: '/radio-switch', label: 'RadioSwitch' },
      { path: '/range-input', label: 'RangeInput' },
      { path: '/range-slider', label: 'RangeSlider' },
      { path: '/select-box', label: 'SelectBox' },
      { path: '/textarea', label: 'Textarea' },
    ],
  },
  {
    title: 'UI Components',
    items: [
      { path: '/accordion', label: 'Accordion' },
      { path: '/alert', label: 'Alert' },
      { path: '/badge', label: 'Badge' },
      { path: '/banner', label: 'Banner' },
      { path: '/breadcrumb', label: 'Breadcrumb' },
      { path: '/button', label: 'Button' },
      { path: '/button-group', label: 'ButtonGroup' },
      { path: '/dropdown', label: 'Dropdown' },
      { path: '/pagination', label: 'Pagination' },
      { path: '/segmented-control', label: 'SegmentedControl' },
      { path: '/skeleton', label: 'Skeleton' },
      { path: '/status-pill', label: 'StatusPill' },
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
  {
    title: 'Utilities & Hooks',
    items: [
      { path: '/utilities', label: 'Utilities' },
      { path: '/hooks', label: 'Custom Hooks' },
    ],
  },
]

export const pageRoutes = navSections.reduce((routes, section) => {
  routes.push(...section.items)
  return routes
}, [] as NavItem[])

export default function NavList() {
  const location = useLocation()
  const activeRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        behavior: 'auto',
      })
    }
  }, [location.pathname])

  return (
    <div className="p-4 space-y-6">
      {navSections.map((section) => (
        <div key={section.title} className="space-y-2">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3">
            {section.title}
          </h3>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    ref={isActive ? activeRef : null}
                    to={item.path}
                    className={buildClassName(
                      'block px-3 py-2 text-xs rounded-xl font-medium transition-all duration-150',
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/60',
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
    </div>
  )
}
