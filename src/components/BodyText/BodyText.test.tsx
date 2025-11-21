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

  it('applies "muted" class when muted=true', () => {
    render(<BodyText muted>Text</BodyText>)
    const el = screen.getByText('Text')
    expect(el).toHaveClass('text-gray-500')
  })

  it('applies "error" class when error=true', () => {
    render(<BodyText error>Text</BodyText>)
    const el = screen.getByText('Text')
    expect(el).toHaveClass('text-red-500')
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
