import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RangeInput } from './RangeInput'

describe('RangeInput', () => {
  test('renders label and slider', () => {
    render(<RangeInput id="range" label="Volume" value={50} onChange={() => {}} />)

    expect(screen.getByText('Volume')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  test('displays value and suffix', () => {
    render(<RangeInput id="range" value={30} valueSuffix="%" showValue onChange={() => {}} />)

    expect(screen.getByText('30%')).toBeInTheDocument()
  })

  test('applies min and max attributes', () => {
    render(<RangeInput id="range" min={0} max={200} value={100} onChange={() => {}} />)

    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '200')
  })

  test('fires onChange when sliding', () => {
    const handleChange = jest.fn()

    render(<RangeInput id="range" value={40} onChange={handleChange} />)

    const slider = screen.getByRole('slider')

    fireEvent.change(slider, { target: { value: '60' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('renders error message when provided', () => {
    render(<RangeInput id="range" value={50} error="Invalid" onChange={() => {}} />)

    expect(screen.getByText('Invalid')).toBeInTheDocument()
  })

  test('hides value when showValue=false', () => {
    render(<RangeInput id="range" value={70} showValue={false} onChange={() => {}} />)

    expect(screen.queryByText('70')).not.toBeInTheDocument()
  })

  test('renders label hint when provided', () => {
    render(
      <RangeInput
        id="range"
        value={25}
        label="Opacity"
        labelHint={<span data-testid="hint">Hint</span>}
        onChange={() => {}}
      />,
    )

    expect(screen.getByTestId('hint')).toBeInTheDocument()
  })
})
