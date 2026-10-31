import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BottomNavigation } from './BottomNavigation'
import { BottomNavigationItem } from './BottomNavigation.types'

describe('BottomNavigation', () => {
  const items: BottomNavigationItem[] = [
    { id: 'home', label: 'Home', icon: <span data-testid="icon-home">H</span> },
    { id: 'search', label: 'Search', icon: <span data-testid="icon-search">S</span> },
    { id: 'orders', label: 'Orders', icon: <span data-testid="icon-orders">O</span>, badge: 3 },
    {
      id: 'profile',
      label: 'Profile',
      icon: <span data-testid="icon-profile">P</span>,
      disabled: true,
    },
  ]

  test('renders navigation items and labels correctly', () => {
    render(<BottomNavigation items={items} activeId="home" onChange={jest.fn()} />)

    expect(screen.getByTestId('bottom-navigation')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByTestId('bottom-nav-badge-orders')).toHaveTextContent('3')
  })

  test('triggers onChange when an active tab is clicked', () => {
    const onChangeMock = jest.fn()
    render(<BottomNavigation items={items} activeId="home" onChange={onChangeMock} />)

    const searchTab = screen.getByTestId('bottom-nav-item-search')
    fireEvent.click(searchTab)

    expect(onChangeMock).toHaveBeenCalledWith('search')
  })

  test('prevents click when tab is disabled', () => {
    const onChangeMock = jest.fn()
    render(<BottomNavigation items={items} activeId="home" onChange={onChangeMock} />)

    const profileTab = screen.getByTestId('bottom-nav-item-profile')
    expect(profileTab).toBeDisabled()

    fireEvent.click(profileTab)

    expect(onChangeMock).not.toHaveBeenCalled()
  })

  test('respects showLabels="never" prop', () => {
    render(
      <BottomNavigation items={items} activeId="home" onChange={jest.fn()} showLabels="never" />,
    )

    expect(screen.queryByText('Home')).not.toBeInTheDocument()
    expect(screen.queryByText('Search')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  test('marks only the active tab as the current page', () => {
    render(<BottomNavigation items={items} activeId="search" onChange={jest.fn()} />)

    expect(screen.getByTestId('bottom-nav-item-search')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByTestId('bottom-nav-item-home')).not.toHaveAttribute('aria-current')
    expect(screen.getByTestId('bottom-nav-item-home')).not.toHaveAttribute('aria-selected')
  })

  test('renders items with an href as links and still reports the selection', () => {
    const onChangeMock = jest.fn()
    const linkItems: BottomNavigationItem[] = [
      { id: 'home', label: 'Home', icon: 'H', href: '/home' },
      { id: 'orders', label: 'Orders', icon: 'O', href: '/orders' },
    ]
    render(<BottomNavigation items={linkItems} activeId="home" onChange={onChangeMock} />)

    const orders = screen.getByRole('link', { name: 'Orders' })
    expect(orders).toHaveAttribute('href', '/orders')
    fireEvent.click(orders)
    expect(onChangeMock).toHaveBeenCalledWith('orders')
  })

  test('passes the destination to a custom link component on the configured prop', () => {
    const RouterLink = ({ to, children, ...rest }: { to: string; children?: React.ReactNode }) => (
      <a data-to={to} href={`#${to}`} {...rest}>
        {children}
      </a>
    )
    render(
      <BottomNavigation
        items={[{ id: 'home', label: 'Home', icon: 'H', href: '/home' }]}
        activeId="home"
        linkAs={RouterLink}
        linkHrefProp="to"
      />,
    )

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('data-to', '/home')
  })

  test('keeps a disabled item as a disabled button even with an href', () => {
    render(
      <BottomNavigation
        items={[{ id: 'soon', label: 'Soon', icon: 'S', href: '/soon', disabled: true }]}
        activeId="home"
      />,
    )

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByTestId('bottom-nav-item-soon')).toBeDisabled()
  })

  test('labels the landmark and can be removed from the tree', () => {
    const { rerender } = render(
      <BottomNavigation items={items} activeId="home" onChange={jest.fn()} ariaLabel="Primary" />,
    )
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()

    rerender(<BottomNavigation items={items} activeId="home" onChange={jest.fn()} hidden />)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('rounds its top corners when asked', () => {
    const { rerender } = render(
      <BottomNavigation items={[{ id: 'home', label: 'Home', icon: <span /> }]} activeId="home" />,
    )
    expect(screen.getByTestId('bottom-navigation')).not.toHaveClass('rounded-t-2xl')
    rerender(
      <BottomNavigation
        items={[{ id: 'home', label: 'Home', icon: <span /> }]}
        activeId="home"
        rounded
      />,
    )
    expect(screen.getByTestId('bottom-navigation')).toHaveClass('rounded-t-2xl')
  })
})
