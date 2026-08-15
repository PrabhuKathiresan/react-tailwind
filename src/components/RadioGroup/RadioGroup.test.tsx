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

  test('renders cards variant', () => {
    const options = [
      { label: 'Pro Plan', value: 'pro', description: '$29/mo' },
      { label: 'Free Plan', value: 'free', description: '$0/mo' },
    ]

    render(
      <RadioGroup name="plan" variant="cards" value="pro" options={options} onChange={() => {}} />,
    )

    expect(screen.getByText('Pro Plan')).toBeInTheDocument()
    expect(screen.getByText('$29/mo')).toBeInTheDocument()
    expect(screen.getByLabelText('Pro Plan')).toBeChecked()
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
})
