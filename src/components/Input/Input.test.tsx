import { createRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input Component', () => {
  it('renders label and hint when provided', () => {
    render(<Input label="Username" labelHint={<span data-testid="hint">Hint</span>} name="user" />)

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByTestId('hint')).toBeInTheDocument()
  })

  it('applies containerClass', () => {
    render(<Input name="user" containerClass="custom-box" />)

    const input = screen.getByRole('textbox')
    // outer wrapper is two levels above <input>
    const wrapper = input.parentElement!.parentElement!

    expect(wrapper).toHaveClass('custom-box')
  })

  it('renders leftGroup content and applies padding', () => {
    render(<Input name="user" leftGroup={<span data-testid="left-icon">L</span>} />)

    expect(screen.getByTestId('left-icon')).toBeInTheDocument()

    const input = screen.getByRole('textbox')

    // ps-10 padding added
    expect(input.className).toMatch(/ps-10/)
  })

  it('renders rightGroup content and applies padding', () => {
    render(<Input name="user" rightGroup={<span data-testid="right-icon">R</span>} />)

    expect(screen.getByTestId('right-icon')).toBeInTheDocument()

    const input = screen.getByRole('textbox')

    // pe-10 padding added
    expect(input.className).toMatch(/pe-10/)
  })

  it('renders both left and right groups and applies both paddings', () => {
    render(<Input name="user" leftGroup={<span>L</span>} rightGroup={<span>R</span>} />)

    const input = screen.getByRole('textbox')
    expect(input.className).toMatch(/ps-10/)
    expect(input.className).toMatch(/pe-10/)
  })

  it('displays error message when error is passed', () => {
    render(<Input name="email" error="Required field" />)

    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('does NOT show error message when showErrorMessage=false', () => {
    render(<Input name="email" error="Required" showErrorMessage={false} />)

    expect(screen.queryByText('Required')).not.toBeInTheDocument()
  })

  it("adds 'has-error' class when error exists", () => {
    render(<Input name="email" error="Err" />)

    const wrapper = screen.getByRole('textbox').closest('.group')
    expect(wrapper).toHaveClass('has-error')
  })

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input name="test" ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('supports input event handlers', () => {
    const handleChange = jest.fn()

    render(<Input name="age" onChange={handleChange} />)

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: '10' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('sets id based on name when no id is provided', () => {
    render(<Input name="email" />)

    const input = screen.getByRole('textbox')
    expect(input.id).toBe('email')
  })

  it('respects autoComplete prop', () => {
    render(<Input name="email" autoComplete="on" />)

    const input = screen.getByRole('textbox')
    expect(input.getAttribute('autocomplete')).toBe('on')
  })

  it('uses default autoComplete=off when not set', () => {
    render(<Input name="email" />)

    const input = screen.getByRole('textbox')
    expect(input.getAttribute('autocomplete')).toBe('off')
  })

  it('merges custom className into input element', () => {
    render(<Input name="user" className="border-red-500" />)

    const input = screen.getByRole('textbox')

    expect(input.className).toMatch(/border-red-500/)
  })
})
