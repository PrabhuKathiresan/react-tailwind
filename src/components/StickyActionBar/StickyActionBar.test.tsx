import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { StickyActionBar } from './StickyActionBar'

describe('StickyActionBar', () => {
  it('renders summary and actions content', () => {
    render(
      <StickyActionBar
        summaryContent={<div data-testid="summary">Total: $150</div>}
        actionsContent={<button data-testid="save-btn">Save</button>}
      />,
    )
    expect(screen.getByTestId('summary')).toBeInTheDocument()
    expect(screen.getByTestId('save-btn')).toBeInTheDocument()
  })

  it('triggers drawer when clicking summary trigger with drawerContent', () => {
    render(
      <StickyActionBar
        summaryContent={<span>3 Items</span>}
        actionsContent={<button>Submit</button>}
        drawerContent={<div data-testid="drawer-breakdown">Breakdown Details</div>}
        drawerTitle="Order Summary"
      />,
    )

    const trigger = screen.getByTestId('summary-trigger')
    fireEvent.click(trigger)
    expect(screen.getByTestId('drawer-breakdown')).toBeInTheDocument()
  })

  test('pads for the bottom safe area by default and can opt out', () => {
    const { rerender } = render(<StickyActionBar actionsContent={<button>Save</button>} />)
    expect(screen.getByTestId('sticky-action-bar').className).toContain('safe-area-inset-bottom')

    rerender(<StickyActionBar actionsContent={<button>Save</button>} safeArea={false} />)
    expect(screen.getByTestId('sticky-action-bar').className).not.toContain(
      'safe-area-inset-bottom',
    )
  })

  test('sits bottomOffset above the viewport edge, except when relative', () => {
    const { rerender } = render(
      <StickyActionBar actionsContent={<button>Save</button>} bottomOffset="64px" />,
    )
    expect(screen.getByTestId('sticky-action-bar')).toHaveStyle({ bottom: '64px' })

    rerender(
      <StickyActionBar
        actionsContent={<button>Save</button>}
        bottomOffset="64px"
        position="relative"
      />,
    )
    expect(screen.getByTestId('sticky-action-bar')).not.toHaveStyle({ bottom: '64px' })
  })
})
