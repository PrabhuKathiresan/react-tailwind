import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox Component', () => {
  it('renders the checkbox input', () => {
    render(<Checkbox />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('renders the label when provided', () => {
    render(<Checkbox label="Accept Terms" />)
    expect(screen.getByText('Accept Terms')).toBeInTheDocument()
  })

  it('renders description subtext when provided', () => {
    render(<Checkbox label="Notifications" description="Receive daily email summaries" />)
    expect(screen.getByText('Receive daily email summaries')).toBeInTheDocument()
  })

  it('uses provided id, or defaults to generated id', () => {
    render(<Checkbox label="Test" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.id).toBeTruthy()
  })

  it('uses provided id when given', () => {
    render(<Checkbox id="check-1" label="Test" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'check-1')
  })

  it('clicking label toggles the checkbox', () => {
    render(<Checkbox id="test" label="Click Me" />)

    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Click Me')

    expect(checkbox).not.toBeChecked()

    fireEvent.click(label)
    expect(checkbox).toBeChecked()
  })

  it('supports controlled mode (checked)', () => {
    render(<Checkbox checked={true} onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('supports controlled mode (unchecked)', () => {
    render(<Checkbox checked={false} onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('supports indeterminate state and sets HTMLInputElement.indeterminate to true', () => {
    render(<Checkbox label="Select All" indeterminate />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.indeterminate).toBe(true)
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
  })

  it('supports card variant layout', () => {
    const { container } = render(<Checkbox label="Option Card" variant="card" />)
    const cardWrapper = container.querySelector('.rounded-xl.border')
    expect(cardWrapper).toBeInTheDocument()
  })

  it('supports size scales (sm, md, lg)', () => {
    render(<Checkbox label="Small" size="sm" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass('size-3.5')
  })

  it('applies disabled state', () => {
    render(<Checkbox disabled label="Disabled" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('prevents clicking label when disabled', () => {
    render(<Checkbox disabled label="Disabled" />)

    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Disabled')

    expect(checkbox).not.toBeChecked()
    fireEvent.click(label)
    expect(checkbox).not.toBeChecked()
  })

  it('renders error message', () => {
    render(<Checkbox error="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('renders helperText when no error is present', () => {
    render(<Checkbox helperText="Optional configuration" />)
    expect(screen.getByText('Optional configuration')).toBeInTheDocument()
  })

  it('merges className into input', () => {
    render(<Checkbox className="custom-input" />)
    expect(screen.getByRole('checkbox')).toHaveClass('custom-input')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Checkbox ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('sets aria-checked correctly', () => {
    render(<Checkbox checked={true} onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })
})
