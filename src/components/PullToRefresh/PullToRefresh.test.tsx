import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { PullToRefresh } from './PullToRefresh'

describe('PullToRefresh', () => {
  test('renders children content correctly', () => {
    render(
      <PullToRefresh onRefresh={jest.fn()}>
        <div data-testid="test-content">Item List</div>
      </PullToRefresh>,
    )

    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  test('triggers touch pull gesture and calls onRefresh when threshold is met', async () => {
    const onRefreshMock = jest.fn().mockResolvedValue(undefined)

    render(
      <PullToRefresh onRefresh={onRefreshMock} pullThreshold={50}>
        <div>List Content</div>
      </PullToRefresh>,
    )

    const container = screen.getByTestId('pull-to-refresh-container')

    // Simulate pull gesture past threshold (startY: 100, currentY: 300)
    fireEvent.touchStart(container, { touches: [{ clientY: 100 }] })
    fireEvent.touchMove(container, { touches: [{ clientY: 300 }] })

    expect(screen.getByText('Release to refresh')).toBeInTheDocument()

    await act(async () => {
      fireEvent.touchEnd(container)
    })

    expect(onRefreshMock).toHaveBeenCalled()
  })

  test('does not trigger onRefresh if pull distance is below threshold', async () => {
    const onRefreshMock = jest.fn()

    render(
      <PullToRefresh onRefresh={onRefreshMock} pullThreshold={100}>
        <div>List Content</div>
      </PullToRefresh>,
    )

    const container = screen.getByTestId('pull-to-refresh-container')

    fireEvent.touchStart(container, { touches: [{ clientY: 100 }] })
    fireEvent.touchMove(container, { touches: [{ clientY: 120 }] }) // rawDistance: 20 -> dampened < 100

    expect(screen.getByText('Pull down to refresh')).toBeInTheDocument()

    await act(async () => {
      fireEvent.touchEnd(container)
    })

    expect(onRefreshMock).not.toHaveBeenCalled()
  })

  test('renders controlled refreshing state', () => {
    render(
      <PullToRefresh onRefresh={jest.fn()} refreshing={true}>
        <div>List Content</div>
      </PullToRefresh>,
    )

    expect(screen.getByText('Refreshing...')).toBeInTheDocument()
  })

  test('does not track pull gesture when disabled prop is true', () => {
    const onRefreshMock = jest.fn()

    render(
      <PullToRefresh onRefresh={onRefreshMock} disabled={true}>
        <div>List Content</div>
      </PullToRefresh>,
    )

    const container = screen.getByTestId('pull-to-refresh-container')

    fireEvent.touchStart(container, { touches: [{ clientY: 100 }] })
    fireEvent.touchMove(container, { touches: [{ clientY: 300 }] })

    const indicator = screen.getByTestId('pull-to-refresh-indicator')
    expect(indicator).toHaveStyle({ opacity: 0 })
  })
})
