import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RadioGroup } from './RadioGroup'

describe('RadioGroup', () => {
  test('renders label and radios', () => {
    render(
      <RadioGroup
        name="food"
        label="Pick one"
        options={['Apple', 'Banana', 'Cherry']}
        onChange={() => {}}
      />,
    )

    expect(screen.getByText('Pick one')).toBeInTheDocument()
    expect(screen.getByLabelText('Apple')).toBeInTheDocument()
    expect(screen.getByLabelText('Banana')).toBeInTheDocument()
    expect(screen.getByLabelText('Cherry')).toBeInTheDocument()
  })

  test('renders object-based options', () => {
    const options = [
      { label: 'Small', value: 's' },
      { label: 'Medium', value: 'm' },
      { label: 'Large', value: 'l' },
    ]

    render(<RadioGroup name="size" options={options} onChange={() => {}} />)

    expect(screen.getByLabelText('Small')).toBeInTheDocument()
    expect(screen.getByLabelText('Medium')).toBeInTheDocument()
    expect(screen.getByLabelText('Large')).toBeInTheDocument()
  })

  test('checked radio reflects selected value', () => {
    render(
      <RadioGroup
        name="drink"
        value="tea"
        options={['coffee', 'tea', 'juice']}
        onChange={() => {}}
      />,
    )

    expect(screen.getByLabelText('tea')).toBeChecked()
    expect(screen.getByLabelText('coffee')).not.toBeChecked()
  })

  test('calls onChange when radio is selected', () => {
    const handleChange = jest.fn()

    render(<RadioGroup name="pet" value="dog" options={['dog', 'cat']} onChange={handleChange} />)

    fireEvent.click(screen.getByLabelText('cat'))

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange.mock.calls[0][0].target.value).toBe('cat')
  })

  test('renders in row layout when row={true}', () => {
    const { container } = render(
      <RadioGroup name="colors" row options={['Red', 'Blue']} onChange={() => {}} />,
    )

    const wrapper = container.querySelector('div.flex')
    expect(wrapper).toHaveClass('flex-row')
    expect(wrapper).not.toHaveClass('flex-col')
  })

  test('renders in column layout by default', () => {
    const { container } = render(
      <RadioGroup name="colors" options={['Red', 'Blue']} onChange={() => {}} />,
    )

    const wrapper = container.querySelector('div.flex')
    expect(wrapper).toHaveClass('flex-col')
  })

  test('renders error message', () => {
    render(
      <RadioGroup
        name="fruit"
        options={['Apple']}
        error="Required field"
        showErrorMessage
        onChange={() => {}}
      />,
    )

    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  test('does not show error message when showErrorMessage={false}', () => {
    render(
      <RadioGroup
        name="fruit"
        options={['Apple']}
        error="Required field"
        showErrorMessage={false}
        onChange={() => {}}
      />,
    )

    expect(screen.queryByText('Required field')).toBeNull()
  })

  test('renders label hint if provided', () => {
    render(
      <RadioGroup
        name="plan"
        label="Select plan"
        labelHint={<span data-testid="hint">Hint here</span>}
        options={['Basic']}
        onChange={() => {}}
      />,
    )

    expect(screen.getByTestId('hint')).toBeInTheDocument()
  })
})
