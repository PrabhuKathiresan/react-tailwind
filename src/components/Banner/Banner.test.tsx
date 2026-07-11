import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Banner } from './Banner'

describe('Banner Component', () => {
  it('renders children content', () => {
    render(<Banner>Banner Text</Banner>)
    expect(screen.getByText('Banner Text')).toBeInTheDocument()
  })

  it('applies correct data-testid based on type', () => {
    const types = ['info', 'error', 'success', 'warning'] as const

    types.forEach((type) => {
      render(<Banner type={type}>Text</Banner>)
      const banner = screen.getByTestId(`banner-${type}`)
      expect(banner).toBeInTheDocument()
    })
  })

  it('renders correct icon for each type', () => {
    const types = ['info', 'error', 'success', 'warning'] as const

    types.forEach((type) => {
      render(<Banner type={type}>Text</Banner>)
      const icon = screen.getByTestId(`banner-${type}-icon`)
      expect(icon).toBeInTheDocument()
    })
  })

  it('applies correct icon size class', () => {
    render(<Banner iconSize="lg">Text</Banner>)
    const icon = screen.getByTestId('banner-info-icon')
    expect(icon).toHaveClass('size-8')
  })

  it('applies default size class when no iconSize is provided', () => {
    render(<Banner>Text</Banner>)
    const icon = screen.getByTestId('banner-info-icon')
    expect(icon).toHaveClass('size-5')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Banner ref={ref}>Test</Banner>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('DIV')
  })

  it('renders custom icon and suppresses default icon', () => {
    render(<Banner icon={<span data-testid="custom-icon">★</span>}>Text</Banner>)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('banner-info-icon')).not.toBeInTheDocument()
  })

  it('suppresses icon when icon={null}', () => {
    render(<Banner icon={null}>Text</Banner>)
    expect(screen.queryByTestId('banner-info-icon')).not.toBeInTheDocument()
  })

  it('does not render dismiss button when removable=false', () => {
    render(<Banner>Text</Banner>)
    expect(screen.queryByTestId('banner-remove-btn')).not.toBeInTheDocument()
  })

  it('renders dismiss button when removable=true', () => {
    render(<Banner removable>Text</Banner>)
    expect(screen.getByTestId('banner-remove-btn')).toBeInTheDocument()
  })

  it('calls onRemove when dismiss button is clicked', () => {
    const onRemove = jest.fn()
    render(
      <Banner removable onRemove={onRemove}>
        Text
      </Banner>,
    )
    fireEvent.click(screen.getByTestId('banner-remove-btn'))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('forwards arbitrary HTML attributes to the div', () => {
    render(<Banner data-custom="value">Text</Banner>)
    const banner = screen.getByTestId('banner-info')
    expect(banner).toHaveAttribute('data-custom', 'value')
  })
})
