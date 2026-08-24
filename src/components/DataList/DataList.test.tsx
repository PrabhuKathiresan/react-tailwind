import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { DataList } from './DataList'
import { DataListColumn } from './DataList.types'

describe('DataList', () => {
  const items = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Designer', status: 'Inactive' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Developer', status: 'Active' },
  ]

  const columns: DataListColumn[] = [
    { name: 'name', label: 'Name', sortable: true, type: 'string' },
    { name: 'role', label: 'Role' },
    { name: 'status', label: 'Status' },
  ]

  test('renders items using column key-value grid', () => {
    render(<DataList items={items} columns={columns} />)

    expect(screen.getByTestId('data-list-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('data-list-item-2')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  test('filters items when searching', () => {
    render(<DataList items={items} columns={columns} searchable />)

    const searchInput = screen.getByPlaceholderText('Search items...')
    fireEvent.change(searchInput, { target: { value: 'Alice' } })

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
  })

  test('opens mobile bottom sheet filter drawer and applies checkbox filters', () => {
    render(
      <DataList
        items={items}
        columns={columns}
        filterFields={[
          {
            name: 'role',
            label: 'Role',
            options: [
              { label: 'Developer', value: 'Developer' },
              { label: 'Designer', value: 'Designer' },
            ],
          },
        ]}
      />,
    )

    const filterBtn = screen.getByTestId('data-list-filter-btn')
    fireEvent.click(filterBtn)

    expect(screen.getByText('Filter Items')).toBeInTheDocument()
    expect(screen.getAllByText('Developer').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Designer').length).toBeGreaterThan(0)

    const applyBtn = screen.getByTestId('data-list-apply-filters-btn')
    fireEvent.click(applyBtn)
  })

  test('opens mobile bottom sheet sort drawer and selects sort option', () => {
    render(<DataList items={items} columns={columns} />)

    const sortBtn = screen.getByTestId('data-list-sort-btn')
    fireEvent.click(sortBtn)

    expect(screen.getByText('Sort Items By')).toBeInTheDocument()

    const nameSortOpt = screen.getByTestId('data-list-sort-opt-name:asc')
    fireEvent.click(nameSortOpt)
  })

  test('renders custom renderItem template', () => {
    render(
      <DataList
        items={items}
        renderItem={(item) => <div data-testid={`custom-item-${item.id}`}>{item.name} Custom</div>}
      />,
    )

    expect(screen.getByTestId('custom-item-1')).toBeInTheDocument()
    expect(screen.getByText('Alice Custom')).toBeInTheDocument()
  })

  test('handles touch selection and select all', () => {
    const onSelectionChangeMock = jest.fn()
    render(
      <DataList
        items={items}
        columns={columns}
        selectable
        selectedKeys={[1]}
        onSelectionChange={onSelectionChangeMock}
      />,
    )

    const selectAllBox = screen.getByLabelText('Select All Items')
    fireEvent.click(selectAllBox)

    expect(onSelectionChangeMock).toHaveBeenCalledWith([1, 2, 3], items)
  })

  test('renders swipeable actions when swipeableActions is provided', () => {
    const mockDelete = jest.fn()
    render(
      <DataList
        items={items}
        columns={columns}
        swipeableActions={() => ({
          rightActions: [{ id: 'del', label: 'Delete', theme: 'danger', onClick: mockDelete }],
        })}
      />,
    )

    expect(screen.getAllByTestId('swipe-action-del').length).toBeGreaterThan(0)
  })
})
