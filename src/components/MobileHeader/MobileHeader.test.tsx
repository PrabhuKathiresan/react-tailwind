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

  describe('action overflow', () => {
    const makeActions = (onClick = jest.fn()): MobileHeaderAction[] => [
      { id: 'share', label: 'Share', icon: 'S', onClick },
      { id: 'print', label: 'Print', icon: 'P', onClick },
      { id: 'void', label: 'Void', icon: 'V', onClick },
    ]

    test('shows every action when maxVisibleActions is unset', () => {
      render(<MobileHeader title="Invoice" actions={makeActions()} />)

      expect(screen.getByTestId('mobile-header-action-void')).toBeInTheDocument()
      expect(screen.queryByTestId('mobile-header-overflow')).not.toBeInTheDocument()
    })

    test('keeps the header within the limit, counting the overflow button', () => {
      render(<MobileHeader title="Invoice" actions={makeActions()} maxVisibleActions={2} />)

      expect(screen.getByTestId('mobile-header-action-share')).toBeInTheDocument()
      expect(screen.queryByTestId('mobile-header-action-print')).not.toBeInTheDocument()
      expect(screen.queryByTestId('mobile-header-action-void')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'More actions' })).toHaveAttribute(
        'aria-expanded',
        'false',
      )
    })

    test('runs an overflowed action from the action sheet', () => {
      const onClick = jest.fn()
      render(<MobileHeader title="Invoice" actions={makeActions(onClick)} maxVisibleActions={2} />)

      fireEvent.click(screen.getByRole('button', { name: 'More actions' }))
      fireEvent.click(screen.getByText('Void'))

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    test('does not overflow when the actions already fit', () => {
      render(<MobileHeader title="Invoice" actions={makeActions()} maxVisibleActions={3} />)

      expect(screen.getByTestId('mobile-header-action-void')).toBeInTheDocument()
      expect(screen.queryByTestId('mobile-header-overflow')).not.toBeInTheDocument()
    })
  })

  test('renders trailing content after the actions', () => {
    render(<MobileHeader title="Invoices" trailing={<button type="button">Business A</button>} />)

    expect(screen.getByRole('button', { name: 'Business A' })).toBeInTheDocument()
  })

  describe('title alignment', () => {
    test('a left-aligned title with nothing before it starts at the row padding', () => {
      render(<MobileHeader title="GST report" titleAlign="left" />)

      expect(screen.queryByTestId('mobile-header-leading')).not.toBeInTheDocument()
      expect(screen.getByTestId('mobile-header-title').parentElement).toHaveClass('pr-2')
      expect(screen.getByTestId('mobile-header-title').parentElement).not.toHaveClass('px-2')
    })

    test('keeps the leading slot when there is a Back button', () => {
      render(<MobileHeader title="Invoice" titleAlign="left" onBack={jest.fn()} />)

      expect(screen.getByTestId('mobile-header-leading')).toBeInTheDocument()
      expect(screen.getByTestId('mobile-header-title').parentElement).toHaveClass('px-2')
    })

    test('keeps the empty leading slot for a centred title so actions stay on the right', () => {
      render(<MobileHeader title="Orders" />)

      expect(screen.getByTestId('mobile-header-leading')).toBeInTheDocument()
    })
  })
})
