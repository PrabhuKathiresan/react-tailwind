import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { SelectionBar } from './SelectionBar'

describe('SelectionBar', () => {
  it('is a toolbar named by the count, with a labelled button per action', () => {
    const archive = jest.fn()
    render(
      <SelectionBar
        count={3}
        actions={[
          { id: 'archive', label: 'Archive', onClick: archive },
          { id: 'delete', label: 'Delete', danger: true, onClick: jest.fn() },
        ]}
      />,
    )
    expect(screen.getByRole('toolbar', { name: 'Actions for 3 selected' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Archive' }))
    expect(archive).toHaveBeenCalledTimes(1)
  })

  it('turns the actions off with nothing selected', () => {
    render(
      <SelectionBar
        count={0}
        actions={[{ id: 'archive', label: 'Archive', onClick: jest.fn() }]}
      />,
    )
    expect(screen.getByRole('button', { name: 'Archive' })).toBeDisabled()
  })
})
