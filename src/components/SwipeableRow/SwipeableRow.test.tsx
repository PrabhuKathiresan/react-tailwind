import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SwipeableRow } from './SwipeableRow'
import { SwipeableAction } from './SwipeableRow.types'

describe('SwipeableRow', () => {
  const mockLeftAction: SwipeableAction = {
    id: 'pin',
    label: 'Pin',
    theme: 'primary',
    onClick: jest.fn(),
  }

  const mockRightAction: SwipeableAction = {
    id: 'delete',
    label: 'Delete',
    theme: 'danger',
    onClick: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders children content properly', () => {
    render(
      <SwipeableRow leftActions={[mockLeftAction]} rightActions={[mockRightAction]}>
        <div data-testid="row-item">Item Content</div>
      </SwipeableRow>,
    )

    expect(screen.getByTestId('row-item')).toBeInTheDocument()
    expect(screen.getByText('Item Content')).toBeInTheDocument()
  })

  test('renders action buttons in background', () => {
    render(
      <SwipeableRow leftActions={[mockLeftAction]} rightActions={[mockRightAction]}>
        <div>Item Content</div>
      </SwipeableRow>,
    )

    expect(screen.getByTestId('swipe-action-pin')).toBeInTheDocument()
    expect(screen.getByTestId('swipe-action-delete')).toBeInTheDocument()
  })

  test('triggers action onClick handler when action button is clicked', () => {
    render(
      <SwipeableRow rightActions={[mockRightAction]}>
        <div>Item Content</div>
      </SwipeableRow>,
    )

    const deleteBtn = screen.getByTestId('swipe-action-delete')
    fireEvent.click(deleteBtn)

    expect(mockRightAction.onClick).toHaveBeenCalledTimes(1)
  })

  test('handles touch drag to swipe left and reveal right actions', () => {
    const onOpenMock = jest.fn()
    render(
      <SwipeableRow rightActions={[mockRightAction]} onOpen={onOpenMock}>
        <div>Item Content</div>
      </SwipeableRow>,
    )

    const content = screen.getByTestId('swipeable-row-content')

    fireEvent.touchStart(content, { touches: [{ clientX: 200, clientY: 100 }] })
    fireEvent.touchMove(content, { touches: [{ clientX: 100, clientY: 100 }] })
    fireEvent.touchEnd(content)

    expect(onOpenMock).toHaveBeenCalledWith('right')
  })

  test('handles touch drag to swipe right and reveal left actions', () => {
    const onOpenMock = jest.fn()
    render(
      <SwipeableRow leftActions={[mockLeftAction]} onOpen={onOpenMock}>
        <div>Item Content</div>
      </SwipeableRow>,
    )

    const content = screen.getByTestId('swipeable-row-content')

    fireEvent.touchStart(content, { touches: [{ clientX: 100, clientY: 100 }] })
    fireEvent.touchMove(content, { touches: [{ clientX: 200, clientY: 100 }] })
    fireEvent.touchEnd(content)

    expect(onOpenMock).toHaveBeenCalledWith('left')
  })

  test('does not swipe when disabled', () => {
    const onOpenMock = jest.fn()
    render(
      <SwipeableRow rightActions={[mockRightAction]} disabled onOpen={onOpenMock}>
        <div>Item Content</div>
      </SwipeableRow>,
    )

    const content = screen.getByTestId('swipeable-row-content')

    fireEvent.touchStart(content, { touches: [{ clientX: 200, clientY: 100 }] })
    fireEvent.touchMove(content, { touches: [{ clientX: 100, clientY: 100 }] })
    fireEvent.touchEnd(content)

    expect(onOpenMock).not.toHaveBeenCalled()
  })

  test('executes action automatically when fullSwipeToExecute is true and threshold is passed', () => {
    render(
      <SwipeableRow rightActions={[mockRightAction]} fullSwipeToExecute fullSwipeThreshold={100}>
        <div>Item Content</div>
      </SwipeableRow>,
    )

    const content = screen.getByTestId('swipeable-row-content')

    fireEvent.touchStart(content, { touches: [{ clientX: 300, clientY: 100 }] })
    fireEvent.touchMove(content, { touches: [{ clientX: 50, clientY: 100 }] })
    fireEvent.touchEnd(content)

    expect(mockRightAction.onClick).toHaveBeenCalledTimes(1)
  })

  test('closes row when clicking outside', () => {
    const onCloseMock = jest.fn()
    render(
      <div>
        <div data-testid="outside">Outside Area</div>
        <SwipeableRow rightActions={[mockRightAction]} onClose={onCloseMock}>
          <div>Item Content</div>
        </SwipeableRow>
      </div>,
    )

    const content = screen.getByTestId('swipeable-row-content')

    // Open row
    fireEvent.touchStart(content, { touches: [{ clientX: 200, clientY: 100 }] })
    fireEvent.touchMove(content, { touches: [{ clientX: 100, clientY: 100 }] })
    fireEvent.touchEnd(content)

    // Click outside
    fireEvent.click(screen.getByTestId('outside'))

    expect(onCloseMock).toHaveBeenCalled()
  })
})
