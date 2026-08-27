import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable } from './DataTable'
import * as Utils from './DataTable.utils'

jest.mock('../Table', () => ({
  Table: ({ children, className }: any) => (
    <table data-testid="table" className={className}>
      {children}
    </table>
  ),
  TableHead: ({ children, className }: any) => (
    <thead className={className}>
      <tr>{children}</tr>
    </thead>
  ),
  TableBody: ({ loading, colSize, rowSize, children }: any) =>
    loading ? (
      <tbody data-testid="loading-body">
        {Array.from({ length: rowSize }).map((_, i) => (
          <tr key={i} data-testid="loading-row">
            <td colSpan={colSize}>Loading...</td>
          </tr>
        ))}
      </tbody>
    ) : (
      <tbody>{children}</tbody>
    ),
  TableRow: ({ children, className, onClick }: any) => (
    <tr className={className} onClick={onClick}>
      {children}
    </tr>
  ),
  TableCell: ({ children, className }: any) => <td className={className}>{children}</td>,
  TableHeaderCell: ({ children, className, style }: any) => (
    <th className={className} style={style}>
      {children}
    </th>
  ),
  TableFoot: ({ children }: any) => (
    <tfoot>
      <tr>{children}</tr>
    </tfoot>
  ),
  EmptyTableRow: ({ children, colSpan }: any) => (
    <tr>
      <td colSpan={colSpan} data-testid="empty-row">
        {children}
      </td>
    </tr>
  ),
}))

jest.mock('../Pagination', () => ({
  Pagination: ({ page, onChange, className }: any) => (
    <div data-testid="pagination" className={className}>
      <button data-testid="page-next" onClick={() => onChange({ page: page + 1 })}>
        next
      </button>
    </div>
  ),
}))

jest.mock('../TextContent', () => ({
  TextContent: ({ children, onClick, ...rest }: any) => (
    <span {...rest} onClick={onClick}>
      {children}
    </span>
  ),
}))

jest.mock('./DataTable.icons', () => ({
  getSortIcon: (dir: any) => <i data-testid={`sort-icon-${dir || 'none'}`} />,
}))

