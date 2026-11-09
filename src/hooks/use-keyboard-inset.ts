import { useEffect, useState } from 'react'

/**
 * How far the on-screen keyboard reaches into the window, in pixels, for a bar
 * pinned to the bottom to sit just above it. Chrome on Android resizes the
 * window for the keyboard (with `interactive-widget=resizes-content`), so it's
 * 0 there; iOS Safari only shrinks the visible area, and a bottom bar would
 * stay behind the keyboard.
 */
export const useKeyboardInset = (enabled = true): number => {
  const [inset, setInset] = useState(0)

  useEffect(() => {
    const viewport = typeof window !== 'undefined' ? window.visualViewport : null
    if (!enabled || !viewport) return
    let frame = 0
    const measure = () => {
      frame = 0
      setInset(Math.max(0, Math.round(window.innerHeight - viewport.height - viewport.offsetTop)))
    }
    const update = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    viewport.addEventListener('resize', update)
    viewport.addEventListener('scroll', update)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      viewport.removeEventListener('resize', update)
      viewport.removeEventListener('scroll', update)
    }
  }, [enabled])

  return enabled ? inset : 0
}
