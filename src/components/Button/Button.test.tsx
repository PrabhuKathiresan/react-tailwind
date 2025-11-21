import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button Component', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders as <button> element by default', () => {
    render(<Button>Test</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders as a custom element when "as" prop is provided', () => {
    render(
      <Button as="a" href="#">
        Link Button
      </Button>,
    )
    const el = screen.getByText('Link Button')
    expect(el.tagName.toLowerCase()).toBe('a')
  })

  it('does not leak button-only props when as="a"', () => {
    render(
      <Button as="a" href="#" disabled>
        Link Button
      </Button>,
    )
    const el = screen.getByText('Link Button')
    expect(el).not.toHaveAttribute('disabled')
    expect(el).not.toHaveAttribute('type')
  })

  it('applies theme & variant classnames', () => {
    render(
      <Button theme="danger" variant="outlined">
        Delete
      </Button>,
    )
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/border-red-600/)
  })

  it('applies size classes based on "size" prop', () => {
    render(<Button size="lg">Large</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/text-base/)
  })

  it('applies iconOnly padding classes', () => {
    render(
      <Button iconOnly aria-label="close">
        X
      </Button>,
    )
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/p-/) // matches padding
  })

  it('warns when iconOnly has no aria-label', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    render(<Button iconOnly>X</Button>)
    expect(warn).toHaveBeenCalled()
  })

  it('shows loader when loading=true', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByTestId('btn-loader-icon')).toBeInTheDocument()
  })

  it('shows loadingText when loading=true', () => {
    render(
      <Button loading loadingText="Processing...">
        Submit
      </Button>,
    )
    expect(screen.getByText('Processing...')).toBeInTheDocument()
  })

  it('does NOT render children when loading', () => {
    render(
      <Button loading loadingText="Loading...">
        Submit
      </Button>,
    )
    expect(screen.queryByText('Submit')).toBeNull()
  })

  it('renders ONLY loader when iconOnly + loading=true', () => {
    render(
      <Button iconOnly loading aria-label="loading-btn">
        X
      </Button>,
    )
    expect(screen.queryByText('X')).toBeNull()
    expect(screen.getByTestId('btn-loader-icon')).toBeInTheDocument()
  })

  it('applies rounded-full when rounded=true', () => {
    render(<Button rounded>Round</Button>)
    expect(screen.getByRole('button')).toHaveClass('rounded-full')
  })

  it('sets disabled when disabled=true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('disables button when loading=true', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('removes outline styles when noOutlineOnFocus=true', () => {
    render(<Button noOutlineOnFocus>Focus</Button>)
    const btn = screen.getByRole('button')
    const classes = btn.className.split(/\s+/)

    expect(classes).not.toContain('focus:outline')
    expect(classes).not.toContain('focus:outline-2')
    expect(classes).not.toContain('focus:outline-offset-2')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref Button</Button>)
    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName.toLowerCase()).toBe('button')
  })

  it('triggers onClick handler', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('warns when iconOnly has no aria-label', () => {
    const warn = jest.spyOn(console, 'warn')

    render(<Button iconOnly>X</Button>)

    expect(warn).toHaveBeenCalled()
  })
})
