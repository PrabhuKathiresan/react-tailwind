import React from 'react'
import { act, render, screen, fireEvent } from '@testing-library/react'
import { Drawer } from './Drawer'
import { mockViewport } from '../../test-utils/mock-viewport'

// Minimal mock for Headless UI transitions
jest.mock('@headlessui/react', () => ({
  Dialog: ({ open, onClose, children }: any) =>
    open ? (
      <div data-testid="dialog" onClick={() => onClose()}>
        {children}
      </div>
    ) : null,
  DialogBackdrop: ({ children, ...rest }: any) => <div data-testid="backdrop" {...rest} />,
  DialogPanel: ({ children, className }: any) => (
    <div data-testid="panel" className={className} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  ),
  DialogTitle: ({ children, ...rest }: any) => (
    <h3 data-testid="dialog-title" {...rest}>
      {children}
    </h3>
  ),
}))

jest.mock('../Button', () => ({
  Button: ({ children, onClick, className, ...rest }: any) => (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
      className={className}
      aria-label={rest['aria-label']}
      type={rest.type}
      disabled={rest.disabled}
      data-testid={rest['aria-label'] === 'Back' ? 'back-btn' : 'close-btn'}
    >
      {children}
    </button>
  ),
}))

describe('Drawer Component', () => {
  const basicProps = {
    isOpen: true,
    title: 'Drawer Title',
    children: <div data-testid="drawer-content">Hello World</div>,
  }

  it('renders when open', () => {
    render(<Drawer {...basicProps} />)

    expect(screen.getByTestId('dialog')).toBeInTheDocument()
    expect(screen.getByTestId('panel')).toBeInTheDocument()
    expect(screen.getByTestId('drawer-content')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<Drawer {...basicProps} isOpen={false} />)

    expect(screen.queryByTestId('dialog')).toBeNull()
  })

  it('renders title and optional description', () => {
    render(<Drawer {...basicProps} description="Subtitle here" />)

    expect(screen.getByText('Drawer Title')).toBeInTheDocument()
    expect(screen.getByText('Subtitle here')).toBeInTheDocument()
  })

  it('renders drag handle when align="bottom"', () => {
    render(<Drawer {...basicProps} align="bottom" />)

    expect(screen.getByTestId('drawer-drag-handle')).toBeInTheDocument()
  })

  it('renders footer content', () => {
    render(<Drawer {...basicProps} footer={<button data-testid="footer-btn">Submit</button>} />)

    expect(screen.getByTestId('footer-btn')).toBeInTheDocument()
  })

  it('applies alignment classes', () => {
    const alignments = {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      top: 'items-start justify-center',
      bottom: 'items-end justify-center',
    }

    Object.entries(alignments).forEach(([align, expected]) => {
      render(<Drawer {...basicProps} align={align as any} />)

      const panels = screen.getAllByTestId('panel')
      const latestPanel = panels[panels.length - 1]
      const alignWrapper = latestPanel.parentElement!

      expect(alignWrapper.className).toContain(expected)
    })
  })

  it('applies size classes', () => {
    const sizes = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'w-full',
    }

    Object.entries(sizes).forEach(([size, cls]) => {
      render(<Drawer {...basicProps} size={size as any} />)

      const panels = screen.getAllByTestId('panel')
      const latest = panels[panels.length - 1]

      expect(latest.className).toContain(cls)
    })
  })

  it('renders backdrop when enabled', () => {
    render(<Drawer {...basicProps} backdrop />)
    expect(screen.getByTestId('backdrop')).toBeInTheDocument()
  })

  it('calls onClose when clicking back button', () => {
    const onClose = jest.fn()

    render(<Drawer {...basicProps} onClose={onClose} showBackButton={true} />)

    fireEvent.click(screen.getByTestId('back-btn'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when clicking close button', () => {
    const onClose = jest.fn()

    render(<Drawer {...basicProps} onClose={onClose} showCloseButton={true} />)

    fireEvent.click(screen.getByTestId('close-btn'))
    expect(onClose).toHaveBeenCalled()
  })

  it('prevents onClose when closeOnOutsideClick is false and outside click occurs', () => {
    const onClose = jest.fn()

    render(<Drawer {...basicProps} onClose={onClose} closeOnOutsideClick={false} />)

    fireEvent.click(screen.getByTestId('dialog'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose when closeOnOutsideClick is true and outside click occurs', () => {
    const onClose = jest.fn()

    render(<Drawer {...basicProps} onClose={onClose} closeOnOutsideClick={true} />)

    fireEvent.click(screen.getByTestId('dialog'))
    expect(onClose).toHaveBeenCalled()
  })

  describe('responsive align and size', () => {
    afterEach(() => mockViewport.restore())

    test.each([
      [360, true],
      [1024, false],
    ])('at %ipx a { base: bottom, md: end } drawer shows a drag handle: %s', (width, handle) => {
      mockViewport(width)
      render(
        <Drawer isOpen align={{ base: 'bottom', md: 'end' }} title="Filters">
          Body
        </Drawer>,
      )

      if (handle) expect(screen.getByTestId('drawer-drag-handle')).toBeInTheDocument()
      else expect(screen.queryByTestId('drawer-drag-handle')).not.toBeInTheDocument()
    })

    test('applies the size for the current breakpoint', () => {
      const viewport = mockViewport(360)
      const { rerender } = render(
        <Drawer isOpen size={{ base: 'full', md: 'md' }} title="Customer">
          Body
        </Drawer>,
      )
      expect(screen.getByTestId('panel')).toHaveClass('w-full')

      act(() => viewport.resize(900))
      rerender(
        <Drawer isOpen size={{ base: 'full', md: 'md' }} title="Customer">
          Body
        </Drawer>,
      )
      expect(screen.getByTestId('panel')).toHaveClass('max-w-md')
    })
  })
})
