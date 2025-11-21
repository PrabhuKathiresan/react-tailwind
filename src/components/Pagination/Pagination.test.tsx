import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination Component', () => {
  const baseProps = {
    page: 1,
    limit: 10,
    total: 100,
    onChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders mobile and desktop sections (ellipsis=true)', () => {
    render(<Pagination {...baseProps} ellipsis={true} />)

    // Mobile section
    expect(screen.getByTestId('ellipsis-mobile-prev-btn')).toBeInTheDocument()
    expect(screen.getByTestId('ellipsis-mobile-next-btn')).toBeInTheDocument()

    // Desktop summary
    const summary = screen.getByTestId('pagination-summary')
    expect(summary).toBeInTheDocument()
    expect(summary).toHaveTextContent('Showing')
    expect(summary).toHaveTextContent('results')
  })

  it('renders mobile and desktop sections (ellipsis=false)', () => {
    render(<Pagination {...baseProps} ellipsis={false} />)

    expect(screen.getByTestId('mobile-prev-btn')).toBeInTheDocument()
    expect(screen.getByTestId('mobile-next-btn')).toBeInTheDocument()

    const summary = screen.getByTestId('pagination-summary')
    expect(summary).toHaveTextContent('Showing')
  })

  it('calls onChange when clicking a page button', () => {
    render(<Pagination {...baseProps} />)

    fireEvent.click(screen.getByText('2'))
    expect(baseProps.onChange).toHaveBeenCalledWith({ page: 2 })
  })

  it('Prev button disabled on first page', () => {
    render(<Pagination {...baseProps} page={1} />)

    const prev = screen.getByTestId('ellipsis-next-btn') // desktop Prev
    expect(prev).toBeDisabled()
  })

  it('Next button disabled on last page', () => {
    render(<Pagination {...baseProps} page={10} />)

    const next = screen.getByTestId('ellipsis-prev-btn') // desktop Next
    expect(next).toBeDisabled()
  })

  it('mobile prev/next buttons trigger navigation', () => {
    render(<Pagination {...baseProps} page={5} />)

    fireEvent.click(screen.getByTestId('ellipsis-mobile-prev-btn'))
    expect(baseProps.onChange).toHaveBeenCalledWith({ page: 4 })

    fireEvent.click(screen.getByTestId('ellipsis-mobile-next-btn'))
    expect(baseProps.onChange).toHaveBeenCalledWith({ page: 6 })
  })

  it('desktop prev/next buttons trigger navigation', () => {
    render(<Pagination {...baseProps} page={5} />)

    fireEvent.click(screen.getByTestId('ellipsis-next-btn'))
    expect(baseProps.onChange).toHaveBeenCalledWith({ page: 4 })

    fireEvent.click(screen.getByTestId('ellipsis-prev-btn'))
    expect(baseProps.onChange).toHaveBeenCalledWith({ page: 6 })
  })

  it('renders ellipsis for large ranges when ellipsis=true', () => {
    render(<Pagination {...baseProps} total={500} />)

    const dots = screen.getAllByText('…')
    expect(dots.length).toBeGreaterThan(0)
  })

  it('does NOT render ellipsis when ellipsis=false', () => {
    render(<Pagination {...baseProps} total={500} ellipsis={false} />)

    expect(screen.queryByText('…')).not.toBeInTheDocument()
  })

  it('shows correct summary text', () => {
    render(<Pagination {...baseProps} page={2} />)

    const summary = screen.getByTestId('pagination-summary')

    expect(summary).toHaveTextContent('Showing')
    expect(summary).toHaveTextContent('11')
    expect(summary).toHaveTextContent('20')
    expect(summary).toHaveTextContent('100')
  })

  it('shows zeros when total=0', () => {
    render(<Pagination {...baseProps} total={0} />)

    expect(screen.getAllByText('0').length).toBeGreaterThan(0)
  })

  it('applies className to container', () => {
    render(<Pagination {...baseProps} className="my-custom" />)

    const container = screen.getByTestId('pagination-container')
    expect(container).toHaveClass('my-custom')
  })
})
