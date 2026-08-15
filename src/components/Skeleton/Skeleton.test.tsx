import React from 'react'
import { render, screen } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders skeleton element with aria-hidden', () => {
    render(<Skeleton />)
    const el = screen.getByTestId('skeleton')
    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies custom width and height styles', () => {
    render(<Skeleton width={120} height={40} />)
    const el = screen.getByTestId('skeleton')
    expect(el).toHaveStyle({ width: '120px', height: '40px' })
  })

  it('renders circular variant', () => {
    render(<Skeleton variant="circular" width={48} height={48} />)
    const el = screen.getByTestId('skeleton')
    expect(el).toHaveClass('rounded-full')
  })

  it('renders as a polymorphic element', () => {
    render(<Skeleton as="span" data-testid="skeleton-span" />)
    const el = screen.getByTestId('skeleton-span')
    expect(el.tagName.toLowerCase()).toBe('span')
  })
})
