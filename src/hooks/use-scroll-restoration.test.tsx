import { useRef } from 'react'
import { render } from '@testing-library/react'
import { useScrollRestoration } from './use-scroll-restoration'

const List = ({ ready }: { ready: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  useScrollRestoration(ref, ready)
  return <div ref={ref}>rows</div>
}

describe('useScrollRestoration', () => {
  it('returns to where the list was scrolled for the same history entry', () => {
    window.history.replaceState({ key: 'entry-1' }, '')
    const scrollTo = jest.fn()
    Object.defineProperty(document.documentElement, 'scrollTo', {
      value: scrollTo,
      configurable: true,
    })
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 640,
      configurable: true,
      writable: true,
    })

    const first = render(<List ready />)
    first.unmount()

    render(<List ready />)
    expect(scrollTo).toHaveBeenCalledWith({ top: 640 })
  })

  it('starts at the top for a new history entry', () => {
    window.history.replaceState({ key: 'entry-2' }, '')
    const scrollTo = jest.fn()
    Object.defineProperty(document.documentElement, 'scrollTo', {
      value: scrollTo,
      configurable: true,
    })
    render(<List ready />)
    expect(scrollTo).not.toHaveBeenCalled()
  })
})
