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
    expect(el.className).toMatch(/hover:bg-gray-100/)
  })

  it('applies clickable styles', () => {
    render(<Card clickable>Clickable Card</Card>)
    const el = screen.getByText('Clickable Card')
    expect(el.className).toMatch(/cursor-pointer/)
    expect(el.className).toMatch(/hover:-translate-y-0\.5/)
  })

  it('applies selected styles', () => {
    render(<Card selected>Selected Card</Card>)
    const el = screen.getByText('Selected Card')
    expect(el.className).toMatch(/ring-2/)
    expect(el.className).toMatch(/ring-\[var\(--ui-primary\)\]/)
  })

  it('applies surface variants', () => {
    const { rerender } = render(<Card variant="elevated">Elevated</Card>)
    expect(screen.getByText('Elevated').className).toMatch(/shadow-md/)

    rerender(<Card variant="filled">Filled</Card>)
    expect(screen.getByText('Filled').className).toMatch(/bg-gray-50/)

    rerender(<Card variant="ghost">Ghost</Card>)
    expect(screen.getByText('Ghost').className).toMatch(/bg-transparent/)
  })

  it('applies radius variants', () => {
    render(<Card radius="2xl">Radius Test</Card>)
    expect(screen.getByText('Radius Test').className).toMatch(/rounded-2xl/)
  })

  it('applies bordered styles when variant=outlined', () => {
    render(<Card bordered>Border Card</Card>)
    const el = screen.getByText('Border Card')
    expect(el.className).toMatch(/border-\[var\(--ui-border\)\]/)
  })

  it('applies padding by default', () => {
    render(<Card>Padding</Card>)
    const el = screen.getByText('Padding')
    expect(el.className).toMatch(/p-5 sm:p-6/)
  })

  it('applies compact padding when compact=true', () => {
    render(<Card compact>Compact</Card>)
    const el = screen.getByText('Compact')
    expect(el.className).toMatch(/p-3 sm:p-4/)
  })

  it('removes padding when zeroPadding=true', () => {
    render(<Card zeroPadding>No Pad</Card>)
    const el = screen.getByText('No Pad')
    expect(el.className).not.toMatch(/p-5 sm:p-6/)
    expect(el.className).not.toMatch(/p-3 sm:p-4/)
  })

  it('renders compound sub-components correctly', () => {
    render(
      <Card data-testid="card-box">
        <Card.Header bordered data-testid="card-header">
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card Subtitle</Card.Description>
        </Card.Header>
        <Card.Content data-testid="card-body">
          <p>Body Content</p>
        </Card.Content>
        <Card.Footer bordered data-testid="card-footer">
          <button>Action</button>
        </Card.Footer>
      </Card>,
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument()
    expect(screen.getByText('Body Content')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()

    expect(screen.getByTestId('card-header').className).toMatch(/border-b/)
    expect(screen.getByTestId('card-footer').className).toMatch(/border-t/)
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Card ref={ref}>Ref Test</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('does not pass card-only props to DOM', () => {
    render(
      <Card hoverable clickable selected bordered compact data-testid="clean-card">
        Clean DOM
      </Card>,
    )

    const el = screen.getByTestId('clean-card')
    expect(el).not.toHaveAttribute('hoverable')
    expect(el).not.toHaveAttribute('clickable')
    expect(el).not.toHaveAttribute('selected')
    expect(el).not.toHaveAttribute('bordered')
    expect(el).not.toHaveAttribute('compact')
  })
})
