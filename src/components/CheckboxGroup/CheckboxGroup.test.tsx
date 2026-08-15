import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckboxGroup } from './CheckboxGroup'

// Mock Checkbox component to test passed props cleanly
jest.mock('../Checkbox', () => ({
  Checkbox: ({ label, id, checked, value, onChange, indeterminate }: any) => (
    <label data-testid={`checkbox-${label}`}>
      <input
        type="checkbox"
        data-testid={`checkbox-input-${label}`}
        id={id}
        checked={checked}
        value={value}
        onChange={onChange}
        data-indeterminate={indeterminate ? 'true' : 'false'}
      />
      {label}
    </label>
  ),
}))

describe('CheckboxGroup Component', () => {
  it('renders string options correctly', () => {
    render(<CheckboxGroup name="fruits" options={['Apple', 'Banana']} value={[]} />)

    expect(screen.getByTestId('checkbox-Apple')).toBeInTheDocument()
    expect(screen.getByTestId('checkbox-Banana')).toBeInTheDocument()
  })

  it('renders object options correctly', () => {
    const options = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
    ]

    render(<CheckboxGroup options={options} value={[]} />)

    expect(screen.getByTestId('checkbox-input-One')).toBeInTheDocument()
    expect(screen.getByTestId('checkbox-input-Two')).toBeInTheDocument()
  })

  it('renders group label and hint', () => {
    render(
      <CheckboxGroup
        label="Select Numbers"
        labelHint="Pick at least one"
        options={['A']}
        value={[]}
      />,
    )

    expect(screen.getByText('Select Numbers')).toBeInTheDocument()
    expect(screen.getByText('Pick at least one')).toBeInTheDocument()
  })

  it('renders Select All checkbox when showSelectAll=true', () => {
    const handleChange = jest.fn()
    render(
      <CheckboxGroup
        options={['A', 'B', 'C']}
        value={['A']}
        showSelectAll
        onChange={handleChange}
      />,
    )

    const selectAllInput = screen.getByTestId('checkbox-input-Select All')
    expect(selectAllInput).toBeInTheDocument()
    expect(selectAllInput).toHaveAttribute('data-indeterminate', 'true')

    fireEvent.click(selectAllInput)
    expect(handleChange).toHaveBeenCalledWith([], expect.any(Object))
  })

  it('selects all items when clicking Select All while un-checked', () => {
    const handleChange = jest.fn()
    render(
      <CheckboxGroup options={['A', 'B', 'C']} value={[]} showSelectAll onChange={handleChange} />,
    )

    const selectAllInput = screen.getByTestId('checkbox-input-Select All')
    fireEvent.click(selectAllInput)

    expect(handleChange).toHaveBeenCalledWith(['A', 'B', 'C'], expect.any(Object))
  })

  it('applies grid column layout when columns is specified', () => {
    const { container } = render(<CheckboxGroup columns={3} options={['A', 'B', 'C']} value={[]} />)

    const gridWrapper = container.querySelector('.grid.grid-cols-1')
    expect(gridWrapper).toBeInTheDocument()
  })

  it('renders error message when error is provided', () => {
    render(<CheckboxGroup error="Please select at least one option" options={['A']} value={[]} />)
    expect(screen.getByText('Please select at least one option')).toBeInTheDocument()
  })

  it('selects a value when checkbox is checked', () => {
    const handleChange = jest.fn()

    render(<CheckboxGroup options={['A', 'B']} value={[]} onChange={handleChange} />)

    fireEvent.click(screen.getByTestId('checkbox-input-A'))

    expect(handleChange).toHaveBeenCalledWith(['A'], expect.any(Object))
  })

  it('removes a value when checkbox is unchecked', () => {
    const handleChange = jest.fn()

    render(<CheckboxGroup options={['A', 'B']} value={['A']} onChange={handleChange} />)

    fireEvent.click(screen.getByTestId('checkbox-input-A'))

    expect(handleChange).toHaveBeenCalledWith([], expect.any(Object))
  })

  it('handles multiple selections correctly', () => {
    const handleChange = jest.fn()

    render(<CheckboxGroup options={['A', 'B', 'C']} value={['A']} onChange={handleChange} />)

    fireEvent.click(screen.getByTestId('checkbox-input-B'))

    expect(handleChange).toHaveBeenCalledWith(['A', 'B'], expect.any(Object))
  })
})
