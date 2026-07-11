import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import {
  Table,
  TableHead,
  TableBody,
  TableFoot,
  TableRow,
  TableCell,
  TableHeaderCell,
  EmptyTableRow,
  TextContent,
  BodyText,
  Button,
  Badge,
} from '@pk-design/react-tailwind'

/* ---------------------------------------------------------
 * Example: Basic Table
 * --------------------------------------------------------- */
function BasicTableExample() {
  return (
    <Table>
      <TableHead>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell align="center">Role</TableHeaderCell>
        <TableHeaderCell align="right">Age</TableHeaderCell>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell align="center">Developer</TableCell>
          <TableCell align="right">29</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sarah Patel</TableCell>
          <TableCell align="center">Designer</TableCell>
          <TableCell align="right">25</TableCell>
        </TableRow>
      </TableBody>

      <TableFoot>
        <TableCell colSpan={3} align="center">
          <TextContent muted>End of results</TextContent>
        </TableCell>
      </TableFoot>
    </Table>
  )
}

/* ---------------------------------------------------------
 * Example: Caption
 * --------------------------------------------------------- */
function CaptionExample() {
  return (
    <Table caption="Team members by department">
      <TableHead>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Department</TableHeaderCell>
        <TableHeaderCell align="right">Status</TableHeaderCell>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Alice Johnson</TableCell>
          <TableCell>Engineering</TableCell>
          <TableCell align="right">
            <Badge variant="success">Active</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Smith</TableCell>
          <TableCell>Design</TableCell>
          <TableCell align="right">
            <Badge variant="secondary">Inactive</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

/* ---------------------------------------------------------
 * Example: Hoverable rows & row click
 * --------------------------------------------------------- */
function HoverableRowExample() {
  const [selected, setSelected] = useState<string | null>(null)

  const rows = [
    { name: 'John Doe', role: 'Developer', status: 'Active' },
    { name: 'Sarah Patel', role: 'Designer', status: 'Active' },
    { name: 'Mike Chen', role: 'Manager', status: 'Away' },
  ]

  return (
    <div className="space-y-2 w-full">
      <Table>
        <TableHead>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              hoverable
              onClick={() => setSelected(row.name)}
              className={row.name === selected ? 'ring-1 ring-inset ring-[var(--ui-primary)]' : ''}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selected && (
        <TextContent small muted>
          Selected: {selected}
        </TextContent>
      )}
    </div>
  )
}

/* ---------------------------------------------------------
 * Example: Loading State
 * --------------------------------------------------------- */
function LoadingTableExample() {
  return (
    <Table>
      <TableHead>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Department</TableHeaderCell>
        <TableHeaderCell>Location</TableHeaderCell>
      </TableHead>
      <TableBody colSize={3} loading rowSize={4} />
    </Table>
  )
}

/* ---------------------------------------------------------
 * Example: Empty State
 * --------------------------------------------------------- */
function EmptyStateExample() {
  return (
    <Table>
      <TableHead>
        <TableHeaderCell>User</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
      </TableHead>
      <TableBody>
        <EmptyTableRow colSpan={3}>
          <BodyText>No data available.</BodyText>
          <Button size="sm">Refresh</Button>
        </EmptyTableRow>
      </TableBody>
    </Table>
  )
}

/* ---------------------------------------------------------
 * Example: Fixed Layout
 * --------------------------------------------------------- */
function FixedLayoutExample() {
  return (
    <Table layout="fixed">
      <TableHead>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Description</TableHeaderCell>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Product A</TableCell>
          <TableCell>
            This is a longer description that wraps inside a fixed table layout cell.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

/* ---------------------------------------------------------
 * Best Practices
 * --------------------------------------------------------- */
const bestPractices = (
  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
    <li>
      Use <code>caption</code> to give screen readers context about what the table represents.
    </li>
    <li>
      <code>colSize</code> on <code>TableBody</code> is only required when <code>loading</code> is
      true — it sizes the shimmer columns.
    </li>
    <li>
      Pass <code>hoverable</code> and <code>onClick</code> to <code>TableRow</code> together for
      interactive row selection.
    </li>
    <li>
      For sorting, filtering, pagination, or large datasets, use <code>DataTable</code> or{' '}
      <code>VirtualizedDataTable</code> instead.
    </li>
  </ul>
)

/* ---------------------------------------------------------
 * Main Docs Page
 * --------------------------------------------------------- */
export default function TableDocsPage() {
  const examples = [
    {
      title: 'Basic Table',
      description: 'A simple table with header, body rows, and a footer.',
      render: <BasicTableExample />,
      code: `<Table>
  <TableHead>
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell align="center">Role</TableHeaderCell>
    <TableHeaderCell align="right">Age</TableHeaderCell>
  </TableHead>

  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell align="center">Developer</TableCell>
      <TableCell align="right">29</TableCell>
    </TableRow>
  </TableBody>

  <TableFoot>
    <TableCell colSpan={3} align="center">End of results</TableCell>
  </TableFoot>
</Table>`,
    },
    {
      title: 'Caption',
      description:
        'Pass a caption prop to render a visible <caption> element for screen reader context.',
      render: <CaptionExample />,
      code: `<Table caption="Team members by department">
  <TableHead>...</TableHead>
  <TableBody>...</TableBody>
</Table>`,
    },
    {
      title: 'Hoverable Rows & Row Click',
      description:
        'Add hoverable and onClick to TableRow to enable hover highlighting and click interaction. Native HTML attributes like onClick pass through directly.',
      render: <HoverableRowExample />,
      code: `const [selected, setSelected] = useState<string | null>(null)

<TableRow
  hoverable
  onClick={() => setSelected(row.name)}
  className={row.name === selected ? "ring-1 ring-inset ring-[var(--ui-primary)]" : ""}
>
  <TableCell>{row.name}</TableCell>
  ...
</TableRow>`,
    },
    {
      title: 'Loading State',
      description:
        'Pass loading to TableBody to show animated skeleton rows. colSize controls how many shimmer columns appear.',
      render: <LoadingTableExample />,
      code: `<TableBody colSize={3} loading rowSize={4} />`,
    },
    {
      title: 'Empty State',
      description: 'Use EmptyTableRow for a consistent empty state with optional actions.',
      render: <EmptyStateExample />,
      code: `<TableBody>
  <EmptyTableRow colSpan={3}>
    <BodyText>No data available.</BodyText>
    <Button size="sm">Refresh</Button>
  </EmptyTableRow>
</TableBody>`,
    },
    {
      title: 'Fixed Layout',
      description:
        "Use layout='fixed' for rigid column sizing where content wraps inside cells instead of expanding columns.",
      render: <FixedLayoutExample />,
      code: `<Table layout="fixed">
  ...
</Table>`,
    },
  ]

  return (
    <DocsPageLayout
      component="Table"
      description="A lightweight, composable table built from small primitives: Table, TableHead, TableBody, TableFoot, TableRow, TableCell, TableHeaderCell, and EmptyTableRow. Handles loading skeletons, empty states, alignment, sticky columns, and accessible captions. Use DataTable when you need built-in sorting or pagination."
      examples={examples}
      bestPractices={bestPractices}
    />
  )
}
