import { useEffect, useRef, type RefObject } from 'react'

// Scroll positions by history entry, for this tab's session.
const positions = new Map<string, number>()

// Routers (React Router among them) keep a key per entry in history.state, so
// going back finds the same key while a fresh visit gets a new one and starts
// at the top. Without one, the path stands in.
const entryKey = () => {
  const state = window.history.state as { key?: string } | null
  return state?.key ?? window.location.pathname
}

/** The nearest ancestor that scrolls, or the page itself. */
export const scrollParent = (element: HTMLElement | null): HTMLElement => {
  for (let node = element?.parentElement; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node)
    if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight)
      return node
  }
  return (document.scrollingElement ?? document.documentElement) as HTMLElement
}

/**
 * Brings a list back to where it was scrolled when the user returns to it
 * (e.g. back from a record it links to). `ready` is when its rows are on
 * screen; the position is restored once, then.
 */
export const useScrollRestoration = (
  ref: RefObject<HTMLElement | null>,
  ready: boolean,
  enabled = true,
) => {
  const key = useRef(entryKey())
  const restored = useRef(false)

  useEffect(() => {
    if (!enabled || !ready || restored.current) return
    restored.current = true
    const saved = positions.get(key.current)
    if (saved) scrollParent(ref.current).scrollTo?.({ top: saved })
  }, [enabled, ready, ref])

  useEffect(() => {
    if (!enabled) return
    const scroller = scrollParent(ref.current)
    const target: HTMLElement | Window =
      scroller === (document.scrollingElement ?? document.documentElement) ? window : scroller
    let top = scroller.scrollTop
    const track = () => {
      top = scroller.scrollTop
    }
    target.addEventListener('scroll', track, { passive: true })
    const entry = key.current
    return () => {
      target.removeEventListener('scroll', track)
      positions.set(entry, top)
    }
  }, [enabled, ref])
}
