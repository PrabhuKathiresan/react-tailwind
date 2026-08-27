import { createRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input Component', () => {
  it('renders label and hint when provided', () => {
    render(<Input label="Username" labelHint={<span data-testid="hint">Hint</span>} name="user" />)

    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByTestId('hint')).toBeInTheDocument()
  })

  it('supports size scales (sm, md, lg)', () => {
    render(<Input name="user" size="sm" />)
    const input = screen.getByRole('textbox')
    expect(input.className).toMatch(/px-2.5 py-1.5 text-xs/)
  })

  it('renders prefix and suffix addons', () => {
    render(<Input name="domain" prefix="https://" suffix=".com" />)
    expect(screen.getByText('https://')).toBeInTheDocument()
    expect(screen.getByText('.com')).toBeInTheDocument()
  })

  it('renders 1-click clear button when clearable=true and text exists', () => {
    const handleClear = jest.fn()
    render(<Input name="search" clearable defaultValue="hello" onClear={handleClear} />)

    const clearButton = screen.getByTitle('Clear text')
    expect(clearButton).toBeInTheDocument()

    fireEvent.click(clearButton)
    expect(handleClear).toHaveBeenCalledTimes(1)
  })

  it('renders character count when showCount=true', () => {
    render(<Input name="title" defaultValue="hello" maxLength={20} showCount />)
    expect(screen.getByText('5 / 20')).toBeInTheDocument()
  })

  it('renders helperText when no error is present', () => {
    render(<Input name="email" helperText="We will never share your email." />)
    expect(screen.getByText('We will never share your email.')).toBeInTheDocument()
  })

  it('applies containerClass', () => {
    render(<Input name="user" containerClass="custom-box" />)

    const input = screen.getByRole('textbox')
    const wrapper = input.parentElement!.parentElement!.parentElement!

    expect(wrapper).toHaveClass('custom-box')
  })

  it('renders leftGroup content and applies padding', () => {
    render(<Input name="user" leftGroup={<span data-testid="left-icon">L</span>} />)

    expect(screen.getByTestId('left-icon')).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    expect(input.className).toMatch(/ps-10/)
  })

  it('renders rightGroup content and applies padding', () => {
    render(<Input name="user" rightGroup={<span data-testid="right-icon">R</span>} />)

    expect(screen.getByTestId('right-icon')).toBeInTheDocument()

    const input = screen.getByRole('textbox')
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
    render(<Input name="username" />)

    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'username')
  })

  it('merges custom className into input element', () => {
    render(<Input name="custom" className="my-custom-class" />)

    expect(screen.getByRole('textbox')).toHaveClass('my-custom-class')
  })

  it('applies aria-invalid and aria-describedby when error or helperText is present', () => {
    render(<Input id="test-input" error="Invalid format" helperText="Enter email" />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error')
  })
})
