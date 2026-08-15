import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SegmentedControl } from './SegmentedControl'

describe('SegmentedControl', () => {
  const options = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month', disabled: true },
  ]

  it('renders options correctly', () => {
    render(<SegmentedControl options={options} value="day" onChange={jest.fn()} />)
    expect(screen.getByText('Day')).toBeInTheDocument()
    expect(screen.getByText('Week')).toBeInTheDocument()
    expect(screen.getByText('Month')).toBeInTheDocument()
  })

  it('highlights the selected option', () => {
    render(<SegmentedControl options={options} value="week" onChange={jest.fn()} />)
    const weekBtn = screen.getByTestId('segmented-option-week')
    expect(weekBtn).toHaveAttribute('aria-selected', 'true')
  })

  it('calls onChange when clicking an option', () => {
    const handleChange = jest.fn()
    render(<SegmentedControl options={options} value="day" onChange={handleChange} />)
    fireEvent.click(screen.getByText('Week'))
    expect(handleChange).toHaveBeenCalledWith('week')
  })

  it('does not call onChange when option is disabled', () => {
    const handleChange = jest.fn()
    render(<SegmentedControl options={options} value="day" onChange={handleChange} />)
    fireEvent.click(screen.getByText('Month'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('navigates with keyboard arrow keys', () => {
    const handleChange = jest.fn()
    render(<SegmentedControl options={options} value="day" onChange={handleChange} />)
    const dayBtn = screen.getByTestId('segmented-option-day')
    fireEvent.keyDown(dayBtn, { key: 'ArrowRight' })
    expect(handleChange).toHaveBeenCalledWith('week')
  })
})
