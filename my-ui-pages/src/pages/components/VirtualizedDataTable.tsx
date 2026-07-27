import { useEffect, useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import {
  VirtualizedDataTable,
  TextContent,
  type DataTableColumn,
  type SortQuery,
  updateSortQuery,
  get,
} from '@pk-design/react-tailwind'

const LARGE_ITEMS = Array.from({ length: 2000 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}))

/* --------------------------------------------------
 * Example: Basic
 * -------------------------------------------------- */
function BasicVirtualizedExample() {
  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 80 },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ]

  return (
    <VirtualizedDataTable items={LARGE_ITEMS} columns={columns} rowHeight={48} maxHeight={360} />
  )
}

/* --------------------------------------------------
 * Example: Sorting
 * -------------------------------------------------- */
function SortingExample() {
  const columns: DataTableColumn[] = [
    { name: 'name', label: 'Name', sortable: true, type: 'string' },
    { name: 'age', label: 'Age', sortable: true, type: 'number' },
    { name: 'role', label: 'Role' },
  ]

  const original = Array.from({ length: 1000 }).map((_, i) => ({
    id: i + 1,
    name: ['Prabhu', 'Arun', 'Kumar'][i % 3] + ' ' + (i + 1),
    age: 20 + (i % 30),
    role: ['Admin', 'User', 'Manager'][i % 3],
  }))

  const [sortQuery, setSortQuery] = useState<SortQuery>({})
  const [data, setData] = useState(original)

  const handleSort = (column: DataTableColumn) => {
    setSortQuery((prev) => updateSortQuery(prev, column.name, column.type))
  }

  useEffect(() => {
    const [key, direction] = Object.entries(sortQuery)[0] ?? []
    if (!key || !direction) {
      setData(original)
      return
    }
    const sorted = [...original].sort((a, b) => {
      const A = get(a, key)
      const B = get(b, key)
      if (typeof A === 'number' && typeof B === 'number') {
        return direction === 'asc' || direction === '1' ? A - B : B - A
      }
      const sA = String(A).toLowerCase()
      const sB = String(B).toLowerCase()
      if (sA < sB) return direction === 'asc' ? -1 : 1
      if (sA > sB) return direction === 'asc' ? 1 : -1
      return 0
    })
    setData(sorted)
  }, [sortQuery])

  return (
    <VirtualizedDataTable
      items={data}
      columns={columns}
      sorting={sortQuery}
      onSort={handleSort}
      rowHeight={48}
      maxHeight={360}
    />
  )
}

/* --------------------------------------------------
 * Example: Row Click
 * -------------------------------------------------- */
function RowClickExample() {
  const [selected, setSelected] = useState<number | null>(null)

  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 80 },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ]

  return (
    <div className="space-y-2 w-full">
      <VirtualizedDataTable
        items={LARGE_ITEMS}
        columns={columns}
        rowHeight={48}
        maxHeight={300}
        onRowClick={(item) => setSelected(item.id)}
        rowClass={(item) =>
          item.id === selected ? 'ring-1 ring-inset ring-[var(--ui-primary)]' : ''
        }
      />
      {selected && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Selected row ID: {selected}</p>
      )}
    </div>
  )
}

/* --------------------------------------------------
 * Example: Row & Cell Styling
 * -------------------------------------------------- */
function StylingExample() {
  type Row = { id: number; product: string; amount: number; status: string }

  const items: Row[] = Array.from({ length: 500 }).map((_, i) => ({
    id: i + 1,
    product: `Product ${i + 1}`,
    amount: Math.floor(Math.random() * 500) + 50,
    status: ['paid', 'pending', 'failed'][i % 3],
  }))

  const statusColor: Record<string, string> = {
    paid: 'text-green-600 dark:text-green-400 font-medium',
    pending: 'text-yellow-600 dark:text-yellow-400 font-medium',
    failed: 'text-red-600 dark:text-red-400 font-medium',
  }

  const columns: DataTableColumn<Row>[] = [
    { name: 'id', label: 'ID', width: 80 },
    { name: 'product', label: 'Product' },
    {
      name: 'amount',
      label: 'Amount',
      align: 'right',
      headerAlign: 'right',
      headerClass: 'text-gray-500',
      cellClass: (item) => (item.amount >= 300 ? 'font-semibold' : ''),
      render: (item) => `$${item.amount}`,
    },
    {
      name: 'status',
      label: 'Status',
      cellClass: (item) => statusColor[item.status] ?? '',
      render: (item) => item.status.charAt(0).toUpperCase() + item.status.slice(1),
    },
  ]

  return (
    <VirtualizedDataTable<Row>
      items={items}
      columns={columns}
      rowHeight={48}
      maxHeight={300}
      rowClass={(item) => (item.status === 'failed' ? 'opacity-60' : '')}
    />
  )
}

