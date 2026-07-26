import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Accordion } from './Accordion'

const items = [
  { title: 'Item 1', content: <div>Content 1</div>, id: 'item-1' },
  { title: 'Item 2', content: <div>Content 2</div>, id: 'item-2' },
  { title: 'Item 3', content: <div>Content 3</div>, id: 'item-3' },
]

describe('<Accordion />', () => {
  test('renders every item header', () => {
    render(<Accordion items={items} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

  test('all items start closed by default', () => {
    render(<Accordion items={items} />)

    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveAttribute('aria-expanded', 'false')
    }
  })

  test('opens an item on click and reflects aria-expanded', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])

    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
  })

  test('type="single": opening one item closes the previously open one', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')

    await user.click(buttons[1])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true')
  })

  test('type="single" collapsible=true (default): clicking the open item closes it', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')

    await user.click(buttons[0])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
  })

  test('type="single" collapsible=false: clicking the open item keeps it open', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} collapsible={false} />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    await user.click(buttons[0])

    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
  })

  test('type="multiple": several items can stay open at once', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} type="multiple" />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    await user.click(buttons[1])

    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true')
  })

  test('respects defaultOpenIds for initial state', () => {
    render(<Accordion items={items} defaultOpenIds={['item-2']} />)

    expect(screen.getAllByRole('button')[1]).toHaveAttribute('aria-expanded', 'true')
  })

  test('disabled items cannot be toggled', async () => {
    const user = userEvent.setup()
    render(
      <Accordion
        items={[{ title: 'Disabled', content: 'x', id: 'd', disabled: true }, ...items]}
      />,
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toBeDisabled()

    await user.click(buttons[0])
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
  })

  test('supports controlled openIds + onChange', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()

    render(<Accordion items={items} openIds={['item-1']} onChange={handleChange} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')

    await user.click(buttons[1])

    expect(handleChange).toHaveBeenCalledWith(['item-2'])
    // controlled: stays on the externally-provided value since the parent didn't re-render with new props
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')
  })

  test('associates each panel with its header via aria-controls/aria-labelledby', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])

    const panelId = buttons[0].getAttribute('aria-controls')
    expect(panelId).toBeTruthy()

    const panel = document.getElementById(panelId!)
    expect(panel).toHaveAttribute('aria-labelledby', buttons[0].id)
    expect(panel).toContainElement(screen.getByText('Content 1'))
  })

  test('renders a custom static expandIcon instead of the default chevron', () => {
    render(<Accordion items={items} expandIcon={<span data-testid="custom-icon">*</span>} />)

    expect(screen.getAllByTestId('custom-icon')).toHaveLength(items.length)
  })

  test('expandIcon as a function receives the item open state', async () => {
    const user = userEvent.setup()
    render(
      <Accordion
        items={items}
        expandIcon={(isOpen) => <span data-testid="state-icon">{isOpen ? '-' : '+'}</span>}
      />,
    )

    const icons = screen.getAllByTestId('state-icon')
    expect(icons[0]).toHaveTextContent('+')

    await user.click(screen.getAllByRole('button')[0])

    expect(screen.getAllByTestId('state-icon')[0]).toHaveTextContent('-')
  })
})
