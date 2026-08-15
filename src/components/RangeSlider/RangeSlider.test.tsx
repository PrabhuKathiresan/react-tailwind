import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RangeSlider } from './RangeSlider'

function mockTrackWidth(el: HTMLElement, width: number) {
  jest.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    width,
    height: 20,
    left: 0,
    right: width,
    top: 0,
    bottom: 20,
    x: 0,
    y: 0,
    toJSON: () => {},
  } as any)
}

describe('RangeSlider', () => {
  test('renders label, hint, and values', () => {
    render(
      <RangeSlider
        label="Price Range"
        labelHint={<span>Hint</span>}
        min={0}
        max={100}
        valueMin={20}
        valueMax={80}
        onChange={() => {}}
      />,
    )

    expect(screen.getByText('Price Range')).toBeInTheDocument()
    expect(screen.getByText('Hint')).toBeInTheDocument()

    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('80')).toBeInTheDocument()
  })

  test('supports size scales (sm, md, lg)', () => {
    render(
      <RangeSlider min={0} max={100} valueMin={10} valueMax={90} size="sm" onChange={() => {}} />,
    )
    const minThumb = screen.getByTestId('thumb-min')
    expect(minThumb.className).toMatch(/h-4 w-4/)
  })

  test('renders step marks and helperText', () => {
    render(
      <RangeSlider
        min={0}
        max={100}
        valueMin={20}
        valueMax={80}
        marks={{ 0: '$0', 50: '$50', 100: '$100' }}
        helperText="Select minimum and maximum budget"
        onChange={() => {}}
      />,
    )

    expect(screen.getByText('$0')).toBeInTheDocument()
    expect(screen.getByText('$50')).toBeInTheDocument()
    expect(screen.getByText('$100')).toBeInTheDocument()
    expect(screen.getByText('Select minimum and maximum budget')).toBeInTheDocument()
  })

  test('supports keyboard navigation on thumbs', () => {
    const handleChange = jest.fn()
    render(
      <RangeSlider
        min={0}
        max={100}
        step={5}
        valueMin={20}
        valueMax={80}
        onChange={handleChange}
      />,
    )

    const minThumb = screen.getByTestId('thumb-min')
    fireEvent.keyDown(minThumb, { key: 'ArrowRight' })
    expect(handleChange).toHaveBeenCalledWith(25, 80)
  })

  test('shows error message', () => {
    render(
      <RangeSlider
        min={0}
        max={100}
        valueMin={20}
        valueMax={80}
        onChange={() => {}}
        error="Invalid range"
      />,
    )

    expect(screen.getByText('Invalid range')).toBeInTheDocument()
  })

  test('clicking on track moves the nearest thumb', () => {
    const handleChange = jest.fn()

    render(<RangeSlider min={0} max={100} valueMin={10} valueMax={90} onChange={handleChange} />)

    const track = screen.getByTestId('range-track')
    expect(track).toBeTruthy()

    mockTrackWidth(track, 1000)

    fireEvent.mouseDown(track, { clientX: 200 })
    expect(handleChange).toHaveBeenCalledWith(20, 90)
  })
})
