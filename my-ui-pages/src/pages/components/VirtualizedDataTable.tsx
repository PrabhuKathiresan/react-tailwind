import { useEffect, useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import {
  VirtualizedDataTable,
  type DataTableColumn,
  type SortQuery,
  updateSortQuery,
  get,
} from '@pk-design/react-tailwind'

/* --------------------------------------------------
 * Example: Basic Virtualized DataTable
 * -------------------------------------------------- */
function BasicVirtualizedExample() {
  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 80 },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ]

  const items = Array.from({ length: 2000 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }))

  return <VirtualizedDataTable items={items} columns={columns} rowHeight={48} maxHeight={400} />
}

const codeBasic = `
import {
  VirtualizedDataTable,
  type DataTableColumn
} from "@pk-design/react-tailwind"

function BasicVirtualizedExample() {
  const columns: DataTableColumn[] = [
    { name: "id", label: "ID", width: 80 },
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
  ]

  const items = Array.from({ length: 2000 }).map((_, i) => ({
    id: i + 1,
    name: \`User \${i + 1}\`,
    email: \`user\${i + 1}@example.com\`,
  }))

  return (
    <VirtualizedDataTable
      items={items}
      columns={columns}
      rowHeight={48}
      maxHeight={400}
    />
  )
}
`.trim()

/* --------------------------------------------------
 * Example: Sorting + Virtualization
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

  /* client-side sorting */
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
      maxHeight={400}
    />
  )
}

const codeSorting = `
import {
  VirtualizedDataTable,
  updateSortQuery,
  type DataTableColumn,
  type SortQuery,
  get
} from "@pk-design/react-tailwind"

function SortingExample() {
  const columns: DataTableColumn[] = [
    { name: "name", label: "Name", sortable: true, type: "string" },
    { name: "age", label: "Age", sortable: true, type: "number" },
    { name: "role", label: "Role" },
  ]

  const original = Array.from({ length: 1000 }).map((_, i) => ({
    id: i + 1,
    name: ["Prabhu", "Arun", "Kumar"][i % 3] + " " + (i + 1),
    age: 20 + (i % 30),
    role: ["Admin", "User", "Manager"][i % 3],
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

      if (typeof A === "number") {
        return direction === "asc" ? A - B : B - A
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
    <VirtualizedDataTable
      items={data}
      columns={columns}
      sorting={sortQuery}
      onSort={handleSort}
      rowHeight={48}
      maxHeight={400}
    />
  )
}
`.trim()

/* --------------------------------------------------
 * Example: Empty State
 * -------------------------------------------------- */
function EmptyExample() {
  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 60 },
    { name: 'name', label: 'Name' },
  ]

  return (
    <VirtualizedDataTable
      items={[]}
      columns={columns}
      emptyMessage="No results available"
      rowHeight={48}
      maxHeight={200}
    />
  )
}

const codeEmpty = `
<VirtualizedDataTable
  items={[]}
  columns={[{ name: "id", label: "ID" }]}
  emptyMessage="No results available"
  rowHeight={48}
  maxHeight={200}
/>
`.trim()

/* --------------------------------------------------
 * Example: API Loading
 * -------------------------------------------------- */
function APILoadingExample() {
  const columns: DataTableColumn[] = [
    { name: 'id', label: 'ID', width: 60 },
    { name: 'name', label: 'Name' },
  ]

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setItems(
        Array.from({ length: 500 }).map((_, i) => ({
          id: i + 1,
          name: `API User ${i + 1}`,
        })),
      )
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <VirtualizedDataTable
      items={items}
      columns={columns}
      loading={loading}
      emptyMessage="No data found"
      rowHeight={48}
      maxHeight={300}
    />
  )
}

const codeAPILoading = `
function APILoadingExample() {
  const columns = [
    { name: "id", label: "ID", width: 60 },
    { name: "name", label: "Name" },
  ]

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setItems(
        Array.from({ length: 500 }).map((_, i) => ({
          id: i + 1,
          name: \`API User \${i + 1}\`,
        }))
      )
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <VirtualizedDataTable
      items={items}
      columns={columns}
      loading={loading}
      rowHeight={48}
      maxHeight={300}
      emptyMessage="No data found"
    />
  )
}
`.trim()

/* --------------------------------------------------
 * Best Practices
 * -------------------------------------------------- */
const bestPractices = (
  <ul className="list-disc pl-6 space-y-2">
    <li>Use virtualization when rendering more than 200 rows.</li>
    <li>
      Always define <code>rowHeight</code> to ensure stable row rendering.
    </li>
    <li>Sorting should be handled externally for large datasets.</li>
    <li>
      Use <code>sticky: "left"</code> or <code>sticky: "right"</code> for important columns.
    </li>
    <li>Avoid expensive cell renderers inside virtualized lists.</li>
  </ul>
)

/* --------------------------------------------------
 * Final Docs Page
 * -------------------------------------------------- */
export default function VirtualizedDataTableDocsPage() {
  const examples = [
    {
      title: 'Basic Virtualized Table',
      description: 'Efficiently render thousands of rows.',
      render: <BasicVirtualizedExample />,
      code: codeBasic,
    },
    {
      title: 'Sorting Example',
      description: 'Client-side sorting with virtualization.',
      render: <SortingExample />,
      code: codeSorting,
    },
    {
      title: 'Empty State',
      description: 'Gracefully handle empty datasets.',
      render: <EmptyExample />,
      code: codeEmpty,
    },
    {
      title: 'API Loading Example',
      description: 'Fetch and render server data with loading state.',
      render: <APILoadingExample />,
      code: codeAPILoading,
    },
  ]

  return (
    <DocsPageLayout
      component="VirtualizedDataTable"
      description="A high-performance table component built on virtualization."
      examples={examples}
      bestPractices={bestPractices}
    />
  )
}
