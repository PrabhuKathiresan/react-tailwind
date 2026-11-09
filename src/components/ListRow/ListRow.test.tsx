import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ListRow } from './ListRow'
import type { ListRowProps } from './ListRow.types'

const renderRow = (props: Partial<ListRowProps>) =>
  render(<ListRow title="Sharma Traders" meta="#0057 · 19 Oct" trailing="₹1,200.00" {...props} />)

describe('ListRow', () => {
  it('is one link to the record when it has a page', () => {
    renderRow({ href: '/app/customers/c1' })
    expect(screen.getByRole('link', { name: /Sharma Traders/ })).toHaveAttribute(
      'href',
      '/app/customers/c1',
    )
  })

  it('renders the link through renderLink, e.g. a router Link', () => {
    renderRow({
      href: '/app/customers/c1',
      renderLink: ({ href, ...props }) => <a data-router-link="" href={`#${href}`} {...props} />,
    })
    const link = screen.getByRole('link', { name: /Sharma Traders/ })
    expect(link).toHaveAttribute('href', '#/app/customers/c1')
    expect(link).toHaveAttribute('data-router-link')
  })

  it('is one button when the record opens in place', () => {
    const onOpen = jest.fn()
    renderRow({ onOpen })
    fireEvent.click(screen.getByRole('button', { name: /Sharma Traders/ }))
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('is static with neither', () => {
    renderRow({})
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByText('Sharma Traders')).toBeInTheDocument()
  })

  it('keeps actions beside the content, never inside it', () => {
    renderRow({ onOpen: jest.fn(), actions: <button type="button">Actions</button> })
    expect(screen.getByRole('button', { name: /Sharma Traders/ })).not.toContainElement(
      screen.getByRole('button', { name: 'Actions' }),
    )
  })

  it('shows a chevron for a row that opens a setting', () => {
    const { container } = renderRow({ onOpen: jest.fn(), disclosure: true })
    expect(container.querySelector('button svg[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('becomes a checkbox in selection mode', () => {
    const onToggle = jest.fn()
    renderRow({
      href: '/app/invoices/i1',
      selection: { selected: false, onToggle, label: 'Select invoice 0057' },
    })
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Sharma Traders'))
    expect(onToggle).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('checkbox', { name: 'Select invoice 0057' })).not.toBeChecked()
  })
})
