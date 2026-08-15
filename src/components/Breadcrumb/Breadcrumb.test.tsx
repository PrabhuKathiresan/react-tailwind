import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb Component', () => {
  const items = [
    { key: 'home', text: 'Home', to: '/home' },
    { key: 'products', text: 'Products', to: '/products' },
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

  it('renders standard links when render prop is omitted', () => {
    render(<Breadcrumb items={items} />)

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/home')
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products')
    expect(screen.getByText('Details').closest('a')).toBeNull()
  })

  it('renders divider icons for all but last item', () => {
    render(<Breadcrumb items={items} render={renderFn} />)

    // Should have count - 1 dividers
    expect(screen.getAllByTestId(/breadcrumb-divider-/)).toHaveLength(items.length - 1)
  })

  it('renders NO divider after the last item', () => {
    render(<Breadcrumb items={items} render={renderFn} />)

    expect(screen.queryByTestId(`breadcrumb-divider-${items.length - 1}`)).toBeNull()
  })

  it('supports chevron separator', () => {
    render(<Breadcrumb items={items} separator="chevron" />)

    const dividers = screen.getAllByTestId(/breadcrumb-divider-/)
    expect(dividers).toHaveLength(2)
  })

  it('supports dot separator', () => {
    render(<Breadcrumb items={items} separator="dot" />)

    const dividers = screen.getAllByTestId(/breadcrumb-divider-/)
    expect(dividers).toHaveLength(2)
  })

  it('supports custom ReactNode separator', () => {
    render(<Breadcrumb items={items} separator={<span data-testid="custom-sep">&gt;</span>} />)

    expect(screen.getAllByTestId('custom-sep')).toHaveLength(2)
  })

  it('renders item icons when icon property is passed', () => {
    const itemsWithIcons = [
      { key: 'home', text: 'Home', icon: <span data-testid="home-icon">🏠</span> },
      { key: 'details', text: 'Details' },
    ]

    render(<Breadcrumb items={itemsWithIcons} />)

    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
  })

  it('truncates middle items when maxItems is specified', () => {
    const longItems = [
      { key: '1', text: 'Home', to: '/' },
      { key: '2', text: 'Category', to: '/cat' },
      { key: '3', text: 'Subcategory', to: '/sub' },
      { key: '4', text: 'Products', to: '/prod' },
      { key: '5', text: 'Item' },
    ]

    render(<Breadcrumb items={longItems} maxItems={3} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Item')).toBeInTheDocument()
    expect(screen.getByText('•••')).toBeInTheDocument()
    expect(screen.queryByText('Category')).toBeNull()

    // Expand upon clicking '•••'
    fireEvent.click(screen.getByText('•••'))
    expect(screen.getByText('Category')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { container } = render(<Breadcrumb items={items} size="sm" />)

    const nav = container.querySelector('nav')
    expect(nav?.className).toMatch(/text-xs/)
  })
})
