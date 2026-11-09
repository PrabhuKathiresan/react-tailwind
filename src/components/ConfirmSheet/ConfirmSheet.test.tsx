import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ConfirmSheet } from './ConfirmSheet'
import type { ConfirmSheetProps } from './ConfirmSheet.types'

const renderSheet = (props: Partial<ConfirmSheetProps> = {}) => {
  const handlers = { onConfirm: jest.fn(), onCancel: jest.fn() }
  render(
    <ConfirmSheet
      isOpen
      title="Delete Sharma Traders?"
      description="It's removed from your vendors."
      confirmLabel="Delete"
      danger
      {...handlers}
      {...props}
    />,
  )
  return handlers
}

describe('ConfirmSheet', () => {
  it('asks the question and says what happens', () => {
    renderSheet()
    expect(screen.getByText('Delete Sharma Traders?')).toBeInTheDocument()
    expect(screen.getByText("It's removed from your vendors.")).toBeInTheDocument()
  })

  it('confirms or cancels', () => {
    const { onConfirm, onCancel } = renderSheet()
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onCancel).toHaveBeenCalled()
  })

  it('offers a third choice when given one', () => {
    const onClick = jest.fn()
    renderSheet({ secondaryAction: { label: 'Archive instead', onClick } })
    fireEvent.click(screen.getByRole('button', { name: 'Archive instead' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('turns the buttons off while the action runs', () => {
    renderSheet({ isPending: true })
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
  })
})
