import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Chip, ChipGroup } from './Chip'

describe('Chip', () => {
  test('is a button announced as a toggle, pressed when selected', () => {
    const { rerender } = render(<Chip>7 days</Chip>)
    const chip = screen.getByRole('button', { name: '7 days' })
    expect(chip).toHaveAttribute('type', 'button')
    expect(chip).toHaveAttribute('aria-pressed', 'false')

    rerender(<Chip selected>7 days</Chip>)
    expect(screen.getByRole('button', { name: '7 days' })).toHaveAttribute('aria-pressed', 'true')
  })

  test('selected and unselected chips look different', () => {
    render(
      <>
        <Chip selected>On</Chip>
        <Chip>Off</Chip>
      </>,
    )
    expect(screen.getByRole('button', { name: 'On' }).className).toContain('bg-info-subtle')
    expect(screen.getByRole('button', { name: 'Off' }).className).not.toContain('bg-info-subtle')
  })

  test('calls onClick, and not when disabled', () => {
    const onClick = jest.fn()
    const { rerender } = render(<Chip onClick={onClick}>Net 7</Chip>)
    fireEvent.click(screen.getByRole('button', { name: 'Net 7' }))
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(
      <Chip onClick={onClick} disabled>
        Net 7
      </Chip>,
    )
    expect(screen.getByRole('button', { name: 'Net 7' })).toBeDisabled()
  })

  test('sizes', () => {
    const { rerender } = render(<Chip>A</Chip>)
    expect(screen.getByRole('button')).toHaveClass('h-6', 'text-xs')
    rerender(<Chip size="md">A</Chip>)
    expect(screen.getByRole('button')).toHaveClass('h-8', 'text-sm')
  })
})

describe('ChipGroup', () => {
  test('is a named group that stays on one line unless it may wrap', () => {
    const { rerender } = render(
      <ChipGroup label="Payment terms">
        <Chip>7 days</Chip>
      </ChipGroup>,
    )
    const group = screen.getByRole('group', { name: 'Payment terms' })
    expect(group).toHaveClass('flex-nowrap')

    rerender(
      <ChipGroup label="Payment terms" wrap>
        <Chip>7 days</Chip>
      </ChipGroup>,
    )
    expect(screen.getByRole('group', { name: 'Payment terms' })).toHaveClass('flex-wrap')
  })
})
