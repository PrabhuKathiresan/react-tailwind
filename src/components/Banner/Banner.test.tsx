import React from 'react'
import { render, screen } from '@testing-library/react'
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
    render(<Banner iconSize={8}>Text</Banner>)
    const icon = screen.getByTestId('banner-info-icon') // default type = info
    expect(icon).toHaveClass('size-8')
  })

  it('applies default size class when no iconSize is provided', () => {
    render(<Banner>Text</Banner>)
    const icon = screen.getByTestId('banner-info-icon')
    expect(icon).toHaveClass('size-5') // default is 5
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Banner ref={ref}>Test</Banner>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('DIV')
  })
})
