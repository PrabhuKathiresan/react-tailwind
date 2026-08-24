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
  })
})
