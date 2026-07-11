import { useEffect, useMemo, useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import {
  Badge,
  TextContent,
  DataTable,
  type DataTableColumn,
  type TPagination,
  type SortQuery,
  updateSortQuery,
  get,
} from '@pk-design/react-tailwind'
import Users from '../../data/Sample/users.json'

/* --------------------------------------------------
 * Example: Basic
 * -------------------------------------------------- */
function BasicDataTableExample() {
  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 60 },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ]

  const items = [
    { id: 1, name: 'Prabhu', email: 'prabhu@example.com' },
    { id: 2, name: 'Kathir', email: 'kathir@example.com' },
  ]

  return <DataTable items={items} columns={columns} />
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

  const original = [
    { id: 1, name: 'Prabhu', age: 32, role: 'Admin' },
    { id: 2, name: 'Arun', age: 28, role: 'User' },
    { id: 3, name: 'Kumar', age: 40, role: 'Manager' },
  ]
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

  return <DataTable items={data} columns={columns} sorting={sortQuery} onSort={handleSort} />
}

/* --------------------------------------------------
 * Example: Pagination
 * -------------------------------------------------- */
function PaginationExample() {
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 3,
    total: 12,
  })

  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 80 },
    { name: 'title', label: 'Title' },
  ]

  const items = useMemo(() => {
    return Array.from({ length: pagination.limit }).map((_, i) => ({
      id: (pagination.page - 1) * pagination.limit + i + 1,
      title: `Item ${(pagination.page - 1) * pagination.limit + i + 1}`,
    }))
  }, [pagination.limit, pagination.page, pagination.total])

  return (
    <DataTable
      items={items}
      columns={columns}
      pagination={pagination}
      setPagination={(page) => setPagination((prev) => ({ ...prev, ...page }))}
    />
  )
}

/* --------------------------------------------------
 * Example: Sticky Columns
 * -------------------------------------------------- */
function StickyColumnExample() {
  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', sticky: 'left', width: 50 },
    { name: 'name', label: 'Name', width: 120 },
    { name: 'email', label: 'Email', width: 220 },
    { name: 'phone', label: 'Phone', width: 150 },
    { name: 'website', label: 'Website', width: 120 },
    { name: 'company.name', label: 'Company Name', width: 180 },
    { name: 'company.catchPhrase', label: 'Catch Phrase', width: 250 },
    { name: 'username', label: 'Username', width: 140, sticky: 'right' },
  ]

  return <DataTable items={[...Users]} columns={columns} layout="fixed" />
}

/* --------------------------------------------------
 * Example: Custom Cell Renderer
 * -------------------------------------------------- */
function CustomRenderExample() {
  const columns: DataTableColumn[] = [
    { name: 'name', label: 'Name' },
    {
      name: 'email',
      label: 'Email (Masked)',
      render: (item) => (
        <TextContent small muted>
          {item.email.replace(/(.{2}).+(@.+)/, '$1***$2')}
        </TextContent>
      ),
    },
  ]

  const items = [
    { id: 1, name: 'Prabhu', email: 'prabhu@example.com' },
    { id: 2, name: 'Arun', email: 'arun@example.com' },
  ]

  return <DataTable items={items} columns={columns} />
}

/* --------------------------------------------------
 * Example: Row Click
 * -------------------------------------------------- */
function RowClickExample() {
  const [selected, setSelected] = useState<number | null>(null)

  const items = [
    { id: 1, name: 'Prabhu', role: 'Admin' },
    { id: 2, name: 'Arun', role: 'User' },
    { id: 3, name: 'Kumar', role: 'Manager' },
  ]

  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 60 },
    { name: 'name', label: 'Name' },
    { name: 'role', label: 'Role' },
  ]

  return (
    <div className="space-y-3 w-full">
      <DataTable
        items={items}
        columns={columns}
        onRowClick={(item) => setSelected(item.id)}
        rowClass={(item) =>
          item.id === selected ? 'ring-1 ring-inset ring-[var(--ui-primary)]' : ''
        }
      />
      {selected && (
        <TextContent small muted>
          Selected row ID: {selected}
        </TextContent>
      )}
    </div>
  )
}

