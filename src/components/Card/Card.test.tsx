import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card Component', () => {
  it('renders children', () => {
    render(<Card>Content</Card>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders as a div by default', () => {
    render(<Card>Default</Card>)
    const el = screen.getByText('Default')
    expect(el.tagName.toLowerCase()).toBe('div')
  })

  it('renders as a custom HTML element via "as"', () => {
    render(<Card as="section">Section</Card>)
    const el = screen.getByText('Section')
    expect(el.tagName.toLowerCase()).toBe('section')
  })

  it('renders as a custom React component', () => {
    const Custom = ({ children }: { children: React.ReactNode }) => (
      <span data-testid="custom">{children}</span>
    )
    render(<Card as={Custom}>Inside Custom</Card>)
    expect(screen.getByTestId('custom')).toBeInTheDocument()
  })

  it('applies hoverable styles', () => {
    render(<Card hoverable>Hover Card</Card>)
    const el = screen.getByText('Hover Card')
    expect(el.className).toMatch(/transition-background/)
    expect(el.className).toMatch(/hover:bg-gray-100/)
    expect(el.className).toMatch(/dark:hover:bg-gray-800/)
  })

  it('applies bordered styles', () => {
    render(<Card bordered>Border Card</Card>)
    const el = screen.getByText('Border Card')
    expect(el.className).toMatch(/border-\[var\(--ui-border\)\]/)
  })

  it('applies padding by default', () => {
    render(<Card>Padding</Card>)
    const el = screen.getByText('Padding')
    expect(el.className).toMatch(/p-6/)
  })

  it('applies compact padding when compact=true', () => {
    render(<Card compact>No Pad</Card>)
    const el = screen.getByText('No Pad')
    expect(el.className).toMatch(/p-2/)
  })

  it('removes padding when zeroPadding=true', () => {
    render(<Card zeroPadding>No Pad</Card>)
    const el = screen.getByText('No Pad')
    expect(el.className).not.toMatch(/p-6/)
    expect(el.className).not.toMatch(/p-2/)
  })

  it('merges className correctly', () => {
    render(<Card className="extra-class">Merged</Card>)
    const el = screen.getByText('Merged')
    expect(el.className).toMatch(/extra-class/)
  })

  it('forwards ref correctly (default div)', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Ref Test</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('forwards ref to polymorphic element', () => {
    const ref = React.createRef<HTMLAnchorElement>()
    render(
      <Card as="a" href="#" ref={ref}>
        Link
      </Card>,
    )
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
  })

  it('passes through native props', () => {
    render(<Card id="card-123">ID Test</Card>)
    const el = screen.getByText('ID Test')
    expect(el).toHaveAttribute('id', 'card-123')
  })

  it('supports anchor attributes when as="a"', () => {
    render(
      <Card as="a" href="/test">
        Link Card
      </Card>,
    )
    const el = screen.getByText('Link Card')
    expect(el).toHaveAttribute('href', '/test')
  })

  it('does not pass card-only props to DOM', () => {
    render(
      <Card hoverable bordered compact data-testid="clean-card">
        Clean DOM
      </Card>,
    )

    const el = screen.getByTestId('clean-card')

    // Ensure no Card-only boolean props leak to DOM
    expect(el).not.toHaveAttribute('hoverable')
    expect(el).not.toHaveAttribute('bordered')
    expect(el).not.toHaveAttribute('compact')
  })
})
