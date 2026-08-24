import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActionSheet } from './ActionSheet'
import { ActionSheetItem } from './ActionSheet.types'

describe('ActionSheet', () => {
  const actions: ActionSheetItem[] = [
    { id: 'share', label: 'Share Link', onClick: jest.fn() },
    { id: 'edit', label: 'Edit Item', theme: 'primary', onClick: jest.fn() },
    { id: 'delete', label: 'Delete Item', theme: 'danger', onClick: jest.fn() },
    { id: 'disabled-opt', label: 'Disabled Action', disabled: true, onClick: jest.fn() },
  ]

  test('renders action sheet items when isOpen is true', () => {
    render(
      <ActionSheet
        isOpen={true}
        onClose={jest.fn()}
        title="Quick Actions"
        description="Choose an operation"
        actions={actions}
      />,
    )

    expect(screen.getByText('Quick Actions')).toBeInTheDocument()
    expect(screen.getByText('Choose an operation')).toBeInTheDocument()
    expect(screen.getByTestId('action-sheet-item-share')).toBeInTheDocument()
    expect(screen.getByTestId('action-sheet-item-edit')).toBeInTheDocument()
    expect(screen.getByTestId('action-sheet-item-delete')).toBeInTheDocument()
  })

  test('triggers action onClick and onClose when an action item is clicked', () => {
    const onCloseMock = jest.fn()
    const shareOnClick = jest.fn()
    const testActions = [{ id: 'share', label: 'Share Link', onClick: shareOnClick }]

    render(<ActionSheet isOpen={true} onClose={onCloseMock} actions={testActions} />)

    const shareBtn = screen.getByTestId('action-sheet-item-share')
    fireEvent.click(shareBtn)

    expect(shareOnClick).toHaveBeenCalled()
    expect(onCloseMock).toHaveBeenCalled()
  })

  test('triggers cancel button click and onClose', () => {
    const onCloseMock = jest.fn()
    const onCancelMock = jest.fn()

    render(
      <ActionSheet
        isOpen={true}
        onClose={onCloseMock}
        onCancel={onCancelMock}
        actions={actions}
        cancelLabel="Dismiss"
      />,
    )

    const cancelBtn = screen.getByTestId('action-sheet-cancel-btn')
    expect(cancelBtn).toHaveTextContent('Dismiss')

    fireEvent.click(cancelBtn)

    expect(onCancelMock).toHaveBeenCalled()
    expect(onCloseMock).toHaveBeenCalled()
  })

  test('prevents click on disabled action item', () => {
    const disabledOnClick = jest.fn()
    const onCloseMock = jest.fn()

    render(
      <ActionSheet
        isOpen={true}
        onClose={onCloseMock}
        actions={[{ id: 'dis', label: 'Disabled Item', disabled: true, onClick: disabledOnClick }]}
      />,
    )

    const disabledBtn = screen.getByTestId('action-sheet-item-dis')
    expect(disabledBtn).toBeDisabled()

    fireEvent.click(disabledBtn)

    expect(disabledOnClick).not.toHaveBeenCalled()
    expect(onCloseMock).not.toHaveBeenCalled()
  })
})
