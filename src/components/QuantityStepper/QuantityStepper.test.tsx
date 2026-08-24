import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuantityStepper } from './QuantityStepper'

describe('QuantityStepper', () => {
  it('renders correctly with initial value', () => {
    render(<QuantityStepper value={5} onChange={jest.fn()} />)
    const input = screen.getByTestId('stepper-input') as HTMLInputElement
    expect(input.value).toBe('5')
  })

  it('increments value on plus button click', () => {
    const handleChange = jest.fn()
    render(<QuantityStepper value={5} onChange={handleChange} />)
    fireEvent.click(screen.getByTestId('stepper-increment'))
    expect(handleChange).toHaveBeenCalledWith(6)
  })

  it('decrements value on minus button click', () => {
    const handleChange = jest.fn()
    render(<QuantityStepper value={5} onChange={handleChange} />)
    fireEvent.click(screen.getByTestId('stepper-decrement'))
    expect(handleChange).toHaveBeenCalledWith(4)
  })

  it('respects min boundary', () => {
    const handleChange = jest.fn()
    render(<QuantityStepper value={1} min={1} onChange={handleChange} />)
    const decBtn = screen.getByTestId('stepper-decrement')
    expect(decBtn).toBeDisabled()
  })

  it('respects max boundary', () => {
    const handleChange = jest.fn()
    render(<QuantityStepper value={10} max={10} onChange={handleChange} />)
    const incBtn = screen.getByTestId('stepper-increment')
    expect(incBtn).toBeDisabled()
  })

  it('updates value on manual input change', () => {
    const handleChange = jest.fn()
    render(<QuantityStepper value={5} onChange={handleChange} />)
    const input = screen.getByTestId('stepper-input')
    fireEvent.change(input, { target: { value: '12' } })
    expect(handleChange).toHaveBeenCalledWith(12)
  })

  it('renders label, labelHint, helperText, and error correctly', () => {
    render(
      <QuantityStepper
        value={2}
        onChange={jest.fn()}
        label="Quantity"
        labelHint="Max 10 per order"
        helperText="Enter item quantity"
        error="Invalid quantity"
      />,
    )
    expect(screen.getByText('Quantity')).toBeInTheDocument()
    expect(screen.getByText('Max 10 per order')).toBeInTheDocument()
    expect(screen.getByText('Invalid quantity')).toBeInTheDocument()
  })

  it('renders prefix and suffix elements', () => {
    render(<QuantityStepper value={3} onChange={jest.fn()} prefix="$" suffix="items" />)
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('items')).toBeInTheDocument()
  })
})
