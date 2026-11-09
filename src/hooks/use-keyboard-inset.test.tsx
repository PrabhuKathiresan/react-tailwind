import { act, renderHook } from '@testing-library/react'
import { useKeyboardInset } from './use-keyboard-inset'

describe('useKeyboardInset', () => {
  const listeners: Record<string, () => void> = {}
  const viewport = {
    height: 800,
    offsetTop: 0,
    addEventListener: (type: string, fn: () => void) => {
      listeners[type] = fn
    },
    removeEventListener: jest.fn(),
  }

  beforeEach(() => {
    Object.defineProperty(window, 'visualViewport', { value: viewport, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 1
    })
  })

  it('is the part of the window the keyboard covers', () => {
    const { result } = renderHook(() => useKeyboardInset())
    expect(result.current).toBe(0)
    act(() => {
      viewport.height = 500
      listeners.resize()
    })
    expect(result.current).toBe(300)
  })

  it('is 0 when off', () => {
    viewport.height = 500
    const { result } = renderHook(() => useKeyboardInset(false))
    expect(result.current).toBe(0)
  })
})
