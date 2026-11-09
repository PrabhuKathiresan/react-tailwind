import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { FilterSheet } from './FilterSheet'
import { FilterChips } from './FilterChips'
import type { FilterSheetProps } from './FilterSheet.types'

jest.mock('@headlessui/react', () => {
  const actual = jest.requireActual('@headlessui/react')
  return {
    ...actual,
    Transition: ({ children, show }: { children: React.ReactNode; show?: boolean }) =>
      show === false ? null : children,
  }
})

const renderSheet = (props: Partial<FilterSheetProps> = {}) => {
  const handlers = { onOpen: jest.fn(), onClose: jest.fn(), onClear: jest.fn() }
  render(
    <FilterSheet isOpen={false} activeCount={0} resultLabel="invoice" {...handlers} {...props}>
      <label>
        Status <select aria-label="Status" />
      </label>
    </FilterSheet>,
  )
  return handlers
}

describe('FilterSheet', () => {
  it('says how many filters are on and how many records match', () => {
    const { onOpen } = renderSheet({ activeCount: 2, resultCount: 12 })
    fireEvent.click(screen.getByRole('button', { name: 'Filters (2)' }))
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(screen.getByText(/12 invoices/)).toBeInTheDocument()
  })

  it('counts one record in the singular', () => {
    renderSheet({ resultCount: 1 })
    expect(screen.getByText(/1 invoice$/)).toBeInTheDocument()
  })

  it('shows the fields with Clear filters and Done when open', () => {
    const { onClear, onClose } = renderSheet({ isOpen: true })
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }))
    fireEvent.click(screen.getByRole('button', { name: 'Done' }))
    expect(onClear).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalled()
  })
})

describe('FilterChips', () => {
  it('clears a filter in one tap', () => {
    const onRemove = jest.fn()
    render(<FilterChips chips={[{ key: 'status', label: 'Unpaid', onRemove }]} />)
    fireEvent.click(screen.getByRole('button', { name: 'Remove filter: Unpaid' }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('renders nothing with no filters', () => {
    const { container } = render(<FilterChips chips={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
})
