import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Dropdown } from './Dropdown'

// Mock HeadlessUI
jest.mock('@headlessui/react', () => ({
  Menu: ({ children }: any) => <div data-testid="menu">{children}</div>,

  MenuButton: ({ children }: any) => (
    <button data-testid="menu-button">
      {typeof children === 'function'
        ? children({
            active: false,
            open: false,
            disabled: false,
            hover: false,
            focus: false,
          })
        : children}
    </button>
  ),

  MenuItems: ({ children, transition, ...props }: any) => (
    <ul data-testid="dropdown-items" {...props}>
      {children}
    </ul>
  ),

  MenuItem: ({ children, disabled }: any) => (
    <li data-testid="dropdown-item">{children({ active: false, disabled })}</li>
  ),
}))

const items = [
  { id: '1', label: 'Item 1', icon: <span data-testid="icon-1">Icon</span>, shortcut: '⌘1' },
  { id: 'div-1', divider: true },
  { id: '2', label: 'Item 2', danger: true, description: 'Danger description' },
]

const trigger = <span>Open</span>
const renderItem = (item: any) => <div data-testid={`item-${item.id}`}>{item.label}</div>

describe('Dropdown Component', () => {
  it('renders static triggerButton', () => {
    render(<Dropdown triggerButton={trigger} items={items} />)

    expect(screen.getByTestId('menu-button')).toBeInTheDocument()
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('renders trigger via renderTriggerButton', () => {
    render(
      <Dropdown
        renderTriggerButton={() => <div data-testid="custom-trigger">Hello</div>}
        items={items}
      />,
    )

    expect(screen.getByTestId('custom-trigger')).toBeInTheDocument()
  })

  it('renders items using renderItem', () => {
    render(<Dropdown triggerButton={trigger} items={items} renderItem={renderItem} />)

    expect(screen.getByTestId('item-1')).toBeInTheDocument()
    expect(screen.getByTestId('item-2')).toBeInTheDocument()
  })

  it('renders icon, description, and shortcut', () => {
    render(<Dropdown triggerButton={trigger} items={items} />)

    expect(screen.getByTestId('icon-1')).toBeInTheDocument()
    expect(screen.getByText('⌘1')).toBeInTheDocument()
    expect(screen.getByText('Danger description')).toBeInTheDocument()
  })

  it('renders groupTitle header line', () => {
    const groupedItems = [{ id: 'g1', label: 'Workspaces', groupTitle: 'Account Settings' }]

    render(<Dropdown triggerButton={trigger} items={groupedItems} />)

    expect(screen.getByTestId('dropdown-group-g1')).toHaveTextContent('Account Settings')
  })

  it('renders divider', () => {
    render(<Dropdown triggerButton={trigger} items={items} />)

    expect(screen.getByTestId('dropdown-divider')).toBeInTheDocument()
  })

  it('does not render a menu item row for a divider entry', () => {
    render(<Dropdown triggerButton={trigger} items={items} />)

    expect(screen.queryByTestId('dropdown-item-div-1')).not.toBeInTheDocument()
  })

  it('applies itemsContainerClass and width class', () => {
    render(
      <Dropdown
        triggerButton={trigger}
        items={items}
        width="lg"
        itemsContainerClass="my-container"
      />,
    )

    const container = screen.getByTestId('dropdown-items')
    expect(container.className).toContain('w-64')
    expect(container.className).toContain('my-container')
  })

  it('calls onMenuClick and item.onClick when clicking items', () => {
    const spyOnMenuClick = jest.fn()
    const spyItemOnClick = jest.fn()

    const clickItems = [{ id: 'c1', label: 'Click Me', onClick: spyItemOnClick }]

    render(
      <Dropdown
        triggerButton={<span>Open</span>}
        items={clickItems}
        onMenuClick={spyOnMenuClick}
      />,
    )

    const rendered = screen.getByTestId('dropdown-item-c1')
    fireEvent.click(rendered)

    expect(spyOnMenuClick).toHaveBeenCalledWith(clickItems[0], 0)
    expect(spyItemOnClick).toHaveBeenCalledWith(clickItems[0])
  })

  it('disabled items do not trigger click handlers', () => {
    const spy = jest.fn()
    const disabledItems = [{ id: '1', label: 'A', disabled: true }]

    render(<Dropdown triggerButton={trigger} items={disabledItems} onMenuClick={spy} />)

    const rendered = screen.getByTestId('dropdown-item-1')
    fireEvent.click(rendered)
    expect(spy).not.toHaveBeenCalled()
  })
})
