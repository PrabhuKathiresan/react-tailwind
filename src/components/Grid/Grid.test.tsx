import { render, screen } from '@testing-library/react'
import { Grid } from './Grid'

describe('Grid', () => {
  it('renders children inside grid container', () => {
    render(
      <Grid data-testid="grid-container">
        <Grid.Col data-testid="col-1">Item 1</Grid.Col>
        <Grid.Col data-testid="col-2">Item 2</Grid.Col>
      </Grid>,
    )

    const grid = screen.getByTestId('grid-container')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid', 'grid-cols-12', 'w-full', 'gap-4')

    expect(screen.getByTestId('col-1')).toHaveTextContent('Item 1')
    expect(screen.getByTestId('col-2')).toHaveTextContent('Item 2')
  })

  it('supports gap presets and alignment props', () => {
    render(
      <Grid data-testid="custom-grid" gap="lg" align="center" inline>
        <Grid.Col span={6}>Col 1</Grid.Col>
        <Grid.Col span={6}>Col 2</Grid.Col>
      </Grid>,
    )

    const grid = screen.getByTestId('custom-grid')
    expect(grid).toHaveClass('inline-grid', 'gap-6', 'items-center')
  })

  it('supports span and responsive props on Grid.Col', () => {
    render(
      <Grid>
        <Grid.Col data-testid="responsive-col" span={12} md={6} lg={4}>
          Responsive Item
        </Grid.Col>
      </Grid>,
    )

    const col = screen.getByTestId('responsive-col')
    expect(col).toHaveClass('col-span-12', 'md:col-span-6', 'lg:col-span-4')
  })

  it('supports Grid.Item alias for Grid.Col', () => {
    render(<Grid.Item data-testid="grid-item">Item Alias</Grid.Item>)

    expect(screen.getByTestId('grid-item')).toBeInTheDocument()
  })

  it('supports xl and 2xl responsive span props on Grid.Col', () => {
    render(
      <Grid>
        <Grid.Col data-testid="responsive-col" span={12} xl={6} xxl={4}>
          Responsive Item
        </Grid.Col>
      </Grid>,
    )

    const col = screen.getByTestId('responsive-col')
    expect(col).toHaveClass('col-span-12', 'xl:col-span-6', '2xl:col-span-4')
  })

  it('wires up justify, direction, and wrap instead of leaking them onto the DOM node', () => {
    render(
      <Grid data-testid="flex-grid" flex justify="between" direction="col" wrap="nowrap">
        <Grid.Col>Item</Grid.Col>
      </Grid>,
    )

    const grid = screen.getByTestId('flex-grid')
    expect(grid).toHaveClass('flex', 'flex-col', 'flex-nowrap', 'justify-between')
    expect(grid).not.toHaveAttribute('justify')
    expect(grid).not.toHaveAttribute('direction')
    expect(grid).not.toHaveAttribute('wrap')
    expect(grid).not.toHaveAttribute('flex')
  })

  it('applies numeric order via inline style instead of a dynamic class', () => {
    render(
      <Grid>
        <Grid.Col data-testid="ordered-col" order={5}>
          Item
        </Grid.Col>
      </Grid>,
    )

    const col = screen.getByTestId('ordered-col')
    expect(col).toHaveStyle({ order: 5 })
    expect(col.className).not.toContain('order-5')
  })

  it('supports independent gapX/gapY spacing', () => {
    render(
      <Grid data-testid="axis-gap-grid" gapX="lg" gapY="xs">
        <Grid.Col>Item</Grid.Col>
      </Grid>,
    )

    const grid = screen.getByTestId('axis-gap-grid')
    expect(grid).toHaveClass('gap-x-6', 'gap-y-1')
    expect(grid.className).not.toMatch(/(^|\s)gap-\d/)
  })

  it('renders a breakpoint-free responsive grid via minColWidth', () => {
    render(
      <Grid data-testid="auto-grid" minColWidth="12rem">
        <Grid.Col>Item</Grid.Col>
      </Grid>,
    )

    const grid = screen.getByTestId('auto-grid')
    expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))' })
  })

  it('supports grow/shrink on Grid.Col without leaking onto the DOM node', () => {
    render(
      <Grid>
        <Grid.Col data-testid="grow-col" grow shrink={false}>
          Item
        </Grid.Col>
      </Grid>,
    )

    const col = screen.getByTestId('grow-col')
    expect(col).toHaveClass('grow', 'shrink-0')
    expect(col).not.toHaveAttribute('grow')
    expect(col).not.toHaveAttribute('shrink')
  })
})
