import { renderHook } from '@testing-library/react'
import { useHeldWhileClosing } from './use-held-while-closing'

describe('useHeldWhileClosing', () => {
  test('passes the value through while open', () => {
    const { result, rerender } = renderHook(
      ({ open, value }) => useHeldWhileClosing(open, { title: value }),
      {
        initialProps: { open: true, value: 'Edit product' },
      },
    )
    expect(result.current.title).toBe('Edit product')
    rerender({ open: true, value: 'Edit invoice' })
    expect(result.current.title).toBe('Edit invoice')
  })

  test('keeps the last value shown while closing, whatever it is given meanwhile', () => {
    const { result, rerender } = renderHook(
      ({ open, value }) => useHeldWhileClosing(open, { title: value }),
      {
        initialProps: { open: true, value: 'Edit product' },
      },
    )
    rerender({ open: false, value: 'Add product' })
    expect(result.current.title).toBe('Edit product')
    rerender({ open: true, value: 'Add product' })
    expect(result.current.title).toBe('Add product')
  })
})
