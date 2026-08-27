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

  test('supports size scales (sm, md, lg)', () => {
    render(<Textarea name="desc" size="sm" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.className).toMatch(/px-2.5 py-1.5 text-xs/)
  })

  test('renders character count when showCount=true', () => {
    render(<Textarea name="notes" defaultValue="Sample notes" maxLength={100} showCount />)
    expect(screen.getByText('12 / 100')).toBeInTheDocument()
  })

  test('renders helperText when no error is present', () => {
    render(<Textarea name="bio" helperText="Brief bio for public profile" />)
    expect(screen.getByText('Brief bio for public profile')).toBeInTheDocument()
  })

  test('applies autoSize resize-none class', () => {
    render(<Textarea name="notes" autoSize />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.className).toMatch(/resize-none overflow-hidden/)
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

  test('supports typing', async () => {
    const user = userEvent.setup()
    render(<Textarea name="bio" />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Hello world')

    expect(textarea).toHaveValue('Hello world')
  })

  test('applies aria-invalid and aria-describedby attributes when error is provided', () => {
    render(<Textarea id="bio-field" error="Invalid bio" helperText="Tell us about yourself" />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea).toHaveAttribute('aria-describedby', 'bio-field-error')
  })
})
