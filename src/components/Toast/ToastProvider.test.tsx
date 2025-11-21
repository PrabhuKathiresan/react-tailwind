import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ToastProvider, useToast } from './ToastProvider'
import { ToastPlacement } from './Toast.types'

// Mock headlessui Transition for stability
jest.mock('@headlessui/react', () => ({
  Transition: ({ children }: any) => <>{children}</>,
}))

jest.useFakeTimers()

/** Helper: A test component that triggers a toast */
const TriggerToast = ({ message = 'Hello', options }: any) => {
  const { showToast } = useToast()
  return <button onClick={() => showToast(message, options)}>Trigger</button>
}

const renderWithProvider = (ui: React.ReactNode, placement: ToastPlacement = 'top-center') =>
  render(<ToastProvider placement={placement}>{ui}</ToastProvider>)

describe('<ToastProvider />', () => {
  test('throws error when useToast() is used outside provider', () => {
    const BadComponent = () => {
      // Should crash here
      useToast()
      return null
    }

    expect(() => render(<BadComponent />)).toThrow('useToast must be used within ToastProvider')
  })

  test('renders a toast when showToast() is called', () => {
    renderWithProvider(<TriggerToast />)

    fireEvent.click(screen.getByText('Trigger'))

    expect(screen.getByRole('status')).toHaveTextContent('Hello')
  })

  test('auto-closes toast after duration', () => {
    renderWithProvider(<TriggerToast options={{ duration: 2000 }} />)

    fireEvent.click(screen.getByText('Trigger'))

    expect(screen.getByRole('status')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('manual close removes toast immediately', () => {
    renderWithProvider(<TriggerToast />)

    fireEvent.click(screen.getByText('Trigger'))

    const closeBtn = screen.getByRole('button', { name: /close toast/i })
    fireEvent.click(closeBtn)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('pauseOnHover stops auto-close timer', () => {
    renderWithProvider(<TriggerToast options={{ duration: 3000, pauseOnHover: true }} />)

    fireEvent.click(screen.getByText('Trigger'))
    const toast = screen.getByRole('status')

    // Hover → timer paused
    fireEvent.mouseEnter(toast)

    act(() => {
      jest.advanceTimersByTime(4000)
    })

    expect(screen.getByRole('status')).toBeInTheDocument() // still visible

    // Mouse leave → resume timer
    fireEvent.mouseLeave(toast)

    act(() => {
      jest.advanceTimersByTime(3000)
    })

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('does NOT pause auto-close if pauseOnHover=false', () => {
    renderWithProvider(<TriggerToast options={{ duration: 2000, pauseOnHover: false }} />)

    fireEvent.click(screen.getByText('Trigger'))
    const toast = screen.getByRole('status')

    // Hover should NOT pause
    fireEvent.mouseEnter(toast)

    act(() => jest.advanceTimersByTime(2000))

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('enforces max toast count = 5', () => {
    renderWithProvider(<TriggerToast />)

    const btn = screen.getByText('Trigger')

    for (let i = 0; i < 8; i++) fireEvent.click(btn)

    // Only 5 toasts should remain
    const toasts = screen.getAllByRole('status')
    expect(toasts.length).toBe(5)
  })

  test('applies correct placement classes', () => {
    renderWithProvider(<TriggerToast />, 'bottom-right')

    fireEvent.click(screen.getByText('Trigger'))

    const container = screen.getByRole('status').parentElement!.parentElement! // parent wrapper

    expect(container.className).toMatch(/bottom-10/)
    expect(container.className).toMatch(/right-4/)
  })

  test('sets isTop correctly depending on placement', () => {
    const { rerender } = render(
      <ToastProvider placement="top-right">
        <TriggerToast />
      </ToastProvider>,
    )

    fireEvent.click(screen.getByText('Trigger'))

    const container = screen.getByRole('status').parentElement!.parentElement!

    expect(container.className).toMatch(/top-10/) // top placement

    rerender(
      <ToastProvider placement="bottom-right">
        <TriggerToast />
      </ToastProvider>,
    )

    fireEvent.click(screen.getByText('Trigger'))

    const container2 = screen.getAllByRole('status')[0].parentElement!.parentElement!

    expect(container2.className).toMatch(/bottom-10/) // bottom placement
  })
})
