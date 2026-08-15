import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ToastProvider, useToast } from './ToastProvider'
import type { ToastPlacement } from './Toast.types'

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

/** Helper: Test component using helper methods (toast.success, etc) */
const TriggerHelperToast = () => {
  const { toast } = useToast()
  return (
    <div>
      <button onClick={() => toast.success('Success helper')}>Success</button>
      <button onClick={() => toast.error('Error helper')}>Error</button>
      <button onClick={() => toast.dismissAll()}>Dismiss All</button>
    </div>
  )
}

const renderWithProvider = (ui: React.ReactNode, placement: ToastPlacement = 'top-center') =>
  render(<ToastProvider placement={placement}>{ui}</ToastProvider>)

describe('<ToastProvider />', () => {
  test('throws error when useToast() is used outside provider', () => {
    const BadComponent = () => {
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

  test('supports shorthand toast.success() and toast.error() methods', () => {
    renderWithProvider(<TriggerHelperToast />)

    fireEvent.click(screen.getByText('Success'))
    expect(screen.getByRole('status')).toHaveTextContent('Success helper')

    fireEvent.click(screen.getByText('Error'))
    expect(screen.getAllByRole('status').length).toBe(2)

    fireEvent.click(screen.getByText('Dismiss All'))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
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

  test('pauseOnHover pauses timer on mouseEnter and resumes remaining time on mouseLeave', () => {
    renderWithProvider(<TriggerToast options={{ duration: 4000, pauseOnHover: true }} />)

    fireEvent.click(screen.getByText('Trigger'))
    const toast = screen.getByRole('status')

    // Advance 1000ms
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // MouseEnter → pause timer with 3000ms remaining
    fireEvent.mouseEnter(toast)

    // Advance 5000ms while hovering
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(screen.getByRole('status')).toBeInTheDocument() // still visible

    // MouseLeave → resume remaining 3000ms
    fireEvent.mouseLeave(toast)

    act(() => {
      jest.advanceTimersByTime(2900)
    })

    expect(screen.getByRole('status')).toBeInTheDocument() // still visible at 2900ms

    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(screen.queryByRole('status')).not.toBeInTheDocument() // closed after remaining 3000ms
  })

  test('does NOT pause auto-close if pauseOnHover=false', () => {
    renderWithProvider(<TriggerToast options={{ duration: 2000, pauseOnHover: false }} />)

    fireEvent.click(screen.getByText('Trigger'))
    const toast = screen.getByRole('status')

    fireEvent.mouseEnter(toast)

    act(() => jest.advanceTimersByTime(2000))

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('enforces max toast count = 5', () => {
    renderWithProvider(<TriggerToast />)

    const btn = screen.getByText('Trigger')

    for (let i = 0; i < 8; i++) fireEvent.click(btn)

    const toasts = screen.getAllByRole('status')
    expect(toasts.length).toBe(5)
  })

  test('applies correct placement classes', () => {
    renderWithProvider(<TriggerToast />, 'bottom-right')

    fireEvent.click(screen.getByText('Trigger'))

    const container = screen.getByRole('status').parentElement!.parentElement!

    expect(container.className).toMatch(/bottom-6/)
    expect(container.className).toMatch(/right-6/)
  })

  test('sets isTop correctly depending on placement', () => {
    const { rerender } = render(
      <ToastProvider placement="top-right">
        <TriggerToast />
      </ToastProvider>,
    )

    fireEvent.click(screen.getByText('Trigger'))

    const container = screen.getByRole('status').parentElement!.parentElement!

    expect(container.className).toMatch(/top-20/)

    rerender(
      <ToastProvider placement="bottom-right">
        <TriggerToast />
      </ToastProvider>,
    )

    fireEvent.click(screen.getByText('Trigger'))

    const container2 = screen.getAllByRole('status')[0].parentElement!.parentElement!

    expect(container2.className).toMatch(/bottom-6/)
  })
})
