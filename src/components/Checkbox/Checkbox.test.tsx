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

  it('uses provided id, or defaults to generated id', () => {
    render(<Checkbox label="Test" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.id).toBeTruthy() // generated id
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

  it('supports uncontrolled toggling', () => {
    render(<Checkbox defaultChecked={false} />)
    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
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
    expect(checkbox).not.toBeChecked() // must stay same
  })

  it('renders error message', () => {
    render(<Checkbox error="Required field" />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('merges className into input', () => {
    render(<Checkbox className="custom-input" />)
    expect(screen.getByRole('checkbox')).toHaveClass('custom-input')
  })

  it('applies wrapperClass', () => {
    render(<Checkbox wrapperClass="wrapper-x" label="X" />)
    const wrapper = screen.getByText('X').closest('div')?.parentElement
    expect(wrapper).toHaveClass('wrapper-x')
  })

  it('applies containerClass', () => {
    render(<Checkbox containerClass="c-x" label="X" />)
    const container = screen.getByText('X').closest('.c-x')
    expect(container).toBeInTheDocument()
  })

  it('applies labelClass', () => {
    render(<Checkbox label="Label" labelClass="lc" />)
    expect(screen.getByText('Label')).toHaveClass('lc')
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

  it('does not leak custom props to DOM', () => {
    render(
      <Checkbox
        label="X"
        wrapperClass="wrap"
        containerClass="con"
        labelClass="lbl"
        error="bad"
        data-testid="cb"
      />,
    )

    const cb = screen.getByTestId('cb')

    expect(cb).not.toHaveAttribute('wrapperClass')
    expect(cb).not.toHaveAttribute('containerClass')
    expect(cb).not.toHaveAttribute('labelClass')
    expect(cb).not.toHaveAttribute('error')
  })

  it('shows SVG checkmark only when checked (opacity class)', () => {
    const { container } = render(<Checkbox label="x" />)

    const svgWrapper = container.querySelector('span.absolute')
    expect(svgWrapper).toHaveClass('opacity-0')

    fireEvent.click(screen.getByRole('checkbox'))
    expect(svgWrapper).toHaveClass('peer-checked:opacity-100')
  })
})
