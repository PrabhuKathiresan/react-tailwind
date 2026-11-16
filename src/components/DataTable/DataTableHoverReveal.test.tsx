import React from 'react'
import { render, screen } from '@testing-library/react'
import { DataTable } from './DataTable'
import { DataTableHoverReveal } from './DataTableHoverReveal'

describe('DataTableHoverReveal', () => {
  test('hides only on hover-capable devices, and shows on row hover or keyboard focus', () => {
    render(
      <DataTableHoverReveal>
        <button type="button">Edit</button>
      </DataTableHoverReveal>,
    )
    const reveal = screen.getByRole('button', { name: 'Edit' }).parentElement!
    expect(reveal).toHaveClass(
      '[@media(hover:hover)]:opacity-0',
      'group-hover:opacity-100',
      'group-focus-within:opacity-100',
    )
    // Never hidden outright: no plain opacity-0, so touch screens always see it.
    expect(reveal.className.split(' ')).not.toContain('opacity-0')
  })

  test('sits in a row that is the hover group, so it reveals with that row', () => {
    render(
      <DataTable
        items={[{ id: 1, name: 'Alpha' }]}
        columns={[
          { name: 'name', label: 'Name' },
          {
            name: 'actions',
            label: 'Actions',
            render: () => (
              <DataTableHoverReveal>
                <button type="button">Edit</button>
              </DataTableHoverReveal>
            ),
          },
        ]}
      />,
    )
    expect(screen.getByRole('button', { name: 'Edit' }).closest('tr')).toHaveClass('group')
  })
})
