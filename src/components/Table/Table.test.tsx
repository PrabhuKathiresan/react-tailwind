import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Table,
  TableHead,
  TableBody,
  TableFoot,
  TableRow,
  TableCell,
  TableHeaderCell,
  EmptyTableRow,
} from './Table'

describe('<Table />', () => {
  test('renders table with correct layout class', () => {
    const { container, rerender } = render(
      <Table layout="auto">
        <tbody></tbody>
      </Table>,
    )
    expect(container.querySelector('table')).toHaveClass('table-auto')

    rerender(
      <Table layout="fixed">
        <tbody></tbody>
      </Table>,
    )
    expect(container.querySelector('table')).toHaveClass('table-fixed')
  })

  test('merges user className', () => {
    const { container } = render(
      <Table className="custom-table">
        <tbody></tbody>
      </Table>,
    )

    expect(container.querySelector('table')).toHaveClass('custom-table')
  })

  test('renders caption when provided', () => {
    render(
      <Table caption="User records">
        <tbody></tbody>
      </Table>,
    )
    expect(screen.getByText('User records').tagName).toBe('CAPTION')
  })

  test('does not render caption element when caption is not provided', () => {
    const { container } = render(
      <Table>
        <tbody></tbody>
      </Table>,
    )
    expect(container.querySelector('caption')).toBeNull()
  })
})

describe('<TableHead />', () => {
  test('renders inside <thead> and wraps children in <tr>', () => {
    render(
      <Table>
        <TableHead>
          <TableHeaderCell>Col1</TableHeaderCell>
          <TableHeaderCell>Col2</TableHeaderCell>
        </TableHead>
        <TableBody>
          <></>
        </TableBody>
      </Table>,
    )

    const [thead] = screen.getAllByRole('rowgroup')
    expect(thead.tagName).toBe('THEAD')

    const row = screen.getByRole('row')
    expect(row.tagName).toBe('TR')

    const cells = screen.getAllByRole('columnheader')
    expect(cells).toHaveLength(2)
    expect(cells[0]).toHaveTextContent('Col1')
    expect(cells[1]).toHaveTextContent('Col2')
  })
})

describe('<TableBody />', () => {
  test('renders loader rows when loading=true', () => {
    const { container } = render(
      <Table>
        <TableBody loading colSize={3} rowSize={4}>
          <></>
        </TableBody>
      </Table>,
    )

    const rows = container.querySelectorAll('tbody tr')
    expect(rows).toHaveLength(4)

    rows.forEach((row) => {
      expect(row).toHaveClass('animate-pulse')
      expect(row.querySelector('.shimmer')).toBeTruthy()
    })
  })

  test('renders children when loading=false', () => {
    render(
      <Table>
        <TableBody loading={false} colSize={2}>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    expect(screen.getByText('A')).toBeInTheDocument()
  })

  test('colSize is optional — renders without it when not loading', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>B</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  test('colSize defaults to 1 shimmer column when loading and colSize is omitted', () => {
    const { container } = render(
      <Table>
        <TableBody loading rowSize={2}>
          <></>
        </TableBody>
      </Table>,
    )

    const shimmerCells = container.querySelectorAll('tbody td')
    expect(shimmerCells).toHaveLength(2) // 2 rows × 1 column
  })
})

describe('<TableRow />', () => {
  test('renders row and merges classes', () => {
    const { container } = render(
      <Table>
        <tbody>
          <TableRow className="custom-row">
            <TableCell>Cell</TableCell>
          </TableRow>
        </tbody>
      </Table>,
    )

    const row = container.querySelector('tr')
    expect(row).toHaveClass('custom-row')
  })

  test('adds hoverable group class when hoverable=true', () => {
    const { container } = render(
      <Table>
        <tbody>
          <TableRow hoverable>
            <TableCell>Hover</TableCell>
          </TableRow>
        </tbody>
      </Table>,
    )

    expect(container.querySelector('tr')).toHaveClass('group')
  })

  test('forwards native HTML attributes such as onClick', () => {
    const onClick = jest.fn()
    render(
      <Table>
        <tbody>
          <TableRow onClick={onClick}>
            <TableCell>Click me</TableCell>
          </TableRow>
        </tbody>
      </Table>,
    )

    screen.getByText('Click me').closest('tr')!.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('<TableCell />', () => {
  test('respects alignment', () => {
    const { rerender } = render(
      <Table>
        <tbody>
          <TableRow>
            <TableCell align="center">A</TableCell>
          </TableRow>
        </tbody>
      </Table>,
    )

    expect(screen.getByText('A').parentElement).toHaveClass('text-center')

    rerender(
      <Table>
        <tbody>
          <TableRow>
            <TableCell align="right">A</TableCell>
          </TableRow>
        </tbody>
      </Table>,
    )

    expect(screen.getByText('A').parentElement).toHaveClass('text-right')
  })

  test('merges custom className', () => {
    const { container } = render(
      <Table>
        <tbody>
          <TableRow>
            <TableCell className="custom-cell">A</TableCell>
          </TableRow>
        </tbody>
      </Table>,
    )

    const cell = container.querySelector('td')
    expect(cell).toHaveClass('custom-cell')
  })
})

describe('<TableHeaderCell />', () => {
  test('renders header cell with <th>', () => {
    render(
      <Table>
        <TableHead>
          <TableHeaderCell>Header</TableHeaderCell>
        </TableHead>
        <tbody />
      </Table>,
    )

    const header = screen.getByRole('columnheader')
    expect(header.tagName).toBe('TH')
    expect(header).toHaveTextContent('Header')
  })

  test('applies alignment', () => {
    render(
      <Table>
        <TableHead>
          <TableHeaderCell align="center">Centered</TableHeaderCell>
        </TableHead>
        <tbody />
      </Table>,
    )

    const header = screen.getByRole('columnheader')
    expect(header).toHaveClass('text-center')
  })

  test('renders children directly without an extra wrapper element', () => {
    render(
      <Table>
        <TableHead>
          <TableHeaderCell>Label</TableHeaderCell>
        </TableHead>
        <tbody />
      </Table>,
    )

    const th = screen.getByRole('columnheader')
    expect(th.children).toHaveLength(0)
    expect(th.textContent).toBe('Label')
  })
})

describe('<EmptyTableRow />', () => {
  test('renders correct colSpan and content', () => {
    render(
      <Table>
        <tbody>
          <EmptyTableRow colSpan={4}>
            <div>No Data</div>
          </EmptyTableRow>
        </tbody>
      </Table>,
    )

    const cell = screen.getByText('No Data').closest('td')
    expect(cell).toHaveAttribute('colspan', '4')
  })

  test('applies contentClass', () => {
    render(
      <Table>
        <tbody>
          <EmptyTableRow contentClass="empty-style">
            <div>No Data</div>
          </EmptyTableRow>
        </tbody>
      </Table>,
    )

    const wrapper = screen.getByText('No Data').parentElement
    expect(wrapper).toHaveClass('empty-style')
  })
})
