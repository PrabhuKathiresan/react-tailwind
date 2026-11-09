import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dropdown } from './Dropdown'

// Real Headless UI (Dropdown.test.tsx mocks it), for the keyboard behaviour.
describe('Dropdown from the keyboard', () => {
  const renderMenu = () => {
    const edit = jest.fn()
    const archive = jest.fn()
    render(
      <Dropdown
        triggerButton={<button type="button">Actions</button>}
        items={[
          { id: 'edit', label: 'Edit', onClick: edit },
          { id: 'locked', label: 'Locked', disabled: true, onClick: jest.fn() },
          { id: 'archive', label: 'Archive', onClick: archive },
        ]}
      />,
    )
    return { edit, archive }
  }

  it('moves with the arrows, skipping disabled items, and chooses with Enter', async () => {
    const user = userEvent.setup()
    const { edit, archive } = renderMenu()
    screen.getByRole('button', { name: 'Actions' }).focus()
    await user.keyboard('{Enter}')
    await screen.findByRole('menu')
    await user.keyboard('{ArrowDown}{Enter}')
    expect(archive).toHaveBeenCalledTimes(1)
    expect(edit).not.toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Actions' })).toHaveFocus()
  })

  it('chooses with Space too, and closes on Escape without choosing', async () => {
    const user = userEvent.setup()
    const { edit } = renderMenu()
    screen.getByRole('button', { name: 'Actions' }).focus()
    await user.keyboard('{Enter}')
    await screen.findByRole('menu')
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
    expect(edit).not.toHaveBeenCalled()

    await user.keyboard('{Enter}')
    await screen.findByRole('menu')
    await user.keyboard(' ')
    expect(edit).toHaveBeenCalledTimes(1)
  })
})
