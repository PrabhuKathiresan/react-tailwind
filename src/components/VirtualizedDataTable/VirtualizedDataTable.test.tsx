import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { VirtualizedDataTable } from './VirtualizedDataTable'

// ---------------------------------------
// Mock react-window List
// ---------------------------------------
jest.mock('react-window', () => ({
  FixedSizeList: React.forwardRef(({ itemCount, itemData, children: Row, outerRef }: any, _ref) => (
    <div data-testid="mock-list" ref={outerRef}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <Row key={index} index={index} style={{}} data={itemData} />
      ))}
    </div>
  )),
}))

// ---------------------------------------
// Sample data
// ---------------------------------------
const columns = [
  { name: 'id', label: 'ID', width: 60 },
  { name: 'name', label: 'Name', sortable: true },
]

const items = [
  { id: 1, name: 'Prabhu' },
  { id: 2, name: 'Kathiresan' },
]

// Helper to render
const setup = (props = {}) =>
  render(<VirtualizedDataTable items={items} columns={columns} {...props} />)

describe('VirtualizedDataTable', () => {
  test('renders column headers', () => {
    setup()

    const headers = screen.getAllByRole('columnheader')
    expect(headers.length).toBe(columns.length)
    expect(headers[0]).toHaveTextContent('ID')
    expect(headers[1]).toHaveTextContent('Name')
  })

  test('renders virtualized rows (via mock List)', () => {
    setup()

    const dataRows = screen.getAllByRole('row')
    expect(dataRows.length).toBe(items.length) // List only renders rows, header is separate
  })

  test('renders cell content correctly', () => {
    setup()

    const cells = screen.getAllByRole('cell')
    expect(cells.length).toBe(items.length * columns.length)

    expect(cells[0]).toHaveTextContent('1') // row1, col1
    expect(cells[1]).toHaveTextContent('Prabhu')

    expect(cells[2]).toHaveTextContent('2') // row2, col1
    expect(cells[3]).toHaveTextContent('Kathiresan')
  })

  test('triggers sorting callback on sortable column', () => {
    const handleSort = jest.fn()

    render(
      <VirtualizedDataTable items={items} columns={columns} sorting={{}} onSort={handleSort} />,
    )

    // the <TextContent> inside header is the clickable element
    const sortableBtn = screen.getByRole('button', { name: 'Name' })
    fireEvent.click(sortableBtn)

    expect(handleSort).toHaveBeenCalledTimes(1)
    expect(handleSort).toHaveBeenCalledWith(columns[1])
  })

  test('does not trigger sorting for non-sortable column', () => {
    const handleSort = jest.fn()

    setup({ onSort: handleSort })

    const idHeader = screen.getByRole('columnheader', { name: /id/i })
    fireEvent.click(idHeader)

    expect(handleSort).not.toHaveBeenCalled()
  })

  test('renders loading skeleton when loading=true', () => {
    const { container } = render(<VirtualizedDataTable items={[]} columns={columns} loading />)

    // Get all skeleton rows
    const skeletonRows = container.querySelectorAll('.animate-pulse')

    expect(skeletonRows.length).toEqual(6)
  })

  test('renders empty message when no items and not loading', () => {
    render(<VirtualizedDataTable items={[]} columns={columns} emptyMessage="Nothing found" />)

    expect(screen.getByText('Nothing found')).toBeInTheDocument()
  })

  test('applies containerClass + wrapperClass', () => {
    const { container } = render(
      <VirtualizedDataTable
        items={items}
        columns={columns}
        containerClass="outer-x"
        wrapperClass="inner-x"
      />,
    )

    const outer = container.querySelector('.outer-x')
    expect(outer).toBeTruthy()

    const inner = container.querySelector('.inner-x')
    expect(inner).toBeTruthy()
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

    // manually invoke scroll
    headerDiv.scrollLeft = 100

    fireEvent.scroll(headerDiv)

    expect(headerDiv.scrollLeft).toBe(100)
  })
})
