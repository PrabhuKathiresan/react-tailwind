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

  it('uses a currentColor-based hover tint for plain variant so it works on coloured surfaces', () => {
    const themes = ['primary', 'secondary', 'danger', 'success', 'warning'] as const
    themes.forEach((theme) => {
      const { unmount } = render(
        <Button theme={theme} variant="plain">
          Plain
        </Button>,
      )
      const btn = screen.getByRole('button')
      expect(btn).toHaveClass('hover:bg-current/10', 'active:bg-current/15')
      expect(btn.className).not.toMatch(/hover:bg-(blue|red|gray|emerald|amber)-/)
      unmount()
    })
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

  it('supports active toggle state and aria-pressed', () => {
    render(<Button active>Toggle</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('applies aria-busy when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })

  it('handles non-button element disabled state and prevents click', () => {
    const onClick = jest.fn()
    render(
      <Button as="a" disabled onClick={onClick}>
        Link Button
      </Button>,
    )
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-disabled', 'true')
    expect(btn).toHaveAttribute('tabindex', '-1')
    fireEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('shows a focus ring by default and removes it entirely with noOutlineOnFocus', () => {
    const { rerender } = render(<Button>Focus</Button>)
    expect(screen.getByRole('button')).toHaveClass(
      'focus-visible:outline-2',
      'focus-visible:outline-offset-2',
    )

    const themes = ['primary', 'secondary', 'danger', 'success', 'warning'] as const
    const variants = ['default', 'outlined', 'plain'] as const
    themes.forEach((theme) =>
      variants.forEach((variant) => {
        rerender(
          <Button theme={theme} variant={variant} noOutlineOnFocus>
            Focus
          </Button>,
        )
        expect(screen.getByRole('button').className).not.toMatch(
          /focus-visible:outline-(2|offset|solid)/,
        )
      }),
    )
  })

  it('applies the same disabled styling to native and non-native elements', () => {
    render(
      <>
        <Button disabled>Native</Button>
        <Button as="div" disabled>
          Div
        </Button>
      </>,
    )
    const [native, div] = screen.getAllByRole('button')
    expect(native).toHaveClass('disabled:opacity-50', 'disabled:pointer-events-none')
    expect(div).toHaveClass('aria-disabled:opacity-50', 'aria-disabled:pointer-events-none')
    expect(div).toHaveAttribute('aria-disabled', 'true')
  })

  it('activates non-native buttons with Enter and Space', () => {
    const onClick = jest.fn()
    render(
      <Button as="div" onClick={onClick}>
        Div Button
      </Button>,
    )
    const btn = screen.getByRole('button')

    fireEvent.keyDown(btn, { key: 'Enter' })
    expect(onClick).toHaveBeenCalledTimes(1)

    // Space activates on keyup, like a native button
    fireEvent.keyDown(btn, { key: ' ' })
    expect(onClick).toHaveBeenCalledTimes(1)
    fireEvent.keyUp(btn, { key: ' ' })
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('does not activate a disabled non-native button via keyboard', () => {
    const onClick = jest.fn()
    render(
      <Button as="div" disabled onClick={onClick}>
        Div Button
      </Button>,
    )
    const btn = screen.getByRole('button')
    fireEvent.keyDown(btn, { key: 'Enter' })
    fireEvent.keyUp(btn, { key: ' ' })
    expect(onClick).not.toHaveBeenCalled()
  })

  it('still calls a consumer onKeyDown for non-native buttons', () => {
    const onKeyDown = jest.fn()
    render(
      <Button as="div" onKeyDown={onKeyDown}>
        Div Button
      </Button>,
    )
    fireEvent.keyDown(screen.getByRole('button'), { key: 'a' })
    expect(onKeyDown).toHaveBeenCalledTimes(1)
  })

  it('keeps link semantics when rendered as a link with href', () => {
    render(
      <Button as="a" href="/docs">
        Docs
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Docs' })
    expect(link).not.toHaveAttribute('role')
    expect(link).not.toHaveAttribute('tabindex')
  })

  it('makes a disabled link unfocusable and blocks navigation clicks', () => {
    const onClick = jest.fn()
    render(
      <Button as="a" href="/docs" disabled onClick={onClick}>
        Docs
      </Button>,
    )
    const link = screen.getByRole('link', { name: 'Docs' })
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('tabindex', '-1')
    fireEvent.click(link)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('accepts aria-labelledby for iconOnly and warns only once across re-renders', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const { unmount } = render(
      <Button iconOnly aria-labelledby="lbl">
        X
      </Button>,
    )
    expect(warn).not.toHaveBeenCalled()
    unmount()

    const view = render(<Button iconOnly>X</Button>)
    view.rerender(<Button iconOnly>X</Button>)
    view.rerender(<Button iconOnly>X</Button>)
    expect(warn).toHaveBeenCalledTimes(1)

    warn.mockRestore()
  })

  it('uses an outline (not a box-shadow ring) for focus so the offset gap is transparent', () => {
    render(<Button theme="danger">Focus</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('focus-visible:outline-[var(--ui-danger-ring)]')
    expect(btn.className).not.toMatch(/focus-visible:ring-/)
  })

  it('renders the active toggle ring without a ring offset', () => {
    render(<Button active>Toggle</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('ring-2', 'ring-current')
    expect(btn).not.toHaveClass('ring-offset-2')
  })

  it('renders the loader and loading text in the button text colour', () => {
    render(
      <Button loading loadingText="Saving" variant="outlined">
        Save
      </Button>,
    )
    expect(screen.getByTestId('btn-loader-icon')).toHaveClass('text-current')
    expect(screen.getByText('Saving')).toHaveClass('text-current')
  })
})
