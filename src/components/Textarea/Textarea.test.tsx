import React, { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from './Textarea'

describe('<Textarea />', () => {
  test('renders textarea element', () => {
    render(<Textarea name="message" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('renders label when provided', () => {
    render(<Textarea label="Description" name="desc" />)
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  test('renders label hint', () => {
    render(<Textarea label="Notes" labelHint={<span>Hint</span>} name="notes" />)
    expect(screen.getByText('Hint')).toBeInTheDocument()
  })

  test('forwards ref', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} name="test" />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('TEXTAREA')
  })

  test('applies custom className', () => {
    render(<Textarea name="a" className="custom-textarea" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-textarea')
  })

  test('applies containerClass', () => {
    render(<Textarea name="t" containerClass="my-container" />)
    expect(screen.getByRole('textbox').closest('.group')).toHaveClass('my-container')
  })

  test('renders leftGroup and applies padding', () => {
    render(<Textarea name="x" leftGroup={<span data-testid="left">L</span>} />)

    expect(screen.getByTestId('left')).toBeInTheDocument()

    // textarea should have left padding class
    expect(screen.getByRole('textbox').className).toMatch(/ps-10/)
  })

  test('renders rightGroup and applies padding', () => {
    render(<Textarea name="x" rightGroup={<span data-testid="right">R</span>} />)

    expect(screen.getByTestId('right')).toBeInTheDocument()
    expect(screen.getByRole('textbox').className).toMatch(/pe-10/)
  })

  test('applies error styles when error is provided', () => {
    render(<Textarea name="msg" error="Required" />)

    const wrapper = screen.getByRole('textbox').closest('.group')
    expect(wrapper).toHaveClass('has-error')
  })

  test('renders error message when showErrorMessage=true', () => {
    render(<Textarea name="msg" error="Required field" showErrorMessage />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  test('hides error message when showErrorMessage=false', () => {
    render(<Textarea name="msg" error="Oops" showErrorMessage={false} />)

    expect(screen.queryByText('Oops')).not.toBeInTheDocument()
  })

  test('forwards textarea attributes', () => {
    render(<Textarea name="bio" placeholder="Type..." data-testid="txt" />)

    const el = screen.getByTestId('txt')
    expect(el).toHaveAttribute('placeholder', 'Type...')
  })

  test('supports typing', async () => {
    const user = userEvent.setup()
    render(<Textarea name="bio" />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Hello world')

    expect(textarea).toHaveValue('Hello world')
  })
})