/* --------------------------------------------------
 * Example: Row & Cell Styling
 * -------------------------------------------------- */
function StylingExample() {
  type Order = { id: number; product: string; amount: number; status: string }

  const items: Order[] = [
    { id: 1, product: 'Widget A', amount: 120, status: 'paid' },
    { id: 2, product: 'Widget B', amount: 340, status: 'pending' },
    { id: 3, product: 'Widget C', amount: 85, status: 'failed' },
    { id: 4, product: 'Widget D', amount: 210, status: 'paid' },
  ]

  const statusColor: Record<string, string> = {
    paid: 'text-green-600 dark:text-green-400 font-medium',
    pending: 'text-yellow-600 dark:text-yellow-400 font-medium',
    failed: 'text-red-600 dark:text-red-400 font-medium',
  }

  const columns: DataTableColumn<Order>[] = [
    { name: 'id', label: 'ID', width: 60 },
    { name: 'product', label: 'Product' },
    {
      name: 'amount',
      label: 'Amount',
      headerAlign: 'right',
      align: 'right',
      headerClass: 'text-gray-500',
      cellClass: (item) => (item.amount >= 200 ? 'font-semibold' : ''),
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
    <DataTable<Order>
      items={items}
      columns={columns}
      rowClass={(item) => (item.status === 'failed' ? 'opacity-60' : '')}
    />
  )
}

/* --------------------------------------------------
 * Example: Density
 * -------------------------------------------------- */
function DensityExample() {
  const items = [
    { id: 1, name: 'Prabhu', role: 'Admin' },
    { id: 2, name: 'Arun', role: 'User' },
  ]

  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 60 },
    { name: 'name', label: 'Name' },
    { name: 'role', label: 'Role' },
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
      <DataTable items={items} columns={columns} density={density} />
    </div>
  )
}

/* --------------------------------------------------
 * Example: Striped
 * -------------------------------------------------- */
function StripedExample() {
  const items = [
    { id: 1, name: 'Prabhu', role: 'Admin' },
    { id: 2, name: 'Arun', role: 'User' },
    { id: 3, name: 'Kumar', role: 'Manager' },
    { id: 4, name: 'Ravi', role: 'Developer' },
  ]

  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 60 },
    { name: 'name', label: 'Name' },
    { name: 'role', label: 'Role' },
  ]

  return <DataTable items={items} columns={columns} striped />
}

/* --------------------------------------------------
 * Example: Footer Row
 * -------------------------------------------------- */
function FooterRowExample() {
  const items = [
    { id: 1, product: 'Widget A', qty: 3, price: 40 },
    { id: 2, product: 'Widget B', qty: 1, price: 120 },
    { id: 3, product: 'Widget C', qty: 2, price: 65 },
  ]

  const total = items.reduce((sum, r) => sum + r.qty * r.price, 0)

  const columns: DataTableColumn[] = [
    { name: 'product', label: 'Product' },
    { name: 'qty', label: 'Qty', align: 'right', headerAlign: 'right', width: 80 },
    {
      name: 'price',
      label: 'Unit Price',
      align: 'right',
      headerAlign: 'right',
      width: 110,
      render: (r) => `$${r.price}`,
    },
  ]

  return (
    <DataTable
      items={items}
      columns={columns}
      footerRow={
        <>
          <td className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 first:pl-4">
            Total
          </td>
          <td />
          <td className="px-3 py-2 text-sm font-semibold text-right text-gray-900 dark:text-white last:pr-4">
            ${total}
          </td>
        </>
      }
    />
  )
}

/* --------------------------------------------------
 * Example: Empty State
 * -------------------------------------------------- */
function EmptyExample() {
  return (
    <DataTable
      items={[]}
      columns={[
        { name: 'id', label: 'ID' },
        { name: 'first_name', label: 'First name' },
        { name: 'last_name', label: 'Last name' },
        { name: 'dob', label: 'Date of Birth' },
      ]}
      emptyMessage="No data available"
    />
  )
}

