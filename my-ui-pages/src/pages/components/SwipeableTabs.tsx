import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { SwipeableTabs, type SwipeableTabItem } from '@pk-design/react-tailwind'
import { Rss, Flame, Bell, User, Sparkles, TrendingUp } from 'lucide-react'

function SwipeableTabsPlayground(props: any) {
  const [activeId, setActiveId] = useState('feed')

  const items: SwipeableTabItem[] = [
    {
      id: 'feed',
      label: 'Main Feed',
      icon: <Rss className="size-3.5" />,
      content: (
        <div className="p-4 space-y-2 bg-white dark:bg-gray-800 min-h-[140px]">
          <div className="font-bold text-xs text-gray-900 dark:text-white">Main Activity Feed</div>
          <p className="text-xs text-gray-500">
            Swipe left or right on mobile to fluidly switch tab screens!
          </p>
        </div>
      ),
    },
    {
      id: 'trending',
      label: 'Trending',
      icon: <Flame className="size-3.5" />,
      badge: 'HOT',
      content: (
        <div className="p-4 space-y-2 bg-white dark:bg-gray-800 min-h-[140px]">
          <div className="font-bold text-xs text-gray-900 dark:text-white">
            Trending Topics & Posts
          </div>
          <p className="text-xs text-gray-500">
            Shows top trending stories and community highlights.
          </p>
        </div>
      ),
    },
    {
      id: 'alerts',
      label: 'Notifications',
      icon: <Bell className="size-3.5" />,
      badge: 4,
      content: (
        <div className="p-4 space-y-2 bg-white dark:bg-gray-800 min-h-[140px]">
          <div className="font-bold text-xs text-gray-900 dark:text-white">
            Unread Notifications
          </div>
          <p className="text-xs text-gray-500">4 unread alerts for your account.</p>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full max-w-sm border border-[var(--ui-border)] rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden">
      <SwipeableTabs {...props} items={items} activeId={activeId} onChange={setActiveId} />
    </div>
  )
}

export default function SwipeableTabsDocsPage() {
  const [pillTab, setPillTab] = useState('all')
  const [segTab, setSegTab] = useState('popular')

  const examples = [
    {
      title: 'Default Underline Header (headerVariant="default")',
      description:
        'Standard mobile tab header with underline active indicator and touch swipe support.',
      render: (
        <div className="w-full max-w-sm border border-[var(--ui-border)] rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
          <SwipeableTabs
            items={[
              {
                id: 'tab1',
                label: 'All Items',
                content: (
                  <div className="p-4 text-xs text-gray-500">All Items View (Swipe left)</div>
                ),
              },
              {
                id: 'tab2',
                label: 'Active',
                badge: 12,
                content: <div className="p-4 text-xs text-gray-500">Active Items View</div>,
              },
              {
                id: 'tab3',
                label: 'Completed',
                content: <div className="p-4 text-xs text-gray-500">Completed Items View</div>,
              },
            ]}
            headerVariant="default"
          />
        </div>
      ),
      code: `
<SwipeableTabs
  items={[
    { id: 'tab1', label: 'All Items', content: <AllItemsView /> },
    { id: 'tab2', label: 'Active', badge: 12, content: <ActiveItemsView /> },
    { id: 'tab3', label: 'Completed', content: <CompletedItemsView /> },
  ]}
  headerVariant="default"
/>`,
    },
    {
      title: 'Pill Tabs Header (headerVariant="pills")',
      description:
        'Modern mobile pill-shaped tab headers for category filters and section navigation.',
      render: (
        <div className="w-full max-w-sm border border-[var(--ui-border)] rounded-2xl overflow-hidden bg-white dark:bg-gray-800 p-3 space-y-3">
          <SwipeableTabs
            items={[
              {
                id: 'all',
                label: 'Explore',
                icon: <Sparkles className="size-3.5" />,
                content: <div className="py-2 text-xs text-gray-500">Explore Content</div>,
              },
              {
                id: 'trending',
                label: 'Trending',
                icon: <TrendingUp className="size-3.5" />,
                content: <div className="py-2 text-xs text-gray-500">Trending Content</div>,
              },
              {
                id: 'profile',
                label: 'Profile',
                icon: <User className="size-3.5" />,
                content: <div className="py-2 text-xs text-gray-500">Profile Content</div>,
              },
            ]}
            activeId={pillTab}
            onChange={setPillTab}
            headerVariant="pills"
          />
        </div>
      ),
      code: `
<SwipeableTabs
  items={items}
  headerVariant="pills"
/>`,
    },
    {
      title: 'Segmented Control Header (headerVariant="segmented")',
      description: 'Full-width segmented tab header that stays in sync with swiped screens.',
      render: (
        <div className="w-full max-w-sm border border-[var(--ui-border)] rounded-2xl overflow-hidden bg-white dark:bg-gray-800 p-3">
          <SwipeableTabs
            items={[
              {
                id: 'popular',
                label: 'Popular',
                content: (
                  <div className="py-3 text-center text-xs text-gray-500">Popular Screen</div>
                ),
              },
              {
                id: 'latest',
                label: 'Latest',
                content: (
                  <div className="py-3 text-center text-xs text-gray-500">Latest Screen</div>
                ),
              },
              {
                id: 'top',
                label: 'Top Rated',
                content: (
                  <div className="py-3 text-center text-xs text-gray-500">Top Rated Screen</div>
                ),
              },
            ]}
            activeId={segTab}
            onChange={setSegTab}
            headerVariant="segmented"
          />
        </div>
      ),
      code: `
<SwipeableTabs
  items={items}
  headerVariant="segmented"
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="SwipeableTabs"
      description="A mobile-native touch-swipeable tab container component that enables fluid left and right swipe gestures to switch between tab screens on mobile devices."
      playground={{
        render: (props) => <SwipeableTabsPlayground {...props} />,
        initialProps: {
          headerVariant: 'default',
          swipeable: true,
        },
      }}
      examples={examples}
    />
  )
}
