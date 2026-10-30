/**
 * A minimal `window.matchMedia` over a mutable viewport width (jsdom has none).
 * Understands `(min-width: Npx)` queries and fires `change` on the lists whose
 * result flips when `resize` is called.
 */
const originalMatchMedia = window.matchMedia

export function mockViewport(initialWidth: number) {
  let width = initialWidth
  const listeners = new Map<string, Set<() => void>>()
  const matches = (query: string) => width >= Number(/min-width:\s*(\d+)px/.exec(query)?.[1] ?? 0)

  window.matchMedia = ((query: string) => ({
    get matches() {
      return matches(query)
    },
    media: query,
    onchange: null,
    addEventListener: (_: string, cb: () => void) => {
      if (!listeners.has(query)) listeners.set(query, new Set())
      listeners.get(query)!.add(cb)
    },
    removeEventListener: (_: string, cb: () => void) => {
      listeners.get(query)?.delete(cb)
    },
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia

  return {
    resize(next: number) {
      const before = new Map([...listeners.keys()].map((q) => [q, matches(q)]))
      width = next
      for (const [query, callbacks] of listeners) {
        if (before.get(query) !== matches(query)) callbacks.forEach((cb) => cb())
      }
    },
    listenerCount: () => [...listeners.values()].reduce((sum, set) => sum + set.size, 0),
  }
}

mockViewport.restore = () => {
  window.matchMedia = originalMatchMedia
}