/* --------------------------------------------------
 * Best Practices
 * -------------------------------------------------- */
const bestPractices = (
  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
    <li>
      Use <code>sortable: true</code> only for fields that logically support sorting.
    </li>
    <li>
      Use <code>render</code> for formatting dates, currency, masking emails, or custom UI.
    </li>
    <li>Use pagination for large datasets to improve performance.</li>
    <li>
      Sticky columns can be placed on both <code>left</code> and <code>right</code>.
    </li>
    <li>
      Prefer <code>cellClass</code> as a function over <code>render</code> when you only need to
      change styling, not the content.
    </li>
    <li>
      Use <code>rowKey</code> any time your items do not have an <code>id</code> field to prevent
      React key warnings.
    </li>
    <li>Keep table labels short and descriptive for better responsiveness.</li>
  </ul>
)

/* --------------------------------------------------
 * Main Docs Page
 * -------------------------------------------------- */
export default function DataTableDocsPage() {
  const examples = [
    {
      title: 'Basic Example',
      description: 'A minimal DataTable with static rows and columns.',
      render: <BasicDataTableExample />,
      code: `const columns: DataTableColumn[] = [
  { name: "id", label: "ID", width: 60 },
  { name: "name", label: "Name" },
  { name: "email", label: "Email" },
]

const items = [
  { id: 1, name: "Prabhu", email: "prabhu@example.com" },
  { id: 2, name: "Kathir", email: "kathir@example.com" },
]

<DataTable items={items} columns={columns} />`,
    },
    {
      title: 'Sorting',
      description: 'Interactive sorting for string, number, and date columns.',
      render: <SortingExample />,
      code: `const columns: DataTableColumn[] = [
  { name: "name", label: "Name", sortable: true, type: "string" },
  { name: "age",  label: "Age",  sortable: true, type: "number" },
  { name: "role", label: "Role" },
]

const [sortQuery, setSortQuery] = useState<SortQuery>({})
const [data, setData] = useState(original)

const handleSort = (column: DataTableColumn) => {
  setSortQuery(prev => updateSortQuery(prev, column.name, column.type))
}

<DataTable items={data} columns={columns} sorting={sortQuery} onSort={handleSort} />`,
    },
    {
      title: 'Pagination',
      description: 'Enable pagination for long lists.',
      render: <PaginationExample />,
      code: `const [pagination, setPagination] = useState<TPagination>({
  page: 1, limit: 3, total: 12,
})

<DataTable
  items={items}
  columns={columns}
  pagination={pagination}
  setPagination={(page) => setPagination(prev => ({ ...prev, ...page }))}
/>`,
    },
    {
      title: 'Sticky Columns',
      description: 'Freeze columns on the left or right for better horizontal scrolling.',
      render: <StickyColumnExample />,
      code: `const columns: DataTableColumn[] = [
  { name: "id",   label: "ID",       sticky: "left",  width: 50  },
  { name: "name", label: "Name",                      width: 120 },
  { name: "email",label: "Email",                     width: 220 },
  { name: "role", label: "Role",     sticky: "right", width: 120 },
]

<DataTable items={items} columns={columns} layout="fixed" />`,
    },
    {
      title: 'Custom Renderer',
      description: 'Use `render` to customize how cell values are displayed.',
      render: <CustomRenderExample />,
      code: `const columns: DataTableColumn[] = [
  { name: "name", label: "Name" },
  {
    name: "email",
    label: "Email (Masked)",
    render: (item) => (
      <TextContent small muted>
        {item.email.replace(/(.{2}).+(@.+)/, "$1***$2")}
      </TextContent>
    ),
  },
]

<DataTable items={items} columns={columns} />`,
    },
    {
      title: 'Row Click',
      description:
        'Add onRowClick to handle row selection or navigation. Combine with rowClass to highlight the active row.',
      render: <RowClickExample />,
      code: `const [selected, setSelected] = useState<number | null>(null)

<DataTable
  items={items}
  columns={columns}
  onRowClick={(item) => setSelected(item.id)}
  rowClass={(item) =>
    item.id === selected ? "ring-1 ring-inset ring-[var(--ui-primary)]" : ""
  }
/>`,
    },
    {
      title: 'Row & Cell Styling',
      description:
        'Use rowClass for row-level styles and cellClass (string or function) for per-column conditional styles. Use headerClass for column header customization.',
      render: <StylingExample />,
      code: `const columns: DataTableColumn<Order>[] = [
  { name: "product", label: "Product" },
  {
    name: "amount",
    label: "Amount",
    align: "right",
    headerClass: "text-gray-500",
    cellClass: (item) => item.amount >= 200 ? "font-semibold" : "",
    render: (item) => \`$\${item.amount}\`,
  },
  {
    name: "status",
    label: "Status",
    cellClass: (item) => statusColor[item.status] ?? "",
    render: (item) => item.status.charAt(0).toUpperCase() + item.status.slice(1),
  },
]

<DataTable
  items={items}
  columns={columns}
  rowClass={(item) => item.status === "failed" ? "opacity-60" : ""}
/>`,
    },
    {
      title: 'Density',
      description:
        'Control cell padding with the density prop. compact reduces padding, spacious increases it.',
      render: <DensityExample />,
      code: `<DataTable items={items} columns={columns} density="compact" />
<DataTable items={items} columns={columns} density="default" />
<DataTable items={items} columns={columns} density="spacious" />`,
    },
    {
      title: 'Striped',
      description: 'Apply an alternating background to odd-indexed rows for easier scanning.',
      render: <StripedExample />,
      code: `<DataTable items={items} columns={columns} striped />`,
    },
    {
      title: 'Footer Row',
      description: 'Render a summary or totals row inside a tfoot by passing cells as footerRow.',
      render: <FooterRowExample />,
      code: `<DataTable
  items={items}
  columns={columns}
  footerRow={
    <>
      <td className="px-3 py-2 text-sm font-semibold first:pl-4">Total</td>
      <td />
      <td className="px-3 py-2 text-sm font-semibold text-right last:pr-4">\${total}</td>
    </>
  }
/>`,
    },
    {
      title: 'Empty State',
      description: 'Show a friendly message when no data is available.',
      render: <EmptyExample />,
      code: `<DataTable
  items={[]}
  columns={columns}
  emptyMessage="No data available"
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="DataTable"
      description="A feature-rich data table for in-memory datasets. Supports built-in or external column sorting, sticky columns, row click handling, conditional row and cell styling, density presets, striped rows, a footer summary row, and integrated pagination. For very large lists, see VirtualizedDataTable."
      playground={{
        controls: {
          footerRow: 'hidden',
          rowClass: 'hidden',
          onRowClick: 'hidden',
        },
        render: (props) => (
          <DataTable
            density={props.density}
            striped={props.striped}
            loading={props.loading}
            layout={props.layout}
            items={[
              { id: 1, name: 'Prabhu Kathiresan', role: 'Developer', status: 'Active' },
              { id: 2, name: 'Alice Johnson', role: 'Designer', status: 'Inactive' },
              { id: 3, name: 'Bob Smith', role: 'Manager', status: 'Active' },
            ]}
            columns={
              [
                { name: 'id', label: 'ID', width: 60 },
                { name: 'name', label: 'Name' },
                { name: 'role', label: 'Role' },
                {
                  name: 'status',
                  label: 'Status',
                  render: (item) => (
                    <Badge variant={item.status === 'Active' ? 'success' : 'secondary'}>
                      {item.status}
                    </Badge>
                  ),
                },
              ] as DataTableColumn[]
            }
          />
        ),
        initialProps: { loading: false, layout: 'auto', density: 'default', striped: false },
      }}
      examples={examples}
      bestPractices={bestPractices}
    />
  )
}