/* --------------------------------------------------
 * Example: Striped & Density
 * -------------------------------------------------- */
function StripedDensityExample() {
  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 80 },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ]

  const [density, setDensity] = useState<'compact' | 'default' | 'spacious'>('default')

  return (
    <div className="space-y-3 w-full">
      <div className="flex gap-2">
        {(['compact', 'default', 'spacious'] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDensity(d)}
            className={`px-3 py-1 text-sm rounded-md border transition ${
              density === d
                ? 'bg-[var(--ui-primary)] text-white border-[var(--ui-primary)]'
                : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400'
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <VirtualizedDataTable
        items={LARGE_ITEMS}
        columns={columns}
        rowHeight={density === 'compact' ? 36 : density === 'spacious' ? 60 : 48}
        maxHeight={300}
        striped
        density={density}
      />
    </div>
  )
}

/* --------------------------------------------------
 * Example: Loading State
 * -------------------------------------------------- */
function LoadingExample() {
  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 80 },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ]

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      setItems(LARGE_ITEMS)
      setLoading(false)
    }, 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <VirtualizedDataTable
      items={items}
      columns={columns}
      loading={loading}
      rowHeight={48}
      maxHeight={300}
    />
  )
}

/* --------------------------------------------------
 * Example: Selectable Rows
 * -------------------------------------------------- */
function SelectableExample() {
  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 80 },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ]

  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string | number>>([])

  return (
    <div className="space-y-2 w-full">
      <VirtualizedDataTable
        items={LARGE_ITEMS}
        columns={columns}
        rowHeight={48}
        maxHeight={300}
        selectable
        selectedRowKeys={selectedRowKeys}
        onSelectionChange={setSelectedRowKeys}
      />
      <TextContent small muted>
        Selected: {selectedRowKeys.length}
      </TextContent>
    </div>
  )
}

/* --------------------------------------------------
 * Example: Empty State
 * -------------------------------------------------- */
function EmptyExample() {
  return (
    <VirtualizedDataTable
      items={[]}
      columns={[
        { name: 'id', label: 'ID', width: 60 },
        { name: 'name', label: 'Name' },
      ]}
      emptyMessage="No results available"
      rowHeight={48}
      maxHeight={200}
    />
  )
}

/* --------------------------------------------------
 * Best Practices
 * -------------------------------------------------- */
const bestPractices = (
  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
    <li>Use virtualization for lists with more than 200 rows.</li>
    <li>
      Set <code>rowHeight</code> to match your actual row content — mismatches cause scroll jumping.
    </li>
    <li>
      Adjust <code>rowHeight</code> to match your <code>density</code> setting: compact rows need a
      smaller height, spacious rows need a larger one.
    </li>
    <li>Handle sorting externally — the component fires onSort but does not sort internally.</li>
    <li>
      Use <code>sticky: "left"</code> or <code>sticky: "right"</code> to pin key columns during
      horizontal scroll.
    </li>
    <li>Keep cell renderers lightweight — avoid heavy components inside virtualized rows.</li>
    <li>
      Increase <code>overscanCount</code> if fast scrolling shows blank rows; decrease it to reduce
      DOM node count.
    </li>
  </ul>
)

/* --------------------------------------------------
 * Main Docs Page
 * -------------------------------------------------- */
export default function VirtualizedDataTableDocsPage() {
  const examples = [
    {
      title: 'Basic',
      description: 'Render thousands of rows efficiently with a fixed row height.',
      render: <BasicVirtualizedExample />,
      code: `const columns: DataTableColumn[] = [
  { name: "id",    label: "ID",    width: 80 },
  { name: "name",  label: "Name"             },
  { name: "email", label: "Email"            },
]

<VirtualizedDataTable
  items={items}
  columns={columns}
  rowHeight={48}
  maxHeight={400}
/>`,
    },
    {
      title: 'Sorting',
      description:
        'Sorting must be handled externally. onSort fires with the clicked column; re-sort items and pass them back.',
      render: <SortingExample />,
      code: `const [sortQuery, setSortQuery] = useState<SortQuery>({})
const [data, setData] = useState(original)

const handleSort = (column: DataTableColumn) => {
  setSortQuery(prev => updateSortQuery(prev, column.name, column.type))
}

<VirtualizedDataTable
  items={data}
  columns={columns}
  sorting={sortQuery}
  onSort={handleSort}
  rowHeight={48}
  maxHeight={400}
/>`,
    },
    {
      title: 'Row Click',
      description:
        'Use onRowClick with rowClass to handle selection or navigation across virtualized rows.',
      render: <RowClickExample />,
      code: `<VirtualizedDataTable
  items={items}
  columns={columns}
  rowHeight={48}
  maxHeight={300}
  onRowClick={(item) => setSelected(item.id)}
  rowClass={(item) =>
    item.id === selected ? "ring-1 ring-inset ring-[var(--ui-primary)]" : ""
  }
/>`,
    },
    {
      title: 'Row & Cell Styling',
      description:
        'Use rowClass for row-level styles and cellClass (string or function) for conditional per-column styling.',
      render: <StylingExample />,
      code: `const columns: DataTableColumn<Row>[] = [
  {
    name: "amount",
    label: "Amount",
    headerClass: "text-gray-500",
    cellClass: (item) => item.amount >= 300 ? "font-semibold" : "",
    render: (item) => \`$\${item.amount}\`,
  },
  {
    name: "status",
    label: "Status",
    cellClass: (item) => statusColor[item.status] ?? "",
  },
]

<VirtualizedDataTable
  items={items}
  columns={columns}
  rowClass={(item) => item.status === "failed" ? "opacity-60" : ""}
  rowHeight={48}
  maxHeight={300}
/>`,
    },
    {
      title: 'Striped & Density',
      description:
        'striped alternates row backgrounds. density controls cell padding — adjust rowHeight to match.',
      render: <StripedDensityExample />,
      code: `<VirtualizedDataTable
  items={items}
  columns={columns}
  striped
  density="compact"
  rowHeight={36}
  maxHeight={300}
/>`,
    },
    {
      title: 'Loading State',
      description:
        'Pass loading to show skeleton rows sized automatically from maxHeight and rowHeight.',
      render: <LoadingExample />,
      code: `<VirtualizedDataTable
  items={items}
  columns={columns}
  loading={loading}
  rowHeight={48}
  maxHeight={300}
/>`,
    },
    {
      title: 'Selectable Rows',
      description:
        'Set selectable to render a checkbox column with select-all support, virtualized just like the rest of the rows. Pair selectedRowKeys with onSelectionChange for controlled selection.',
      render: <SelectableExample />,
      code: `const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string | number>>([])

<VirtualizedDataTable
  items={items}
  columns={columns}
  rowHeight={48}
  maxHeight={300}
  selectable
  selectedRowKeys={selectedRowKeys}
  onSelectionChange={setSelectedRowKeys}
/>`,
    },
    {
      title: 'Empty State',
      description: 'When items is empty and loading is false, emptyMessage is shown.',
      render: <EmptyExample />,
      code: `<VirtualizedDataTable
  items={[]}
  columns={columns}
  emptyMessage="No results available"
  rowHeight={48}
  maxHeight={200}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="VirtualizedDataTable"
      description="A windowed version of DataTable for rendering tens of thousands of rows without performance degradation. Uses react-window to keep only visible rows in the DOM. Supports the same column definition API as DataTable including sorting, sticky columns, row click, conditional row and cell styling, density presets, and striped rows."
      examples={examples}
      bestPractices={bestPractices}
    />
  )
}
