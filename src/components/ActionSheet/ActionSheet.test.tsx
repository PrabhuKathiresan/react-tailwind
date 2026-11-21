import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActionSheet } from './ActionSheet'
import { ActionSheetItem } from './ActionSheet.types'
import { mockViewport } from '../../test-utils/mock-viewport'

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

  describe('by screen size', () => {
    afterEach(() => mockViewport.restore())

    it('rises from the bottom with a drag handle on phones', () => {
      mockViewport(390)
      render(<ActionSheet isOpen onClose={jest.fn()} title="Options" actions={actions} />)
      expect(screen.getByTestId('drawer-drag-handle')).toBeInTheDocument()
    })

    it('opens as a dialog in the middle, without a drag handle, from tablets up', () => {
      mockViewport(1280)
      render(<ActionSheet isOpen onClose={jest.fn()} title="Options" actions={actions} />)
      expect(screen.queryByTestId('drawer-drag-handle')).not.toBeInTheDocument()
      // The panel holding the actions: rounded all round, as a dialog, not only on top.
      const content = screen.getByTestId('action-sheet')
      expect(content.closest('.rounded-2xl')).not.toBeNull()
      expect(content.closest('.rounded-t-2xl')).toBeNull()
    })
  })
})
