import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioSwitch } from './RadioSwitch'

// Mock getBoundingClientRect because it is used to compute highlight position
function mockRect(el: HTMLElement, rect: Partial<DOMRect>) {
  jest.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 0,
    width: 100,
    height: 40,
    top: 0,
    left: 0,
    bottom: 40,
    right: 100,
    toJSON: () => {},
    ...rect,
  } as DOMRect)
}

describe('RadioSwitch', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('renders all items', () => {
    render(<RadioSwitch label="Choice" selected="b" onChange={() => {}} items={['a', 'b', 'c']} />)

    expect(screen.getByText('a')).toBeInTheDocument()
    expect(screen.getByText('b')).toBeInTheDocument()
    expect(screen.getByText('c')).toBeInTheDocument()
  })

  test('renders object items with description', () => {
    render(
      <RadioSwitch
        selected="x"
        onChange={() => {}}
        items={[
          { label: 'One', value: 'x', description: 'First option' },
          { label: 'Two', value: 'y' },
        ]}
      />,
    )

    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('First option')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  test('calls onChange when selecting an item by click', () => {
    const handleChange = jest.fn()

    render(<RadioSwitch selected="a" onChange={handleChange} items={['a', 'b', 'c']} />)

    fireEvent.click(screen.getByText('b'))

    expect(handleChange).toHaveBeenCalledWith('b')
  })

  test('controlled component updates highlight position when selected changes', () => {
    const { rerender } = render(<RadioSwitch selected="a" onChange={() => {}} items={['a', 'b']} />)

    const container = screen.getByRole('radiogroup')

    const buttons = container.querySelectorAll('[data-radio-item]')

    // Mock rects for a and b
    mockRect(buttons[0] as HTMLElement, { left: 0, top: 0 })
    mockRect(buttons[1] as HTMLElement, { left: 120, top: 0 })

    // highlight element (first child)
    const highlight = container.querySelector('div[aria-hidden="true"]')
    expect(highlight?.className).not.toContain('duration-300')

    // Now switch selected → should reposition highlight
    rerender(<RadioSwitch selected="b" onChange={() => {}} items={['a', 'b']} />)

    expect(highlight).toHaveStyle(`transform: translate3d(120px, 0px, 0)`)
    // Changing the choice slides; placing it the first time didn't.
    expect(highlight?.className).toContain('duration-300')
  })

  test('keyboard select works (ArrowRight)', () => {
    const handleChange = jest.fn()

    render(<RadioSwitch selected="a" onChange={handleChange} items={['a', 'b', 'c']} />)

    const group = screen.getByRole('radiogroup')

    group.focus()
    fireEvent.keyDown(group, { key: 'ArrowRight' })

    expect(handleChange).toHaveBeenCalledWith('b')
  })

  test('aria-label is applied', () => {
    render(
      <RadioSwitch
        label="Payment Method"
        selected="card"
        items={['card', 'cash']}
        onChange={() => {}}
      />,
    )

    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Payment Method')
  })

  describe('keyboard and focus', () => {
    const Controlled = ({
      items = ['light', 'dark', 'system'] as (
        | string
        | { label: string; value: string; disabled?: boolean }
      )[],
    }) => {
      const [value, setValue] = React.useState('light')
      return (
        <>
          <button type="button">before</button>
          <RadioSwitch label="Theme" selected={value} onChange={setValue} items={items} />
          <button type="button">after</button>
        </>
      )
    }

    test('is one Tab stop: the chosen option', async () => {
      const user = userEvent.setup()
      render(<Controlled />)
      screen.getByText('before').focus()
      await user.tab()
      expect(screen.getByRole('radio', { name: 'light' })).toHaveFocus()
      await user.tab()
      expect(screen.getByText('after')).toHaveFocus()
    })

    test('the arrows choose and move focus together, so Space keeps the choice', async () => {
      const user = userEvent.setup()
      render(<Controlled />)
      screen.getByRole('radio', { name: 'light' }).focus()
      await user.keyboard('{ArrowRight}')
      const dark = screen.getByRole('radio', { name: 'dark' })
      expect(dark).toHaveAttribute('aria-checked', 'true')
      expect(dark).toHaveFocus()
      await user.keyboard(' ')
      expect(dark).toHaveAttribute('aria-checked', 'true')
      await user.keyboard('{End}')
      expect(screen.getByRole('radio', { name: 'system' })).toHaveFocus()
    })

    test('skips disabled options', async () => {
      const user = userEvent.setup()
      render(
        <Controlled
          items={['light', { label: 'dark', value: 'dark', disabled: true }, 'system']}
        />,
      )
      screen.getByRole('radio', { name: 'light' }).focus()
      await user.keyboard('{ArrowRight}')
      expect(screen.getByRole('radio', { name: 'system' })).toHaveFocus()
    })
  })

  test('submits the chosen value with a form under its name', () => {
    const { container } = render(
      <RadioSwitch name="theme" selected="dark" onChange={() => {}} items={['light', 'dark']} />,
    )
    expect(container.querySelector('input[type="hidden"][name="theme"]')).toHaveValue('dark')
  })

  test('passes typed values to onChange', () => {
    type Theme = 'light' | 'dark'
    const changes: Theme[] = []
    render(
      <RadioSwitch<Theme>
        selected="light"
        onChange={(value) => changes.push(value)}
        items={['light', 'dark']}
      />,
    )
    fireEvent.click(screen.getByRole('radio', { name: 'dark' }))
    expect(changes).toEqual(['dark'])
  })
})
