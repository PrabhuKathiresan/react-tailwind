import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ListView } from './ListView'
import type { ListViewLoadMore, ListViewProps } from './ListView.types'

type Row = { id: string }
const rows: Row[] = [{ id: 'a' }, { id: 'b' }]
const renderList = (props: Partial<ListViewProps<Row>> = {}) =>
  render(
    <ListView<Row>
      items={rows}
      isLoading={false}
      emptyTitle="No invoices yet"
      emptyDescription="Create one to see it here."
      renderItem={(row) => <div key={row.id}>Row {row.id}</div>}
      {...props}
    />,
  )
const loadMore = (overrides: Partial<ListViewLoadMore> = {}): ListViewLoadMore => ({
  shown: 2,
  total: 30,
  pageSize: 25,
  hasMore: true,
  isLoadingMore: false,
  onLoadMore: jest.fn(),
  noun: 'invoice',
  ...overrides,
})

describe('ListView', () => {
  it('shows the rows', () => {
    renderList()
    expect(screen.getByText('Row a')).toBeInTheDocument()
    expect(screen.getByText('Row b')).toBeInTheDocument()
  })

  it('shows the empty state with no rows', () => {
    renderList({ items: [] })
    expect(screen.getByText('No invoices yet')).toBeInTheDocument()
    expect(screen.getByText('Create one to see it here.')).toBeInTheDocument()
  })

  it('shows a spinner, not rows or the empty state, while loading', () => {
    renderList({ isLoading: true, items: [] })
    expect(screen.queryByText('No invoices yet')).not.toBeInTheDocument()
  })

  it('offers the next page under the rows, saying how many are shown', () => {
    const more = loadMore()
    renderList({ loadMore: more })
    expect(screen.getByText('2 of 30 invoices')).toHaveAttribute('aria-live', 'polite')
    fireEvent.click(screen.getByRole('button', { name: 'Show 25 more' }))
    expect(more.onLoadMore).toHaveBeenCalledTimes(1)
  })

  it('offers only what is left near the end', () => {
    renderList({ loadMore: loadMore({ shown: 25, total: 30 }) })
    expect(screen.getByRole('button', { name: 'Show 5 more' })).toBeInTheDocument()
  })

  it('marks the end once everything is shown', () => {
    renderList({ loadMore: loadMore({ shown: 30, total: 30, hasMore: false }) })
    expect(screen.getByText('End of list')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
