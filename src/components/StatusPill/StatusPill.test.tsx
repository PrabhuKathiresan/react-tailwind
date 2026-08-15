import React from 'react'
import { render, screen } from '@testing-library/react'
import { StatusPill } from './StatusPill'

describe('StatusPill', () => {
  it('renders children label', () => {
    render(<StatusPill theme="success">Paid</StatusPill>)
    expect(screen.getByText('Paid')).toBeInTheDocument()
  })

  it('renders indicator dot by default', () => {
    render(<StatusPill theme="danger">Overdue</StatusPill>)
    expect(screen.getByTestId('status-pill-dot')).toBeInTheDocument()
  })

  it('hides dot when dot={false}', () => {
    render(
      <StatusPill theme="info" dot={false}>
        Draft
      </StatusPill>,
    )
    expect(screen.queryByTestId('status-pill-dot')).not.toBeInTheDocument()
  })

  it('applies pulse class when pulse={true}', () => {
    render(
      <StatusPill theme="warning" pulse>
        Pending
      </StatusPill>,
    )
    const dot = screen.getByTestId('status-pill-dot')
    expect(dot).toHaveClass('animate-pulse')
  })
})
