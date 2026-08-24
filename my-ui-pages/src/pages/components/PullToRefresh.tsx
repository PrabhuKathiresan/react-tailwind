import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import {
  PullToRefresh,
  DataList,
  StatusPill,
  Button,
  type DataListColumn,
} from '@pk-design/react-tailwind'
import { RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react'

function PullToRefreshPlayground(props: any) {
  const [items, setItems] = useState([
    { id: 'ORD-101', customer: 'David Miller', amount: '$180.00', status: 'Shipped' },
    { id: 'ORD-102', customer: 'Sophia Turner', amount: '$340.50', status: 'Processing' },
    { id: 'ORD-103', customer: 'Ethan Hunt', amount: '$95.00', status: 'Delivered' },
  ])

  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null)

  const columns: DataListColumn[] = [
    { name: 'id', label: 'Order ID' },
    {
      name: 'status',
      label: 'Status',
      render: (item: any) => (
        <StatusPill
          theme={
            item.status === 'Delivered' ? 'success' : item.status === 'Shipped' ? 'info' : 'warning'
          }
          size="sm"
        >
          {item.status}
        </StatusPill>
      ),
    },
    { name: 'customer', label: 'Customer' },
    { name: 'amount', label: 'Amount' },
  ]

  const handleRefresh = async () => {
    // Simulate async data fetch delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const newId = `ORD-${Math.floor(100 + Math.random() * 900)}`
    setItems((prev) => [
      {
        id: newId,
        customer: 'New Order Entry',
        amount: `$${(Math.random() * 300 + 50).toFixed(2)}`,
        status: 'Processing',
      },
      ...prev,
    ])
    setLastRefreshedAt(new Date().toLocaleTimeString())
  }

  return (
    <div className="w-full max-w-sm border border-[var(--ui-border)] rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 p-2 space-y-2">
      {lastRefreshedAt && (
        <div className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center justify-center gap-1.5">
          <CheckCircle2 className="size-3.5" />
          <span>Refreshed at {lastRefreshedAt}</span>
        </div>
      )}

      <PullToRefresh
        {...props}
        onRefresh={handleRefresh}
        className="h-80 rounded-xl bg-white dark:bg-gray-800 p-2"
      >
        <DataList items={items} columns={columns} />
      </PullToRefresh>
    </div>
  )
}

export default function PullToRefreshDocsPage() {
  const [items, setItems] = useState([
    { id: 'FEED-1', title: 'New release published v2.4', time: '10m ago' },
    { id: 'FEED-2', title: 'User session logged from iOS', time: '1h ago' },
    { id: 'FEED-3', title: 'Database backup completed', time: '3h ago' },
  ])

  const [refreshing, setRefreshing] = useState(false)

  const handleManualRefresh = async () => {
    setRefreshing(true)
    await new Promise((r) => setTimeout(r, 1200))
    setItems((prev) => [
      { id: `FEED-${Date.now()}`, title: 'Live updates synced', time: 'Just now' },
      ...prev,
    ])
    setRefreshing(false)
  }

  const examples = [
    {
      title: 'Integrated List Pull-to-Refresh',
      description:
        'Wrap scrollable lists, card grids, or DataList views with PullToRefresh. Drag down from top to trigger async data loading.',
      render: (
        <div className="w-full max-w-sm">
          <PullToRefresh
            onRefresh={handleManualRefresh}
            className="h-64 rounded-2xl border border-[var(--ui-border)] bg-white dark:bg-gray-800 p-3"
          >
            <div className="space-y-2.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-[var(--ui-border-muted)] flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </PullToRefresh>
        </div>
      ),
      code: `
const handleRefresh = async () => {
  await fetchLatestData()
}

<PullToRefresh onRefresh={handleRefresh} className="h-64 overflow-y-auto">
  <MyListView items={items} />
</PullToRefresh>`,
    },
    {
      title: 'Controlled Refreshing State',
      description:
        'Use the refreshing prop to manually control the spinner indicator from parent state or buttons.',
      render: (
        <div className="w-full max-w-sm space-y-3">
          <Button
            theme="secondary"
            size="sm"
            leftIcon={<RefreshCw className="size-3.5" />}
            onClick={handleManualRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing List...' : 'Trigger Sync'}
          </Button>

          <PullToRefresh
            onRefresh={handleManualRefresh}
            refreshing={refreshing}
            className="h-48 rounded-2xl border border-[var(--ui-border)] bg-white dark:bg-gray-800 p-3"
          >
            <div className="space-y-2">
              <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900 text-xs font-medium text-blue-700 dark:text-blue-300">
                Sync Status: {refreshing ? 'Syncing latest items...' : 'Up to date'}
              </div>
            </div>
          </PullToRefresh>
        </div>
      ),
      code: `
<PullToRefresh
  onRefresh={handleRefresh}
  refreshing={isSyncing}
>
  <Content />
</PullToRefresh>`,
    },
    {
      title: 'Custom Indicator Content',
      description:
        'Pass pullingContent and refreshingContent props to customize the pull header indicator style.',
      render: (
        <div className="w-full max-w-sm">
          <PullToRefresh
            onRefresh={handleManualRefresh}
            pullingContent={
              <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-bold">
                <Sparkles className="size-4 animate-bounce" />
                <span>Pull for magic update!</span>
              </div>
            }
            className="h-48 rounded-2xl border border-[var(--ui-border)] bg-white dark:bg-gray-800 p-3"
          >
            <div className="p-4 text-center text-xs text-gray-500">
              Drag down to test custom purple magic indicator!
            </div>
          </PullToRefresh>
        </div>
      ),
      code: `
<PullToRefresh
  onRefresh={handleRefresh}
  pullingContent={
    <div className="flex items-center gap-2 text-purple-600">
      <Sparkles />
      <span>Pull for magic update!</span>
    </div>
  }
>
  <Content />
</PullToRefresh>`,
    },
  ]

  return (
    <DocsPageLayout
      component="PullToRefresh"
      description="A mobile touch-gesture container component that enables pull-to-refresh interactions for lists, card grids, and mobile views with rubber-band physics and responsive indicator feedback."
      playground={{
        render: (props) => <PullToRefreshPlayground {...props} />,
        initialProps: {
          pullThreshold: 70,
          maxPullDistance: 120,
          disabled: false,
        },
      }}
      examples={examples}
    />
  )
}
