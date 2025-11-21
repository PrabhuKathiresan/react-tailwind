import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Drawer } from './Drawer'

// Minimal mock for Headless UI transitions
jest.mock('@headlessui/react', () => ({
  Dialog: ({ open, onClose, children }: any) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogBackdrop: ({ children, ...rest }: any) => <div data-testid="backdrop" {...rest} />,
  DialogPanel: ({ children, className }: any) => (
    <div data-testid="panel" className={className}>
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
      onClick={onClick}
      className={className}
      // forward only allowed attributes
      aria-label={rest['aria-label']}
      type={rest.type}
      disabled={rest.disabled}
      data-testid="back-btn"
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

  it('renders no title block when title and description are missing', () => {
    render(
      <Drawer isOpen={true} title={null as any} description={null as any} children={<div />} />,
    )

    expect(screen.queryByTestId('dialog-title')).toBeNull()
  })

  it('applies alignment classes', () => {
    const alignments = {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      top: 'items-center justify-center',
      bottom: 'items-end justify-center',
    }

    Object.entries(alignments).forEach(([align, expected]) => {
      render(<Drawer {...basicProps} align={align as any} />)

      // Multiple renders → take last
      const panels = screen.getAllByTestId('panel')
      const latestPanel = panels[panels.length - 1]

      // align wrapper = parent of panel
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

      // Multiple panels exist → take the last one
      const panels = screen.getAllByTestId('panel')
      const latest = panels[panels.length - 1]

      expect(latest.className).toContain(cls)
    })
  })

  it('renders backdrop when enabled', () => {
    render(<Drawer {...basicProps} backdrop />)
    expect(screen.getByTestId('backdrop')).toBeInTheDocument()
  })

  it('does not render backdrop when disabled', () => {
    render(<Drawer {...basicProps} backdrop={false} />)
    expect(screen.queryByTestId('backdrop')).toBeNull()
  })

  it('calls onClose when clicking back button', () => {
    const onClose = jest.fn()

    render(<Drawer {...basicProps} onClose={onClose} showBackButton={true} />)

    fireEvent.click(screen.getByTestId('back-btn'))
    expect(onClose).toHaveBeenCalled()
  })

  it('applies custom panelClass', () => {
    render(<Drawer {...basicProps} panelClass="panel-x" />)

    expect(screen.getByTestId('panel').className).toContain('panel-x')
  })

  it('applies custom contentClass', () => {
    render(<Drawer {...basicProps} contentClass="content-y" />)

    expect(screen.getByTestId('drawer-content').parentElement!.className).toContain('content-y')
  })

  it('applies sticky title class when enabled', () => {
    render(<Drawer {...basicProps} titleSticky />)

    const titleWrapper = screen.getByTestId('dialog-title').parentElement
    expect(titleWrapper!.className).toContain('sticky')
  })
})
