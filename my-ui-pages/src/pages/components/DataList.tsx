import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { DataList, StatusPill, type DataListColumn } from '@pk-design/react-tailwind'
import { Trash2, Archive, ShoppingBag } from 'lucide-react'

function DataListPlayground(props: any) {
  const [items, setItems] = useState([
    {
      id: 'ORD-501',
      customer: 'Sarah Jenkins',
      amount: '$245.00',
      date: '2026-08-22',
      status: 'Processing',
      department: 'Sales',
    },
    {
      id: 'ORD-502',
      customer: 'Alex Rivera',
      amount: '$129.50',
      date: '2026-08-21',
      status: 'Shipped',
      department: 'Support',
    },
    {
      id: 'ORD-503',
      customer: 'Michael Chen',
      amount: '$89.00',
      date: '2026-08-20',
      status: 'Delivered',
      department: 'Sales',
    },
    {
      id: 'ORD-504',
      customer: 'Emily Watson',
      amount: '$410.00',
      date: '2026-08-19',
      status: 'Processing',
      department: 'Engineering',
    },
  ])

  const [sorting, setSorting] = useState<Record<string, any>>({})
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({})

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
    { name: 'customer', label: 'Customer', sortable: true, type: 'string' },
    { name: 'amount', label: 'Amount', sortable: true, type: 'number' },
    { name: 'department', label: 'Department' },
  ]

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="w-full max-w-md">
      <DataList
        {...props}
        items={items}
        columns={columns}
        searchable
        sorting={sorting}
        onSortChange={setSorting}
        selectedFilters={selectedFilters}
        onFilterChange={setSelectedFilters}
        filterFields={[
          {
            name: 'status',
            label: 'Status',
            options: [
              { label: 'Processing', value: 'Processing' },
              { label: 'Shipped', value: 'Shipped' },
              { label: 'Delivered', value: 'Delivered' },
            ],
          },
        ]}
        swipeableActions={(item) => ({
          rightActions: [
            {
              id: 'del',
              label: 'Delete',
              icon: <Trash2 className="size-4" />,
              theme: 'danger',
              onClick: () => handleRemove(item.id),
            },
          ],
        })}
      />
    </div>
  )
}

