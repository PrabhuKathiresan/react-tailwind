import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'

const tabs = [
  { label: 'Tab 1', content: <div>Content 1</div>, id: 'tab-1' },
  { label: 'Tab 2', content: <div>Content 2</div>, id: 'tab-2' },
  { label: 'Tab 3', content: <div>Content 3</div>, id: 'tab-3' },
]

describe('<Tabs />', () => {
  test('renders each panel when its tab is selected', async () => {
    const user = userEvent.setup()
    render(<Tabs tabs={tabs} />)

    const tabButtons = screen.getAllByRole('tab')

    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    expect(screen.getByText('Content 1')).toBeVisible()

    await user.click(tabButtons[1])
    expect(screen.getByText('Content 2')).toBeVisible()

    await user.click(tabButtons[2])
    expect(screen.getByText('Content 3')).toBeVisible()
  })

  test('renders TabList and TabPanels with className overrides', () => {
    render(<Tabs tabs={tabs} className="outer" listClass="list-class" panelsClass="panels-class" />)

    expect(screen.getByRole('tablist')).toHaveClass('list-class')
    expect(screen.getAllByRole('tabpanel')[0].parentElement).toHaveClass('panels-class')
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
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'true')

    await user.click(tabButtons[1])
    expect(tabButtons[1]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Content 2')).toBeVisible()
  })

  describe('controlled mode', () => {
    test('respects selectedIndex and calls onChange on click', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      render(<Tabs tabs={tabs} selectedIndex={0} onChange={onChange} />)

      const tabButtons = screen.getAllByRole('tab')
      expect(tabButtons[0]).toHaveAttribute('aria-selected', 'true')

      await user.click(tabButtons[2])
      expect(onChange).toHaveBeenCalledWith(2)
    })
  })

  describe('variant styling', () => {
    test('underline variant applies indicator on selected tab', () => {
      render(<Tabs tabs={tabs} variant="underline" />)
      const selected = screen.getAllByRole('tab')[0]
      expect(selected.className).toMatch(/after:bg-\[var\(--ui-primary\)\]/)
    })

    test('segmented variant applies filled background on selected tab', () => {
      render(<Tabs tabs={tabs} variant="segmented" />)
      const selected = screen.getAllByRole('tab')[0]
      expect(selected.className).toMatch(/bg-\[var\(--ui-primary\)\]/)
      expect(selected.className).toMatch(/text-white/)
    })

    test('solid variant applies solid background on selected tab', () => {
      render(<Tabs tabs={tabs} variant="solid" />)
      const selected = screen.getAllByRole('tab')[0]
      expect(selected.className).toMatch(/bg-gray-900|dark:bg-gray-700/)
    })

    test('clicking segmented tab updates selected styling', async () => {
      const user = userEvent.setup()
      render(<Tabs tabs={tabs} variant="segmented" />)

      const [tab1, tab2] = screen.getAllByRole('tab')
      expect(tab1.className).toMatch(/bg-\[var\(--ui-primary\)\]/)

      await user.click(tab2)
      expect(tab2.className).toMatch(/bg-\[var\(--ui-primary\)\]/)
      expect(tab1.className).not.toMatch(/bg-\[var\(--ui-primary\)\]/)
    })
  })

  describe('disabled tab', () => {
    test('disabled tab cannot be clicked', async () => {
      const user = userEvent.setup()
      render(
        <Tabs
          tabs={[
            { label: 'Tab 1', content: <div>Content 1</div> },
            { label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
          ]}
        />,
      )

      const [tab1, tab2] = screen.getAllByRole('tab')
      expect(tab2).toBeDisabled()

      await user.click(tab2)
      expect(tab1).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('stretch prop', () => {
    test('adds w-full to the tab list when stretch is true', () => {
      render(<Tabs tabs={tabs} stretch />)
      expect(screen.getByRole('tablist')).toHaveClass('w-full')
    })

    test('tab buttons get flex-1 class when stretch is true', () => {
      render(<Tabs tabs={tabs} stretch />)
      const tabButtons = screen.getAllByRole('tab')
      tabButtons.forEach((btn) => expect(btn.className).toMatch(/flex-1/))
    })
  })

  describe('orientation', () => {
    test('vertical orientation adds flex layout to the group', () => {
      render(<Tabs tabs={tabs} orientation="vertical" />)
      const group = screen.getByRole('tablist').closest('[class]')
      expect(group?.className).toMatch(/flex/)
    })

    test('vertical underline variant uses border-l indicator', () => {
      render(<Tabs tabs={tabs} orientation="vertical" variant="underline" />)
      const selected = screen.getAllByRole('tab')[0]
      expect(selected.className).toMatch(/border-\[var\(--ui-primary\)\]/)
    })
  })

  describe('per-item overrides', () => {
    test('id is used as the tab key (smoke test, no DOM assertion needed)', () => {
      expect(() => render(<Tabs tabs={tabs} />)).not.toThrow()
    })

    test('icon is rendered inside the tab button', () => {
      render(
        <Tabs
          tabs={[{ label: 'Home', content: <div>panel</div>, icon: <span data-testid="icon" /> }]}
        />,
      )
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    test('tabClass is applied to the specific tab button', () => {
      render(
        <Tabs
          tabs={[
            { label: 'Tab 1', content: <div>Content 1</div>, tabClass: 'custom-tab-class' },
            { label: 'Tab 2', content: <div>Content 2</div> },
          ]}
        />,
      )
      const [tab1, tab2] = screen.getAllByRole('tab')
      expect(tab1.className).toMatch(/custom-tab-class/)
      expect(tab2.className).not.toMatch(/custom-tab-class/)
    })

    test('panelClass overrides the default panel className', () => {
      render(
        <Tabs
          tabs={[{ label: 'Tab 1', content: <div>Content 1</div>, panelClass: 'custom-panel' }]}
        />,
      )
      expect(screen.getByRole('tabpanel').className).toBe('custom-panel')
    })

    test('default panel class is used when panelClass is not set', () => {
      render(<Tabs tabs={[{ label: 'Tab 1', content: <div>Content 1</div> }]} />)
      expect(screen.getByRole('tabpanel').className).toMatch(/rounded-lg/)
    })
  })
})
