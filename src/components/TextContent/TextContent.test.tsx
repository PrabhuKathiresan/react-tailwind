import React, { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { TextContent } from './TextContent'

describe('<TextContent />', () => {
  test('renders children', () => {
    render(<TextContent>Hello World</TextContent>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  test('renders custom tag when as prop is passed', () => {
    render(<TextContent as="code">const x = 1</TextContent>)
    const el = screen.getByText('const x = 1')
    expect(el.tagName.toLowerCase()).toBe('code')
  })

  test('forwards ref to element', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<TextContent ref={ref}>Ref Text</TextContent>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('SPAN')
  })

  test('applies monospace and truncate classes', () => {
    render(
      <TextContent monospace truncate>
        12345
      </TextContent>,
    )
    const el = screen.getByText('12345')
    expect(el).toHaveClass('font-mono', 'truncate')
  })

  test('applies size scale and weight props', () => {
    const { rerender } = render(
      <TextContent size="lg" weight="bold">
        Text
      </TextContent>,
    )
    const el = screen.getByText('Text')
    expect(el).toHaveClass('text-lg/8', 'font-bold')

    rerender(<TextContent xsmall>Text</TextContent>)
    expect(screen.getByText('Text')).toHaveClass('text-xs/5')
  })

  test('applies color intent classes (muted, error, success, warning, info)', () => {
    const { rerender } = render(<TextContent error>Error Msg</TextContent>)
    expect(screen.getByText('Error Msg')).toHaveClass('text-[var(--ui-text-danger)]')

    rerender(<TextContent success>Success Msg</TextContent>)
    expect(screen.getByText('Success Msg')).toHaveClass('text-[var(--ui-success)]')
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
