import React from 'react'
import { render, screen } from '@testing-library/react'
import { BodyText } from './BodyText'

describe('BodyText Component', () => {
  it('renders children', () => {
    render(<BodyText>Example text</BodyText>)
    expect(screen.getByText('Example text')).toBeInTheDocument()
  })

  it('renders as <p> by default', () => {
    render(<BodyText>Text</BodyText>)
    const el = screen.getByText('Text')
    expect(el.tagName.toLowerCase()).toBe('p')
  })

  it('renders as custom tag when "as" prop is provided', () => {
    render(<BodyText as="span">Text</BodyText>)
    const el = screen.getByText('Text')
    expect(el.tagName.toLowerCase()).toBe('span')
  })

  it('applies size scale classes (xs, sm, md, lg, xl)', () => {
    const { rerender } = render(<BodyText size="xs">Text</BodyText>)
    expect(screen.getByText('Text')).toHaveClass('text-xs/5')

    rerender(<BodyText size="xl">Text</BodyText>)
    expect(screen.getByText('Text')).toHaveClass('text-xl/9')
  })

  it('applies font weight classes (light, normal, medium, semibold, bold)', () => {
    const { rerender } = render(<BodyText weight="light">Text</BodyText>)
    expect(screen.getByText('Text')).toHaveClass('font-light')

    rerender(<BodyText weight="bold">Text</BodyText>)
    expect(screen.getByText('Text')).toHaveClass('font-bold')
  })

  it('applies "small" class when small=true', () => {
    render(<BodyText small>Text</BodyText>)
    const el = screen.getByText('Text')
    expect(el).toHaveClass('text-sm/6')
  })

  it('applies "strong" class when strong=true', () => {
    render(<BodyText strong>Text</BodyText>)
    const el = screen.getByText('Text')
    expect(el).toHaveClass('font-semibold')
  })

  it('applies color intent classes (muted, error, success, warning, info)', () => {
    const { rerender } = render(<BodyText error>Text</BodyText>)
    expect(screen.getByText('Text')).toHaveClass('text-[var(--ui-text-danger)]')

    rerender(<BodyText success>Text</BodyText>)
    expect(screen.getByText('Text')).toHaveClass('text-[var(--ui-success)]')

    rerender(<BodyText warning>Text</BodyText>)
    expect(screen.getByText('Text')).toHaveClass('text-[var(--ui-warning)]')

    rerender(<BodyText info>Text</BodyText>)
    expect(screen.getByText('Text')).toHaveClass('text-[var(--ui-info)]')
  })

  it('applies align and line-clamp properties', () => {
    render(
      <BodyText align="center" clamp={2} truncate>
        Multi-line Text
      </BodyText>,
    )
    const el = screen.getByText('Multi-line Text')
    expect(el).toHaveClass('text-center', 'line-clamp-2', 'truncate')
  })

  it('applies "inline" class when inline=true', () => {
    render(<BodyText inline>Text</BodyText>)
    const el = screen.getByText('Text')
    expect(el).toHaveClass('inline-flex', 'items-center', 'gap-2')
  })

  it('merges custom className', () => {
    render(<BodyText className="my-custom-class">Text</BodyText>)
    const el = screen.getByText('Text')
    expect(el).toHaveClass('my-custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLParagraphElement>()
    render(<BodyText ref={ref}>Text</BodyText>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName.toLowerCase()).toBe('p')
  })
})
