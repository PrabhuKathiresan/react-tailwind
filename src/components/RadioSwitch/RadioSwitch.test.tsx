import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RadioSwitch } from './RadioSwitch'

// Mock getBoundingClientRect because it is used to compute highlight position
function mockRect(el: HTMLElement, rect: Partial<DOMRect>) {
  jest.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 0,
    width: 100,
    height: 40,
    top: 0,
    left: 0,
    bottom: 40,
    right: 100,
    toJSON: () => {},
    ...rect,
  } as DOMRect)
}

describe('RadioSwitch', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('renders all items', () => {
    render(<RadioSwitch label="Choice" selected="b" onChange={() => {}} items={['a', 'b', 'c']} />)

    expect(screen.getByText('a')).toBeInTheDocument()
    expect(screen.getByText('b')).toBeInTheDocument()
    expect(screen.getByText('c')).toBeInTheDocument()
  })

  test('renders object items with description', () => {
    render(
      <RadioSwitch
        selected="x"
        onChange={() => {}}
        items={[
          { label: 'One', value: 'x', description: 'First option' },
          { label: 'Two', value: 'y' },
        ]}
      />,
    )

    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('First option')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  test('calls onChange when selecting an item by click', () => {
    const handleChange = jest.fn()

    render(<RadioSwitch selected="a" onChange={handleChange} items={['a', 'b', 'c']} />)

    fireEvent.click(screen.getByText('b'))

    expect(handleChange).toHaveBeenCalledWith('b')
  })

  test('controlled component updates highlight position when selected changes', () => {
    const { rerender } = render(<RadioSwitch selected="a" onChange={() => {}} items={['a', 'b']} />)

    const container = screen.getByRole('radiogroup')

    const buttons = container.querySelectorAll('[data-radio-item]')

    // Mock rects for a and b
    mockRect(buttons[0] as HTMLElement, { left: 0, top: 0 })
    mockRect(buttons[1] as HTMLElement, { left: 120, top: 0 })

    // highlight element (first child)
    const highlight = container.querySelector('div')

    // Now switch selected → should reposition highlight
    rerender(<RadioSwitch selected="b" onChange={() => {}} items={['a', 'b']} />)

    expect(highlight).toHaveStyle(`transform: translate(120px, 0px)`)
  })

  test('keyboard select works (ArrowRight)', () => {
    const handleChange = jest.fn()

    render(<RadioSwitch selected="a" onChange={handleChange} items={['a', 'b', 'c']} />)

    const group = screen.getByRole('radiogroup')

    group.focus()
    fireEvent.keyDown(group, { key: 'ArrowRight' })

    expect(handleChange).toHaveBeenCalledWith('b')
  })

  test('aria-label is applied', () => {
    render(
      <RadioSwitch
        label="Payment Method"
        selected="card"
        items={['card', 'cash']}
        onChange={() => {}}
      />,
    )

    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Payment Method')
  })
})
