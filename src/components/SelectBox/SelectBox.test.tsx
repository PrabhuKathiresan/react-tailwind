import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    expect(input.className).toMatch(/px-2.5 py-1.5 text-base md:text-xs/)
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

  test('applies dropdownMinWidth to the dropdown panel and keeps the input-width class', async () => {
    const { rerender } = render(<SelectBox options={options} dropdownMinWidth={240} />)

    await act(async () => {
      fireEvent.click(screen.getByTestId('combobox-button'))
    })

    const panel = screen.getByTestId('combobox-options')
    expect(panel).toHaveStyle({ minWidth: '240px' })
    expect(panel).toHaveClass('w-[var(--input-width)]')

    rerender(<SelectBox options={options} dropdownMinWidth="16rem" />)
    expect(screen.getByTestId('combobox-options')).toHaveStyle({ minWidth: '16rem' })
  })

  test('does not set a min-width on the dropdown panel by default', async () => {
    render(<SelectBox options={options} />)

    await act(async () => {
      fireEvent.click(screen.getByTestId('combobox-button'))
    })

    expect(screen.getByTestId('combobox-options').style.minWidth).toBe('')
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

  describe('uncontrolled mode', () => {
    const openAndPick = async (label: string) => {
      await act(async () => {
        fireEvent.click(screen.getByTestId('combobox-button'))
      })
      await waitFor(() => {
        expect(screen.getByTestId('combobox-options')).toBeInTheDocument()
      })
      await act(async () => {
        fireEvent.mouseDown(screen.getByRole('option', { name: label }))
      })
    }

    test('keeps the picked option when selected is not passed', async () => {
      const handleChange = jest.fn()
      render(<SelectBox options={options} onChange={handleChange} />)

      await openAndPick('Beta')

      expect(handleChange).toHaveBeenCalledWith(options[1])
      expect(screen.getByTestId('combobox-input')).toHaveValue('Beta')
    })

    test('starts from defaultSelected', () => {
      render(<SelectBox options={options} defaultSelected={options[2]} />)
      expect(screen.getByTestId('combobox-input')).toHaveValue('Gamma')
    })

    test('keeps picked options in multiple mode', async () => {
      render(<SelectBox options={options} multiple defaultSelected={[options[0]]} />)
      expect(screen.getByText('Alpha')).toBeInTheDocument()

      await openAndPick('Beta')

      // Badges in the input area for both selections
      expect(screen.getAllByText('Alpha').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Beta').length).toBeGreaterThan(1)
    })

    test('clear button resets the internal selection', async () => {
      render(<SelectBox options={options} allowClear defaultSelected={options[0]} />)
      expect(screen.getByTestId('combobox-input')).toHaveValue('Alpha')

      await act(async () => {
        fireEvent.click(screen.getByTestId('combobox-clear-button'))
      })

      expect(screen.getByTestId('combobox-input')).toHaveValue('')
      expect(screen.queryByTestId('combobox-clear-button')).not.toBeInTheDocument()
    })

    test('stays controlled when selected is passed, ignoring defaultSelected', async () => {
      const handleChange = jest.fn()
      render(
        <SelectBox
          options={options}
          selected={null}
          defaultSelected={options[2]}
          onChange={handleChange}
        />,
      )
      expect(screen.getByTestId('combobox-input')).toHaveValue('')

      await openAndPick('Beta')

      expect(handleChange).toHaveBeenCalledWith(options[1])
      expect(screen.getByTestId('combobox-input')).toHaveValue('')
    })

    test('works in bottom-sheet mode', () => {
      render(<SelectBox options={['Apple', 'Banana']} mobileMode="sheet" placeholder="Pick" />)

      fireEvent.click(screen.getByTestId('mobile-picker-trigger'))
      fireEvent.click(screen.getByText('Banana'))

      expect(screen.getByTestId('mobile-picker-trigger')).toHaveTextContent('Banana')
    })
  })

  describe('input right padding', () => {
    test('reserves room for the chevron per size and truncates long values', () => {
      const { rerender } = render(<SelectBox options={options} size="sm" />)
      const input = () => screen.getByTestId('combobox-input')
      expect(input()).toHaveClass('pe-9', 'text-ellipsis')

      rerender(<SelectBox options={options} size="md" />)
      expect(input()).toHaveClass('pe-10')

      rerender(<SelectBox options={options} size="lg" />)
      expect(input()).toHaveClass('pe-11')
    })

    test('reserves extra room while the clear button is shown', () => {
      const { rerender } = render(<SelectBox options={options} allowClear selected={options[0]} />)
      expect(screen.getByTestId('combobox-input')).toHaveClass('pe-16')

      rerender(<SelectBox options={options} allowClear selected={null} />)
      expect(screen.getByTestId('combobox-input')).toHaveClass('pe-10')
    })
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

  it('names the field by its label even without an id or name', () => {
    render(
      <SelectBox
        label="Quarter"
        options={[{ label: 'April – June', value: '1' }]}
        selected={null}
        onChange={() => {}}
      />,
    )
    expect(screen.getByLabelText('Quarter')).toBeInTheDocument()
  })

  it('opens again on the next tap after choosing, while the field still has focus', async () => {
    const user = userEvent.setup()
    const Controlled = () => {
      const [value, setValue] = React.useState<{ label: string; value: string } | null>(null)
      return (
        <SelectBox
          id="footer"
          label="Footer style"
          searchable={false}
          options={[
            { label: 'Extended', value: 'extended' },
            { label: 'Auto', value: 'auto' },
          ]}
          selected={value}
          onChange={(option) => setValue(option as { label: string; value: string } | null)}
        />
      )
    }
    render(<Controlled />)
    const field = screen.getByLabelText('Footer style')

    await user.click(field)
    await user.click(await screen.findByRole('option', { name: 'Auto' }))
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
    expect(field).toHaveFocus()

    await user.click(field)
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
  })

  test("async: searches as you type, then with '' once the query is cleared", async () => {
    const onSearch = jest.fn(async () => {})
    render(<SelectBox options={options} async onSearch={onSearch} searchable />)
    const input = screen.getByTestId('combobox-input')

    // Opening alone doesn't search: the owner's options are already the unfiltered ones.
    fireEvent.click(input)
    await new Promise((resolve) => setTimeout(resolve, 600))
    expect(onSearch).not.toHaveBeenCalled()

    fireEvent.change(input, { target: { value: 'al' } })
    await waitFor(() => expect(onSearch).toHaveBeenLastCalledWith('al'), { timeout: 1500 })

    fireEvent.change(input, { target: { value: '' } })
    await waitFor(() => expect(onSearch).toHaveBeenLastCalledWith(''), { timeout: 1500 })
    expect(onSearch).toHaveBeenCalledTimes(2)
  })

  test("async: doesn't offer the last query's options until the new search resolves", async () => {
    let finish: () => void = () => {}
    const onSearch = jest.fn(() => new Promise<void>((resolve) => (finish = resolve)))
    const onChange = jest.fn()
    render(<SelectBox options={options} async onSearch={onSearch} onChange={onChange} searchable />)
    const input = screen.getByTestId('combobox-input')

    fireEvent.click(input)
    fireEvent.change(input, { target: { value: 'al' } })
    expect(screen.getByTestId('options-loading')).toBeInTheDocument()
    expect(screen.queryByText('Beta')).not.toBeInTheDocument()

    await waitFor(() => expect(onSearch).toHaveBeenCalledWith('al'), { timeout: 1500 })
    await act(async () => finish())
    expect(await screen.findByText('Beta')).toBeInTheDocument()

    // A scanner types its code and Enter at once: the matches for 'al' aren't
    // this code's, so Enter picks nothing.
    fireEvent.change(input, { target: { value: '8901' } })
    expect(screen.queryByText('Beta')).not.toBeInTheDocument()
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onChange).not.toHaveBeenCalled()
  })

  test("shows an option's description under its label, telling apart options with the same label", async () => {
    render(
      <SelectBox
        options={[
          { value: 'c1', label: 'Anita Desai', description: '29ABCDE1234F1Z5 · Bengaluru' },
          { value: 'c2', label: 'Anita Desai', description: '+91 98450 12345 · Pune' },
        ]}
      />,
    )
    await act(async () => {
      fireEvent.click(screen.getByTestId('combobox-button'))
    })

    const [first, second] = screen.getAllByRole('option')
    expect(first).toHaveTextContent('Anita Desai29ABCDE1234F1Z5 · Bengaluru')
    expect(second).toHaveTextContent('Anita Desai+91 98450 12345 · Pune')
  })
})
