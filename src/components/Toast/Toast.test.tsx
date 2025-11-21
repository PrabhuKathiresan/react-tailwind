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

    // Only one status per test
    const status = screen.getByRole('status')

    const icon = status.querySelector('svg')
    expect(icon).toBeTruthy()

    // SVG className is SVGAnimatedString → read baseVal
    const className =
      typeof icon!.className === 'string' ? icon!.className : (icon!.className as any).baseVal

    expect(className).toMatch(/text-(green|red|blue|yellow)-/)
  })
})

describe('<Toast />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders message text', () => {
    render(<Toast {...baseProps} type="success" />)

    expect(screen.getByText('Operation completed')).toBeInTheDocument()
  })

  test('applies correct border color based on type', () => {
    render(<Toast {...baseProps} type="error" />)

    const container = screen.getByRole('status')
    expect(container.className).toMatch(/border-t-4/)
    expect(container.className).toMatch(/border-red-600/)
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
