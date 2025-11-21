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

  test('opens dropdown when button is clicked', async () => {
    render(<SelectBox options={options} />)

    const btn = screen.getByTestId('combobox-button')

    await act(async () => {
      fireEvent.click(btn)
    })

    expect(screen.getByTestId('combobox-options')).toBeInTheDocument()
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

    // Focus first
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

  test('does not filter locally when async=true', async () => {
    render(<SelectBox options={options} async />)

    await act(async () => {
      fireEvent.change(screen.getByTestId('combobox-input'), {
        target: { value: 'alp' },
      })
    })

    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByText('Gamma')).toBeInTheDocument()
  })

  test('calls onSearch in async mode', async () => {
    const handleSearch = jest.fn().mockResolvedValue(undefined)

    render(<SelectBox async options={[]} onSearch={handleSearch} />)

    await act(async () => {
      fireEvent.change(screen.getByTestId('combobox-input'), {
        target: { value: 'x' },
      })
    })

    await waitFor(() => expect(handleSearch).toHaveBeenCalledWith('x'))
  })

  test('calls onAdd when allowAdd=true', async () => {
    const handleAdd = jest.fn((value) => value)

    render(
      <SelectBox allowAdd options={[]} selected={null} onAdd={handleAdd} placeholder="Search..." />,
    )

    const input = screen.getByTestId('combobox-input')

    // Must focus first
    await act(async () => {
      fireEvent.click(input)
    })

    await act(async () => {
      fireEvent.change(input, { target: { value: 'new item' } })
    })

    // Look for Create "new item"
    const createOption = await screen.findByText(
      (t) => t.includes('Create') && t.includes('new item'),
    )

    await act(async () => {
      fireEvent.click(createOption)
    })

    expect(handleAdd).toHaveBeenCalledTimes(1)
    expect(handleAdd).toHaveBeenCalledWith('new item')
  })

  test('renders disabled properly', () => {
    render(<SelectBox options={options} disabled />)

    expect(screen.getByTestId('combobox-input')).toBeDisabled()
  })

  test("async mode shows 'Type to search...' initially when empty", async () => {
    render(<SelectBox async options={[]} />)

    const input = screen.getByTestId('combobox-input')
    // Must focus first
    await act(async () => {
      fireEvent.focus(input)
    })

    await waitFor(() => {
      expect(screen.getByText('Type to search...')).toBeInTheDocument()
    })
  })

  test('async mode shows loader while searching', async () => {
    const handleSearch: (q: string) => Promise<void> = jest
      .fn()
      .mockImplementation(async (_query: string): Promise<void> => {
        await new Promise((res) => setTimeout(res, 50)) // simulate latency
        return
      })

    render(<SelectBox async options={[]} onSearch={handleSearch} />)

    await act(async () => {
      fireEvent.change(screen.getByTestId('combobox-input'), {
        target: { value: 'abc' },
      })
    })

    await waitFor(() => {
      expect(screen.getByTestId('options-loading')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.queryByTestId('options-loading')).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('no-result-found')).toBeInTheDocument()
  })

  test('async mode displays remote results when parent updates `options`', async () => {
    const internalOptions = [] as Array<{ value: string; label: string }>
    const handleSearch: (q: string) => Promise<void> = jest
      .fn()
      .mockImplementation(async (_query: string): Promise<void> => {
        await new Promise((res) =>
          setTimeout(() => {
            internalOptions.push({ value: '1', label: 'Alpha' })
            res(void 0)
          }, 50),
        ) // simulate latency
        return
      })

    const { rerender } = render(
      <SelectBox async options={internalOptions} onSearch={handleSearch} />,
    )

    // Type something to trigger async
    await act(async () => {
      fireEvent.change(screen.getByTestId('combobox-input'), {
        target: { value: 'al' },
      })
    })

    await waitFor(() => {
      expect(screen.getByTestId('options-loading')).toBeInTheDocument()
    })

    rerender(<SelectBox async options={internalOptions} onSearch={handleSearch} />)

    await waitFor(() => {
      expect(screen.queryByTestId('options-loading')).not.toBeInTheDocument()
    })

    expect(screen.getByText('Alpha')).toBeInTheDocument()
  })

  test("async mode shows 'No results found' when no matches exist", async () => {
    render(<SelectBox async options={[]} />)

    await act(async () => {
      fireEvent.change(screen.getByTestId('combobox-input'), {
        target: { value: 'xyz' },
      })
    })

    expect(screen.getByText(/No results found/)).toBeInTheDocument()
  })

  test('async mode: debounced search triggers only once for rapid typing', async () => {
    jest.useFakeTimers()

    const handleSearch: (q: string) => Promise<void> = jest.fn().mockImplementation(async () => {})

    render(<SelectBox async options={[]} onSearch={handleSearch} />)

    const input = screen.getByTestId('combobox-input')

    // Rapid typing simulation
    act(() => {
      fireEvent.change(input, { target: { value: 'a' } })
      fireEvent.change(input, { target: { value: 'al' } })
      fireEvent.change(input, { target: { value: 'alp' } })

      // Only flush pending (one debounce), not all!
      jest.runOnlyPendingTimers()
    })

    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledTimes(1)
      expect(handleSearch).toHaveBeenCalledWith('alp')
    })

    jest.useRealTimers()
  })
})
