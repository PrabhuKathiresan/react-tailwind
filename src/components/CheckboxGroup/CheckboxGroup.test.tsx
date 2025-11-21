import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CheckboxGroup } from './CheckboxGroup'

// Mock Checkbox component to test passed props clearly
jest.mock('../Checkbox', () => ({
  Checkbox: ({ label, id, checked, value, onChange }: any) => (
    <label data-testid={`checkbox-${label}`}>
      <input
        type="checkbox"
        data-testid={`checkbox-input-${label}`}
        id={id}
        checked={checked}
        value={value}
        onChange={onChange}
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

  it('applies containerClass', () => {
    render(<CheckboxGroup containerClass="my-custom-class" options={['A']} value={[]} />)

    const wrapper = screen.getByText('A').closest('div')!.parentElement
    expect(wrapper).toHaveClass('my-custom-class')
  })

  it('renders checkboxes inline when inline=true', () => {
    render(<CheckboxGroup inline options={['A', 'B']} value={[]} />)

    const checkbox = screen.getByTestId('checkbox-A')

    const inlineWrapper = checkbox.closest('div.flex')

    expect(inlineWrapper).not.toBeNull()
    expect(inlineWrapper!.className).toMatch(/flex-wrap/)
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

  it('supports complex typed values (generic)', () => {
    const options = [
      { label: 'Item 1', value: { id: 1 } },
      { label: 'Item 2', value: { id: 2 } },
    ]

    const handleChange = jest.fn()

    render(<CheckboxGroup options={options} value={[options[0].value]} onChange={handleChange} />)

    fireEvent.click(screen.getByTestId('checkbox-input-Item 1'))

    expect(handleChange).toHaveBeenCalled()
  })

  it('assigns unique ids using useId()', () => {
    render(<CheckboxGroup options={['A']} value={[]} name="test" />)

    const input = screen.getByTestId('checkbox-input-A')

    expect(input.id).toBeTruthy()
    expect(input.id).toContain('A') // suffix is preserved
    expect(typeof input.id).toBe('string')
  })
})
