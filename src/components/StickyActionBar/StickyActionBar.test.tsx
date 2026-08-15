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
})
