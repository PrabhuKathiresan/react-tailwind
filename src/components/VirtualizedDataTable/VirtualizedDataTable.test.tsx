import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { VirtualizedDataTable } from './VirtualizedDataTable'

jest.mock('react-window', () => ({
  FixedSizeList: React.forwardRef(({ itemCount, itemData, children: Row, outerRef }: any, _ref) => (
    <div data-testid="mock-list" ref={outerRef}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <Row key={index} index={index} style={{}} data={itemData} />
      ))}
    </div>
  )),
}))

const columns = [
  { name: 'id', label: 'ID', width: 60 },
  { name: 'name', label: 'Name', sortable: true },
]

const items = [
  { id: 1, name: 'Prabhu' },
  { id: 2, name: 'Kathiresan' },
]

const setup = (props = {}) =>
  render(<VirtualizedDataTable items={items} columns={columns} {...props} />)

describe('VirtualizedDataTable', () => {
  // ── existing behaviour ────────────────────────────────────────────────

  test('renders column headers', () => {
    setup()
    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(columns.length)
    expect(headers[0]).toHaveTextContent('ID')
    expect(headers[1]).toHaveTextContent('Name')
  })

  test('renders virtualized rows via mock List', () => {
    setup()
    expect(screen.getAllByRole('row')).toHaveLength(items.length)
  })

  test('renders cell content correctly', () => {
    setup()
    const cells = screen.getAllByRole('cell')
    expect(cells).toHaveLength(items.length * columns.length)
    expect(cells[0]).toHaveTextContent('1')
    expect(cells[1]).toHaveTextContent('Prabhu')
    expect(cells[2]).toHaveTextContent('2')
    expect(cells[3]).toHaveTextContent('Kathiresan')
  })

  test('triggers sorting callback on sortable column', () => {
    const handleSort = jest.fn()
    render(
      <VirtualizedDataTable items={items} columns={columns} sorting={{}} onSort={handleSort} />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Name' }))
    expect(handleSort).toHaveBeenCalledTimes(1)
    expect(handleSort).toHaveBeenCalledWith(columns[1])
  })

  test('does not trigger sorting for non-sortable column', () => {
    const handleSort = jest.fn()
    setup({ onSort: handleSort })
    fireEvent.click(screen.getByRole('columnheader', { name: /id/i }))
    expect(handleSort).not.toHaveBeenCalled()
  })

  test('renders empty message when no items and not loading', () => {
    render(<VirtualizedDataTable items={[]} columns={columns} emptyMessage="Nothing found" />)
    expect(screen.getByText('Nothing found')).toBeInTheDocument()
  })

  test('applies containerClass and wrapperClass', () => {
    const { container } = render(
      <VirtualizedDataTable
        items={items}
        columns={columns}
        containerClass="outer-x"
        wrapperClass="inner-x"
      />,
    )
    expect(container.querySelector('.outer-x')).toBeTruthy()
    expect(container.querySelector('.inner-x')).toBeTruthy()
  })

  test('applies gridTemplateColumns to header and rows', () => {
    setup()
    const headerGrid = screen.getAllByRole('columnheader')[0].parentElement!
    expect(headerGrid.style.gridTemplateColumns).toBeDefined()
    const bodyRow = screen.getAllByRole('row')[0]
    expect(bodyRow.style.gridTemplateColumns).toBeDefined()
  })

  test('scroll sync updates header scrollLeft', () => {
    const { container } = setup()
    const headerDiv = container.querySelector('div[role="columnheader"]')!.parentElement!
      .parentElement!
    headerDiv.scrollLeft = 100
    fireEvent.scroll(headerDiv)
    expect(headerDiv.scrollLeft).toBe(100)
  })

  // ── loading state ─────────────────────────────────────────────────────

  test('renders skeleton rows derived from maxHeight/rowHeight when loading', () => {
    render(
      <VirtualizedDataTable items={[]} columns={columns} loading maxHeight={200} rowHeight={40} />,
    )
    // Math.floor(200 / 40) = 5 rows
    expect(screen.getAllByTestId('skeleton-row')).toHaveLength(5)
  })

  test('skeleton falls back to 1 row minimum', () => {
    render(
      <VirtualizedDataTable items={[]} columns={columns} loading maxHeight={10} rowHeight={48} />,
    )
    expect(screen.getAllByTestId('skeleton-row')).toHaveLength(1)
  })

  // ── column width fix ──────────────────────────────────────────────────

  test('uses string width values (% or rem) directly without appending px', () => {
    const cols = [
      { name: 'id', label: 'ID', width: '10%' },
      { name: 'name', label: 'Name', width: '1fr' },
    ]
    render(<VirtualizedDataTable items={items} columns={cols} />)
    const headerGrid = screen.getAllByRole('columnheader')[0].parentElement!
    expect(headerGrid.style.gridTemplateColumns).toBe('10% 1fr')
  })

  test('appends px to numeric width values', () => {
    const cols = [
      { name: 'id', label: 'ID', width: 60 },
      { name: 'name', label: 'Name', width: 120 },
    ]
    render(<VirtualizedDataTable items={items} columns={cols} />)
    const headerGrid = screen.getAllByRole('columnheader')[0].parentElement!
    expect(headerGrid.style.gridTemplateColumns).toBe('60px 120px')
  })

  // ── onRowClick ────────────────────────────────────────────────────────

  test('calls onRowClick with item and index when a row is clicked', () => {
    const onRowClick = jest.fn()
    setup({ onRowClick })
    fireEvent.click(screen.getAllByRole('row')[0])
    expect(onRowClick).toHaveBeenCalledWith(items[0], 0)
  })

  test('adds cursor-pointer to rows when onRowClick is set', () => {
    setup({ onRowClick: jest.fn() })
    expect(screen.getAllByRole('row')[0].className).toMatch(/cursor-pointer/)
  })

  test('does not add cursor-pointer when onRowClick is not set', () => {
    setup()
    expect(screen.getAllByRole('row')[0].className).not.toMatch(/cursor-pointer/)
  })

  // ── rowClass ──────────────────────────────────────────────────────────

  test('applies a static rowClass string to every row', () => {
    setup({ rowClass: 'border-l-4' })
    screen.getAllByRole('row').forEach((row) => {
      expect(row.className).toMatch(/border-l-4/)
    })
  })

  test('applies a rowClass function varying by row', () => {
    setup({ rowClass: (_item: any, i: number) => (i === 0 ? 'highlight' : '') })
    const rows = screen.getAllByRole('row')
    expect(rows[0].className).toMatch(/highlight/)
    expect(rows[1].className).not.toMatch(/highlight/)
  })

  // ── headerClass per column ────────────────────────────────────────────

  test('applies headerClass to the correct header cell', () => {
    const cols = [
      { name: 'id', label: 'ID', headerClass: 'text-blue-600' },
      { name: 'name', label: 'Name' },
    ]
    render(<VirtualizedDataTable items={items} columns={cols} />)
    const [idHeader, nameHeader] = screen.getAllByRole('columnheader')
    expect(idHeader.className).toMatch(/text-blue-600/)
    expect(nameHeader.className).not.toMatch(/text-blue-600/)
  })

  // ── cellClass per column ──────────────────────────────────────────────

  test('applies a static cellClass to every cell in that column', () => {
    const cols = [
      { name: 'id', label: 'ID', cellClass: 'font-mono' },
      { name: 'name', label: 'Name' },
    ]
    render(<VirtualizedDataTable items={items} columns={cols} />)
    const allCells = screen.getAllByRole('cell')
    const idCells = allCells.filter((_, i) => i % 2 === 0)
    const nameCells = allCells.filter((_, i) => i % 2 === 1)
    idCells.forEach((c) => expect(c.className).toMatch(/font-mono/))
    nameCells.forEach((c) => expect(c.className).not.toMatch(/font-mono/))
  })

  test('applies a cellClass function varying by row value', () => {
    const cols = [
      {
        name: 'id',
        label: 'ID',
        cellClass: (item: any) => (item.id === 1 ? 'text-red-600' : ''),
      },
    ]
    render(<VirtualizedDataTable items={items} columns={cols} />)
    const cells = screen.getAllByRole('cell')
    expect(cells[0].className).toMatch(/text-red-600/)
    expect(cells[1].className).not.toMatch(/text-red-600/)
  })

  // ── density ───────────────────────────────────────────────────────────

  test('applies compact density class to header and body cells', () => {
    const cols = [{ name: 'id', label: 'ID', width: 60 }]
    render(<VirtualizedDataTable items={[items[0]]} columns={cols} density="compact" />)
    const header = screen.getByRole('columnheader')
    const cell = screen.getByRole('cell')
    expect(header.className).toMatch(/px-2/)
    expect(cell.className).toMatch(/px-2/)
  })

  test('applies spacious density class to header and body cells', () => {
    const cols = [{ name: 'id', label: 'ID', width: 60 }]
    render(<VirtualizedDataTable items={[items[0]]} columns={cols} density="spacious" />)
    const header = screen.getByRole('columnheader')
    const cell = screen.getByRole('cell')
    expect(header.className).toMatch(/px-4/)
    expect(cell.className).toMatch(/px-4/)
  })

  // ── striped ───────────────────────────────────────────────────────────

  test('applies striped class to odd-indexed rows and their cells', () => {
    render(<VirtualizedDataTable items={items} columns={columns} striped />)
    const rows = screen.getAllByRole('row')
    expect(rows[1].className).toMatch(/bg-gray-50/)
    expect(rows[0].className).not.toMatch(/bg-gray-50/)
  })

  // ── selectable rows ──────────────────────────────────────────────────

  test('does not render checkboxes when selectable is unset', () => {
    setup()
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
  })

  test('renders a checkbox per row plus a select-all checkbox in the header', () => {
    setup({ selectable: true })
    expect(screen.getAllByRole('checkbox')).toHaveLength(items.length + 1)
  })

  test('calls onSelectionChange with keys and items when a row checkbox is toggled', () => {
    const onSelectionChange = jest.fn()
    setup({ selectable: true, onSelectionChange })
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[1]) // first row
    expect(onSelectionChange).toHaveBeenCalledWith([1], [items[0]])
  })

  test('selects and deselects all rows via the header checkbox', () => {
    const onSelectionChange = jest.fn()
    setup({ selectable: true, onSelectionChange })
    const [selectAll] = screen.getAllByRole('checkbox')
    fireEvent.click(selectAll)
    expect(onSelectionChange).toHaveBeenLastCalledWith([1, 2], items)

    fireEvent.click(selectAll)
    expect(onSelectionChange).toHaveBeenLastCalledWith([], [])
  })

  test('respects controlled selectedRowKeys', () => {
    setup({ selectable: true, selectedRowKeys: [2] })
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[]
    expect(checkboxes[0].checked).toBe(false) // not all selected
    expect(checkboxes[2].checked).toBe(true) // second row (id 2)
  })

  test('disables the checkbox for rows excluded by isRowSelectable', () => {
    setup({ selectable: true, isRowSelectable: (item: any) => item.id !== 1 })
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[]
    expect(checkboxes[1].disabled).toBe(true)
    expect(checkboxes[2].disabled).toBe(false)
  })

  test('does not trigger onRowClick when the row checkbox is clicked', () => {
    const onRowClick = jest.fn()
    setup({ selectable: true, onRowClick })
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[1])
    expect(onRowClick).not.toHaveBeenCalled()
  })
})
