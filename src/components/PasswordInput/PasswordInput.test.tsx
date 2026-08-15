import React, { createRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PasswordInput, evaluatePasswordStrength } from './PasswordInput'

describe('PasswordInput', () => {
  test('evaluates password strength correctly', () => {
    expect(evaluatePasswordStrength('123')).toEqual({
      score: 1,
      label: 'Weak',
      colorClass: 'bg-red-500',
      percent: 25,
    })

    expect(evaluatePasswordStrength('P@ssw0rd123!')).toEqual({
      score: 4,
      label: 'Strong',
      colorClass: 'bg-emerald-500',
      percent: 100,
    })
  })

  test('renders password input with show/hide toggle button', () => {
    render(<PasswordInput id="pwd" name="password" />)

    const toggleBtn = screen.getByLabelText('Show password')
    expect(toggleBtn).toBeInTheDocument()

    const input = document.getElementById('pwd') as HTMLInputElement
    expect(input.type).toBe('password')

    fireEvent.click(toggleBtn)
    expect(input.type).toBe('text')
  })

  test('forwards ref correctly to HTMLInputElement', () => {
    const ref = createRef<HTMLInputElement>()
    render(<PasswordInput ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  test('renders password strength indicator when showStrength=true and value exists', () => {
    render(<PasswordInput showStrength defaultValue="SecretP@ss123" />)

    expect(screen.getByText('Password Strength')).toBeInTheDocument()
    expect(screen.getByText('Strong')).toBeInTheDocument()
  })
})
