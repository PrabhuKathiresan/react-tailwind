import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PinInput } from './PinInput'

describe('PinInput', () => {
  test('renders specified length of digit input boxes', () => {
    render(<PinInput length={4} />)

    expect(screen.getByTestId('pin-input-container')).toBeInTheDocument()
    expect(screen.getByTestId('pin-input-box-0')).toBeInTheDocument()
    expect(screen.getByTestId('pin-input-box-1')).toBeInTheDocument()
    expect(screen.getByTestId('pin-input-box-2')).toBeInTheDocument()
    expect(screen.getByTestId('pin-input-box-3')).toBeInTheDocument()
    expect(screen.queryByTestId('pin-input-box-4')).not.toBeInTheDocument()
  })

  test('handles digit input and triggers onComplete when full', () => {
    const onChangeMock = jest.fn()
    const onCompleteMock = jest.fn()

    render(<PinInput length={4} onChange={onChangeMock} onComplete={onCompleteMock} />)

    const box0 = screen.getByTestId('pin-input-box-0')
    const box1 = screen.getByTestId('pin-input-box-1')
    const box2 = screen.getByTestId('pin-input-box-2')
    const box3 = screen.getByTestId('pin-input-box-3')

    fireEvent.change(box0, { target: { value: '1' } })
    fireEvent.change(box1, { target: { value: '2' } })
    fireEvent.change(box2, { target: { value: '3' } })
    fireEvent.change(box3, { target: { value: '4' } })

    expect(onChangeMock).toHaveBeenLastCalledWith('1234')
    expect(onCompleteMock).toHaveBeenCalledWith('1234')
  })

  test('handles clipboard paste of full verification code', () => {
    const onChangeMock = jest.fn()
    const onCompleteMock = jest.fn()

    render(<PinInput length={6} onChange={onChangeMock} onComplete={onCompleteMock} />)

    const box0 = screen.getByTestId('pin-input-box-0')
    fireEvent.paste(box0, {
      clipboardData: {
        getData: () => '849201',
      },
    })

    expect(onChangeMock).toHaveBeenCalledWith('849201')
    expect(onCompleteMock).toHaveBeenCalledWith('849201')
  })

  test('renders password mask mode for security passcodes', () => {
    render(<PinInput length={4} mask={true} />)

    const box0 = screen.getByTestId('pin-input-box-0')
    expect(box0).toHaveAttribute('type', 'password')
  })

  test('renders error state and message', () => {
    render(<PinInput length={4} error="Invalid OTP code" />)

    expect(screen.getByTestId('pin-input-error')).toHaveTextContent('Invalid OTP code')
  })
})
