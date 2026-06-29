import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable } from './DataTable'
import * as Utils from './DataTable.utils'

jest.mock('../Table', () => ({
  Table: ({ children }: any) => <table data-testid="table">{children}</table>,
  TableHead: ({ children }: any) => (
    <thead>
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
  TableRow: (p: any) => <tr {...p}>{p.children}</tr>,
  TableCell: (p: any) => <td {...p}>{p.children}</td>,
  TableHeaderCell: (p: any) => <th {...p}>{p.children}</th>,
  EmptyTableRow: ({ children, colSpan }: any) => (
    <tr>
      <td colSpan={colSpan} data-testid="empty-row">
        {children}
      </td>
    </tr>
  ),
}))

jest.mock('../Pagination', () => ({
  Pagination: ({ page, onChange }: any) => (
    <div data-testid="pagination">
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

  it('renders headers and rows', () => {
    render(<DataTable items={rows} columns={columns} />)
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })

  it('renders empty state', () => {
    render(<DataTable items={[]} columns={columns} emptyMessage="Nothing" />)
    expect(screen.getByTestId('empty-row')).toHaveTextContent('Nothing')
  })

  it('supports custom render', () => {
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

  it('applies sticky classes', () => {
    const stickyCols = [
      { name: 'id', label: 'ID', sticky: 'left' as const },
      { name: 'name', label: 'Name', sticky: 'right' as const },
    ]
    render(<DataTable items={[rows[0]]} columns={stickyCols} />)
    const [left, right] = screen.getAllByRole('cell')
    expect(left.className).toMatch(/left-0/)
    expect(right.className).toMatch(/right-0/)
  })

  it('applies width and alignment', () => {
    const cols = [{ name: 'id', label: 'ID', width: 120, headerAlign: 'center' as const }]
    render(<DataTable items={[rows[0]]} columns={cols} />)
    const th = screen.getByText('ID').closest('th')!
    expect(th.style.width).toBe('120px')
    expect(th.getAttribute('align')).toBe('center')
  })

  it('renders sort icon', () => {
    render(<DataTable items={rows} columns={columns} sorting={{ id: 'asc' }} />)
    expect(screen.getByTestId('sort-icon-asc')).toBeInTheDocument()
  })

  it('renders pagination & triggers change', () => {
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

  it('calls updateSortQuery when onSort is NOT provided', () => {
    const spy = jest.spyOn(Utils, 'updateSortQuery')

    render(<DataTable items={rows} columns={columns} />)

    const clickable = screen.getByRole('button', { name: /id/i })
    fireEvent.click(clickable)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({}, 'id', 'number')

    spy.mockRestore()
  })
})
