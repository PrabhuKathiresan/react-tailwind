import { render, screen } from '@testing-library/react'
import { Flex } from './Flex'

describe('Flex', () => {
  it('renders children inside flex container', () => {
    render(
      <Flex data-testid="flex-container">
        <Flex.Item data-testid="item-1">Item 1</Flex.Item>
        <Flex.Item data-testid="item-2">Item 2</Flex.Item>
      </Flex>,
    )

    const flex = screen.getByTestId('flex-container')
    expect(flex).toBeInTheDocument()
    expect(flex).toHaveClass('flex', 'flex-row', 'flex-wrap', 'w-full', 'justify-start')

    expect(screen.getByTestId('item-1')).toHaveTextContent('Item 1')
    expect(screen.getByTestId('item-2')).toHaveTextContent('Item 2')
  })

  it('supports gap presets, justification and alignment props', () => {
    render(
      <Flex data-testid="custom-flex" gap="lg" align="center" justify="between" inline>
        <Flex.Item span={6}>Col 1</Flex.Item>
        <Flex.Item span={6}>Col 2</Flex.Item>
      </Flex>,
    )

    const flex = screen.getByTestId('custom-flex')
    expect(flex).toHaveClass('inline-flex', 'gap-6', 'items-center', 'justify-between')
  })

  it('supports span and grow/shrink props on Flex.Item', () => {
    render(
      <Flex>
        <Flex.Item data-testid="grow-item" grow span="auto">
          Growing Item
        </Flex.Item>
        <Flex.Item data-testid="shrink-item" shrink={false}>
          No Shrink Item
        </Flex.Item>
      </Flex>,
    )

    expect(screen.getByTestId('grow-item')).toHaveClass('w-auto', 'flex-none', 'grow')
    expect(screen.getByTestId('shrink-item')).toHaveClass('shrink-0')
  })

  it('supports Flex.Col alias for Flex.Item', () => {
    render(<Flex.Col data-testid="flex-col">Col Alias</Flex.Col>)

    expect(screen.getByTestId('flex-col')).toBeInTheDocument()
  })

  it('supports xl and 2xl responsive span props on Flex.Item', () => {
    render(
      <Flex>
        <Flex.Item data-testid="responsive-item" span={12} xl={6} xxl={4}>
          Responsive Item
        </Flex.Item>
      </Flex>,
    )

    const item = screen.getByTestId('responsive-item')
    expect(item).toHaveClass('w-full', 'xl:w-6/12', '2xl:w-4/12')
  })

  it('applies numeric order via inline style instead of a dynamic class', () => {
    render(
      <Flex>
        <Flex.Item data-testid="ordered-item" order={5}>
          Item
        </Flex.Item>
      </Flex>,
    )

    const item = screen.getByTestId('ordered-item')
    expect(item).toHaveStyle({ order: 5 })
    expect(item.className).not.toContain('order-5')
  })

  it('applies order="first"/"last" via static utility classes', () => {
    render(
      <Flex>
        <Flex.Item data-testid="first-item" order="first">
          First
        </Flex.Item>
        <Flex.Item data-testid="last-item" order="last">
          Last
        </Flex.Item>
      </Flex>,
    )

    expect(screen.getByTestId('first-item')).toHaveClass('-order-1')
    expect(screen.getByTestId('last-item')).toHaveClass('order-last')
  })

  it('supports independent gapX/gapY spacing', () => {
    render(
      <Flex data-testid="axis-gap-flex" gapX="lg" gapY="xs">
        <Flex.Item>Item</Flex.Item>
      </Flex>,
    )

    const flex = screen.getByTestId('axis-gap-flex')
    expect(flex).toHaveClass('gap-x-6', 'gap-y-1')
    expect(flex.className).not.toMatch(/(^|\s)gap-\d/)
  })
})
