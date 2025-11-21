import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PasswordInput, PASSWORD_TYPE, PASSWORD_PLACEHOLDER } from './PasswordInput'

// --- Mock Input to simplify testing ---
jest.mock('../Input', () => ({
  Input: ({ rightGroup, ...props }: any) => (
    <div>
      <input data-testid="password-input" {...props} />
      <div data-testid="right-group">{rightGroup}</div>
    </div>
  ),
}))

// Mock Button so we can interact easily
jest.mock('../Button', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="toggle-btn" {...props}>
      {children}
    </button>
  ),
}))

describe('PasswordInput', () => {
  test('renders an input with default password type', () => {
    render(<PasswordInput />)

    const input = screen.getByTestId('password-input')
    expect(input).toHaveAttribute('type', PASSWORD_TYPE)
  })

  test('uses fixed password placeholder', () => {
    render(<PasswordInput placeholder="should-ignore" />)

    const input = screen.getByTestId('password-input')
    expect(input).toHaveAttribute('placeholder', PASSWORD_PLACEHOLDER)
  })

  test('toggles between password and text type on button click', () => {
    render(<PasswordInput />)

    const input = screen.getByTestId('password-input')
    const toggle = screen.getByTestId('toggle-btn')

    // Initially password
    expect(input).toHaveAttribute('type', PASSWORD_TYPE)

    // Click once → show password
    fireEvent.click(toggle)
    expect(input).toHaveAttribute('type', 'text')

    // Click again → hide password
    fireEvent.click(toggle)
    expect(input).toHaveAttribute('type', PASSWORD_TYPE)
  })

  test('renders eye icon when hidden and eye-off icon when visible', () => {
    render(<PasswordInput />)

    const toggle = screen.getByTestId('toggle-btn')

    // Initially eye icon is shown
    expect(toggle.innerHTML).toContain('svg')

    // After click → eye-off icon is shown
    fireEvent.click(toggle)
    expect(toggle.innerHTML).toContain('svg')
  })

  test('forwards other input props', () => {
    render(<PasswordInput id="pwd" name="password" className="custom" />)

    const input = screen.getByTestId('password-input')

    expect(input).toHaveAttribute('id', 'pwd')
    expect(input).toHaveAttribute('name', 'password')
    expect(input).toHaveClass('custom')
  })

  test('does not break when initial type or placeholder are passed (they are ignored)', () => {
    render(<PasswordInput type="text" placeholder="abc" />)

    const input = screen.getByTestId('password-input')

    // Component enforces these values
    expect(input).toHaveAttribute('type', PASSWORD_TYPE)
    expect(input).toHaveAttribute('placeholder', PASSWORD_PLACEHOLDER)
  })
})