describe('DataTable', () => {
  const rows = [
    { id: 3, name: 'Charlie', age: 30 },
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Bob', age: 25 },
  ]

  const columns = [
    { name: 'id', label: 'ID', sortable: true, type: 'number' as const },
    { name: 'name', label: 'Name', sortable: true, type: 'string' as const },
    { name: 'age', label: 'Age' },
  ]

  // ── existing behaviour ────────────────────────────────────────────────

  it('renders headers and rows', () => {
    render(<DataTable items={rows} columns={columns} />)
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })

  it('renders empty state', () => {
    render(<DataTable items={[]} columns={columns} emptyMessage="Nothing" />)
    expect(screen.getByTestId('empty-row')).toHaveTextContent('Nothing')
  })

  it('supports custom render per column', () => {
    const cols = [
      { name: 'name', label: 'Name', render: (r: any) => <b data-testid="custom">{r.name}</b> },
    ]
    render(<DataTable items={[rows[0]]} columns={cols} />)
    expect(screen.getByTestId('custom')).toHaveTextContent('Charlie')
  })

  it('calls onSort when sortable column clicked', () => {
    const onSort = jest.fn()
    render(<DataTable items={rows} columns={columns} onSort={onSort} />)
    fireEvent.click(screen.getByText('ID'))
    expect(onSort).toHaveBeenCalledWith(columns[0])
  })

  it('auto-sort fallback sorts ascending on first click', () => {
    render(<DataTable items={rows} columns={columns} />)
    fireEvent.click(screen.getByText('ID'))
    expect(screen.getAllByRole('cell')[0]).toHaveTextContent('1')
  })

  it('applies sticky classes to header and body cells', () => {
    const stickyCols = [
      { name: 'id', label: 'ID', sticky: 'left' as const },
      { name: 'name', label: 'Name', sticky: 'right' as const },
    ]
    render(<DataTable items={[rows[0]]} columns={stickyCols} />)
    const [left, right] = screen.getAllByRole('cell')
    expect(left.className).toMatch(/left-0/)
    expect(right.className).toMatch(/right-0/)
  })

  it('applies width and alignment to header cell', () => {
    const cols = [{ name: 'id', label: 'ID', width: 120, headerAlign: 'center' as const }]
    render(<DataTable items={[rows[0]]} columns={cols} />)
    const th = screen.getByText('ID').closest('th')!
    expect(th.style.width).toBe('120px')
  })

  it('renders sort icon', () => {
    render(<DataTable items={rows} columns={columns} sorting={{ id: 'asc' }} />)
    expect(screen.getByTestId('sort-icon-asc')).toBeInTheDocument()
  })

  it('renders pagination and triggers change', () => {
    const setPagination = jest.fn()
    render(
      <DataTable
        items={rows}
        columns={columns}
        pagination={{ page: 1, limit: 5, total: 20 }}
        setPagination={setPagination}
      />,
    )
    fireEvent.click(screen.getByTestId('page-next'))
    expect(setPagination).toHaveBeenCalledWith({ page: 2 })
  })

  it('applies containerClass and wrapperClass', () => {
    render(<DataTable items={rows} columns={columns} containerClass="outer" wrapperClass="inner" />)
    const wrapper = screen.getByText('ID').closest('div')!
    const container = wrapper.parentElement as HTMLElement
    expect(container.className).toMatch(/outer/)
    expect(wrapper.className).toMatch(/inner/)
  })

  it('renders loading rows', () => {
    render(
      <DataTable
        items={[]}
        columns={[{ name: 'id', label: 'ID' }]}
        loading
        pagination={{ page: 1, limit: 3, total: 3 }}
      />,
    )
    expect(screen.getAllByTestId('loading-row')).toHaveLength(3)
  })

  it('calls updateSortQuery when onSort is not provided', () => {
    const spy = jest.spyOn(Utils, 'updateSortQuery')
    render(<DataTable items={rows} columns={columns} />)
    fireEvent.click(screen.getByRole('button', { name: /id/i }))
    expect(spy).toHaveBeenCalledWith({}, 'id', 'number')
    spy.mockRestore()
  })

  // ── rowKey ────────────────────────────────────────────────────────────

  it('uses a custom rowKey string field for React keys', () => {
    const items = [{ uid: 'a', name: 'Alice' }]
    const cols = [{ name: 'name', label: 'Name' }]
    // No React key warning = passes silently; just confirm it renders
    render(<DataTable items={items} columns={cols} rowKey="uid" />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })

  it('uses a rowKey function for React keys', () => {
    const items = [{ code: 'X1', name: 'Alice' }]
    const cols = [{ name: 'name', label: 'Name' }]
    render(<DataTable items={items} columns={cols} rowKey={(item) => item.code} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })

  // ── onRowClick ────────────────────────────────────────────────────────

  it('calls onRowClick with item and index when a row is clicked', () => {
    const onRowClick = jest.fn()
    render(<DataTable items={rows} columns={columns} onRowClick={onRowClick} />)
    fireEvent.click(screen.getAllByRole('row')[1]) // first data row
    expect(onRowClick).toHaveBeenCalledWith(rows[0], 0)
  })

  it('adds cursor-pointer class to rows when onRowClick is set', () => {
    render(<DataTable items={[rows[0]]} columns={columns} onRowClick={jest.fn()} />)
    const dataRow = screen.getAllByRole('row')[1]
    expect(dataRow.className).toMatch(/cursor-pointer/)
  })

  it('does not add cursor-pointer when onRowClick is not set', () => {
    render(<DataTable items={[rows[0]]} columns={columns} />)
    const dataRow = screen.getAllByRole('row')[1]
    expect(dataRow.className).not.toMatch(/cursor-pointer/)
  })

  // ── rowClass ──────────────────────────────────────────────────────────

  it('applies a static rowClass string to every row', () => {
    render(<DataTable items={rows} columns={columns} rowClass="border-l-4" />)
    screen
      .getAllByRole('row')
      .slice(1)
      .forEach((row) => {
        expect(row.className).toMatch(/border-l-4/)
      })
  })

  it('applies a rowClass function varying by row', () => {
    render(
      <DataTable
        items={rows}
        columns={columns}
        rowClass={(item) => (item.id === 1 ? 'highlight' : '')}
      />,
    )
    const dataRows = screen.getAllByRole('row').slice(1)
    // Alice has id=1 but is at position 1 (second row) after original order
    const aliceRow = dataRows.find((r) => r.textContent?.includes('Alice'))!
    expect(aliceRow.className).toMatch(/highlight/)
    const charlieRow = dataRows.find((r) => r.textContent?.includes('Charlie'))!
    expect(charlieRow.className).not.toMatch(/highlight/)
  })

  // ── headerClass per column ────────────────────────────────────────────

  it('applies headerClass to the correct header cell', () => {
    const cols = [
      { name: 'id', label: 'ID', headerClass: 'text-blue-600' },
      { name: 'name', label: 'Name' },
    ]
    render(<DataTable items={rows} columns={cols} />)
    const idTh = screen.getByText('ID').closest('th')!
    const nameTh = screen.getByText('Name').closest('th')!
    expect(idTh.className).toMatch(/text-blue-600/)
    expect(nameTh.className).not.toMatch(/text-blue-600/)
  })

  // ── cellClass per column ──────────────────────────────────────────────

  it('applies a static cellClass string to every cell in that column', () => {
    const cols = [
      { name: 'id', label: 'ID', cellClass: 'font-mono' },
      { name: 'name', label: 'Name' },
    ]
    render(<DataTable items={rows} columns={cols} />)
    // id cells should have font-mono, name cells should not
    const allCells = screen.getAllByRole('cell')
    const idCells = allCells.filter((_, i) => i % 2 === 0)
    const nameCells = allCells.filter((_, i) => i % 2 === 1)
    idCells.forEach((cell) => expect(cell.className).toMatch(/font-mono/))
    nameCells.forEach((cell) => expect(cell.className).not.toMatch(/font-mono/))
  })

  it('applies a cellClass function varying by row value', () => {
    const cols = [
      {
        name: 'age',
        label: 'Age',
        cellClass: (item: any) => (item.age >= 30 ? 'text-red-600' : ''),
      },
    ]
    render(<DataTable items={rows} columns={cols} />)
    const cells = screen.getAllByRole('cell')
    // Charlie is age 30 → first row
    expect(cells[0].className).toMatch(/text-red-600/)
    // Alice is age 20 → no class
    expect(cells[1].className).not.toMatch(/text-red-600/)
  })

  // ── density ───────────────────────────────────────────────────────────

  it('applies compact density class to header and body cells', () => {
    const cols = [{ name: 'id', label: 'ID' }]
    render(<DataTable items={[rows[0]]} columns={cols} density="compact" />)
    const th = screen.getByText('ID').closest('th')!
    const td = screen.getAllByRole('cell')[0]
    expect(th.className).toMatch(/px-2/)
    expect(td.className).toMatch(/px-2/)
  })

  it('applies spacious density class to header and body cells', () => {
    const cols = [{ name: 'id', label: 'ID' }]
    render(<DataTable items={[rows[0]]} columns={cols} density="spacious" />)
    const th = screen.getByText('ID').closest('th')!
    const td = screen.getAllByRole('cell')[0]
    expect(th.className).toMatch(/px-4/)
    expect(td.className).toMatch(/px-4/)
  })

  // ── striped ───────────────────────────────────────────────────────────

  it('applies striped class to odd-indexed rows and their cells', () => {
    render(<DataTable items={rows} columns={columns} striped />)
    const dataRows = screen.getAllByRole('row').slice(1)
    // index 1 (second row) should be striped
    expect(dataRows[1].className).toMatch(/bg-gray-50/)
    // index 0 (first row) should not
    expect(dataRows[0].className).not.toMatch(/bg-gray-50/)
  })

  // ── footerRow ─────────────────────────────────────────────────────────

  it('renders a footer row inside tfoot', () => {
    render(
      <DataTable
        items={rows}
        columns={columns}
        footerRow={<td data-testid="footer-cell">Total: 3</td>}
      />,
    )
    expect(screen.getByTestId('footer-cell')).toBeInTheDocument()
    expect(screen.getByTestId('footer-cell').closest('tfoot')).not.toBeNull()
  })

  it('does not render tfoot when footerRow is not set', () => {
    render(<DataTable items={rows} columns={columns} />)
    expect(document.querySelector('tfoot')).toBeNull()
  })

  // ── tableClass & headClass ────────────────────────────────────────────

  it('applies tableClass to the table element', () => {
    render(<DataTable items={rows} columns={columns} tableClass="table-fixed" />)
    expect(screen.getByTestId('table').className).toMatch(/table-fixed/)
  })

  it('applies headClass to the thead element', () => {
    render(<DataTable items={rows} columns={columns} headClass="bg-blue-50" />)
    expect(document.querySelector('thead')!.className).toMatch(/bg-blue-50/)
  })

  // ── selectable rows ──────────────────────────────────────────────────

  it('does not render checkbox column when selectable is unset', () => {
    render(<DataTable items={rows} columns={columns} />)
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
  })

  it('renders a checkbox per row plus a select-all checkbox in the header', () => {
    render(<DataTable items={rows} columns={columns} selectable />)
    expect(screen.getAllByRole('checkbox')).toHaveLength(rows.length + 1)
  })

  it('calls onSelectionChange with keys and items when a row checkbox is toggled', () => {
    const onSelectionChange = jest.fn()
    render(
      <DataTable items={rows} columns={columns} selectable onSelectionChange={onSelectionChange} />,
    )
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[1]) // first data row (Charlie, id 3)
    expect(onSelectionChange).toHaveBeenCalledWith([3], [rows[0]])
  })

  it('selects and deselects all rows via the header checkbox', () => {
    const onSelectionChange = jest.fn()
    render(
      <DataTable items={rows} columns={columns} selectable onSelectionChange={onSelectionChange} />,
    )
    const [selectAll] = screen.getAllByRole('checkbox')
    fireEvent.click(selectAll)
    expect(onSelectionChange).toHaveBeenLastCalledWith([3, 1, 2], rows)

    fireEvent.click(selectAll)
    expect(onSelectionChange).toHaveBeenLastCalledWith([], [])
  })

  it('respects controlled selectedRowKeys', () => {
    render(<DataTable items={rows} columns={columns} selectable selectedRowKeys={[1]} />)
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[]
    // header, Charlie(3), Alice(1), Bob(2)
    expect(checkboxes[0].checked).toBe(false) // not all selected -> select-all unchecked
    expect(checkboxes[2].checked).toBe(true) // Alice
  })

  it('disables the checkbox for rows excluded by isRowSelectable', () => {
    render(
      <DataTable
        items={rows}
        columns={columns}
        selectable
        isRowSelectable={(item) => item.id !== 3}
      />,
    )
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[]
    expect(checkboxes[1].disabled).toBe(true) // Charlie (id 3)
    expect(checkboxes[2].disabled).toBe(false) // Alice
  })

  it('does not trigger onRowClick when the row checkbox is clicked', () => {
    const onRowClick = jest.fn()
    render(<DataTable items={rows} columns={columns} selectable onRowClick={onRowClick} />)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[1])
    expect(onRowClick).not.toHaveBeenCalled()
  })

  // ── stickyHeader & stickyPagination ─────────────────────────────────

  it('applies sticky header classes by default', () => {
    render(<DataTable items={rows} columns={columns} />)
    const th = screen.getByText('ID').closest('th')!
    expect(th.className).toMatch(/sticky top-0/)
  })

  it('can disable sticky header via stickyHeader=false', () => {
    render(<DataTable items={rows} columns={columns} stickyHeader={false} />)
    const th = screen.getByText('ID').closest('th')!
    expect(th.className).not.toMatch(/sticky top-0/)
  })

  it('applies sticky pagination classes by default', () => {
    render(
      <DataTable items={rows} columns={columns} pagination={{ page: 1, limit: 5, total: 20 }} />,
    )
    const paginationEl = screen.getByTestId('pagination')
    expect(paginationEl.className).toMatch(/sticky bottom-0/)
  })

  it('can disable sticky pagination via stickyPagination=false', () => {
    render(
      <DataTable
        items={rows}
        columns={columns}
        stickyPagination={false}
        pagination={{ page: 1, limit: 5, total: 20 }}
      />,
    )
    const paginationEl = screen.getByTestId('pagination')
    expect(paginationEl.className).not.toMatch(/sticky bottom-0/)
  })

  it('renders rowHoverActions and triggers click handlers without bubbling to onRowClick', () => {
    const handleEdit = jest.fn()
    const handleRowClick = jest.fn()

    render(
      <DataTable
        items={rows}
        columns={columns}
        onRowClick={handleRowClick}
        rowHoverActions={(item) => [
          {
            id: 'edit',
            label: 'Edit',
            onClick: handleEdit,
          },
        ]}
      />,
    )

    const actionsContainer = screen.getByTestId('row-hover-actions-1')
    expect(actionsContainer).toBeInTheDocument()

    const editBtn = screen.getAllByText('Edit')[0]
    fireEvent.click(editBtn)

    expect(handleEdit).toHaveBeenCalledWith(rows[0], 0, expect.anything())
    expect(handleRowClick).not.toHaveBeenCalled()
  })

  it('renders custom renderRowHoverActions node', () => {
    render(
      <DataTable
        items={rows}
        columns={columns}
        renderRowHoverActions={() => <button>Custom Action</button>}
      />,
    )

    expect(screen.getAllByText('Custom Action').length).toBe(rows.length)
  })

  it('renders inline cell when rowHoverActionMode="inline"', () => {
    render(
      <DataTable
        items={rows}
        columns={columns}
        rowHoverActionMode="inline"
        rowHoverActionHeader="Actions"
        rowHoverActions={() => [{ id: 'edit', label: 'Edit', onClick: () => {} }]}
      />,
    )

    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('applies custom rowHoverActionClass to actions container', () => {
    render(
      <DataTable
        items={rows}
        columns={columns}
        rowHoverActionClass="custom-hover-class"
        rowHoverActions={() => [{ id: 'edit', label: 'Edit', onClick: () => {} }]}
      />,
    )

    const actionsContainer = screen.getByTestId('row-hover-actions-1')
    expect(actionsContainer).toHaveClass('custom-hover-class')
  })
})
