import React, { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { TextContent } from './TextContent'

describe('<TextContent />', () => {
  test('renders children', () => {
    render(<TextContent>Hello World</TextContent>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  test('forwards ref to span element', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<TextContent ref={ref}>Ref Text</TextContent>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('SPAN')
  })

  test('merges custom className', () => {
    render(<TextContent className="custom-class">Hi</TextContent>)
    const el = screen.getByText('Hi')

    expect(el).toHaveClass('custom-class')
  })

  test('applies xsmall class', () => {
    render(<TextContent xsmall>Text</TextContent>)
    const el = screen.getByText('Text')

    expect(el.className).toMatch(/text-xs\/5/)
  })

  test('applies small class', () => {
    render(<TextContent small>Text</TextContent>)
    const el = screen.getByText('Text')

    expect(el.className).toMatch(/text-sm\/6/)
  })

  test('applies strong class', () => {
    render(<TextContent strong>Strong Text</TextContent>)
    expect(screen.getByText('Strong Text')).toHaveClass('font-semibold')
  })

  test('applies muted class', () => {
    render(<TextContent muted>Muted</TextContent>)
    expect(screen.getByText('Muted')).toHaveClass('text-[var(--ui-text-muted)]')
  })

  test('applies error class', () => {
    render(<TextContent error>Error Msg</TextContent>)
    const el = screen.getByText('Error Msg')

    expect(el.className).toMatch(/text-\[var\(--ui-text-danger\)\]/)
  })

  test('forwards native span HTML attributes', () => {
    render(
      <TextContent data-testid="tc" title="tooltip" aria-label="label">
        Info
      </TextContent>,
    )

    const el = screen.getByTestId('tc')

    expect(el).toHaveAttribute('title', 'tooltip')
    expect(el).toHaveAttribute('aria-label', 'label')
  })
})
