import { act, renderHook } from '@testing-library/react'
import { useBreakpoint, useMediaQuery, useResponsiveValue } from './use-breakpoint'
import { mockViewport } from '../test-utils/mock-viewport'

describe('useBreakpoint', () => {
  afterEach(() => mockViewport.restore())

  test.each([
    [360, 'compact'],
    [767, 'compact'],
    [768, 'medium'],
    [1023, 'medium'],
    [1024, 'expanded'],
    [1440, 'expanded'],
  ])('%ipx is %s', (width, expected) => {
    mockViewport(width)
    expect(renderHook(() => useBreakpoint()).result.current).toBe(expected)
  })

  test('ignores touch capability: a narrow touch-less window is still compact', () => {
    mockViewport(500)
    expect(renderHook(() => useBreakpoint()).result.current).toBe('compact')
  })

  test('follows the viewport across breakpoints', () => {
    const viewport = mockViewport(744)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current).toBe('compact')

    act(() => viewport.resize(1133))
    expect(result.current).toBe('expanded')

    act(() => viewport.resize(800))
    expect(result.current).toBe('medium')
  })
})

describe('useMediaQuery', () => {
  afterEach(() => mockViewport.restore())

  test('stops listening once unmounted', () => {
    const viewport = mockViewport(500)
    const { result, unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
    expect(viewport.listenerCount()).toBeGreaterThan(0)
    unmount()
    expect(viewport.listenerCount()).toBe(0)
  })
})

describe('useResponsiveValue', () => {
  afterEach(() => mockViewport.restore())

  test('returns a plain value unchanged', () => {
    mockViewport(360)
    expect(renderHook(() => useResponsiveValue('bottom')).result.current).toBe('bottom')
  })

  test.each([
    [360, 'bottom'],
    [800, 'end'],
    [1280, 'center'],
  ])('at %ipx picks %s', (width, expected) => {
    mockViewport(width)
    const value = { base: 'bottom', md: 'end', lg: 'center' }
    expect(renderHook(() => useResponsiveValue(value)).result.current).toBe(expected)
  })

  test('falls back to the next smaller range when one is missing', () => {
    mockViewport(1280)
    expect(renderHook(() => useResponsiveValue({ base: 'bottom', md: 'end' })).result.current).toBe(
      'end',
    )
    expect(renderHook(() => useResponsiveValue({ base: 'bottom' })).result.current).toBe('bottom')
  })
})
