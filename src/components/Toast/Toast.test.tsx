import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Toast } from './Toast'

const TransitionMock = jest.fn(({ children }) => <div>{children}</div>)

// Disable HeadlessUI transitions for test stability
jest.mock('@headlessui/react', () => ({
  Transition: (props: any) => TransitionMock(props),
}))

const baseProps = {
  id: 1,
  message: 'Operation completed',
  onClose: jest.fn(),
}

describe('Toast - icons by type', () => {
  const types = ['success', 'error', 'info', 'warning'] as const

  test.each(types)('renders correct icon for type: %s', (type) => {
    const close = jest.fn()

    render(<Toast id={1} message="Hello" type={type} onClose={close} />)

    const status = screen.getByRole('status')
    const icon = status.querySelector('svg')
    expect(icon).toBeTruthy()
  })
})

describe('<Toast />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders message text and optional title', () => {
    render(<Toast {...baseProps} title="Notice Title" type="success" />)

    expect(screen.getByText('Notice Title')).toBeInTheDocument()
    expect(screen.getByText('Operation completed')).toBeInTheDocument()
  })

  test('renders action button and triggers onClick handler', () => {
    const handleAction = jest.fn()
    render(
      <Toast {...baseProps} type="info" action={{ label: 'Undo Action', onClick: handleAction }} />,
    )

    const actionBtn = screen.getByRole('button', { name: /undo action/i })
    expect(actionBtn).toBeInTheDocument()

    fireEvent.click(actionBtn)
    expect(handleAction).toHaveBeenCalledTimes(1)
  })

  test('renders variants correctly (accent, filled, outlined, glass)', () => {
    const { rerender } = render(<Toast {...baseProps} type="error" variant="accent" />)
    expect(screen.getByRole('status')).toHaveClass('border-l-4')

    rerender(<Toast {...baseProps} type="error" variant="filled" />)
    expect(screen.getByRole('status')).toHaveClass('bg-[var(--ui-danger)]')

    rerender(<Toast {...baseProps} type="error" variant="outlined" />)
    expect(screen.getByRole('status')).toHaveClass('border-2')

    rerender(<Toast {...baseProps} type="error" variant="glass" />)
    expect(screen.getByRole('status')).toHaveClass('backdrop-blur-md')
  })

  test('applies custom className', () => {
    render(<Toast {...baseProps} type="info" className="custom-toast" />)

    const container = screen.getByRole('status')
    expect(container).toHaveClass('custom-toast')
  })

  test('clicking close button triggers onClose()', () => {
    render(<Toast {...baseProps} type="warning" />)

    fireEvent.click(screen.getByRole('button', { name: /close toast/i }))
    expect(baseProps.onClose).toHaveBeenCalledTimes(1)
  })

  test('uses upward animation when isTop=true', () => {
    render(<Toast id={1} type="info" message="Operation completed" onClose={() => {}} />)

    expect(TransitionMock).toHaveBeenCalled()

    const props = TransitionMock.mock.calls[0][0]

    expect(props.enterFrom).toBe('opacity-0 -translate-y-3 scale-95')
    expect(props.leaveTo).toBe('opacity-0 -translate-y-2 scale-95')
  })

  test('uses downward animation when isTop=false', () => {
    render(
      <Toast id={1} type="info" message="Operation completed" onClose={() => {}} isTop={false} />,
    )

    const props = TransitionMock.mock.calls[0][0]

    expect(props.enterFrom).toBe('opacity-0 translate-y-3 scale-95')
    expect(props.leaveTo).toBe('opacity-0 translate-y-2 scale-95')
  })
})
