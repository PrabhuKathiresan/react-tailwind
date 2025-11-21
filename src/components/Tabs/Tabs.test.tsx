import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'

const tabs = [
  { label: 'Tab 1', content: <div>Content 1</div> },
  { label: 'Tab 2', content: <div>Content 2</div> },
  { label: 'Tab 3', content: <div>Content 3</div> },
]

describe('<Tabs />', () => {
  test('renders each panel when its tab is selected', async () => {
    const user = userEvent.setup()
    render(<Tabs tabs={tabs} />)

    const tabButtons = screen.getAllByRole('tab')

    // Initially only panel 1 is visible
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByText('Content 1')).toBeVisible()

    // Switch to tab 2
    await user.click(tabButtons[1])
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByText('Content 2')).toBeVisible()

    // Switch to tab 3
    await user.click(tabButtons[2])
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByText('Content 3')).toBeVisible()
  })

  test('renders TabList and TabPanels with className overrides', () => {
    render(<Tabs tabs={tabs} className="outer" listClass="list-class" panelClass="panel-class" />)

    expect(screen.getByRole('tablist')).toHaveClass('list-class')
    expect(screen.getAllByRole('tabpanel')[0].parentElement).toHaveClass('panel-class')
    expect(screen.getByRole('tablist').parentElement).toHaveClass('outer')
  })

  test('activates defaultIndex correctly', () => {
    render(<Tabs tabs={tabs} defaultIndex={1} />)

    const tabButtons = screen.getAllByRole('tab')

    expect(tabButtons[1]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 2')).toBeVisible()
  })

  test('switches tabs when clicked', async () => {
    const user = userEvent.setup()
    render(<Tabs tabs={tabs} />)

    const tabButtons = screen.getAllByRole('tab')

    // Initially Tab 1 is selected
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 1')).toBeVisible()

    // Click Tab 2
    await user.click(tabButtons[1])

    expect(tabButtons[1]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 2')).toBeVisible()
  })

  describe('variant styling', () => {
    test('underline variant applies underline class on selected tab', () => {
      render(<Tabs tabs={tabs} variant="underline" />)

      const tabButtons = screen.getAllByRole('tab')
      const selected = tabButtons[0]

      // underline variant adds `.after:h-0.5` and blue underline
      expect(selected.className).toMatch(/after:bg-blue-600/)
    })

    test('segmented variant applies segmented selected styles', () => {
      render(<Tabs tabs={tabs} variant="segmented" />)

      const tabButtons = screen.getAllByRole('tab')
      const selected = tabButtons[0]

      // segmented selected tab gets bg-blue-600 text-white
      expect(selected.className).toMatch(/bg-blue-600/)
      expect(selected.className).toMatch(/text-white/)
    })

    test('solid variant applies solid selected styles', () => {
      render(<Tabs tabs={tabs} variant="solid" />)

      const tabButtons = screen.getAllByRole('tab')
      const selected = tabButtons[0]

      // solid selected tab uses solid background classes
      expect(selected.className).toMatch(/bg-gray-900|dark:bg-gray-700/)
    })
  })

  test('clicking segmented tab updates selected styling', async () => {
    const user = userEvent.setup()
    render(<Tabs tabs={tabs} variant="segmented" />)

    const [tab1, tab2] = screen.getAllByRole('tab')

    // tab1 selected initially
    expect(tab1.className).toMatch(/bg-blue-600/)
    expect(tab2.className).not.toMatch(/bg-blue-600/)

    await user.click(tab2)

    expect(tab2.className).toMatch(/bg-blue-600/)
    expect(tab1.className).not.toMatch(/bg-blue-600/)
  })
})
