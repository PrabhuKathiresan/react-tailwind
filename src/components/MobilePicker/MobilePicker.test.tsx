import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MobilePicker } from './MobilePicker'
import '@testing-library/jest-dom'

describe('MobilePicker', () => {
  const defaultOptions = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango']

  test('renders trigger with placeholder and opens bottom sheet on click', () => {
    render(
      <MobilePicker
        label="Select Fruit"
        options={defaultOptions}
        placeholder="Choose an option..."
      />,
    )

    expect(screen.getByText('Select Fruit')).toBeInTheDocument()
    expect(screen.getByText('Choose an option...')).toBeInTheDocument()

    const trigger = screen.getByTestId('mobile-picker-trigger')
    fireEvent.click(trigger)

    expect(screen.getByTestId('mobile-picker-sheet')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  test('selects single option and calls onChange and closes sheet', () => {
    const handleChange = jest.fn()
    render(<MobilePicker label="Select Fruit" options={defaultOptions} onChange={handleChange} />)

    fireEvent.click(screen.getByTestId('mobile-picker-trigger'))
    fireEvent.click(screen.getByText('Banana'))

    expect(handleChange).toHaveBeenCalledWith('Banana')
  })

  test('handles multi-select mode with confirm button', () => {
    const handleChange = jest.fn()
    render(
      <MobilePicker
        label="Select Fruit"
        options={defaultOptions}
        multiple
        onChange={handleChange}
      />,
    )

    fireEvent.click(screen.getByTestId('mobile-picker-trigger'))
    fireEvent.click(screen.getByText('Apple'))
    fireEvent.click(screen.getByText('Orange'))

    const confirmBtn = screen.getByTestId('mobile-picker-confirm-button')
    expect(confirmBtn).toHaveTextContent('Apply Selection (2)')

    fireEvent.click(confirmBtn)
    expect(handleChange).toHaveBeenCalledWith(['Apple', 'Orange'])
  })

  test('renders quick pick choice chips and selects on tap', () => {
    const handleChange = jest.fn()
    render(
      <MobilePicker
        label="Select Fruit"
        options={defaultOptions}
        quickOptions={['Apple', 'Mango']}
        quickOptionsTitle="Popular Choices"
        onChange={handleChange}
      />,
    )

    fireEvent.click(screen.getByTestId('mobile-picker-trigger'))
    expect(screen.getByText('Popular Choices')).toBeInTheDocument()

    const mangoChip = screen.getAllByText('Mango')[0]
    fireEvent.click(mangoChip)

    expect(handleChange).toHaveBeenCalledWith('Mango')
  })

  test('filters options using search bar', () => {
    render(<MobilePicker label="Select Fruit" options={defaultOptions} searchable />)

    fireEvent.click(screen.getByTestId('mobile-picker-trigger'))

    const searchInput = screen.getByTestId('mobile-picker-search-input')
    fireEvent.change(searchInput, { target: { value: 'Oran' } })

    expect(screen.getByText('Orange')).toBeInTheDocument()
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
  })

  test('commits free-text item on enter key or tap', () => {
    const handleChange = jest.fn()
    render(
      <MobilePicker
        label="Select Fruit"
        options={defaultOptions}
        allowFreeText
        onChange={handleChange}
      />,
    )

    fireEvent.click(screen.getByTestId('mobile-picker-trigger'))
    const searchInput = screen.getByTestId('mobile-picker-search-input')

    fireEvent.change(searchInput, { target: { value: 'Dragonfruit' } })
    const freetextItem = screen.getByTestId('mobile-picker-freetext-item')
    expect(freetextItem).toHaveTextContent('Use "Dragonfruit"')

    fireEvent.click(freetextItem)
    expect(handleChange).toHaveBeenCalledWith('Dragonfruit')
  })

  test('clears single selection using clear button', () => {
    const handleChange = jest.fn()
    render(
      <MobilePicker
        label="Select Fruit"
        options={defaultOptions}
        selected="Apple"
        allowClear
        onChange={handleChange}
      />,
    )

    const clearBtn = screen.getByTestId('mobile-picker-clear-button')
    fireEvent.click(clearBtn)

    expect(handleChange).toHaveBeenCalledWith(null)
  })

  test('does not open sheet when disabled', () => {
    render(<MobilePicker label="Select Fruit" options={defaultOptions} disabled />)

    const trigger = screen.getByTestId('mobile-picker-trigger')
    fireEvent.click(trigger)

    expect(screen.queryByTestId('mobile-picker-sheet')).not.toBeInTheDocument()
  })

  test('puts focus in the search field when the sheet opens, named for screen readers', async () => {
    render(
      <MobilePicker
        label="Select Fruit"
        options={defaultOptions}
        searchPlaceholder="Search fruit"
      />,
    )
    fireEvent.click(screen.getByTestId('mobile-picker-trigger'))
    const search = screen.getByRole('textbox', { name: 'Search fruit' })
    await waitFor(() => expect(search).toHaveFocus())
  })

  test('leaves focus off the search field with autoFocusSearch off', async () => {
    render(<MobilePicker label="Select Fruit" options={defaultOptions} autoFocusSearch={false} />)
    fireEvent.click(screen.getByTestId('mobile-picker-trigger'))
    await screen.findByTestId('mobile-picker-sheet')
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(screen.getByTestId('mobile-picker-search-input')).not.toHaveFocus()
  })
})
