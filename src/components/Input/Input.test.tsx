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

  describe('native date and time fields', () => {
    it('gives a date field the height of a text field, and its own calendar icon', () => {
      render(<Input label="Date" id="d" type="date" />)
      const input = screen.getByLabelText('Date')
      expect(input).toHaveClass('h-10', 'appearance-none')
      expect(screen.getByTestId('input-calendar-icon')).toBeInTheDocument()
    })

    it('matches the height to the size', () => {
      render(<Input label="Date" id="d" type="date" size="lg" />)
      expect(screen.getByLabelText('Date')).toHaveClass('h-12')
    })

    it('lets a tap on the icon reach the field', () => {
      render(<Input label="Date" id="d" type="date" />)
      expect(screen.getByTestId('input-calendar-icon').parentElement).toHaveClass(
        'pointer-events-none',
      )
    })

    it('keeps a right group the caller passes', () => {
      render(<Input label="Date" id="d" type="date" rightGroup={<span>Today</span>} />)
      expect(screen.getByText('Today')).toBeInTheDocument()
      expect(screen.queryByTestId('input-calendar-icon')).not.toBeInTheDocument()
    })

    it('draws no calendar on a time field', () => {
      render(<Input label="Time" id="t" type="time" />)
      expect(screen.getByLabelText('Time')).toHaveClass('h-10')
      expect(screen.queryByTestId('input-calendar-icon')).not.toBeInTheDocument()
    })

    it('leaves a text field alone', () => {
      render(<Input label="Name" id="n" />)
      expect(screen.getByLabelText('Name')).not.toHaveClass('appearance-none')
      expect(screen.queryByTestId('input-calendar-icon')).not.toBeInTheDocument()
    })
  })

  it('names the field by its label even without an id or name', () => {
    render(
      <>
        <Input label="Month" type="month" />
        <Input label="Year" type="number" />
      </>,
    )
    expect(screen.getByLabelText('Month')).toHaveAttribute('type', 'month')
    expect(screen.getByLabelText('Year')).toHaveAttribute('type', 'number')
  })
})
