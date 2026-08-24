import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { BottomNavigation, type BottomNavigationItem } from '@pk-design/react-tailwind'
import { Home, Search, ShoppingBag, User, Bell, Heart, Settings } from 'lucide-react'

function BottomNavigationPlayground(props: any) {
  const [activeId, setActiveId] = useState('home')

  const items: BottomNavigationItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="size-5" /> },
    { id: 'search', label: 'Search', icon: <Search className="size-5" /> },
    {
      id: 'orders',
      label: 'Orders',
      icon: <ShoppingBag className="size-5" />,
      badge: 3,
      badgeVariant: 'danger',
    },
    { id: 'profile', label: 'Profile', icon: <User className="size-5" /> },
  ]

  return (
    <div className="w-full max-w-sm border border-[var(--ui-border)] rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden relative pb-16 pt-8 px-4 text-center">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
        Active Screen:{' '}
        <strong className="text-blue-600 dark:text-blue-400 uppercase">{activeId}</strong>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <BottomNavigation
          {...props}
          items={items}
          activeId={activeId}
          onChange={setActiveId}
          fixed={false}
        />
      </div>
    </div>
  )
}

export default function BottomNavigationDocsPage() {
  const [tab1, setTab1] = useState('home')
  const [tab2, setTab2] = useState('notifications')
  const [tab3, setTab3] = useState('home')

  const examples = [
    {
      title: 'Basic Bottom Tab Navigation',
      description:
        'Standard mobile bottom navigation bar for switching between primary screens (Home, Search, Orders, Profile).',
      render: (
        <div className="w-full max-w-sm rounded-2xl border border-[var(--ui-border)] overflow-hidden relative pb-14 pt-6 text-center bg-white dark:bg-gray-800">
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Active Screen: {tab1.toUpperCase()}
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <BottomNavigation
              items={[
                { id: 'home', label: 'Home', icon: <Home className="size-5" /> },
                { id: 'search', label: 'Search', icon: <Search className="size-5" /> },
                { id: 'orders', label: 'Orders', icon: <ShoppingBag className="size-5" /> },
                { id: 'profile', label: 'Profile', icon: <User className="size-5" /> },
              ]}
              activeId={tab1}
              onChange={setTab1}
              fixed={false}
            />
          </div>
        </div>
      ),
      code: `
const [activeTab, setActiveTab] = useState('home')

<BottomNavigation
  items={[
    { id: 'home', label: 'Home', icon: <Home /> },
    { id: 'search', label: 'Search', icon: <Search /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag /> },
    { id: 'profile', label: 'Profile', icon: <User /> },
  ]}
  activeId={activeTab}
  onChange={setActiveTab}
/>`,
    },
    {
      title: 'Notification Badges & Custom Active Icons',
      description: 'Display unread notification count badges or status highlights on tab icons.',
      render: (
        <div className="w-full max-w-sm rounded-2xl border border-[var(--ui-border)] overflow-hidden relative pb-14 pt-6 text-center bg-white dark:bg-gray-800">
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Active Screen: {tab2.toUpperCase()}
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <BottomNavigation
              items={[
                { id: 'home', label: 'Home', icon: <Home className="size-5" /> },
                {
                  id: 'notifications',
                  label: 'Alerts',
                  icon: <Bell className="size-5" />,
                  badge: '5',
                  badgeVariant: 'danger',
                },
                {
                  id: 'favorites',
                  label: 'Saved',
                  icon: <Heart className="size-5" />,
                  badge: 'NEW',
                  badgeVariant: 'info',
                },
                { id: 'settings', label: 'Settings', icon: <Settings className="size-5" /> },
              ]}
              activeId={tab2}
              onChange={setTab2}
              fixed={false}
            />
          </div>
        </div>
      ),
      code: `
<BottomNavigation
  items={[
    { id: 'home', label: 'Home', icon: <Home /> },
    { id: 'notifications', label: 'Alerts', icon: <Bell />, badge: 5 },
    { id: 'favorites', label: 'Saved', icon: <Heart />, badge: 'NEW', badgeVariant: 'info' },
  ]}
  activeId={activeTab}
  onChange={setActiveTab}
/>`,
    },
    {
      title: 'Dark Theme Variant (theme="dark")',
      description:
        'Choose from theme="light", theme="dark", or theme="primary" for dark mode or brand header navigation styling.',
      render: (
        <div className="w-full max-w-sm rounded-2xl border border-[var(--ui-border)] overflow-hidden relative pb-14 pt-6 text-center bg-gray-900 text-white">
          <div className="text-xs font-semibold text-gray-300">
            Dark Mode Active: {tab3.toUpperCase()}
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <BottomNavigation
              items={[
                { id: 'home', label: 'Home', icon: <Home className="size-5" /> },
                { id: 'search', label: 'Explore', icon: <Search className="size-5" /> },
                { id: 'orders', label: 'Cart', icon: <ShoppingBag className="size-5" />, badge: 2 },
                { id: 'profile', label: 'Account', icon: <User className="size-5" /> },
              ]}
              activeId={tab3}
              onChange={setTab3}
              theme="dark"
              fixed={false}
            />
          </div>
        </div>
      ),
      code: `
<BottomNavigation
  items={items}
  activeId={activeTab}
  onChange={setActiveTab}
  theme="dark"
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="BottomNavigation"
      description="A mobile-native bottom tab navigation bar component designed for top-level navigation across 3 to 5 primary views with notification badges, iOS safe area support, active indicator options (pill, line, dot), and flexible themes."
      playground={{
        render: (props) => <BottomNavigationPlayground {...props} />,
        initialProps: {
          activeIndicatorStyle: 'line',
          showLabels: 'always',
          theme: 'light',
        },
      }}
      examples={examples}
    />
  )
}
