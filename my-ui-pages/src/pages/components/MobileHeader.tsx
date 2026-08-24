import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { MobileHeader, SegmentedControl, type MobileHeaderAction } from '@pk-design/react-tailwind'
import { Share2, ShoppingCart, Filter, Menu, MoreVertical } from 'lucide-react'

function MobileHeaderPlayground(props: any) {
  const [lastAction, setLastAction] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState('')

  const actions: MobileHeaderAction[] = [
    {
      id: 'cart',
      label: 'Cart',
      icon: <ShoppingCart className="size-4" />,
      badge: 3,
      onClick: () => setLastAction('Shopping Cart (3 items)'),
    },
    {
      id: 'share',
      label: 'Share',
      icon: <Share2 className="size-4" />,
      onClick: () => setLastAction('Share Order'),
    },
  ]

  const mockItems = [
    { name: 'Wireless Noise-Canceling Headphones', qty: 1, price: '$199.00' },
    { name: 'Ergonomic Mechanical Keyboard', qty: 1, price: '$129.00' },
    { name: 'Ultra-Slim USB-C Multi-Hub', qty: 2, price: '$49.00' },
    { name: 'Braided Nylon Fast Charge Cable (2m)', qty: 3, price: '$19.00' },
    { name: 'MagSafe Wireless Power Bank 10000mAh', qty: 1, price: '$59.00' },
  ]

  return (
    <div className="w-full max-w-sm h-80 overflow-y-auto border border-[var(--ui-border)] rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 relative shadow-sm">
      <MobileHeader
        {...props}
        title="Order Details"
        subtitle="Order #ORD-901"
        onBack={() => setLastAction('Back Button')}
        actions={actions}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        sticky={true}
      />

      <div className="p-4 space-y-3 text-xs text-left">
        {lastAction && (
          <div className="p-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-700 dark:text-blue-300 font-medium text-center">
            Triggered: {lastAction}
          </div>
        )}
        {searchValue && (
          <div className="p-2 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl text-purple-700 dark:text-purple-300 font-medium text-center">
            Active Query: "{searchValue}"
          </div>
        )}

        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-[var(--ui-border)] space-y-2">
          <div className="font-bold text-gray-900 dark:text-white">Shipping Status</div>
          <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Out for Delivery (Estimated 2:30 PM)
          </div>
        </div>

        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-[var(--ui-border)] space-y-2">
          <div className="font-bold text-gray-900 dark:text-white">Items in Shipment</div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {mockItems.map((item, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">{item.name}</div>
                  <div className="text-[10px] text-gray-400">Qty: {item.qty}</div>
                </div>
                <div className="font-bold text-gray-900 dark:text-white shrink-0 ml-2">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-[var(--ui-border)] space-y-1 text-gray-500">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$474.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-emerald-600 font-semibold">FREE</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 dark:text-white pt-1 border-t border-gray-100 dark:border-gray-700">
            <span>Total</span>
            <span>$474.00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MobileHeaderDocsPage() {
  const [activeTab, setActiveTab] = useState('all')

  const examples = [
    {
      title: 'Centered Navigation Header (iOS Style)',
      description:
        'Standard mobile header with back button, centered title, subtitle, and right action buttons with notification badges.',
      render: (
        <div className="w-full max-w-sm rounded-2xl border border-[var(--ui-border)] overflow-hidden bg-white dark:bg-gray-800">
          <MobileHeader
            title="Checkout Summary"
            subtitle="2 items • $245.00"
            onBack={() => {}}
            actions={[
              {
                id: 'cart',
                label: 'Cart',
                icon: <ShoppingCart className="size-4" />,
                badge: 2,
                onClick: () => {},
              },
            ]}
            sticky={false}
          />
          <div className="p-4 text-center text-xs text-gray-400">Content container area</div>
        </div>
      ),
      code: `
<MobileHeader
  title="Checkout Summary"
  subtitle="2 items • $245.00"
  onBack={() => handleBack()}
  actions={[
    { id: 'cart', label: 'Cart', icon: <ShoppingCart />, badge: 2, onClick: () => {} },
  ]}
/>`,
    },
    {
      title: 'In-Header Mobile Search Bar (searchable)',
      description:
        'Enable searchable to add a search action icon that expands into a full in-header search input with clear button.',
      render: (
        <div className="w-full max-w-sm rounded-2xl border border-[var(--ui-border)] overflow-hidden bg-white dark:bg-gray-800">
          <MobileHeader
            title="Browse Catalog"
            searchable={true}
            actions={[
              {
                id: 'filter',
                label: 'Filter',
                icon: <Filter className="size-4" />,
                onClick: () => {},
              },
            ]}
            sticky={false}
          />
          <div className="p-4 text-center text-xs text-gray-400">
            Tap search icon in header to test expandable search bar
          </div>
        </div>
      ),
      code: `
<MobileHeader
  title="Browse Catalog"
  searchable={true}
  onSearchChange={(query) => setSearch(query)}
  actions={[
    { id: 'filter', label: 'Filter', icon: <Filter /> },
  ]}
/>`,
    },
    {
      title: 'Left-Aligned Title & Sub-header Filter Slot (bottomSlot)',
      description:
        'Use titleAlign="left" with custom leading menu buttons and bottomSlot to render category tabs or filter chips.',
      render: (
        <div className="w-full max-w-sm rounded-2xl border border-[var(--ui-border)] overflow-hidden bg-white dark:bg-gray-800">
          <MobileHeader
            title="Customer Support"
            titleAlign="left"
            leading={
              <Menu className="size-5 text-gray-700 dark:text-gray-200 cursor-pointer ml-1" />
            }
            actions={[
              {
                id: 'more',
                label: 'More Options',
                icon: <MoreVertical className="size-4" />,
                onClick: () => {},
              },
            ]}
            bottomSlot={
              <SegmentedControl
                options={[
                  { value: 'all', label: 'All Tickets' },
                  { value: 'open', label: 'Open (4)' },
                  { value: 'closed', label: 'Closed' },
                ]}
                value={activeTab}
                onChange={setActiveTab}
                size="sm"
                fullWidth
              />
            }
            sticky={false}
          />
          <div className="p-4 text-center text-xs text-gray-400">
            Filter tab active: {activeTab.toUpperCase()}
          </div>
        </div>
      ),
      code: `
<MobileHeader
  title="Customer Support"
  titleAlign="left"
  leading={<Menu />}
  bottomSlot={
    <SegmentedControl
      options={[
        { value: 'all', label: 'All Tickets' },
        { value: 'open', label: 'Open (4)' },
        { value: 'closed', label: 'Closed' },
      ]}
      value={activeTab}
      onChange={setActiveTab}
    />
  }
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="MobileHeader"
      description="A mobile-native top app bar header component for page navigation, back buttons, titles, header action icons with badges, and inline mobile search inputs."
      playground={{
        render: (props) => <MobileHeaderPlayground {...props} />,
        initialProps: {
          titleAlign: 'center',
          searchable: true,
          transparent: false,
        },
      }}
      examples={examples}
    />
  )
}
