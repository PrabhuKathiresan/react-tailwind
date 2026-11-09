import React from 'react'
import { render, screen } from '@testing-library/react'
import { SettingsGroup } from './SettingsGroup'

describe('SettingsGroup', () => {
  it('is a section with its heading, description and rows', () => {
    render(
      <SettingsGroup title="Numbering" description="Every series restarts on 1 April.">
        <button type="button">Invoices</button>
      </SettingsGroup>,
    )
    expect(screen.getByText('Numbering')).toBeInTheDocument()
    expect(screen.getByText('Every series restarts on 1 April.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Invoices' })).toBeInTheDocument()
  })
})
