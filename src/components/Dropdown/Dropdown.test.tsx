import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Dropdown } from './Dropdown'

// -----------------------------
// Mock HeadlessUI
// -----------------------------
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
    <li data-testid="dropdown-item">{children({ focus: false, disabled })}</li>
  ),
}))

// -----------------------------
// Helpers
// -----------------------------
const items = [
  { id: '1', label: 'Item 1' },
  { id: 'div-1', divider: true },
  { id: '2', label: 'Item 2' },
]

const trigger = <span>Open</span>

const renderItem = (item: any) => <div data-testid={`item-${item.id}`}>{item.label}</div>

// -----------------------------
// Tests
// -----------------------------
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

  it('renders divider', () => {
    render(<Dropdown triggerButton={trigger} items={items} renderItem={renderItem} />)

    expect(screen.getByTestId('dropdown-divider')).toBeInTheDocument()
  })

  it('applies itemsContainerClass', () => {
    render(<Dropdown triggerButton={trigger} items={items} itemsContainerClass="my-container" />)

    expect(screen.getByTestId('dropdown-items').className).toContain('my-container')
  })

  it('passes menuItemClass to items', () => {
    render(
      <Dropdown
        triggerButton={trigger}
        items={items}
        menuItemClass="blue-text"
        renderItem={(i) => <div data-testid={`item-${i.id}`}>{i.label}</div>}
      />,
    )

    const item = screen.getByTestId('item-1')
    expect(item.parentElement?.className).toContain('blue-text')
  })

  it('applies focus styling when HeadlessUI passes focus=true', () => {
    jest.doMock('@headlessui/react', () => ({
      Menu: ({ children }: any) => <div>{children}</div>,
      MenuButton: ({ children }: any) => <button>{children}</button>,
      MenuItems: ({ children }: any) => <ul>{children}</ul>,
      MenuItem: ({ children }: any) => (
        <li data-testid="dropdown-item">{children({ focus: true, disabled: false })}</li>
      ),
    }))

    const { unmount } = render(
      <Dropdown
        triggerButton={<span>Open</span>}
        items={[
          { id: '1', label: 'Item 1' },
          { id: '2', label: 'Item 2' },
        ]}
      />,
    )

    const items = screen.getAllByTestId('dropdown-item')

    const wrapper = items[0].firstElementChild as HTMLElement

    expect(wrapper.className).toMatch(/bg-gray-50/)

    unmount()
    jest.resetModules()
  })

  it('supports anchor prop', () => {
    render(<Dropdown triggerButton={trigger} items={items} anchor="top end" />)

    expect(screen.getByTestId('dropdown-items').getAttribute('anchor')).toBe('top end')
  })

  it('calls onMenuClick when clicking items', () => {
    const spy = jest.fn()

    render(<Dropdown triggerButton={<span>Open</span>} items={items} onMenuClick={spy} />)

    const rendered = screen.getAllByTestId('dropdown-item')
    const clickable = rendered[0].firstElementChild as HTMLElement

    fireEvent.click(clickable)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(items[0], 0)
  })

  it('does not call onMenuClick for divider', () => {
    const spy = jest.fn()

    render(<Dropdown triggerButton={trigger} items={items} onMenuClick={spy} />)

    fireEvent.click(screen.getByTestId('dropdown-divider'))
    expect(spy).not.toHaveBeenCalled()
  })

  it('disabled items do not trigger onMenuClick', () => {
    const spy = jest.fn()
    const disabledItems = [{ id: '1', label: 'A', disabled: true }]

    render(<Dropdown triggerButton={trigger} items={disabledItems} onMenuClick={spy} />)

    fireEvent.click(screen.getByTestId('dropdown-item'))
    expect(spy).not.toHaveBeenCalled()
  })
})
