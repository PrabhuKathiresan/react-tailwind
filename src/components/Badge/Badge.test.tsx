import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge Component', () => {
  it('renders children content', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies correct theme class', () => {
    const themes = ['success', 'danger', 'warning', 'info', 'secondary'] as const

    themes.forEach((theme) => {
      render(<Badge theme={theme}>Test</Badge>)
      const badge = screen.getByTestId(`badge-${theme}`)
      expect(badge).toBeInTheDocument()
    })
  })

  it('applies custom className', () => {
    render(<Badge className="custom-class">Test</Badge>)
    const badge = screen.getByTestId('badge-info')
    expect(badge).toHaveClass('custom-class')
  })

  it('renders rounded-full when rounded=true', () => {
    render(<Badge rounded>Test</Badge>)
    const badge = screen.getByTestId('badge-info')
    expect(badge).toHaveClass('rounded-full')
  })

  it('renders rounded-md when rounded=false', () => {
    render(<Badge rounded={false}>Test</Badge>)
    const badge = screen.getByTestId('badge-info')
    expect(badge).toHaveClass('rounded-md')
  })

  it('does NOT render remove icon when removable=false', () => {
    render(<Badge>Test</Badge>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders remove icon when removable=true', () => {
    render(<Badge removable>Test</Badge>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onRemove when remove icon is clicked', () => {
    const onRemove = jest.fn()
    render(
      <Badge removable onRemove={onRemove}>
        Test
      </Badge>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(<Badge ref={ref}>Test</Badge>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('SPAN')
  })
})
