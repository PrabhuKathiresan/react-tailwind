import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SwipeableTabs } from './SwipeableTabs'

describe('SwipeableTabs', () => {
  const items = [
    { id: 'tab1', label: 'Tab 1', content: <div data-testid="panel-1">Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div data-testid="panel-2">Content 2</div> },
    { id: 'tab3', label: 'Tab 3', content: <div data-testid="panel-3">Content 3</div> },
  ]

  test('renders header buttons and initial active tab panel', () => {
    render(<SwipeableTabs items={items} defaultActiveId="tab1" />)

    expect(screen.getByTestId('swipeable-tabs')).toBeInTheDocument()
    expect(screen.getByTestId('swipeable-tab-btn-tab1')).toBeInTheDocument()
    expect(screen.getByTestId('swipeable-tab-btn-tab2')).toBeInTheDocument()

    expect(screen.getByTestId('panel-1')).toBeInTheDocument()
  })

  test('switches tab when header button is clicked', () => {
    const onChangeMock = jest.fn()
    render(<SwipeableTabs items={items} defaultActiveId="tab1" onChange={onChangeMock} />)

    fireEvent.click(screen.getByTestId('swipeable-tab-btn-tab2'))
    expect(onChangeMock).toHaveBeenCalledWith('tab2')
  })

  test('swipes left to navigate to next tab', () => {
    const onChangeMock = jest.fn()
    render(
      <SwipeableTabs items={items} defaultActiveId="tab1" onChange={onChangeMock} threshold={30} />,
    )

    const viewport = screen.getByTestId('swipeable-tabs-viewport')

    fireEvent.touchStart(viewport, { touches: [{ clientX: 200, clientY: 100 }] })
    fireEvent.touchMove(viewport, { touches: [{ clientX: 120, clientY: 100 }] }) // DeltaX: -80px (Swiped Left)
    fireEvent.touchEnd(viewport)

    expect(onChangeMock).toHaveBeenCalledWith('tab2')
  })

  test('swipes right to navigate to previous tab', () => {
    const onChangeMock = jest.fn()
    render(
      <SwipeableTabs items={items} defaultActiveId="tab2" onChange={onChangeMock} threshold={30} />,
    )

    const viewport = screen.getByTestId('swipeable-tabs-viewport')

    fireEvent.touchStart(viewport, { touches: [{ clientX: 100, clientY: 100 }] })
    fireEvent.touchMove(viewport, { touches: [{ clientX: 180, clientY: 100 }] }) // DeltaX: +80px (Swiped Right)
    fireEvent.touchEnd(viewport)

    expect(onChangeMock).toHaveBeenCalledWith('tab1')
  })
})
