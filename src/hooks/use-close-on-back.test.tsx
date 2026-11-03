import { act, cleanup, render, waitFor } from '@testing-library/react'
import { useCloseOnBack } from './use-close-on-back'

function Selecting({ active, onClose }: { active: boolean; onClose: () => void }) {
  useCloseOnBack(active, onClose)
  return null
}

describe('useCloseOnBack', () => {
  // Unmounting removes the entry, and that back lands later.
  afterEach(async () => {
    cleanup()
    await waitFor(() => expect(window.history.state?.drawer).toBeUndefined())
  })

  it('adds a history entry while active, keeping the current state', async () => {
    window.history.replaceState({ key: 'page' }, '')
    const before = window.history.length
    render(<Selecting active onClose={jest.fn()} />)
    await waitFor(() => expect(window.history.length).toBe(before + 1))
    expect(window.history.state.key).toBe('page')
  })

  it('adds nothing while inactive', () => {
    const before = window.history.length
    render(<Selecting active={false} onClose={jest.fn()} />)
    expect(window.history.length).toBe(before)
  })

  it('calls onClose when back leaves its entry', async () => {
    const onClose = jest.fn()
    render(<Selecting active onClose={onClose} />)
    await waitFor(() => expect(window.history.state?.drawer).toBeDefined())
    act(() => {
      window.history.replaceState({ key: 'page' }, '')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
