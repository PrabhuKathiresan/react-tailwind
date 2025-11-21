import { useEffect, useMemo, useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import {
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
 * Example: Basic Data Table
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

  // const items = [
  //   { id: 1, name: "Prabhu", email: "prabhu@example.com", doj: "30/11/1993", role: "Admin" },
  //   { id: 2, name: "Arun", email: "arun@example.com", doj: "21/05/1998", role: "User" },
  //   { id: 2, name: "Gayathri", email: "gayathri@example.com", doj: "30/06/2000", role: "User" },
  // ]

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
      Use <code>render</code> for formatting dates, currency, masking emails, or custom UI layouts.
    </li>
    <li>Use pagination for large datasets to improve performance.</li>
    <li>
      Sticky columns can be placed both <code>left</code> and <code>right</code> as needed.
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
      code: `
function BasicDataTableExample() {
  const columns: DataTableColumn[] = [
    { name: "id", label: "ID", width: 60 },
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
  ]

  const items = [
    { id: 1, name: "Prabhu", email: "prabhu@example.com" },
    { id: 2, name: "Kathir", email: "kathir@example.com" },
  ]

  return <DataTable items={items} columns={columns} />
}`,
    },
    {
      title: 'Sorting',
      description: 'Interactive sorting for string, number, and date columns.',
      render: <SortingExample />,
      code: `
function SortingExample() {
  const columns: DataTableColumn[] = [
    { name: "name", label: "Name", sortable: true, type: "string" },
    { name: "age", label: "Age", sortable: true, type: "number" },
    { name: "role", label: "Role" },
  ]

  const original = [
    { id: 1, name: "Prabhu", age: 32, role: "Admin" },
    { id: 2, name: "Arun", age: 28, role: "User" },
    { id: 3, name: "Kumar", age: 40, role: "Manager" },
  ]
  const [sortQuery, setSortQuery] = useState<SortQuery>({})
  const [data, setData] = useState(original)

  const handleSort = (column: DataTableColumn) => {
    setSortQuery(prev => updateSortQuery(prev, column.name, column.type))
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

      if (typeof A === "number" && typeof B === "number") {
        return direction === "asc" || direction === "1" ? A - B : B - A
      }

      const sA = String(A).toLowerCase()
      const sB = String(B).toLowerCase()

      if (sA < sB) return direction === "asc" ? -1 : 1
      if (sA > sB) return direction === "asc" ? 1 : -1
      return 0
    })
    setData(sorted)
  }, [sortQuery])

  return (
    <DataTable
      items={data}
      columns={columns}
      sorting={sortQuery}
      onSort={handleSort}
    />
  )
}`,
    },
    {
      title: 'Pagination',
      description: 'Enable pagination for long lists.',
      render: <PaginationExample />,
      code: `
function PaginationExample() {
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 3,
    total: 12,
  })

  const columns: DataTableColumn[] = [
    { name: "id", label: "ID", width: 80 },
    { name: "title", label: "Title" },
  ]

  const items = useMemo(() => {
    return Array.from({ length: pagination.limit }).map((_, i) => ({
      id: (pagination.page - 1) * pagination.limit + i + 1,
      title: \`Item \${(pagination.page - 1) * pagination.limit + i + 1}\`,
    }))
  }, [pagination.limit, pagination.page, pagination.total])

  return (
    <DataTable
      items={items}
      columns={columns}
      pagination={pagination}
      setPagination={(page) => setPagination(prev => ({ ...prev, ...page }))}
    />
  )
}`,
    },
    {
      title: 'Sticky Columns',
      description: 'Freeze columns on the left or right for better horizontal scrolling.',
      render: <StickyColumnExample />,
      code: `
function StickyColumnExample() {
  const columns: DataTableColumn[] = [
    { name: "id", label: "ID", sticky: "left", width: 70 },
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "role", label: "Role", sticky: "right" },
  ]

  const items = [
    { id: 1, name: "Prabhu", email: "prabhu@example.com", role: "Admin" },
    { id: 2, name: "Arun", email: "arun@example.com", role: "User" },
  ]

  return <DataTable items={items} columns={columns} containerClass="max-w-xs" />
}`,
    },
    {
      title: 'Custom Renderer',
      description: 'Use `render` to customize how cell values are displayed.',
      render: <CustomRenderExample />,
      code: `
function CustomRenderExample() {
  const columns: DataTableColumn[] = [
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

  const items = [
    { id: 1, name: "Prabhu", email: "prabhu@example.com" },
    { id: 2, name: "Arun", email: "arun@example.com" },
  ]

  return <DataTable items={items} columns={columns} />
}`,
    },
    {
      title: 'Empty State',
      description: 'Show a friendly message when no data is available.',
      render: <EmptyExample />,
      code: `
function EmptyExample() {
  return (
    <DataTable
      items={[]}
      columns={[
        { name: "id", label: "ID" },
        { name: "first_name", label: "First name" },
        { name: "last_name", label: "Last name" },
        { name: "dob", label: "Date of Birth" },
      ]}
      emptyMessage="No data available"
    />
  )
}`,
    },
  ]

  return (
    <DocsPageLayout
      component="DataTable"
      description="A flexible table component with sorting, sticky columns, pagination, and custom rendering support."
      examples={examples}
      bestPractices={bestPractices}
    />
  )
}
