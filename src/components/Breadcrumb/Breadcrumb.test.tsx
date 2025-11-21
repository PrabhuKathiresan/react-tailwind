import React from 'react'
import { render, screen } from '@testing-library/react'
import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb Component', () => {
  const items = [
    { key: 'home', text: 'Home' },
    { key: 'products', text: 'Products' },
    { key: 'details', text: 'Details' },
  ]

  const renderFn = (item: any) => <a href={`/${item.key}`}>{item.text}</a>

  it('renders the breadcrumb container', () => {
    render(<Breadcrumb items={items} render={renderFn} />)
    expect(screen.getByTestId('breadcrumb-container')).toBeInTheDocument()
  })

  it('renders all breadcrumb items', () => {
    render(<Breadcrumb items={items} render={renderFn} />)

    items.forEach((item) => {
      expect(screen.getByTestId(`breadcrumb-item-${item.key}`)).toBeInTheDocument()
    })
  })

  it('renders using render() for non-last items', () => {
    render(<Breadcrumb items={items} render={renderFn} />)

    // The first two should be rendered as links
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/home')
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products')

    // Last item should NOT be a link
    expect(screen.getByText('Details').closest('a')).toBeNull()
  })

  it('renders divider icons for all but last item', () => {
    render(<Breadcrumb items={items} render={renderFn} />)

    // Should have count - 1 dividers
    expect(screen.getAllByTestId(/breadcrumb-divider-/)).toHaveLength(items.length - 1)
  })

  it('renders NO divider after the last item', () => {
    render(<Breadcrumb items={items} render={renderFn} />)

    // Last divider should NOT exist
    expect(screen.queryByTestId(`breadcrumb-divider-${items.length - 1}`)).toBeNull()
  })
})
