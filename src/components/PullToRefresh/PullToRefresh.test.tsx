import React from 'react'
import { render, screen, fireEvent, act, within } from '@testing-library/react'
import { PullToRefresh } from './PullToRefresh'

const at = (clientY: number, clientX = 100) => ({ touches: [{ clientX, clientY }] })
const container = () => screen.getByTestId('pull-to-refresh-container')
const indicator = () => screen.getByTestId('pull-to-refresh-indicator')
const content = () => screen.getByTestId('pull-to-refresh-content')

// A 200px finger drag: 90px after resistance, past the default 70px threshold.
const pullPastThreshold = () => {
  fireEvent.touchStart(container(), at(100))
  fireEvent.touchMove(container(), at(300))
}

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

    pullPastThreshold()
    expect(screen.getByText('Release to refresh')).toBeInTheDocument()

    await act(async () => {
      fireEvent.touchEnd(container())
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

    fireEvent.touchStart(container(), at(100))
    fireEvent.touchMove(container(), at(120)) // rawDistance: 20 -> dampened < 100

    expect(screen.getByText('Pull down to refresh')).toBeInTheDocument()

    await act(async () => {
      fireEvent.touchEnd(container())
    })

    expect(onRefreshMock).not.toHaveBeenCalled()
  })

  test('renders controlled refreshing state', () => {
    render(
      <PullToRefresh onRefresh={jest.fn()} refreshing={true}>
        <div>List Content</div>
      </PullToRefresh>,
    )

    expect(within(indicator()).getByText('Refreshing...')).toBeInTheDocument()
  })

  test('does not track pull gesture when disabled prop is true', () => {
    render(
      <PullToRefresh onRefresh={jest.fn()} disabled={true}>
        <div>List Content</div>
      </PullToRefresh>,
    )

    pullPastThreshold()

    expect(indicator()).toHaveStyle({ opacity: 0 })
  })

  test('moves the content once by the pull distance (push)', () => {
    render(
      <PullToRefresh onRefresh={jest.fn()}>
        <div>List Content</div>
      </PullToRefresh>,
    )

    pullPastThreshold()

    // The indicator is out of flow, so the content's translate is the only shift.
    expect(indicator()).toHaveClass('absolute')
    expect(content()).toHaveStyle({ transform: 'translateY(90px)' })
  })

  test('blocks the browser’s own pull while pulling', () => {
    render(
      <PullToRefresh onRefresh={jest.fn()}>
        <div>List Content</div>
      </PullToRefresh>,
    )

    fireEvent.touchStart(container(), at(100))
    const notPrevented = fireEvent.touchMove(container(), at(300))

    expect(notPrevented).toBe(false)
  })

  describe('interrupted gestures', () => {
    test('a cancelled touch resets the indicator', () => {
      render(
        <PullToRefresh onRefresh={jest.fn()}>
          <div>List Content</div>
        </PullToRefresh>,
      )

      pullPastThreshold()
      fireEvent.touchCancel(container())

      expect(indicator()).toHaveStyle({ opacity: 0 })
      expect(content()).toHaveStyle({ transform: 'translateY(0px)' })
    })

    test('a tap after a cancelled pull does not refresh', async () => {
      const onRefresh = jest.fn()
      render(
        <PullToRefresh onRefresh={onRefresh}>
          <div>List Content</div>
        </PullToRefresh>,
      )

      pullPastThreshold()
      fireEvent.touchCancel(container())
      await act(async () => {
        fireEvent.touchStart(container(), at(100))
        fireEvent.touchEnd(container())
      })

      expect(onRefresh).not.toHaveBeenCalled()
    })

    test('a mostly sideways swipe is left to the content', async () => {
      const onRefresh = jest.fn()
      render(
        <PullToRefresh onRefresh={onRefresh}>
          <div>List Content</div>
        </PullToRefresh>,
      )

      fireEvent.touchStart(container(), at(100, 50))
      const notPrevented = fireEvent.touchMove(container(), at(270, 350)) // 300 sideways, 170 down
      await act(async () => {
        fireEvent.touchEnd(container())
      })

      expect(notPrevented).toBe(true)
      expect(onRefresh).not.toHaveBeenCalled()
    })

    test('ignores pulls once the content has scrolled', async () => {
      const onRefresh = jest.fn()
      render(
        <PullToRefresh onRefresh={onRefresh}>
          <div>List Content</div>
        </PullToRefresh>,
      )

      container().scrollTop = 40
      pullPastThreshold()
      await act(async () => {
        fireEvent.touchEnd(container())
      })

      expect(onRefresh).not.toHaveBeenCalled()
    })
  })

  describe('failures and announcements', () => {
    test('reports a failed refresh through onError and settles', async () => {
      const error = new Error('offline')
      const onError = jest.fn()
      render(
        <PullToRefresh onRefresh={() => Promise.reject(error)} onError={onError}>
          <div>List Content</div>
        </PullToRefresh>,
      )

      pullPastThreshold()
      await act(async () => {
        fireEvent.touchEnd(container())
      })

      expect(onError).toHaveBeenCalledWith(error)
      expect(indicator()).toHaveStyle({ opacity: 0 })
      expect(screen.getByRole('status')).toHaveTextContent('')
    })

    test('announces refreshing and completion to assistive tech', async () => {
      let finish: () => void = () => {}
      const onRefresh = () =>
        new Promise<void>((resolve) => {
          finish = resolve
        })
      render(
        <PullToRefresh onRefresh={onRefresh} refreshedLabel="Invoices updated">
          <div>List Content</div>
        </PullToRefresh>,
      )

      pullPastThreshold()
      await act(async () => {
        fireEvent.touchEnd(container())
      })
      expect(screen.getByRole('status')).toHaveTextContent('Refreshing...')

      await act(async () => finish())
      expect(screen.getByRole('status')).toHaveTextContent('Invoices updated')
    })

    test('uses custom indicator labels', () => {
      render(
        <PullToRefresh onRefresh={jest.fn()} pullLabel="Pull to sync" releaseLabel="Let go">
          <div>List Content</div>
        </PullToRefresh>,
      )

      fireEvent.touchStart(container(), at(100))
      fireEvent.touchMove(container(), at(130))
      expect(screen.getByText('Pull to sync')).toBeInTheDocument()

      fireEvent.touchMove(container(), at(300))
      expect(screen.getByText('Let go')).toBeInTheDocument()
    })
  })

  describe('overlay variant', () => {
    test('keeps the content still and slides the badge down', () => {
      render(
        <PullToRefresh onRefresh={jest.fn()} variant="overlay">
          <div>List Content</div>
        </PullToRefresh>,
      )

      pullPastThreshold()

      expect(content()).not.toHaveAttribute('style')
      expect(indicator()).toHaveStyle({ transform: 'translateY(60px)', opacity: 1 })
    })

    test('parks the badge at the threshold while refreshing', () => {
      render(
        <PullToRefresh onRefresh={jest.fn()} variant="overlay" refreshing>
          <div>List Content</div>
        </PullToRefresh>,
      )

      expect(indicator()).toHaveStyle({ transform: 'translateY(40px)', opacity: 1 })
    })
  })
})
