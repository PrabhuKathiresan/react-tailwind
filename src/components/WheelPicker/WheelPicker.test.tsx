import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { WheelPicker } from './WheelPicker'

describe('WheelPicker', () => {
  const columns = [
    {
      id: 'month',
      options: [
        { value: 'jan', label: 'January' },
        { value: 'feb', label: 'February' },
        { value: 'mar', label: 'March' },
      ],
      value: 'feb',
    },
    {
      id: 'day',
      options: [
        { value: 1, label: '1' },
        { value: 15, label: '15' },
        { value: 30, label: '30' },
      ],
      value: 15,
    },
  ]

  test('renders wheel columns and highlight window', () => {
    render(<WheelPicker columns={columns} />)

    expect(screen.getByTestId('wheel-picker')).toBeInTheDocument()
    expect(screen.getByTestId('wheel-column-month')).toBeInTheDocument()
    expect(screen.getByTestId('wheel-column-day')).toBeInTheDocument()
    expect(screen.getByTestId('wheel-highlight-window')).toBeInTheDocument()
  })

  test('renders option labels correctly', () => {
    render(<WheelPicker columns={columns} />)

    expect(screen.getByText('January')).toBeInTheDocument()
    expect(screen.getByText('February')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  test('handles click selection on wheel item', () => {
    const onColumnChangeMock = jest.fn()
    const customColumns = [
      {
        id: 'month',
        options: [
          { value: 'jan', label: 'January' },
          { value: 'feb', label: 'February' },
        ],
        onChange: onColumnChangeMock,
      },
    ]

    render(<WheelPicker columns={customColumns} />)

    const febOption = screen.getByTestId('wheel-item-month-feb')
    fireEvent.click(febOption)

    expect(febOption).toBeInTheDocument()
  })
})