export default function DataListDocsPage() {
  const [orderItems, setOrderItems] = useState([
    {
      id: 'ORD-901',
      customer: 'David Kim',
      itemsCount: '3 Items',
      amount: '$310.00',
      status: 'Processing',
      region: 'US-East',
    },
    {
      id: 'ORD-902',
      customer: 'Elena Rostova',
      itemsCount: '1 Item',
      amount: '$74.00',
      status: 'Shipped',
      region: 'EU-West',
    },
    {
      id: 'ORD-903',
      customer: 'Marcus Brody',
      itemsCount: '5 Items',
      amount: '$450.00',
      status: 'Delivered',
      region: 'US-East',
    },
  ])

  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>(['ORD-901'])

  const handleRemoveOrder = (id: string) => {
    setOrderItems((prev) => prev.filter((o) => o.id !== id))
  }

  const examples = [
    {
      title: 'Mobile Bottom Sheet Filter Drawer & Checkboxes',
      description:
        'Tap the Filters button to open a mobile-native Bottom Sheet Filter Drawer. Users can toggle multi-select checkboxes for categories like Status or Region, view active filter counts, and apply filters.',
      render: (
        <div className="w-full max-w-md">
          <DataList
            items={orderItems}
            columns={[
              { name: 'id', label: 'Order ID' },
              {
                name: 'status',
                label: 'Status',
                render: (item: any) => (
                  <StatusPill
                    theme={
                      item.status === 'Delivered'
                        ? 'success'
                        : item.status === 'Shipped'
                          ? 'info'
                          : 'warning'
                    }
                    size="sm"
                  >
                    {item.status}
                  </StatusPill>
                ),
              },
              { name: 'customer', label: 'Customer' },
              { name: 'amount', label: 'Amount' },
              { name: 'region', label: 'Region' },
            ]}
            searchable
            filterFields={[
              {
                name: 'status',
                label: 'Status',
                options: [
                  { label: 'Processing', value: 'Processing' },
                  { label: 'Shipped', value: 'Shipped' },
                  { label: 'Delivered', value: 'Delivered' },
                ],
              },
            ]}
          />
        </div>
      ),
      code: `
const columns = [
  { name: 'id', label: 'Order ID' },
  { name: 'status', label: 'Status' },
  { name: 'customer', label: 'Customer' },
  { name: 'amount', label: 'Amount' },
]

<DataList
  items={orders}
  columns={columns}
  searchable
  filterFields={[
    {
      name: 'status',
      label: 'Status',
      options: [
        { label: 'Processing', value: 'Processing' },
        { label: 'Shipped', value: 'Shipped' },
      ],
    },
  ]}
/>`,
    },
    {
      title: 'Column Sorting & Key-Value Card Grid',
      description:
        'Mark columns as sortable: true to automatically populate a sort dropdown to reorder cards by Name, Date, or Amount.',
      render: (
        <div className="w-full max-w-md">
          <DataList
            items={orderItems}
            columns={[
              { name: 'id', label: 'Order ID' },
              { name: 'customer', label: 'Customer', sortable: true, type: 'string' },
              { name: 'amount', label: 'Amount', sortable: true, type: 'number' },
              { name: 'region', label: 'Region' },
            ]}
          />
        </div>
      ),
      code: `
const columns = [
  { name: 'id', label: 'Order ID' },
  { name: 'customer', label: 'Customer', sortable: true },
  { name: 'amount', label: 'Amount', sortable: true },
]

<DataList items={orders} columns={columns} />`,
    },
    {
      title: 'Swipeable Card Actions (Swipe Left/Right)',
      description:
        'Pass swipeableActions to attach iOS/Android-style touch swipe gestures to each card (Swipe Left to Delete / Swipe Right to Archive).',
      render: (
        <div className="w-full max-w-md">
          <DataList
            items={orderItems}
            columns={[
              { name: 'id', label: 'Order ID' },
              { name: 'customer', label: 'Customer' },
              { name: 'amount', label: 'Amount' },
            ]}
            swipeableActions={(item: any) => ({
              rightActions: [
                {
                  id: 'del',
                  label: 'Delete',
                  icon: <Trash2 className="size-4" />,
                  theme: 'danger',
                  onClick: () => handleRemoveOrder(item.id),
                },
                {
                  id: 'archive',
                  label: 'Archive',
                  icon: <Archive className="size-4" />,
                  theme: 'gray',
                  onClick: () => handleRemoveOrder(item.id),
                },
              ],
            })}
          />
        </div>
      ),
      code: `
<DataList
  items={orders}
  columns={columns}
  swipeableActions={(item) => ({
    rightActions: [
      { id: 'del', label: 'Delete', theme: 'danger', onClick: () => removeOrder(item.id) },
    ],
  })}
/>`,
    },
    {
      title: 'Touch Selection & Select All Toolbar',
      description:
        'Enable selectable to render touch-friendly checkboxes on cards along with a top "Select All" bar.',
      render: (
        <div className="w-full max-w-md">
          <DataList
            items={orderItems}
            columns={[
              { name: 'id', label: 'Order ID' },
              { name: 'customer', label: 'Customer' },
              { name: 'amount', label: 'Amount' },
            ]}
            selectable
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) => setSelectedKeys(keys)}
          />
        </div>
      ),
      code: `
const [selected, setSelected] = useState(['ORD-901'])

<DataList
  items={orders}
  columns={columns}
  selectable
  selectedKeys={selected}
  onSelectionChange={setSelected}
/>`,
    },
    {
      title: 'Custom Card Template (renderItem)',
      description:
        'Pass renderItem to render custom item card UI layouts while leveraging DataList search, filter, sort, and pagination engine.',
      render: (
        <div className="w-full max-w-md">
          <DataList
            items={orderItems}
            searchable
            renderItem={(item: any) => (
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-[var(--ui-border)] shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
                    <ShoppingBag className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-sm text-gray-900 dark:text-white truncate block">
                      {item.customer}
                    </span>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      {item.id} • {item.itemsCount}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-sm text-gray-900 dark:text-white block">
                    {item.amount}
                  </span>
                  <StatusPill theme={item.status === 'Delivered' ? 'success' : 'info'} size="sm">
                    {item.status}
                  </StatusPill>
                </div>
              </div>
            )}
          />
        </div>
      ),
      code: `
<DataList
  items={orders}
  searchable
  renderItem={(item) => (
    <div className="p-4 flex items-center justify-between">
      <div>
        <h4>{item.customer}</h4>
        <p>{item.id}</p>
      </div>
      <div>{item.amount}</div>
    </div>
  )}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="DataList"
      description="A flexible card-based list component with built-in search, dropdown filtering, column sorting, touch selection, touch swipe actions, custom card templates, and integrated pagination."
      playground={{
        render: (props) => <DataListPlayground {...props} />,
        initialProps: {
          searchable: true,
          selectable: false,
          loading: false,
        },
      }}
      examples={examples}
    />
  )
}
