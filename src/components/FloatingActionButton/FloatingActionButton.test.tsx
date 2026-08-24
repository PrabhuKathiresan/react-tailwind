import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { FloatingActionButton } from './FloatingActionButton'
import { FABSpeedDialAction } from './FloatingActionButton.types'

describe('FloatingActionButton', () => {
  test('renders icon and triggers onClick when clicked', () => {
    const onClickMock = jest.fn()
    render(
      <FloatingActionButton
        icon={<span data-testid="plus-icon">+</span>}
        onClick={onClickMock}
        aria-label="Add item"
        position="inline"
      />,
    )

    expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
    const fabButton = screen.getByTestId('fab-button')
    fireEvent.click(fabButton)

    expect(onClickMock).toHaveBeenCalled()
  })

  test('renders extended label layout', () => {
    render(<FloatingActionButton icon={<span>+</span>} label="New Order" position="inline" />)

    expect(screen.getByText('New Order')).toBeInTheDocument()
  })

  test('expands speed dial menu sub-actions when clicked', () => {
    const action1OnClick = jest.fn()
    const actions: FABSpeedDialAction[] = [
      { id: 'scan', label: 'Scan QR', icon: <span>S</span>, onClick: action1OnClick },
      { id: 'upload', label: 'Upload File', icon: <span>U</span> },
    ]

    render(
      <FloatingActionButton icon={<span>+</span>} speedDialActions={actions} position="inline" />,
    )

    const fabButton = screen.getByTestId('fab-button')
    fireEvent.click(fabButton)

    expect(screen.getByTestId('fab-backdrop')).toBeInTheDocument()
    expect(screen.getByTestId('fab-action-scan')).toBeInTheDocument()
    expect(screen.getByTestId('fab-action-upload')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('fab-action-scan'))

    expect(action1OnClick).toHaveBeenCalled()
    expect(screen.queryByTestId('fab-backdrop')).not.toBeInTheDocument()
  })

  test('prevents click when disabled', () => {
    const onClickMock = jest.fn()
    render(
      <FloatingActionButton
        icon={<span>+</span>}
        onClick={onClickMock}
        disabled={true}
        position="inline"
      />,
    )

    const fabButton = screen.getByTestId('fab-button')
    expect(fabButton).toBeDisabled()

    fireEvent.click(fabButton)

    expect(onClickMock).not.toHaveBeenCalled()
  })
})
