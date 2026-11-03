import React from 'react'

// history.back() lands later, so a drawer opening meanwhile (one replacing another,
// or React re-running effects under StrictMode) would have its new entry removed
// instead, and close at once. Removals are counted, and an opening drawer waits for them.
let pendingBacks = 0
const afterBacks: Array<() => void> = []

function settleBack() {
  pendingBacks = Math.max(0, pendingBacks - 1)
  if (pendingBacks === 0) afterBacks.splice(0).forEach((run) => run())
}

function removeEntry() {
  pendingBacks += 1
  let settled = false
  const settle = () => {
    if (settled) return
    settled = true
    window.removeEventListener('popstate', settle)
    settleBack()
  }
  window.addEventListener('popstate', settle)
  // A back that never reports (nothing to go back to) mustn't hold others up.
  window.setTimeout(settle, 500)
  window.history.back()
}

/**
 * While `active`, the browser's back button (and Android's back gesture)
 * closes the drawer instead of leaving the page: opening adds a history entry
 * (keeping the current state, so routers see the same location), and back
 * removes it. Closed any other way, the entry is removed too, but only if it's
 * still the latest one, so a form that saves and then navigates isn't undone.
 */
export function useCloseOnBack(active: boolean, onClose: () => void) {
  const onCloseRef = React.useRef(onClose)
  React.useEffect(() => {
    onCloseRef.current = onClose
  })
  const token = React.useId()

  React.useEffect(() => {
    if (!active || typeof window === 'undefined') return
    const pushEntry = () =>
      window.history.pushState({ ...(window.history.state ?? {}), drawer: token }, '')
    let entryPresent = false
    let disposed = false
    const handlePop = () => {
      if (window.history.state?.drawer === token) return
      entryPresent = false
      onCloseRef.current()
      // onClose may step back within the drawer instead of closing it; if it's
      // still open afterwards, take back its entry so the next back works too.
      window.setTimeout(() => {
        if (disposed) return
        pushEntry()
        entryPresent = true
      }, 0)
    }
    const start = () => {
      if (disposed) return
      pushEntry()
      entryPresent = true
      window.addEventListener('popstate', handlePop)
    }
    if (pendingBacks > 0) afterBacks.push(start)
    else start()
    return () => {
      disposed = true
      window.removeEventListener('popstate', handlePop)
      if (entryPresent && window.history.state?.drawer === token) removeEntry()
    }
  }, [active, token])
}
