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

  it('renders leftIcon and rightIcon slots', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        Icon Button
      </Button>,
    )
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('applies fullWidth style', () => {
    render(<Button fullWidth>Full Width</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('applies success and warning theme classes', () => {
    const { rerender } = render(<Button theme="success">Success</Button>)
    expect(screen.getByRole('button').className).toMatch(/bg-emerald-600/)

    rerender(<Button theme="warning">Warning</Button>)
    expect(screen.getByRole('button').className).toMatch(/bg-amber-500/)
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
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    render(<Button iconOnly>X</Button>)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })
})
