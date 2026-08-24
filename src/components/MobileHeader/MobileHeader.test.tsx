import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MobileHeader } from './MobileHeader'
import { MobileHeaderAction } from './MobileHeader.types'

describe('MobileHeader', () => {
  test('renders title and subtitle correctly', () => {
    render(<MobileHeader title="Order Details" subtitle="Order #ORD-901" />)

    expect(screen.getByTestId('mobile-header-title')).toHaveTextContent('Order Details')
    expect(screen.getByTestId('mobile-header-subtitle')).toHaveTextContent('Order #ORD-901')
  })

  test('triggers onBack handler when back button is clicked', () => {
    const onBackMock = jest.fn()
    render(<MobileHeader title="Settings" onBack={onBackMock} />)

    const backBtn = screen.getByTestId('mobile-header-back-btn')
    fireEvent.click(backBtn)

    expect(onBackMock).toHaveBeenCalled()
  })

  test('renders right action buttons and badges', () => {
    const actionOnClick = jest.fn()
    const actions: MobileHeaderAction[] = [
      { id: 'cart', label: 'Cart', icon: <span>C</span>, badge: 2, onClick: actionOnClick },
    ]

    render(<MobileHeader title="Shop" actions={actions} />)

    const cartAction = screen.getByTestId('mobile-header-action-cart')
    expect(cartAction).toBeInTheDocument()
    expect(screen.getByTestId('mobile-header-badge-cart')).toHaveTextContent('2')

    fireEvent.click(cartAction)
    expect(actionOnClick).toHaveBeenCalled()
  })

  test('toggles searchable mode and accepts search input', () => {
    const onSearchChangeMock = jest.fn()

    render(<MobileHeader title="Products" searchable={true} onSearchChange={onSearchChangeMock} />)

    const searchToggle = screen.getByTestId('mobile-header-search-toggle')
    fireEvent.click(searchToggle)

    const searchInput = screen.getByTestId('mobile-header-search-input')
    fireEvent.change(searchInput, { target: { value: 'Laptop' } })

    expect(onSearchChangeMock).toHaveBeenCalledWith('Laptop')
  })
})
