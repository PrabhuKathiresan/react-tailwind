import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { SelectBox } from './SelectBox'

// --- SAFE MOCK: HeadlessUI Transition only ---
jest.mock('@headlessui/react', () => {
  const actual = jest.requireActual('@headlessui/react')
  return {
    ...actual,
    Transition: ({ children }: any) => children,
  }
})

// Utility options
const options = [
  { value: '1', label: 'Alpha' },
  { value: '2', label: 'Beta' },
  { value: '3', label: 'Gamma' },
]

describe('SelectBox', () => {
  test('renders label and input', () => {
    render(<SelectBox label="Pick one" options={options} />)

    expect(screen.getByText('Pick one')).toBeInTheDocument()
    expect(screen.getByTestId('combobox-input')).toBeInTheDocument()
  })

  test('supports size scales (sm, md, lg)', () => {
    render(<SelectBox options={options} size="sm" />)
    const input = screen.getByTestId('combobox-input')
    expect(input.className).toMatch(/px-2.5 py-1.5 text-xs/)
  })

  test('renders leftGroup icon and helperText', () => {
    render(
      <SelectBox
        options={options}
        leftGroup={<span data-testid="globe-icon">🌐</span>}
        helperText="Choose a country"
      />,
    )

    expect(screen.getByTestId('globe-icon')).toBeInTheDocument()
    expect(screen.getByText('Choose a country')).toBeInTheDocument()
  })

  test('renders grouped options when groups prop is passed', async () => {
    const groups = [
      { group: 'Group A', options: [{ value: 'a1', label: 'Option A1' }] },
      { group: 'Group B', options: [{ value: 'b1', label: 'Option B1' }] },
    ]

    render(<SelectBox groups={groups} />)

    const btn = screen.getByTestId('combobox-button')
    await act(async () => {
      fireEvent.click(btn)
    })

    expect(screen.getByText('Group A')).toBeInTheDocument()
    expect(screen.getByText('Option A1')).toBeInTheDocument()
  })

  test('supports custom renderOption callback', async () => {
    render(
      <SelectBox
        options={options}
        renderOption={(opt: any) => <span data-testid={`custom-${opt.value}`}>{opt.label}</span>}
      />,
    )

    const btn = screen.getByTestId('combobox-button')
    await act(async () => {
      fireEvent.click(btn)
    })

    expect(screen.getByTestId('custom-1')).toBeInTheDocument()
  })

  test('supports showSelectAll in multiple selection mode', async () => {
    const handleChange = jest.fn()
    render(
      <SelectBox options={options} multiple showSelectAll selected={[]} onChange={handleChange} />,
    )

    const btn = screen.getByTestId('combobox-button')
    await act(async () => {
      fireEvent.click(btn)
    })

    const selectAllBtn = screen.getByText('Select All')
    expect(selectAllBtn).toBeInTheDocument()

    fireEvent.click(selectAllBtn)
    expect(handleChange).toHaveBeenCalledWith(options)
  })

  test('opens dropdown when button is clicked', async () => {
    render(<SelectBox options={options} />)

    const btn = screen.getByTestId('combobox-button')

    await act(async () => {
      fireEvent.click(btn)
    })

    expect(screen.getByTestId('combobox-options')).toBeInTheDocument()
  })

  test('shows an empty message when there are no options and nothing has been typed', async () => {
    render(<SelectBox options={[]} />)

    await act(async () => {
      fireEvent.click(screen.getByTestId('combobox-button'))
    })

    expect(screen.getByTestId('no-result-found')).toHaveTextContent('No options available')
  })

  test('shows a custom noOptionsText when provided', async () => {
    render(<SelectBox options={[]} noOptionsText="Nothing here yet" />)

    await act(async () => {
      fireEvent.click(screen.getByTestId('combobox-button'))
    })

    expect(screen.getByTestId('no-result-found')).toHaveTextContent('Nothing here yet')
  })

  test('filters options (non-async)', async () => {
    render(<SelectBox options={options} />)

    await act(async () => {
      fireEvent.change(screen.getByTestId('combobox-input'), {
        target: { value: 'alp' },
      })
    })

    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.queryByText('Beta')).not.toBeInTheDocument()
  })

  test('single select calls onChange', async () => {
    const handleChange = jest.fn()

    render(<SelectBox options={options} onChange={handleChange} />)

    const input = screen.getByTestId('combobox-input')

    await act(async () => {
      fireEvent.focus(input)
    })

    await waitFor(() => {
      expect(screen.getByTestId('combobox-options')).toBeInTheDocument()
    })

    fireEvent.mouseDown(screen.getAllByRole('option')[0])

    expect(handleChange).toHaveBeenCalledWith(options[0])
  })

  test('multiple selection mode', async () => {
    const handleChange = jest.fn()

    render(<SelectBox options={options} multiple selected={[]} onChange={handleChange} />)

    await act(async () => {
      fireEvent.click(screen.getByTestId('combobox-button'))
    })

    await waitFor(() => {
      expect(screen.getByTestId('combobox-options')).toBeInTheDocument()
    })

    fireEvent.mouseDown(screen.getByText('Alpha'))

    expect(handleChange).toHaveBeenCalledWith([options[0]])
  })

  test('clears selection when allowClear=true', async () => {
    const handleChange = jest.fn()

    render(<SelectBox allowClear selected={options[0]} options={options} onChange={handleChange} />)

    const clearButton = screen.getByTestId('combobox-clear-button')

    await act(async () => {
      fireEvent.click(clearButton)
    })

    expect(handleChange).toHaveBeenCalledWith(null)
  })

  test('shows error message', () => {
    render(<SelectBox error="Required field" options={options} />)

    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  test('renders disabled properly', () => {
    render(<SelectBox options={options} disabled />)

    expect(screen.getByTestId('combobox-input')).toBeDisabled()
  })

  test('commits custom free text when allowFreeText is true', async () => {
    const handleChange = jest.fn()
    render(<SelectBox options={['Apple', 'Banana']} allowFreeText onChange={handleChange} />)

    const input = screen.getByTestId('combobox-input')
    fireEvent.change(input, { target: { value: 'Mango' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(handleChange).toHaveBeenCalledWith('Mango')
  })

  test('only displays allowAdd option when user types a non-empty query', () => {
    render(<SelectBox options={['Apple', 'Banana']} allowAdd addNewText="Create" />)

    expect(screen.queryByText(/Create/)).not.toBeInTheDocument()

    const input = screen.getByTestId('combobox-input')
    fireEvent.change(input, { target: { value: 'Dragonfruit' } })

    expect(screen.getByText('Create "Dragonfruit"')).toBeInTheDocument()
  })

  test('displays noOptionsText when allowFreeText is true and options is empty', () => {
    render(
      <SelectBox options={[]} multiple allowFreeText noOptionsText="Type to create a tag..." />,
    )

    const button = screen.getByTestId('combobox-button')
    fireEvent.click(button)

    expect(screen.getByText('Type to create a tag...')).toBeInTheDocument()
  })
})
