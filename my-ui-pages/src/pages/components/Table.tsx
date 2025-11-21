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

      <TableBody colSize={3}>
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

      <TableBody colSize={3} loading={true}>
        <></>
      </TableBody>
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

      <TableBody colSize={3}>
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

      <TableBody colSize={2}>
        <TableRow>
          <TableCell>Product A</TableCell>
          <TableCell>
            This is a longer description that wraps inside a fixed table layout.
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
  <div className="space-y-3">
    <BodyText>
      ✓ Use <TextContent strong>TableHeaderCell</TextContent> for consistent header styling.
    </BodyText>
    <BodyText>
      ✓ Always pass <TextContent strong>colSize</TextContent> to{' '}
      <TextContent strong>TableBody</TextContent> to ensure correct skeleton layout.
    </BodyText>
    <BodyText>
      ✓ Keep layout simple — sorting, filtering, and pagination should be handled by a separate{' '}
      <TextContent strong>DataTable</TextContent> component.
    </BodyText>
    <BodyText>✗ Do not mix loading and empty states — they serve different UX purposes.</BodyText>
  </div>
)

/* ---------------------------------------------------------
 * Main Docs Page
 * --------------------------------------------------------- */
export default function TableDocsPage() {
  const examples = [
    {
      title: 'Basic Table',
      description: 'A simple table with header, body, and footer.',
      render: <BasicTableExample />,
      code: `
<Table>
  <TableHead>
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell align="center">Role</TableHeaderCell>
    <TableHeaderCell align="right">Age</TableHeaderCell>
  </TableHead>

  <TableBody colSize={3}>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell align="center">Developer</TableCell>
      <TableCell align="right">29</TableCell>
    </TableRow>
  </TableBody>

  <TableFoot>
    <TableCell colSpan={3} align="center">End of results</TableCell>
  </TableFoot>
</Table>
      `,
    },

    {
      title: 'Loading State',
      description: 'Built-in skeleton rows using rowSize & colSize.',
      render: <LoadingTableExample />,
      code: `
<TableBody colSize={3} loading={true} />
      `,
    },

    {
      title: 'Empty State',
      description: 'Use EmptyTableRow for a consistent empty state UI.',
      render: <EmptyStateExample />,
      code: `
<EmptyTableRow colSpan={3}>
  <BodyText>No data available.</BodyText>
  <Button size="sm">Refresh</Button>
</EmptyTableRow>
      `,
    },

    {
      title: 'Fixed Layout',
      description: "Use layout='fixed' for rigid column sizing.",
      render: <FixedLayoutExample />,
      code: `
<Table layout="fixed">...</Table>
      `,
    },
  ]

  return (
    <DocsPageLayout
      component="Table"
      description="A lightweight, unopinionated table component with consistent styling, loading skeletons, and helper cells. For search/sort/pagination, use the upcoming DataTable component."
      examples={examples}
      bestPractices={bestPractices}
    />
  )
}
