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

    // values shown at bottom
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('80')).toBeInTheDocument()
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

    const { container } = render(
      <RangeSlider min={0} max={100} valueMin={10} valueMax={90} onChange={handleChange} />,
    )

    const track = screen.getByTestId('range-track')
    expect(track).toBeTruthy()

    mockTrackWidth(track, 1000) // simulate 1000px wide slider

    // Click at 200px → closer to min thumb
    fireEvent.mouseDown(track, { clientX: 200 })

    // rawVal at 200px = 20
    expect(handleChange).toHaveBeenCalledWith(20, 90)
  })

  test('dragging the min thumb triggers onChange with new values', () => {
    const handleChange = jest.fn()

    const { container } = render(
      <RangeSlider min={0} max={100} valueMin={30} valueMax={90} onChange={handleChange} />,
    )

    const minThumb = screen.getByTestId('thumb-min')

    const track = screen.getByTestId('range-track')
    mockTrackWidth(track, 1000)

    // start drag
    fireEvent.pointerDown(minThumb, { clientX: 300 })

    // drag to 100px
    fireEvent.pointerMove(window, { clientX: 100 })

    // rawVal at 100px = 10
    expect(handleChange).toHaveBeenCalledWith(10, 90)

    // release
    fireEvent.pointerUp(window)
  })

  test('dragging the max thumb works', () => {
    const handleChange = jest.fn()

    const { container } = render(
      <RangeSlider min={0} max={100} valueMin={20} valueMax={60} onChange={handleChange} />,
    )

    const maxThumb = screen.getByTestId('thumb-max')

    const track = screen.getByTestId('range-track')
    mockTrackWidth(track, 1000)

    // start drag on max thumb
    fireEvent.pointerDown(maxThumb, {
      clientX: 600,
      pointerId: 1,
    })

    // drag to 900px → ~90
    fireEvent.pointerMove(window, {
      clientX: 900,
      pointerId: 1,
    })

    expect(handleChange).toHaveBeenCalledWith(20, 90)

    fireEvent.pointerUp(window, { pointerId: 1 })
  })

  test('thumbs cannot cross each other (min stops before max)', () => {
    const handleChange = jest.fn()

    const { container } = render(
      <RangeSlider min={0} max={100} valueMin={30} valueMax={40} onChange={handleChange} />,
    )

    const minThumb = screen.getByTestId('thumb-min')

    const track = screen.getByTestId('range-track')
    mockTrackWidth(track, 1000)

    // Start dragging min thumb
    fireEvent.pointerDown(minThumb, {
      clientX: 300,
      pointerId: 1,
    })

    // Now drag far right → attempt to cross max
    fireEvent.pointerMove(window, {
      clientX: 1000,
      pointerId: 1,
    })

    fireEvent.pointerUp(window, { pointerId: 1 })

    // min should stop at max-1 = 39
    expect(handleChange).toHaveBeenCalledWith(39, 40)
  })
})
