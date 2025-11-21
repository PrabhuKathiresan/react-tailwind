// Allow overriding global in TS
declare const global: any

import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'
import { mockAnimationsApi } from 'jsdom-testing-mocks'

// Silence HeadlessUI animation warning
mockAnimationsApi()

configure({
  // throw helpful errors for act() warnings
  throwSuggestions: false,
})

// Suppress *specific* Button a11y warning globally
const originalWarn = console.warn

jest.spyOn(console, 'warn').mockImplementation((msg: unknown, ...args: unknown[]) => {
  if (
    typeof msg === 'string' &&
    msg.includes('[ui] <Button iconOnly> requires aria-label for accessibility.')
  ) {
    return // swallow this specific warning
  }

  // Call the original console.warn for all other warnings
  originalWarn(msg as any, ...args)
})

// Safe mock for ResizeObserver (no TS redeclaration)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any

class MockPointerEvent extends Event {
  clientX: number
  pointerId: number

  constructor(type: string, props: any) {
    super(type, props)
    this.clientX = props.clientX ?? 0
    this.pointerId = props.pointerId ?? 1
  }
}

;(global as any).PointerEvent = MockPointerEvent
