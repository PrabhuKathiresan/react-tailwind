import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Radio } from './Radio'

describe('Radio', () => {
  test('renders the radio input', () => {
    render(<Radio name="gender" />)

    const input = screen.getByRole('radio')
    expect(input).toBeInTheDocument()
  })

  test('renders label and description when provided', () => {
    render(<Radio name="opt" label="Option A" description="Subtext info" />)

    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Subtext info')).toBeInTheDocument()
  })

  test('label is linked to input via htmlFor', () => {
    render(<Radio id="my-radio" name="opt" label="Select me" />)

    const input = screen.getByRole('radio')
    const label = screen.getByText('Select me')

    expect(label).toHaveAttribute('for', 'my-radio')
    expect(input).toHaveAttribute('id', 'my-radio')
  })

  test('checked state is applied', () => {
    render(<Radio name="foo" checked onChange={() => {}} />)

    const input = screen.getByRole('radio')
    expect(input).toBeChecked()
  })

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn()

    render(<Radio name="food" label="Pizza" onChange={handleChange} />)

    const input = screen.getByRole('radio')

    fireEvent.click(input)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('does render radio button in disabled state', () => {
    const handleChange = jest.fn()

    render(<Radio name="food" label="Pizza" disabled onChange={handleChange} />)

    const input = screen.getByRole('radio')
    expect(input).toBeDisabled()
  })

  test('renders error message when error prop is provided', () => {
    render(<Radio name="agree" error="Required field" />)

    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  test('applies custom classes', () => {
    render(
      <Radio
        name="opt"
        wrapperClass="wrapper-test"
        containerClass="container-test"
        className="radio-test"
        label="A"
        labelClass="label-test"
      />,
    )

    const input = screen.getByRole('radio')
    const container = input.closest('.container-test')
    const wrapper = container?.parentElement

    expect(wrapper).toHaveClass('wrapper-test')
    expect(container).toHaveClass('container-test')
    expect(screen.getByText('A')).toHaveClass('label-test')
    expect(input).toHaveClass('radio-test')
  })
})
